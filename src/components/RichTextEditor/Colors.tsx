import { useEffect, useState } from "react";
import { blendColors } from "../../utils";
import { Icon } from "../Icon/Icon";
import { Color } from "./Color";
import styles from "./RichTextEditor.module.css";
import { ColorPicker } from "../ColorPicker";
import { Button } from "../Button";
import clsx from "clsx";
import { FloatCard } from "../FloatCard";

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
  for (let i = 10; i >= 0; i--) gray.push(blendColors("#000000", i / 10));
  palette.push(gray);

  // Base hues
  const hue = [
    "hsl(0, 100%, 50%)",
    "hsl(30, 100%, 50%)",
    "hsl(60, 100%, 50%)",
    "hsl(90, 100%, 50%)",
    "hsl(120, 100%, 50%)",
    "hsl(150, 100%, 50%)",
    "hsl(180, 100%, 50%)",
    "hsl(210, 100%, 50%)",
    "hsl(240, 100%, 50%)",
    "hsl(270, 100%, 50%)",
    "hsl(300, 100%, 50%)",
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
      colors.push(blendColors(color, i * 0.2 + 0.2, [0, 0, 0])),
    );
    dark.push(colors);
  }
  palette.push(...dark);

  return palette;
}

export function Colors({
  value,
  expanded,
  custom,
  onValueChange,
  onExpandedChange,
  onCustomChange,
  children,
}: ColorsProps) {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [customColorInput, setCustomColorInput] = useState(value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const palette = (() => {
    if (!mounted) return [];
    return generateColorPalette();;
  })();

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
    <FloatCard
      value={expanded}
      onChange={onExpandedChange}
      card={
        <div
          className={clsx(
            styles.colorPicker,
            showColorPicker && styles.customColorPicker,
          )}
        >
          {showColorPicker ? (
            <>
              <ColorPicker
                value={customColorInput}
                onChange={setCustomColorInput}
                noShadow
              />
              <div className={styles.customColorActions}>
                <Button
                  variant="plain"
                  color="neutral"
                  size="small"
                  onClick={handleCancelCustomColor}
                >
                  Cancel
                </Button>
                <Button size="small" onClick={handleAddCustomColor}>
                  Add
                </Button>
              </div>
            </>
          ) : (
            <div className={styles.colorColumn}>
              <div className={styles.colorGrid}>
                {palette.map((row, rowIndex) => (
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
              <div className={clsx(styles.colorRow, styles.customRole)}>
                <div
                  className={styles.addColorBtn}
                  title="Add custom color"
                  onClick={() => setShowColorPicker(true)}
                >
                  <Icon
                    name="add_circle"
                    className="text-neutral-interactive-default cursor-pointer"
                  />
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
      }
    >
      {children}
    </FloatCard>
  );
}
