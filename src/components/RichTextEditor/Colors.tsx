import { useRef, useState } from 'react';
import { useClickOutside } from '../../hooks/useClickOutside';
import { blendColors } from '../../utils';
import { Icon } from '../Icon/Icon';
import { Color } from './Color';
import styles from './RichTextEditor.module.css';

interface ColorsProps {
  value: string;
  expanded: boolean;
  custom: string[];
  onValueChange: (color: string) => void;
  onExpandedChange: (expanded: boolean) => void;
  onCustomChange: (colors: string[]) => void;
  children?: React.ReactNode;
}

function generateColorPalette(): string[][] {
  const palette: string[][] = [];

  // Gray row: from black to white
  const gray: string[] = [];
  for (let i = 10; i >= 0; i--) gray.push(blendColors('#000000', i / 10));
  palette.push(gray);

  // Base hues
  const hue = [
    'hsl(0, 100%, 50%)',
    'hsl(30, 100%, 50%)',
    'hsl(60, 100%, 50%)',
    'hsl(90, 100%, 50%)',
    'hsl(120, 100%, 50%)',
    'hsl(150, 100%, 50%)',
    'hsl(180, 100%, 50%)',
    'hsl(210, 100%, 50%)',
    'hsl(240, 100%, 50%)',
    'hsl(270, 100%, 50%)',
    'hsl(300, 100%, 50%)',
  ];
  palette.push(hue);

  // Light variants (blend towards white)
  const light: string[][] = [];
  for (let i = 0; i < 3; i++) {
    const colors: string[] = [];
    hue.forEach((color) => colors.push(blendColors(color, i * 0.2 + 0.2)));
    light.push(colors);
  }
  palette.push(...light);

  // Dark variants (blend towards black)
  const dark: string[][] = [];
  for (let i = 2; i >= 0; i--) {
    const colors: string[] = [];
    hue.forEach((color) =>
      colors.push(blendColors(color, i * 0.2 + 0.2, [0, 0, 0]))
    );
    dark.push(colors);
  }
  palette.push(...dark);

  return palette;
}

const PALETTE = generateColorPalette();

export function Colors({
  value,
  expanded,
  custom,
  onValueChange,
  onExpandedChange,
  onCustomChange,
  children,
}: ColorsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColorInput, setCustomColorInput] = useState(value);

  useClickOutside(
    [containerRef],
    () => {
      if (expanded) onExpandedChange(false);
    },
    expanded
  );

  function handleColorSelect(color: string) {
    onValueChange(color);
    setCustomColorInput(color);
    onExpandedChange(false);
  }

  function handleAddCustomColor() {
    onValueChange(customColorInput);
    if (!custom.includes(customColorInput)) {
      onCustomChange([...custom, customColorInput]);
    }
    setTimeout(() => setShowColorPicker(false));
  }

  function handleCancelCustomColor() {
    setTimeout(() => setShowColorPicker(false));
  }

  return (
    <div ref={containerRef} className={styles.colorsContainer}>
      {children}
      {expanded && (
        <div ref={popoverRef} className={styles.colorPicker}>
          {showColorPicker ? (
            <div className={styles.customColorSection}>
              <input
                type="color"
                className={styles.customColorInput}
                value={customColorInput}
                onChange={(e) => setCustomColorInput(e.target.value)}
              />
              <div className={styles.customColorActions}>
                <button
                  className={styles.customColorBtn}
                  onClick={handleCancelCustomColor}
                >
                  Cancel
                </button>
                <button
                  className={styles.customColorBtnPrimary}
                  onClick={handleAddCustomColor}
                >
                  Add
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.colorColumn}>
              <div className={styles.colorGrid}>
                {PALETTE.map((row, rowIndex) => (
                  <div key={rowIndex} className={styles.colorRow}>
                    {row.map((color) => (
                      <Color
                        key={color}
                        color={color}
                        selected={value === color}
                        onClick={handleColorSelect}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <hr className={styles.colorDivider} />
              <div className={styles.colorRow} style={{ padding: '4px 8px' }}>
                <div
                  className={styles.addColorBtn}
                  title="Add custom color"
                  onClick={() => setShowColorPicker(true)}
                >
                  <Icon name="add_circle" className="text-neutral-interactive-default cursor-pointer" />
                </div>
                {custom.map((color) => (
                  <Color
                    key={color}
                    color={color}
                    selected={value === color}
                    onClick={handleColorSelect}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
