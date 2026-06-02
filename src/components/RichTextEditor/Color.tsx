import clsx from "clsx";
import { Icon } from "../Icon/Icon";
import styles from "./RichTextEditor.module.css";
import { getContrastColor } from "#utils/index";

interface ColorProps {
  color: string;
  selected?: boolean;
  onClick?: (color: string) => void;
  className?: string;
}

export function Color({ color, selected, onClick, className }: ColorProps) {
  const contrastClass = `text-${getContrastColor(color)}`;

  return (
    <div
      className={clsx(styles.colorOption, className)}
      style={{ backgroundColor: color }}
      onClick={() => onClick?.(color)}
    >
      {selected && (
        <Icon
          name="check"
          className={clsx(contrastClass, styles.richTextEditorIcon)}
        />
      )}
    </div>
  );
}
