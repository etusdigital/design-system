import { useState, useRef, useEffect, Children, isValidElement } from "react";
import clsx from "clsx";
import styles from "./FileUpload.module.css";

export type FileUploadSize = "xs" | "sm" | "base" | "lg" | "xl";

export interface FileUploadProps {
  value?: File | File[] | null;
  onChange?: (value: File | File[] | null) => void;
  labelValue?: string;
  errorMessage?: string;
  infoMessage?: string;
  size?: FileUploadSize;
  disabled?: boolean;
  isError?: boolean;
  required?: boolean;
  placeholder?: string;
  tooltipMinWidth?: number;
  accept?: string;
  multiple?: boolean;
  children?: React.ReactNode;
  className?: string;
}

function Preview({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

const SVG_SIZE_MAP: Record<FileUploadSize, number> = {
  xs: 56,
  sm: 66,
  base: 76,
  lg: 86,
  xl: 96,
};

const ICON_SIZE_MAP: Record<FileUploadSize, string> = {
  xs: "text-4xl",
  sm: "text-6xl",
  base: "text-7xl",
  lg: "text-8xl",
  xl: "text-9xl",
};

const TRASH_SIZE_MAP: Record<FileUploadSize, string> = {
  xs: "text-base",
  sm: "text-lg",
  base: "text-xl",
  lg: "text-2xl",
  xl: "text-3xl",
};

const FILENAME_SIZE_MAP: Record<FileUploadSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
};

export function FileUpload({
  value,
  onChange,
  labelValue,
  errorMessage,
  infoMessage,
  size = "base",
  disabled = false,
  isError = false,
  placeholder = "or drag and drop it here",
  accept,
  multiple = false,
  children,
  className,
}: FileUploadProps) {
  const [currentFile, setCurrentFile] = useState<File | File[] | null>(
    value !== undefined ? value : null,
  );
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setCurrentFile(value);
    }
  }, [value]);

  const hasFile =
    currentFile !== null &&
    (Array.isArray(currentFile) ? currentFile.length > 0 : true);

  const fileName = (() => {
    if (multiple && Array.isArray(currentFile)) {
      return `${currentFile.length} files selected`;
    }
    if (currentFile && !Array.isArray(currentFile)) {
      return currentFile.name;
    }
    return "";
  })();

  function onChangeFile(files: FileList | null) {
    if (!files || files.length === 0) return;
    if (multiple) {
      const fileArray = Array.from(files);
      setCurrentFile(fileArray);
      onChange?.(fileArray);
    } else {
      setCurrentFile(files[0]);
      onChange?.(files[0]);
    }
  }

  function deleteFile() {
    setCurrentFile(null);
    onChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const svgSize = SVG_SIZE_MAP[size];
  const iconSizeClass = ICON_SIZE_MAP[size];
  const trashSizeClass = TRASH_SIZE_MAP[size];
  const fileNameSizeClass = FILENAME_SIZE_MAP[size];

  let previewChild: React.ReactNode = null;
  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.type === Preview) {
      previewChild = (child.props as Record<string, unknown>).children as React.ReactNode;
    }
  });

  return (
    <div className={clsx('file-upload', className)}>
      <div
        className={clsx(
          styles.file,
          styles[size],
          isDragging && styles.dragging,
          disabled && styles.disabled,
          isError && styles.error,
        )}
        onDragEnter={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (!disabled) onChangeFile(e.dataTransfer.files);
        }}
      >
        {!hasFile && (
          <input
            ref={fileInputRef}
            type="file"
            className={styles.hiddenInput}
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={(e) => onChangeFile(e.target.files)}
          />
        )}

        {!hasFile && (
          <>
            <svg
              width={svgSize}
              height={svgSize}
              viewBox="0 0 76 76"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M63.5312 33.25H42.75C40.8603 33.25 39.0481 32.4993 37.7119 31.1631C36.3757 29.8269 35.625 28.0147 35.625 26.125V5.34375C35.625 5.18628 35.5624 5.03526 35.4511 4.92391C35.3397 4.81256 35.1887 4.75 35.0312 4.75H21.375C18.8554 4.75 16.4391 5.75089 14.6575 7.53249C12.8759 9.31408 11.875 11.7304 11.875 14.25V61.75C11.875 64.2696 12.8759 66.6859 14.6575 68.4675C16.4391 70.2491 18.8554 71.25 21.375 71.25H54.625C57.1446 71.25 59.5609 70.2491 61.3425 68.4675C63.1241 66.6859 64.125 64.2696 64.125 61.75V33.8438C64.125 33.6863 64.0624 33.5353 63.9511 33.4239C63.8397 33.3126 63.6887 33.25 63.5312 33.25Z"
                fill="var(--neutral-border-default)"
              />
              <path
                d="M62.228 27.9938L40.8812 6.647C40.8397 6.60573 40.7869 6.57766 40.7295 6.56631C40.672 6.55495 40.6125 6.56083 40.5584 6.5832C40.5043 6.60556 40.4581 6.64342 40.4254 6.69202C40.3928 6.74061 40.3752 6.79776 40.375 6.8563V26.125C40.375 26.7549 40.6252 27.3589 41.0706 27.8043C41.516 28.2497 42.1201 28.5 42.75 28.5H62.0187C62.0772 28.4997 62.1344 28.4822 62.183 28.4495C62.2315 28.4169 62.2694 28.3706 62.2918 28.3165C62.3141 28.2624 62.32 28.2029 62.3087 28.1455C62.2973 28.0881 62.2692 28.0353 62.228 27.9938Z"
                fill="var(--neutral-border-default)"
              />
              <g clipPath="url(#clip0_2300_5309)">
                <circle cx="63" cy="63" r="7" fill="var(--neutral-foreground-negative)" />
                <path
                  d="M63 50C55.8319 50 50 55.8319 50 63C50 70.1681 55.8319 76 63 76C70.1681 76 76 70.1681 76 63C76 55.8319 70.1681 50 63 50ZM68 64H64V68C64 68.2652 63.8946 68.5196 63.7071 68.7071C63.5196 68.8946 63.2652 69 63 69C62.7348 69 62.4804 68.8946 62.2929 68.7071C62.1054 68.5196 62 68.2652 62 68V64H58C57.7348 64 57.4804 63.8946 57.2929 63.7071C57.1054 63.5196 57 63.2652 57 63C57 62.7348 57.1054 62.4804 57.2929 62.2929C57.4804 62.1054 57.7348 62 58 62H62V58C62 57.7348 62.1054 57.4804 62.2929 57.2929C62.4804 57.1054 62.7348 57 63 57C63.2652 57 63.5196 57.1054 63.7071 57.2929C63.8946 57.4804 64 57.7348 64 58V62H68C68.2652 62 68.5196 62.1054 68.7071 62.2929C68.8946 62.4804 69 62.7348 69 63C69 63.2652 68.8946 63.5196 68.7071 63.7071C68.5196 63.8946 68.2652 64 68 64Z"
                  fill="var(--primary-interaction-default)"
                />
              </g>
              <defs>
                <clipPath id="clip0_2300_5309">
                  <rect
                    width="26"
                    height="26"
                    fill="var(--neutral-foreground-negative)"
                    transform="translate(50 50)"
                  />
                </clipPath>
              </defs>
            </svg>

            <div className="flex flex-col items-center gap-xs">
              <p className="cursor-pointer text-primary-foreground-low">
                {labelValue || "Select a file"}
              </p>
              <p className="text-neutral-foreground-low">{placeholder}</p>
            </div>
          </>
        )}

        {hasFile && (
          <div
            className={clsx(
              "flex gap-sm items-center justify-center",
              isDragging && styles.blurred,
            )}
          >
            {previewChild ?? (
              <div className="flex flex-col items-center gap-xs">
                <span
                  className={clsx(
                    "material-symbols-rounded text-neutral-foreground-low",
                    iconSizeClass,
                  )}
                >
                  draft
                </span>
                <div className="flex items-center gap-xs">
                  <p
                    className={clsx(
                      fileNameSizeClass,
                      "text-neutral-foreground-low truncate max-w-[96px]",
                    )}
                  >
                    {fileName}
                  </p>
                  {!disabled && (
                    <span
                      className={clsx(
                        "material-symbols-rounded cursor-pointer text-neutral-interaction-default hover:text-danger-interaction-default",
                        trashSizeClass,
                      )}
                      onClick={deleteFile}
                      aria-label="Remove file"
                    >
                      delete
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isError && errorMessage && (
        <p className={styles.errorMessage}>{errorMessage}</p>
      )}
      {infoMessage && <p className={styles.infoMessage}>{infoMessage}</p>}
    </div>
  );
}

FileUpload.Preview = Preview;
