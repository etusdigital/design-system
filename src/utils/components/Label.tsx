import { Tooltip } from '../../components/Tooltip';
import { Icon } from '../../components/Icon';
import '../styles/Label.css';

export interface LabelProps {
  labelValue?: string;
  infoMessage?: string;
  tooltipMinWidth?: number;
  required?: boolean;
  className?: string;
  id?: string;
  htmlFor?: string;
}

export function Label({
  labelValue,
  infoMessage,
  tooltipMinWidth,
  required,
  className,
  id,
  htmlFor,
}: LabelProps) {
  if (!labelValue) return null;

  return (
    <div className={`inline-flex items-center text-sm font-semibold leading-base${className ? ` ${className}` : ''}`}>
      <label id={id} htmlFor={htmlFor}>
        {labelValue}
      </label>
      {required && (
        <span className="text-primary-foreground-low ml-xxs" aria-hidden="true">*</span>
      )}
      {infoMessage && (
        <Tooltip className="ml-xxs">
          <Tooltip.Label>
            <p
              className="text-neutral-foreground-negative"
              style={tooltipMinWidth ? { minWidth: tooltipMinWidth } : undefined}
            >
              {infoMessage}
            </p>
          </Tooltip.Label>
          <Icon name="info" className="info-icon" tabIndex={0} aria-label="More information" />
        </Tooltip>
      )}
    </div>
  );
}
