import { Tooltip } from '../../components/Tooltip';

export interface LabelProps {
  labelValue?: string;
  infoMessage?: string;
  tooltipMinWidth?: number;
  required?: boolean;
  className?: string;
}

export function Label({
  labelValue,
  infoMessage,
  tooltipMinWidth,
  required,
  className,
}: LabelProps) {
  if (!labelValue) return null;

  return (
    <h5 className={`inline-flex items-center text-sm font-semibold leading-xs${className ? ` ${className}` : ''}`}>
      {labelValue}
      {required && (
        <span className="text-primary-foreground-low ml-xxs">*</span>
      )}
      {infoMessage && (
        <Tooltip className="ml-xxs">
          <Tooltip.Label>
            <p
              className="p-1 text-neutral-foreground-negative"
              style={tooltipMinWidth ? { minWidth: tooltipMinWidth } : undefined}
            >
              {infoMessage}
            </p>
          </Tooltip.Label>
          <span className="material-symbols-rounded text-lg text-primary-foreground-low">
            info
          </span>
        </Tooltip>
      )}
    </h5>
  );
}
