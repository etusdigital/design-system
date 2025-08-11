import { computed } from 'vue';
import type { Ref } from 'vue';
import type { BTableHeader, BTableItem } from '../components/BTable/BTable.types';

export interface ExportOptions {
  /** File name (without extension) */
  filename?: string;
  /** Whether to include headers */
  includeHeaders?: boolean;
  /** Which columns to export (all if not specified) */
  columnsToExport?: string[];
  /** Whether to export visible columns only */
  visibleColumnsOnly?: boolean;
  /** Custom date format */
  dateFormat?: string;
  /** Custom number format */
  numberFormat?: Intl.NumberFormatOptions;
  /** Custom cell formatter */
  cellFormatter?: (value: any, header: BTableHeader, item: BTableItem) => string;
}

export interface ExportFormatOptions {
  /** CSV field delimiter */
  delimiter?: string;
  /** CSV text qualifier */
  qualifier?: string;
  /** CSV line ending */
  lineEnding?: string;
  /** Whether to use BOM for UTF-8 */
  useBOM?: boolean;
  /** Excel worksheet name */
  worksheetName?: string;
  /** Whether to auto-fit column widths */
  autoFitColumns?: boolean;
}

export interface ExportResult {
  /** Whether export was successful */
  success: boolean;
  /** Error message if failed */
  error?: string;
  /** Generated filename */
  filename: string;
  /** Number of rows exported */
  rowCount: number;
  /** Number of columns exported */
  columnCount: number;
  /** File size in bytes */
  fileSize: number;
}

const DEFAULT_OPTIONS: Required<ExportOptions> = {
  filename: 'table-data',
  includeHeaders: true,
  columnsToExport: [],
  visibleColumnsOnly: false,
  dateFormat: 'yyyy-MM-dd',
  numberFormat: {},
  cellFormatter: (value) => String(value || '')
};

const DEFAULT_FORMAT_OPTIONS: Required<ExportFormatOptions> = {
  delimiter: ',',
  qualifier: '"',
  lineEnding: '\r\n',
  useBOM: true,
  worksheetName: 'Sheet1',
  autoFitColumns: true
};

