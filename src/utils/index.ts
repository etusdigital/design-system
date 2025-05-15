export function calculateDate(value: string): Date[] {
  const today = new Date();
  let firstDate;
  let secondDate;
  if (value === "today") {
    firstDate = today;
    secondDate = today;
  } else if (value === "yesterday") {
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    firstDate = yesterday;
    secondDate = yesterday;
  } else if (value.includes("last") && !value.includes("Month")) {
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    const number = parseInt(value.replace("last", ""));
    const last = new Date(yesterday.setDate(yesterday.getDate() - number));
    firstDate = last;
    secondDate = new Date(new Date().setDate(new Date().getDate() - 1));
  } else {
    const firstThisMonthDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );
    const firstMonthDay = new Date(
      today.getFullYear(),
      today.getMonth() - 1,
      1
    );
    const lastMonthDay = new Date(firstThisMonthDay);
    lastMonthDay.setDate(0);
    firstDate = firstMonthDay;
    secondDate = lastMonthDay;
  }
  return [firstDate, secondDate];
}

export function hexaToRgba(hexa: string): any {
  const r = parseInt(hexa.slice(1, 3), 16);
  const g = parseInt(hexa.slice(3, 5), 16);
  const b = parseInt(hexa.slice(5, 7), 16);
  const a = parseInt(hexa.slice(7, 9), 16) / 255;

  return {
    r: r,
    g: g,
    b: b,
    a: a,
  };
}

export function hslaToRgba(h: number, s: number, l: number, a: number): any {
  let t1, t2, r, g, b;
  h = h / 60;
  if (l <= 0.5) {
    t2 = l * (s + 1);
  } else {
    t2 = l + s - l * s;
  }
  t1 = l * 2 - t2;
  function hueToRgb(t1: number, t2: number, h: number) {
    if (h < 0) h += 6;
    if (h >= 6) h -= 6;
    if (h < 1) return (t2 - t1) * h + t1;
    else if (h < 3) return t2;
    else if (h < 4) return (t2 - t1) * (4 - h) + t1;
    else return t1;
  }
  r = hueToRgb(t1, t2, h + 2) * 255;
  g = hueToRgb(t1, t2, h) * 255;
  b = hueToRgb(t1, t2, h - 2) * 255;
  return { r: r, g: g, b: b, a: a };
}

export function hwbToRgba(h: number, w: number, b: number, a: number) {
  let i,
    rgb,
    rgbArr = [],
    tot;
  rgb = hslaToRgba(h, 1, 0.5, 1);
  rgbArr[0] = rgb.r / 255;
  rgbArr[1] = rgb.g / 255;
  rgbArr[2] = rgb.b / 255;
  tot = w + b;
  if (tot > 1) {
    w = Number((w / tot).toFixed(2));
    b = Number((b / tot).toFixed(2));
  }
  for (i = 0; i < 3; i++) {
    rgbArr[i] *= 1 - w - b;
    rgbArr[i] += w;
    rgbArr[i] = Number(rgbArr[i] * 255);
  }
  return { r: rgbArr[0], g: rgbArr[1], b: rgbArr[2], a: a };
}

