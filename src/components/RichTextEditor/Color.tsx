import clsx from 'clsx';
import { Icon } from '../Icon/Icon';
import styles from './RichTextEditor.module.css';

interface ColorProps {
  color: string;
  selected?: boolean;
  onClick?: (color: string) => void;
  className?: string;
}

function getContrastColor(color: string): string {
  let r = 0, g = 0, b = 0;

  if (color.startsWith('rgb(')) {
    const matches = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (matches) {
      r = parseInt(matches[1]);
      g = parseInt(matches[2]);
      b = parseInt(matches[3]);
    }
  } else if (color.startsWith('hsl(')) {
    const matches = color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
    if (matches) {
      const h = parseInt(matches[1]) / 360;
      const s = parseInt(matches[2]) / 100;
      const l = parseInt(matches[3]) / 100;

      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };

      if (s === 0) {
        r = g = b = l;
      } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      r = Math.round(r * 255);
      g = Math.round(g * 255);
      b = Math.round(b * 255);
    }
  } else if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    if (/^[0-9A-Fa-f]{6}([0-9A-Fa-f]{2})?$/i.test(hex)) {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
  }

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.5 ? 'text-white' : 'text-black';
}

export function Color({ color, selected, onClick, className }: ColorProps) {
  const contrastClass = getContrastColor(color);

  return (
    <div
      className={clsx(styles.colorOption, className)}
      style={{ backgroundColor: color }}
      onClick={() => onClick?.(color)}
    >
      {selected && (
        <Icon
          name="check"
          className={contrastClass}
        />
      )}
    </div>
  );
}