export function useTableExport<T extends BTableItem>(
  items: Ref<T[]>,
  headers: Ref<BTableHeader[]>,
  visibleHeaders?: Ref<BTableHeader[]>
) {
  
  // Format date values
  const formatDate = (date: Date | string | number, format: string): string => {
    try {
      const d = date instanceof Date ? date : new Date(date);
      
      // Simple date formatting - in real app you'd use a date library like date-fns
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      const hours = String(d.getHours()).padStart(2, '0');
      const minutes = String(d.getMinutes()).padStart(2, '0');
      const seconds = String(d.getSeconds()).padStart(2, '0');
      
      return format
        .replace('yyyy', String(year))
        .replace('MM', month)
        .replace('dd', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
    } catch {
      return String(date);
    }
  };
  
  // Format number values
  const formatNumber = (value: number, options: Intl.NumberFormatOptions): string => {
    try {
      return new Intl.NumberFormat('en-US', options).format(value);
    } catch {
      return String(value);
    }
  };
  
  // Format cell value
  const formatCellValue = (
    value: any, 
    header: BTableHeader, 
    item: T, 
    options: ExportOptions
  ): string => {
    // Use custom formatter if provided
    if (options.cellFormatter) {
      return options.cellFormatter(value, header, item);
    }
    
    // Handle null/undefined
    if (value == null) return '';
    
    // Handle different data types
    if (header.dataType === 'date' || value instanceof Date) {
      return formatDate(value, options.dateFormat!);
    }
    
    if (header.dataType === 'number' || typeof value === 'number') {
      return formatNumber(value, options.numberFormat!);
    }
    
    if (typeof value === 'boolean') {
      return value ? 'True' : 'False';
    }
    
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    
    if (typeof value === 'object') {
      return JSON.stringify(value);
    }
    
    return String(value);
  };
  
  // Get headers to export
  const getExportHeaders = (options: ExportOptions): BTableHeader[] => {
    let headersToExport: BTableHeader[];
    
    if (options.visibleColumnsOnly && visibleHeaders?.value) {
      headersToExport = visibleHeaders.value;
    } else if (options.columnsToExport && options.columnsToExport.length > 0) {
      headersToExport = headers.value.filter(h => options.columnsToExport!.includes(h.value));
    } else {
      headersToExport = headers.value;
    }
    
    return headersToExport;
  };
  
  // Escape CSV field
  const escapeCsvField = (value: string, delimiter: string, qualifier: string): string => {
    // If the value contains delimiter, qualifier, or newline, wrap in qualifiers
    if (value.includes(delimiter) || value.includes(qualifier) || value.includes('\n') || value.includes('\r')) {
      // Escape qualifiers by doubling them
      const escapedValue = value.replace(new RegExp(qualifier, 'g'), qualifier + qualifier);
      return qualifier + escapedValue + qualifier;
    }
    return value;
  };
  
  // Export to CSV
  const exportToCSV = (
    exportOptions: ExportOptions = {},
    formatOptions: ExportFormatOptions = {}
  ): Promise<ExportResult> => {
    return new Promise((resolve) => {
      try {
        const opts = { ...DEFAULT_OPTIONS, ...exportOptions };
        const formatOpts = { ...DEFAULT_FORMAT_OPTIONS, ...formatOptions };
        
        const exportHeaders = getExportHeaders(opts);
        const csvRows: string[] = [];
        
        // Add headers if requested
        if (opts.includeHeaders) {
          const headerRow = exportHeaders
            .map(h => escapeCsvField(h.label || h.value, formatOpts.delimiter, formatOpts.qualifier))
            .join(formatOpts.delimiter);
          csvRows.push(headerRow);
        }
        
        // Add data rows
        items.value.forEach(item => {
          const row = exportHeaders
            .map(header => {
              const value = formatCellValue(item[header.value], header, item, opts);
              return escapeCsvField(value, formatOpts.delimiter, formatOpts.qualifier);
            })
            .join(formatOpts.delimiter);
          csvRows.push(row);
        });
        
        // Join rows
        const csvContent = csvRows.join(formatOpts.lineEnding);
        
        // Add BOM if requested
        const finalContent = formatOpts.useBOM ? '\ufeff' + csvContent : csvContent;
        
        // Create and download file
        const blob = new Blob([finalContent], { type: 'text/csv;charset=utf-8;' });
        const filename = `${opts.filename}.csv`;
        
        downloadBlob(blob, filename);
        
        resolve({
          success: true,
          filename,
          rowCount: items.value.length,
          columnCount: exportHeaders.length,
          fileSize: blob.size
        });
      } catch (error) {
        resolve({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          filename: '',
          rowCount: 0,
          columnCount: 0,
          fileSize: 0
        });
      }
    });
  };
  
  // Export to Excel (simplified XML format)
  const exportToExcel = (
    exportOptions: ExportOptions = {},
    formatOptions: ExportFormatOptions = {}
  ): Promise<ExportResult> => {
    return new Promise((resolve) => {
      try {
        const opts = { ...DEFAULT_OPTIONS, ...exportOptions };
        const formatOpts = { ...DEFAULT_FORMAT_OPTIONS, ...formatOptions };
        
        const exportHeaders = getExportHeaders(opts);
        
        // Build Excel XML
        let xml = '<?xml version="1.0"?>\n';
        xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet" xmlns:html="http://www.w3.org/TR/REC-html40">\n';
        xml += `<Worksheet ss:Name="${formatOpts.worksheetName}">\n`;
        xml += '<Table>\n';
        
        // Add column definitions with auto-fit
        if (formatOpts.autoFitColumns) {
          exportHeaders.forEach(() => {
            xml += '<Column ss:AutoFitWidth="1"/>\n';
          });
        }
        
        // Add header row
        if (opts.includeHeaders) {
          xml += '<Row>\n';
          exportHeaders.forEach(header => {
            xml += `<Cell><Data ss:Type="String">${escapeXml(header.label || header.value)}</Data></Cell>\n`;
          });
          xml += '</Row>\n';
        }
        
        // Add data rows
        items.value.forEach(item => {
          xml += '<Row>\n';
          exportHeaders.forEach(header => {
            const value = formatCellValue(item[header.value], header, item, opts);
            const cellType = getCellType(item[header.value], header);
            xml += `<Cell><Data ss:Type="${cellType}">${escapeXml(value)}</Data></Cell>\n`;
          });
          xml += '</Row>\n';
        });
        
        xml += '</Table>\n';
        xml += '</Worksheet>\n';
        xml += '</Workbook>';
        
        // Create and download file
        const blob = new Blob([xml], { type: 'application/vnd.ms-excel' });
        const filename = `${opts.filename}.xls`;
        
        downloadBlob(blob, filename);
        
        resolve({
          success: true,
          filename,
          rowCount: items.value.length,
          columnCount: exportHeaders.length,
          fileSize: blob.size
        });
      } catch (error) {
        resolve({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          filename: '',
          rowCount: 0,
          columnCount: 0,
          fileSize: 0
        });
      }
    });
  };
  
  // Get Excel cell type
  const getCellType = (value: any, header: BTableHeader): string => {
    if (header.dataType === 'number' || typeof value === 'number') {
      return 'Number';
    }
    
    if (header.dataType === 'date' || value instanceof Date) {
      return 'DateTime';
    }
    
    return 'String';
  };
  
  // Escape XML characters
  const escapeXml = (value: string): string => {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };
  
  // Download blob as file
  const downloadBlob = (blob: Blob, filename: string): void => {
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };
  
  // Export to JSON
  const exportToJSON = (
    exportOptions: ExportOptions = {}
  ): Promise<ExportResult> => {
    return new Promise((resolve) => {
      try {
        const opts = { ...DEFAULT_OPTIONS, ...exportOptions };
        const exportHeaders = getExportHeaders(opts);
        
        // Transform data to include only selected columns
        const exportData = items.value.map(item => {
          const exportItem: Record<string, any> = {};
          
          exportHeaders.forEach(header => {
            const value = item[header.value];
            exportItem[header.label || header.value] = value;
          });
          
          return exportItem;
        });
        
        const jsonContent = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        const filename = `${opts.filename}.json`;
        
        downloadBlob(blob, filename);
        
        resolve({
          success: true,
          filename,
          rowCount: items.value.length,
          columnCount: exportHeaders.length,
          fileSize: blob.size
        });
      } catch (error) {
        resolve({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          filename: '',
          rowCount: 0,
          columnCount: 0,
          fileSize: 0
        });
      }
    });
  };
  
  // Print table
  const printTable = (
    exportOptions: ExportOptions = {}
  ): Promise<ExportResult> => {
    return new Promise((resolve) => {
      try {
        const opts = { ...DEFAULT_OPTIONS, ...exportOptions };
        const exportHeaders = getExportHeaders(opts);
        
        // Create print window
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
          throw new Error('Could not open print window');
        }
        
        // Build HTML content
        let html = `
          <!DOCTYPE html>
          <html>
          <head>
            <title>${opts.filename}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; font-weight: bold; }
              tr:nth-child(even) { background-color: #f9f9f9; }
              .page-title { margin-bottom: 20px; font-size: 18px; font-weight: bold; }
              .export-info { margin-bottom: 10px; font-size: 12px; color: #666; }
            </style>
          </head>
          <body>
            <div class="page-title">${opts.filename}</div>
            <div class="export-info">Exported on ${new Date().toLocaleDateString()}</div>
            <table>
        `;
        
        // Add headers
        if (opts.includeHeaders) {
          html += '<thead><tr>';
          exportHeaders.forEach(header => {
            html += `<th>${escapeHtml(header.label || header.value)}</th>`;
          });
          html += '</tr></thead>';
        }
        
        // Add data rows
        html += '<tbody>';
        items.value.forEach(item => {
          html += '<tr>';
          exportHeaders.forEach(header => {
            const value = formatCellValue(item[header.value], header, item, opts);
            html += `<td>${escapeHtml(value)}</td>`;
          });
          html += '</tr>';
        });
        html += '</tbody></table></body></html>';
        
        // Write to print window and print
        printWindow.document.write(html);
        printWindow.document.close();
        
        printWindow.onload = () => {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
        };
        
        resolve({
          success: true,
          filename: 'printed',
          rowCount: items.value.length,
          columnCount: exportHeaders.length,
          fileSize: html.length
        });
      } catch (error) {
        resolve({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
          filename: '',
          rowCount: 0,
          columnCount: 0,
          fileSize: 0
        });
      }
    });
  };
  
  // Escape HTML characters
  const escapeHtml = (value: string): string => {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  };
  
  // Get export statistics
  const getExportStats = (options: ExportOptions = {}) => {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    const exportHeaders = getExportHeaders(opts);
    
    return computed(() => ({
      totalRows: items.value.length,
      totalColumns: headers.value.length,
      exportRows: items.value.length,
      exportColumns: exportHeaders.length,
      estimatedCSVSize: estimateFileSize(items.value, exportHeaders, 'csv'),
      estimatedExcelSize: estimateFileSize(items.value, exportHeaders, 'excel'),
      estimatedJSONSize: estimateFileSize(items.value, exportHeaders, 'json')
    }));
  };
  
  // Estimate file size
  const estimateFileSize = (
    data: T[],
    exportHeaders: BTableHeader[],
    format: 'csv' | 'excel' | 'json'
  ): number => {
    if (data.length === 0) return 0;
    
    // Sample size calculation based on first few rows
    const sampleSize = Math.min(10, data.length);
    let totalSize = 0;
    
    for (let i = 0; i < sampleSize; i++) {
      const item = data[i];
      exportHeaders.forEach(header => {
        const value = String(item[header.value] || '');
        totalSize += value.length;
      });
    }
    
    // Calculate average and extrapolate
    const avgRowSize = totalSize / sampleSize;
    const estimatedDataSize = avgRowSize * data.length;
    
    // Add format overhead
    switch (format) {
      case 'csv':
        return Math.round(estimatedDataSize * 1.1); // 10% overhead for CSV formatting
      case 'excel':
        return Math.round(estimatedDataSize * 2.5); // 150% overhead for XML structure
      case 'json':
        return Math.round(estimatedDataSize * 1.3); // 30% overhead for JSON structure
      default:
        return Math.round(estimatedDataSize);
    }
  };
  
  return {
    // Export methods
    exportToCSV,
    exportToExcel,
    exportToJSON,
    printTable,
    
    // Utility methods
    getExportStats,
    formatCellValue,
    getExportHeaders,
    
    // File operations
    downloadBlob
  };
}