export function hsvaToRgba(h: number, s: number, v: number, a: number): any {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(s, 100)) / 100;
  v = Math.max(0, Math.min(v, 100)) / 100;

  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;

  let r, g, b;
  if (h >= 0 && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (h >= 60 && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (h >= 120 && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (h >= 180 && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (h >= 240 && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else {
    r = c;
    g = 0;
    b = x;
  }

  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b, a };
}

export function rgbaToHexa(r: number, g: number, b: number, a: number): string {
  const alphaHex = Math.round(a * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}${alphaHex}`;
}

export function rgbaToHsla(r: number, g: number, b: number, a: number): any {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (delta !== 0) {
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / delta + 2;
        break;
      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h *= 60;
  }

  return {
    h: h < 0 ? h + 360 : h,
    s: `${(s * 100).toFixed(0)}%`,
    l: `${(l * 100).toFixed(0)}%`,
    a,
  };
}

export function rgbaToHwb(r: number, g: number, b: number, a: number) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  if (max === min) {
    return {
      h: 0,
      w: ((100 * min) / 255).toFixed(0) + "%",
      b: (100 - (100 * max) / 255).toFixed(0) + "%",
      a: a,
    };
  }
  let tmp = 0.0;
  switch (max) {
    case r:
      tmp = (g - b) / (max - min) + 0.0;
      break;
    case g:
      tmp = (b - r) / (max - min) + 2.0;
      break;
    case b:
      tmp = (r - g) / (max - min) + 4.0;
      break;
  }
  const hue = ((tmp + 6.0) % 6.0) / 6.0;
  return {
    h: (360 * hue).toFixed(0),
    w: ((100 * min) / 255).toFixed(0) + "%",
    b: (100 - (100 * max) / 255).toFixed(0) + "%",
    a: a,
  };
}

export function rgbaToHsva(r: number, g: number, b: number, a: number): any {
  let rabs,
    gabs,
    babs,
    rr,
    gg,
    bb,
    h = 0,
    s,
    v: number,
    diff: number,
    diffc,
    percentRoundFn;
  rabs = r / 255;
  gabs = g / 255;
  babs = b / 255;
  (v = Math.max(rabs, gabs, babs)), (diff = v - Math.min(rabs, gabs, babs));
  diffc = (c: number) => (v - c) / 6 / diff + 1 / 2;
  percentRoundFn = (num: number) => Math.round(num * 100) / 100;
  if (diff == 0) {
    h = s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);

    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }

  return {
    h: Math.round(h * 360),
    s: `${percentRoundFn(s * 100).toFixed(0)}%`,
    v: `${percentRoundFn(v * 100).toFixed(0)}%`,
    a: a,
  };
}

export function isNilAndBlank(value: any) {
  return value === null || value === undefined || value === "";
}

export function isNilAndEmpty(value: any) {
  return value === null || value === undefined || value.length == 0;
}

export function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

export function isRange(start: Date, end: Date, day: Date, isSelected = false) {
  const parsedStart = start?.toISOString().substr(0, 10);
  const parsedEnd = end?.toISOString().substr(0, 10);
  const parsedDay = day?.toISOString().substr(0, 10);
  if (isSelected) return parsedEnd == parsedDay || parsedStart == parsedDay;

  const fnString = `
        return (start < end && start < day && day < end) ||
        (start > end && start > day && day > end)
    `;
  const fn = new Function("start", "end", "day", fnString);

  return fn(parsedStart, parsedEnd, parsedDay);
}

export function capitalizeFirstLetter(string: string) {
  if (!string) return string;
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getArrayMonthDay(date: Date): any[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const maxDays = new Date(year, month + 1, 0).getDate();
  const allWeeks = [];
  let day = 1;
  for (let i = 0; i < 6; i++) {
    const week: any = [];
    for (let j = 0; j < 7; j++) {
      if ((i === 0 && j < firstDay) || day > maxDays) {
        week.push("");
      } else {
        const newDate = new Date(year, month, day);
        week.push(newDate);
        day++;
      }
    }
    allWeeks.push(week);
  }
  return allWeeks;
}

export function getMonths(lang = "en-US") {
  const date = new Date("2021-01-03T23:15:30");
  const months: any[] = [];
  for (let i = 0; i < 12; i++) {
    const formattedDay = date.toLocaleDateString(lang, { month: "short" });
    months.push({
      label: formattedDay,
      value: i,
    });
    date.setMonth(date.getMonth() + 1);
  }
  return months;
}

export function getPosition(
  event: any,
  div: HTMLSpanElement,
  parent: Element,
  directions: any = { left: true },
  substract: any = {},
  max: any = {}
) {
  const offsetX =
    event.clientX - div.clientWidth / 2 - parent.getBoundingClientRect().left;
  const maxX =
    parent.clientWidth -
    (div.clientWidth - (typeof substract.x == "number" ? substract.x : 2));
  const clampedX = Math.min(
    maxX,
    Math.max(max.x || 0, directions.left ? offsetX : maxX - offsetX)
  );

  const offsetY =
    event.clientY - div.clientHeight / 2 - parent.getBoundingClientRect().top;
  const maxY = parent.clientHeight - (div.clientHeight - (substract.y || 0));
  const clampedY = Math.min(
    maxY,
    Math.max(max.y || 0, directions.top ? offsetY : maxY - offsetY)
  );

  return {
    x: clampedX,
    y: clampedY,
  };
}

export function applyMask(
  value: string,
  mask: "cpf" | "cnpj" | "cep" | "domain" | "url" | "email" | undefined
) {
  switch (mask) {
    case "cpf":
      value = value.replace(/\D/g, ""); // Remove non-numeric characters
      value = value.slice(0, 11); // Limit the number of digit to 11
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Add dot after 3º digit
      value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Add dot after 6º digit
      value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Add hyphen after 9º digit
      break;
    case "cnpj":
      value = value.replace(/\D/g, ""); // Remove non-numeric characters
      value = value.slice(0, 14); // Limit the number of digit to 14
      value = value.replace(/(\d{2})(\d)/, "$1.$2"); // Add dot after 2º digit
      value = value.replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"); // Add dot after 5º digit
      value = value.replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4"); // Add dot after 8º digit
      value = value.replace(
        /(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
        "$1.$2.$3/$4-$5"
      ); // Add hyphen after 10º digit
      break;
    case "cep":
      value = value.replace(/\D/g, "");
      value = value.slice(0, 8);
      value = value.replace(/(\d{5})(\d)/, "$1-$2"); // Add hyphen after 5º digit
      break;
  }

  return value;
}

export function isValidEmail(value: any): boolean {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
}

export function isValidDomain(value: any): boolean {
  return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(
    value
  );
}

export function isValidUrl(value: any): boolean {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
    value
  );
}

export function blendColors(
  color: string,
  percentage = 0.3,
  bg = [255, 255, 255]
) {
  const div = document.createElement("div");
  div.style.color = color;
  document.body.appendChild(div);

  const computedColor = getComputedStyle(div).color;
  document.body.removeChild(div);

  const matchedColor = computedColor.match(/\d+/g);
  if (!matchedColor) return "";

  const parsedColor = matchedColor.map(Number);

  const r = Math.round(parsedColor[0] * percentage + bg[0] * (1 - percentage));
  const g = Math.round(parsedColor[1] * percentage + bg[1] * (1 - percentage));
  const b = Math.round(parsedColor[2] * percentage + bg[2] * (1 - percentage));

  return `rgb(${r}, ${g}, ${b})`;
}

export function checkPath(path: string) {
  const currrentPath = window.location.pathname.split("/");
  const itemPath = path.replace(/\/+$/, "").split("/");
  for (let i = 0; i < itemPath.length; i++) {
    if (currrentPath[i] !== itemPath[i]) return false;
  }
  return true;
}

export const dateOptions = [
  {
    value: "today",
    label: "Today",
    calculate: () => {
      return calculateDate("today");
    },
  },
  {
    value: "yesterday",
    label: "Yesterday",
    calculate: () => {
      return calculateDate("yesterday");
    },
  },
  {
    value: "last7",
    label: "Last 7 days",
    calculate: () => {
      return calculateDate("last7");
    },
  },
  {
    value: "last15",
    label: "Last 15 days",
    calculate: () => {
      return calculateDate("last15");
    },
  },
  {
    value: "last30",
    label: "Last 30 days",
    calculate: () => {
      return calculateDate("last30");
    },
  },
  {
    value: "lastMonth",
    label: "Last month",
    calculate: () => {
      return calculateDate("lastMonth");
    },
  },
];
