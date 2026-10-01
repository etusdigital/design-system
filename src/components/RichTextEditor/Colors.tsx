import { useEffect, useRef, useState } from "react";
import {
  blendColors,
  focusWhenReady,
  onEnterOrSpace,
  preventSpaceScroll,
} from "../../utils";
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

  const gray: string[] = [];
  for (let i = 10; i >= 0; i--) gray.push(blendColors("#000000", i / 10));
  palette.push(gray);

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

  const light: string[][] = [];
  for (let i = 0; i < 3; i++) {
    const colors: string[] = [];
    hue.forEach((color) => colors.push(blendColors(color, i * 0.2 + 0.2)));
    light.push(colors);
  }
  palette.push(...light);

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
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!expanded) return;

    focusWhenReady(
      () =>
        gridRef.current?.querySelector<HTMLElement>("[data-selected]") ??
        getGridRows()[0]?.[0],
    );
  }, [expanded]);

  function getGridRows(): HTMLElement[][] {
    return Array.from(
      gridRef.current?.querySelectorAll<HTMLElement>(`.${styles.colorRow}`) ?? [],
    )
      .map((row) => Array.from(row.querySelectorAll<HTMLElement>('[tabindex="0"]')))
      .filter((row) => row.length);
  }

  function handleGridKeyDown(event: React.KeyboardEvent) {
    const keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"];
    if (!keys.includes(event.key)) return;

    const rows = getGridRows();
    const target = event.target as HTMLElement;
    const rowIndex = rows.findIndex((row) => row.includes(target));
    if (rowIndex === -1) return;
    event.preventDefault();

    const row = rows[rowIndex];
    const column = row.indexOf(target);
    let next: HTMLElement | undefined;
    switch (event.key) {
      case "ArrowLeft":
        next = row[Math.max(column - 1, 0)];
        break;
      case "ArrowRight":
        next = row[Math.min(column + 1, row.length - 1)];
        break;
      case "ArrowUp":
      case "ArrowDown": {
        const targetRow = rows[rowIndex + (event.key === "ArrowUp" ? -1 : 1)];
        next = targetRow?.[Math.min(column, targetRow.length - 1)];
        break;
      }
      case "Home":
        next = row[0];
        break;
      case "End":
        next = row[row.length - 1];
        break;
    }
    next?.focus();
  }

  const palette = (() => {
    if (!mounted) return [];
    return generateColorPalette();
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
      manualFocus
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
            <div
              ref={gridRef}
              className={styles.colorColumn}
              onKeyDown={handleGridKeyDown}
            >
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
                  role="button"
                  tabIndex={0}
                  onClick={() => setShowColorPicker(true)}
                  onKeyDown={preventSpaceScroll}
                  onKeyUp={onEnterOrSpace(() => setShowColorPicker(true))}
                >
                  <Icon
                    name="add_circle"
                    className={clsx(
                      styles.richTextEditorIcon,
                      "text-neutral-interactive-default cursor-pointer",
                    )}
                    aria-label="Add custom color"
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
