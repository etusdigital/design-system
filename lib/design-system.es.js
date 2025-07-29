var $t = Object.defineProperty;
var Mt = (o, s, e) => s in o ? $t(o, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : o[s] = e;
var Ke = (o, s, e) => Mt(o, typeof s != "symbol" ? s + "" : s, e);
import { createElementBlock as v, openBlock as f, createElementVNode as g, defineComponent as q, computed as Y, normalizeClass as I, createCommentVNode as H, createBlock as F, normalizeStyle as re, Fragment as Q, renderSlot as x, ref as A, resolveComponent as W, isRef as ne, unref as w, createVNode as P, toDisplayString as R, shallowRef as xt, onMounted as he, onUnmounted as It, withKeys as me, withDirectives as fe, vShow as Ce, inject as et, watch as le, reactive as At, provide as St, onUpdated as De, onBeforeUnmount as we, createSlots as Be, withCtx as S, createTextVNode as ae, vModelText as Me, renderList as te, useCssVars as ke, Transition as ve, Teleport as Ee, withModifiers as $e, onBeforeMount as ge, createStaticVNode as Ue, vModelDynamic as Dt, resolveDynamicComponent as Pe, useSlots as tt, nextTick as je } from "vue";
const G = (o, s) => {
  const e = o.__vccOpts || o;
  for (const [c, t] of s)
    e[c] = t;
  return e;
}, Et = {}, Ht = {
  class: "b-spinner",
  viewBox: "0 0 50 50"
};
function Tt(o, s) {
  return f(), v("svg", Ht, s[0] || (s[0] = [
    g("circle", {
      class: "path",
      cx: "25",
      cy: "25",
      r: "20",
      fill: "none",
      "stroke-width": "8",
      "shape-rendering": "geometricPrecision"
    }, null, -1)
  ]));
}
const lt = /* @__PURE__ */ G(Et, [["render", Tt], ["__scopeId", "data-v-08c8d5cf"]]), Lt = ["id", "name", "type", "disabled"], Pt = ["for"], zt = /* @__PURE__ */ q({
  __name: "BButton",
  props: {
    id: {},
    name: {},
    type: { default: "button" },
    color: { default: "primary" },
    size: { default: "medium" },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    progress: { default: 0 }
  },
  setup(o) {
    const s = o, e = Y(
      () => !!(s.progress > 0 || s.loading)
    );
    return (c, t) => (f(), v("button", {
      id: c.id,
      name: c.name || c.id,
      type: c.type,
      disabled: c.disabled,
      class: I(["b-button", [
        { disabled: c.disabled, "pointer-events-none": e.value },
        c.variant,
        c.size,
        c.color
      ]])
    }, [
      e.value ? (f(), v("div", {
        key: 0,
        class: "progress",
        style: re({
          width: c.progress * 100 + "%",
          borderRadius: c.progress == 1 ? "var(--border-radius-sm)" : "var(--border-radius-sm) 0 0 var(--border-radius-sm)"
        })
      }, null, 4)) : H("", !0),
      e.value ? (f(), F(lt, { key: 1 })) : H("", !0),
      c.$slots.default ? (f(), v(Q, { key: 2 }, [
        c.name || c.id ? (f(), v("label", {
          key: 0,
          for: c.name || c.id,
          class: I([{ invisible: e.value }, "button-label cursor-[inherit]"])
        }, [
          x(c.$slots, "default", {}, void 0, !0)
        ], 10, Pt)) : (f(), v("div", {
          key: 1,
          class: I([{ invisible: e.value }, "button-label"])
        }, [
          x(c.$slots, "default", {}, void 0, !0)
        ], 2))
      ], 64)) : H("", !0)
    ], 10, Lt));
  }
}), at = /* @__PURE__ */ G(zt, [["__scopeId", "data-v-720d4875"]]), Ot = {
  install(o) {
    o.component("BButton", at);
  }
};
function Ie(o) {
  const s = /* @__PURE__ */ new Date();
  let e, c;
  if (o === "today")
    e = s, c = s;
  else if (o === "yesterday") {
    const t = new Date(s.setDate(s.getDate() - 1));
    e = t, c = t;
  } else if (o.includes("last") && !o.includes("Month")) {
    const t = new Date(s.setDate(s.getDate() - 1)), l = parseInt(o.replace("last", ""));
    e = new Date(t.setDate(t.getDate() - l)), c = new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 1));
  } else {
    const t = new Date(
      s.getFullYear(),
      s.getMonth(),
      1
    ), l = new Date(
      s.getFullYear(),
      s.getMonth() - 1,
      1
    ), n = new Date(t);
    n.setDate(0), e = l, c = n;
  }
  return [e, c];
}
function Wt(o) {
  const s = parseInt(o.slice(1, 3), 16), e = parseInt(o.slice(3, 5), 16), c = parseInt(o.slice(5, 7), 16), t = parseInt(o.slice(7, 9), 16) / 255;
  return {
    r: s,
    g: e,
    b: c,
    a: t
  };
}
function ot(o, s, e, c) {
  let t, l, n, u, d;
  o = o / 60, e <= 0.5 ? l = e * (s + 1) : l = e + s - e * s, t = e * 2 - l;
  function a(r, m, p) {
    return p < 0 && (p += 6), p >= 6 && (p -= 6), p < 1 ? (m - r) * p + r : p < 3 ? m : p < 4 ? (m - r) * (4 - p) + r : r;
  }
  return n = a(t, l, o + 2) * 255, u = a(t, l, o) * 255, d = a(t, l, o - 2) * 255, { r: n, g: u, b: d, a: c };
}
function Ut(o, s, e, c) {
  let t, l, n = [], u;
  for (l = ot(o, 1, 0.5, 1), n[0] = l.r / 255, n[1] = l.g / 255, n[2] = l.b / 255, u = s + e, u > 1 && (s = Number((s / u).toFixed(2)), e = Number((e / u).toFixed(2))), t = 0; t < 3; t++)
    n[t] *= 1 - s - e, n[t] += s, n[t] = Number(n[t] * 255);
  return { r: n[0], g: n[1], b: n[2], a: c };
}
function jt(o, s, e, c) {
  o = (o % 360 + 360) % 360, s = Math.max(0, Math.min(s, 100)) / 100, e = Math.max(0, Math.min(e, 100)) / 100;
  const t = e * s, l = t * (1 - Math.abs(o / 60 % 2 - 1)), n = e - t;
  let u, d, a;
  return o >= 0 && o < 60 ? (u = t, d = l, a = 0) : o >= 60 && o < 120 ? (u = l, d = t, a = 0) : o >= 120 && o < 180 ? (u = 0, d = t, a = l) : o >= 180 && o < 240 ? (u = 0, d = l, a = t) : o >= 240 && o < 300 ? (u = l, d = 0, a = t) : (u = t, d = 0, a = l), u = Math.round((u + n) * 255), d = Math.round((d + n) * 255), a = Math.round((a + n) * 255), { r: u, g: d, b: a, a: c };
}
function Rt(o, s, e, c) {
  const t = Math.round(c * 255).toString(16).padStart(2, "0");
  return `#${o.toString(16).padStart(2, "0")}${s.toString(16).padStart(2, "0")}${e.toString(16).padStart(2, "0")}${t}`;
}
function Ft(o, s, e, c) {
  o /= 255, s /= 255, e /= 255;
  const t = Math.max(o, s, e), l = Math.min(o, s, e), n = t - l;
  let u = 0, d = 0, a = (t + l) / 2;
  if (n !== 0) {
    switch (d = a > 0.5 ? n / (2 - t - l) : n / (t + l), t) {
      case o:
        u = (s - e) / n + (s < e ? 6 : 0);
        break;
      case s:
        u = (e - o) / n + 2;
        break;
      case e:
        u = (o - s) / n + 4;
        break;
    }
    u *= 60;
  }
  return {
    h: u < 0 ? u + 360 : u,
    s: `${(d * 100).toFixed(0)}%`,
    l: `${(a * 100).toFixed(0)}%`,
    a: c
  };
}
function _t(o, s, e, c) {
  const t = Math.max(o, s, e), l = Math.min(o, s, e);
  if (t === l)
    return {
      h: 0,
      w: (100 * l / 255).toFixed(0) + "%",
      b: (100 - 100 * t / 255).toFixed(0) + "%",
      a: c
    };
  let n = 0;
  switch (t) {
    case o:
      n = (s - e) / (t - l) + 0;
      break;
    case s:
      n = (e - o) / (t - l) + 2;
      break;
    case e:
      n = (o - s) / (t - l) + 4;
      break;
  }
  return {
    h: (360 * ((n + 6) % 6 / 6)).toFixed(0),
    w: (100 * l / 255).toFixed(0) + "%",
    b: (100 - 100 * t / 255).toFixed(0) + "%",
    a: c
  };
}
function Se(o, s, e, c) {
  let t, l, n, u, d, a, r = 0, m, p, h, y, B;
  return t = o / 255, l = s / 255, n = e / 255, p = Math.max(t, l, n), h = p - Math.min(t, l, n), y = (i) => (p - i) / 6 / h + 1 / 2, B = (i) => Math.round(i * 100) / 100, h == 0 ? r = m = 0 : (m = h / p, u = y(t), d = y(l), a = y(n), t === p ? r = a - d : l === p ? r = 1 / 3 + u - a : n === p && (r = 2 / 3 + d - u), r < 0 ? r += 1 : r > 1 && (r -= 1)), {
    h: Math.round(r * 360),
    s: `${B(m * 100).toFixed(0)}%`,
    v: `${B(p * 100).toFixed(0)}%`,
    a: c
  };
}
function Nt(o) {
  return o == null || o === "";
}
function de(o) {
  return typeof o == "object" && o !== null;
}
function Xe(o, s, e, c = !1) {
  const t = o == null ? void 0 : o.toISOString().substr(0, 10), l = s == null ? void 0 : s.toISOString().substr(0, 10), n = e == null ? void 0 : e.toISOString().substr(0, 10);
  if (c) return l == n || t == n;
  const u = `
        return (start < end && start < day && day < end) ||
        (start > end && start > day && day > end)
    `;
  return new Function("start", "end", "day", u)(t, l, n);
}
function Ge(o) {
  return o && o.charAt(0).toUpperCase() + o.slice(1);
}
function Je(o) {
  const s = o.getFullYear(), e = o.getMonth(), c = new Date(s, e, 1).getDay(), t = new Date(s, e + 1, 0).getDate(), l = [];
  let n = 1;
  for (let u = 0; u < 6; u++) {
    const d = [];
    for (let a = 0; a < 7; a++)
      if (u === 0 && a < c || n > t)
        d.push("");
      else {
        const r = new Date(s, e, n);
        d.push(r), n++;
      }
    l.push(d);
  }
  return l;
}
function qt(o = "en-US") {
  const s = /* @__PURE__ */ new Date("2021-01-03T23:15:30"), e = [];
  for (let c = 0; c < 12; c++) {
    const t = s.toLocaleDateString(o, { month: "short" });
    e.push({
      label: t,
      value: c
    }), s.setMonth(s.getMonth() + 1);
  }
  return e;
}
function Te(o, s, e, c = { left: !0 }, t = {}, l = {}) {
  const n = o.clientX - s.clientWidth / 2 - e.getBoundingClientRect().left, u = e.clientWidth - (s.clientWidth - (typeof t.x == "number" ? t.x : 2)), d = Math.min(
    u,
    Math.max(l.x || 0, c.left ? n : u - n)
  ), a = o.clientY - s.clientHeight / 2 - e.getBoundingClientRect().top, r = e.clientHeight - (s.clientHeight - (t.y || 0)), m = Math.min(
    r,
    Math.max(l.y || 0, c.top ? a : r - a)
  );
  return {
    x: d,
    y: m
  };
}
function nt(o, s) {
  switch (s) {
    case "cpf":
      o = o.replace(/\D/g, ""), o = o.slice(0, 11), o = o.replace(/(\d{3})(\d)/, "$1.$2"), o = o.replace(/(\d{3})(\d)/, "$1.$2"), o = o.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      break;
    case "cnpj":
      o = o.replace(/\D/g, ""), o = o.slice(0, 14), o = o.replace(/(\d{2})(\d)/, "$1.$2"), o = o.replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"), o = o.replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4"), o = o.replace(
        /(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
        "$1.$2.$3/$4-$5"
      );
      break;
    case "cep":
      o = o.replace(/\D/g, ""), o = o.slice(0, 8), o = o.replace(/(\d{5})(\d)/, "$1-$2");
      break;
  }
  return o;
}
function st(o) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(o);
}
function it(o) {
  return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(
    o
  );
}
function rt(o) {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(
    o
  );
}
function Le(o, s = 0.3, e = [255, 255, 255]) {
  const c = document.createElement("div");
  c.style.color = o, document.body.appendChild(c);
  const t = getComputedStyle(c).color;
  document.body.removeChild(c);
  const l = t.match(/\d+/g);
  if (!l) return "";
  const n = l.map(Number), u = Math.round(n[0] * s + e[0] * (1 - s)), d = Math.round(n[1] * s + e[1] * (1 - s)), a = Math.round(n[2] * s + e[2] * (1 - s));
  return `rgb(${u}, ${d}, ${a})`;
}
function ut(o) {
  const s = window.location.pathname.split("/"), e = o.replace(/\/+$/, "").split("/");
  for (let c = 0; c < e.length; c++)
    if (s[c] !== e[c]) return !1;
  return !0;
}
const dt = [
  {
    value: "today",
    label: "Today",
    calculate: () => Ie("today")
  },
  {
    value: "yesterday",
    label: "Yesterday",
    calculate: () => Ie("yesterday")
  },
  {
    value: "last7",
    label: "Last 7 days",
    calculate: () => Ie("last7")
  },
  {
    value: "last15",
    label: "Last 15 days",
    calculate: () => Ie("last15")
  },
  {
    value: "last30",
    label: "Last 30 days",
    calculate: () => Ie("last30")
  },
  {
    value: "lastMonth",
    label: "Last month",
    calculate: () => Ie("lastMonth")
  }
], Zt = ["id", "name", "type", "disabled"], Kt = { class: "content" }, Xt = {
  key: 0,
  class: "text"
}, Gt = /* @__PURE__ */ q({
  __name: "BRoundButton",
  props: {
    id: {},
    name: {},
    text: {},
    icon: {},
    background: {},
    type: { default: "button" },
    color: { default: "primary" },
    size: { default: "small" },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    alwaysOpen: { type: Boolean, default: !1 }
  },
  setup(o) {
    const s = o;
    let e = A(!1);
    const c = Y(() => {
      const l = {};
      if (s.disabled) return l;
      if (s.background && s.variant != "plain" && (l["border-color"] = s.background), s.background && s.variant != "default" ? l.color = s.background : l.background = s.background, e.value) {
        if (s.background && s.variant == "default") {
          const n = Le(s.background, 0.5, [0, 0, 0]);
          l.background = n, l["border-color"] = n;
        } else if (s.background && s.variant == "reverse")
          l.background = s.background, l.color = "white";
        else if (s.background) {
          const n = Le(s.background, 0.4);
          l.background = n;
        }
        s.alwaysOpen || (l["z-index"] = 50);
      }
      return l;
    }), t = Y(() => s.icon ? s.icon : s.color == "danger" || s.color == "warning" || s.color == "neutral" ? "close" : "add");
    return (l, n) => {
      const u = W("BIcon");
      return f(), v("button", {
        id: l.id,
        name: l.name || l.id,
        type: l.type,
        disabled: l.disabled,
        class: I(["b-round-button", [
          l.size,
          l.color,
          l.variant,
          {
            disabled: l.disabled,
            "always-open": l.alwaysOpen,
            hovered: w(e)
          }
        ]]),
        style: re(c.value),
        onMouseover: n[0] || (n[0] = (d) => ne(e) ? e.value = !0 : e = !0),
        onMouseout: n[1] || (n[1] = (d) => ne(e) ? e.value = !1 : e = !1)
      }, [
        g("div", Kt, [
          P(u, {
            name: t.value,
            class: "icon"
          }, null, 8, ["name"]),
          l.text ? (f(), v("span", Xt, R(l.text), 1)) : H("", !0)
        ])
      ], 46, Zt);
    };
  }
}), Jt = /* @__PURE__ */ G(Gt, [["__scopeId", "data-v-03615566"]]), Qt = {
  install(o) {
    o.component("BRoundButton", Jt);
  }
}, Yt = {
  install(o) {
    o.component("BSpinner", lt);
  }
};
function ie(o, s, e, c) {
  const t = xt(c);
  return [Y({
    get() {
      return o[s] === void 0 ? t.value : o[s];
    },
    set(u) {
      t.value = u, e(`update:${s}`, u);
    }
  }), (u, d) => {
    t.value = u, e(`update:${s}`, u, d);
  }];
}
function Gr(o, s) {
  const e = (c) => {
    o.value && !o.value.contains(c.target) && s(c);
  };
  he(() => {
    document.addEventListener("click", e);
  }), It(() => {
    document.removeEventListener("click", e);
  });
}
const el = ["id", "name", "aria-checked", "aria-disabled"], tl = ["for"], ll = {
  key: 1,
  class: "toggle-label"
}, al = /* @__PURE__ */ q({
  __name: "BToggle",
  props: {
    id: {},
    name: {},
    modelValue: { type: Boolean, default: void 0 },
    rhs: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, !1);
    function l() {
      e.disabled || (t.value = !t.value);
    }
    return (n, u) => (f(), v("div", {
      id: n.id,
      name: n.name || n.id,
      role: "switch",
      "aria-checked": w(t),
      "aria-disabled": n.disabled,
      class: I(["b-toggle", { "flex-row-reverse": n.rhs, disabled: n.disabled }]),
      onClick: l
    }, [
      g("div", {
        tabindex: "0",
        class: I(["container", { active: w(t) }]),
        onKeyup: me(l, ["space"])
      }, [
        g("div", {
          class: I(["inline-block rounded-full w-[.85em] h-[.85em] bg-current transition", [w(t) ? "ml-[1em]" : "ml-[.125em]"]])
        }, null, 2)
      ], 34),
      n.$slots.default ? (f(), v(Q, { key: 0 }, [
        n.name || n.id ? (f(), v("label", {
          key: 0,
          for: n.name || n.id,
          class: "toggle-label cursor-[inherit]"
        }, [
          x(n.$slots, "default", {}, void 0, !0)
        ], 8, tl)) : (f(), v("div", ll, [
          x(n.$slots, "default", {}, void 0, !0)
        ]))
      ], 64)) : H("", !0)
    ], 10, el));
  }
}), ol = /* @__PURE__ */ G(al, [["__scopeId", "data-v-4efa31c4"]]), nl = {
  install(o) {
    o.component("BToggle", ol);
  }
}, sl = ["id", "name", "aria-checked", "aria-disabled"], il = {
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-full h-full",
  style: { stroke: "currentColor" }
}, rl = {
  viewBox: "0 0 16 16",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  class: "w-full h-full",
  style: { stroke: "currentColor" }
}, ul = ["for"], dl = {
  key: 1,
  class: "checkbox-label"
}, cl = /* @__PURE__ */ q({
  __name: "BCheckbox",
  props: {
    id: {},
    name: {},
    modelValue: { type: [Boolean, null], default: void 0 },
    rhs: { type: Boolean, default: !1 },
    allowIndeterminate: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(
      e,
      "modelValue",
      c,
      !1
    ), l = Y(() => e.allowIndeterminate ? t.value !== !1 : !!t.value), n = Y(() => t.value === null ? "mixed" : !!t.value);
    function u() {
      e.disabled || (e.allowIndeterminate ? t.value === !0 ? t.value = null : t.value === null ? t.value = !1 : t.value = !0 : t.value = !t.value);
    }
    return (d, a) => (f(), v("div", {
      id: d.id,
      name: d.name || d.id,
      role: "checkbox",
      "aria-checked": n.value,
      "aria-disabled": d.disabled,
      class: I(["b-checkbox", { "flex-row-reverse": d.rhs, disabled: d.disabled }]),
      onClick: u
    }, [
      g("div", {
        tabindex: "0",
        class: I(["content", { active: l.value }]),
        onKeyup: me(u, ["space"])
      }, [
        fe((f(), v("svg", il, a[0] || (a[0] = [
          g("path", {
            id: "Vector",
            d: "M11.65 8L5 8",
            "stroke-width": "1.5",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, null, -1)
        ]), 512)), [
          [Ce, w(t) === null]
        ]),
        fe((f(), v("svg", rl, a[1] || (a[1] = [
          g("path", {
            id: "Vector",
            d: "M11.15 6L7.04998 9.9375L5 7.96875",
            "stroke-width": "1.5",
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
          }, null, -1)
        ]), 512)), [
          [Ce, w(t) === !0]
        ])
      ], 34),
      d.$slots.default ? (f(), v(Q, { key: 0 }, [
        d.name || d.id ? (f(), v("label", {
          key: 0,
          for: d.name || d.id,
          class: "checkbox-label cursor-[inherit]"
        }, [
          x(d.$slots, "default", {}, void 0, !0)
        ], 8, ul)) : (f(), v("div", dl, [
          x(d.$slots, "default", {}, void 0, !0)
        ]))
      ], 64)) : H("", !0)
    ], 10, sl));
  }
}), fl = /* @__PURE__ */ G(cl, [["__scopeId", "data-v-ffb92186"]]), pl = {
  install(o) {
    o.component("BCheckbox", fl);
  }
}, ml = ["id", "name", "aria-checked", "aria-disabled"], vl = ["for"], gl = {
  key: 1,
  class: "radio-text"
}, hl = /* @__PURE__ */ q({
  __name: "BRadio",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    id: {},
    name: {},
    groupValue: {},
    disabled: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, !1), l = et("groupState", null);
    le(t, (d) => {
      d && l && e.groupValue !== void 0 && l.select(e.groupValue);
    }), le(
      () => l == null ? void 0 : l.selected,
      (d) => {
        d && l && e.groupValue !== void 0 && (t.value = d == e.groupValue);
      }
    );
    const n = Y(
      () => (l == null ? void 0 : l.disabled) || e.disabled
    );
    function u() {
      n.value || (t.value = !0);
    }
    return (d, a) => (f(), v("div", {
      id: d.id,
      name: d.name || d.id,
      role: "radio",
      "aria-checked": w(t),
      "aria-disabled": n.value,
      class: I(["b-radio", [d.variant, { disabled: n.value, active: w(t) }]]),
      onClick: u
    }, [
      g("span", {
        tabindex: "0",
        class: "out-circle",
        onKeyup: me(u, ["space"])
      }, a[0] || (a[0] = [
        g("span", { class: "inside-circle" }, null, -1)
      ]), 32),
      d.$slots.default ? (f(), v(Q, { key: 0 }, [
        d.name || d.id ? (f(), v("label", {
          key: 0,
          for: d.name || d.id,
          class: "radio-label cursor-[inherit]"
        }, [
          x(d.$slots, "default", {}, void 0, !0)
        ], 8, vl)) : (f(), v("div", gl, [
          x(d.$slots, "default", {}, void 0, !0)
        ]))
      ], 64)) : H("", !0)
    ], 10, ml));
  }
}), bl = /* @__PURE__ */ G(hl, [["__scopeId", "data-v-f84c4d54"]]), yl = {
  install(o) {
    o.component("BRadio", bl);
  }
}, Cl = /* @__PURE__ */ q({
  __name: "BGroup",
  props: {
    modelValue: { default: null },
    vertical: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = s, c = o, t = At({
      selected: c.modelValue,
      get disabled() {
        return c.disabled;
      },
      select: l
    });
    le(
      () => c.modelValue,
      (n) => t.selected = n
    ), St("groupState", t);
    function l(n) {
      t.selected = n, e("update:modelValue", n);
    }
    return (n, u) => (f(), v("div", {
      class: I(["b-group inline-flex", [n.vertical ? "vert" : "hor items-end"]])
    }, [
      x(n.$slots, "default")
    ], 2));
  }
}), Bl = /* @__PURE__ */ G(Cl, [["__scopeId", "data-v-7a19b1ec"]]), wl = {
  install(o) {
    o.component("BGroup", Bl);
  }
}, kl = ["id", "name", "aria-checked", "aria-disabled"], Vl = /* @__PURE__ */ q({
  __name: "BRadioButton",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    id: {},
    name: {},
    groupValue: {},
    disabled: { type: Boolean, default: !1 },
    isDiv: { type: Boolean }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, !1), l = et("groupState", null);
    le(t, (d) => {
      d && l && e.groupValue !== void 0 && l.select(e.groupValue);
    }), le(
      () => l == null ? void 0 : l.selected,
      (d) => {
        d && l && e.groupValue !== void 0 && (t.value = d == e.groupValue);
      }
    );
    const n = Y(() => l && l.disabled || e.disabled);
    function u() {
      n.value || (t.value = !0);
    }
    return (d, a) => (f(), v("div", {
      id: d.id,
      name: d.name || d.id,
      role: "radio",
      "aria-checked": w(t),
      "aria-disabled": n.value,
      class: I(["bg-neutral-surface-default text-xs relative inline-flex min-h-[3em] min-w-[10em] cursor-pointer items-center justify-center py-base px-2xl font-bold tracking-wider uppercase select-none leading-xs border-xxs border-current text-neutral-interaction-default", [
        d.isDiv ? "b-radio-div" : "b-radio-button",
        { active: w(t), disabled: n.value }
      ]]),
      tabindex: "0",
      onClick: u,
      onKeyup: me(u, ["space"])
    }, [
      x(d.$slots, "default", {}, void 0, !0)
    ], 42, kl));
  }
}), $l = /* @__PURE__ */ G(Vl, [["__scopeId", "data-v-b2577d99"]]), Ml = {
  install(o) {
    o.component("BRadioButton", $l);
  }
}, xl = {
  key: 0,
  class: "actions",
  tabindex: "0"
}, Il = /* @__PURE__ */ q({
  __name: "BSelectContainer",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    labelValue: { default: "" },
    role: { default: "listbox" },
    absolute: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    required: { type: Boolean, default: !1 },
    closeOnBlur: { type: Boolean, default: !0 },
    dontHaveMaxHeight: { type: Boolean, default: !1 },
    maxHeight: { default: "40px" },
    minWidth: { default: "15em" },
    secondary: { type: Boolean, default: !1 },
    hideArrow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t, l] = ie(
      e,
      "modelValue",
      c,
      !1
    ), n = A(), u = A(), d = A(), a = new ResizeObserver(p), r = new MutationObserver(p), m = Y(
      () => e.disabled ? !1 : t.value
    );
    he(() => {
      u.value && (n.value = u.value.querySelector(
        ".b-label-container"
      ), n.value && (r.observe(n.value, {
        characterData: !0,
        subtree: !0,
        childList: !0
      }), a.observe(n.value, { box: "border-box" })), d.value && a.observe(d.value, { box: "border-box" }), setTimeout(() => {
        p();
      }, 200));
    }), De(p), we(() => {
      a && a.disconnect();
    });
    function p() {
      d.value && (d.value.style.maxHeight = m.value ? `${d.value.scrollHeight + 1}px` : "0px");
    }
    function h(y, B) {
      l(y, B || {});
    }
    return (y, B) => {
      const i = W("BExpandableContainer");
      return f(), v("div", {
        ref_key: "fatherContainer",
        ref: u
      }, [
        P(i, {
          modelValue: w(t),
          "onUpdate:modelValue": [
            B[0] || (B[0] = (b) => ne(t) ? t.value = b : null),
            h
          ],
          absolute: y.absolute,
          "label-value": y.labelValue,
          "close-on-blur": y.closeOnBlur,
          disabled: y.disabled,
          "is-error": y.isError,
          "error-message": y.errorMessage,
          "info-message": y.infoMessage,
          required: y.required,
          "max-height": y.maxHeight,
          "min-width": y.minWidth,
          secondary: y.secondary,
          "hide-arrow": y.hideArrow
        }, Be({
          content: S(() => [
            fe(g("div", {
              ref_key: "content",
              ref: d,
              class: "content-wrapper"
            }, [
              g("div", {
                class: I(["content transition-translate", {
                  secondary: y.secondary,
                  expanded: m.value,
                  "has-max-height": !y.dontHaveMaxHeight
                }])
              }, [
                x(y.$slots, "content", {}, () => [
                  g("ul", {
                    role: "list",
                    class: I(["items-list", [{ "p-xxs *:p-xs": !y.dontHaveMaxHeight }]])
                  }, [
                    x(y.$slots, "items", {}, void 0, !0)
                  ], 2)
                ], !0),
                y.$slots.actions ? (f(), v("div", xl, [
                  x(y.$slots, "actions", {}, void 0, !0)
                ])) : H("", !0)
              ], 2)
            ], 512), [
              [Ce, m.value]
            ])
          ]),
          default: S(() => [
            x(y.$slots, "default", {}, void 0, !0)
          ]),
          _: 2
        }, [
          y.$slots.complement ? {
            name: "complement",
            fn: S(() => [
              x(y.$slots, "complement", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          y.$slots.label ? {
            name: "label",
            fn: S(() => [
              x(y.$slots, "label", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["modelValue", "absolute", "label-value", "close-on-blur", "disabled", "is-error", "error-message", "info-message", "required", "max-height", "min-width", "secondary", "hide-arrow"])
      ], 512);
    };
  }
}), Al = /* @__PURE__ */ G(Il, [["__scopeId", "data-v-8425e782"]]), Sl = {
  install(o) {
    o.component("BSelectContainer", Al);
  }
}, Dl = { class: "relative pointer-events-none" }, El = { class: "search-placeholder" }, Hl = ["disabled"], Tl = /* @__PURE__ */ q({
  __name: "SelectContent",
  props: {
    modelValue: { default: "" },
    items: {},
    icon: {},
    expanded: { type: Boolean, default: void 0 },
    searchable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, ""), [l, n] = ie(
      e,
      "expanded",
      c,
      !1
    );
    return (u, d) => {
      const a = W("BIcon");
      return f(), v(Q, null, [
        u.icon ? (f(), F(a, {
          key: 0,
          name: u.icon,
          class: I(["icon shrink-0", { "text-primary-interaction-default": w(l) }])
        }, null, 8, ["name", "class"])) : H("", !0),
        g("span", {
          class: I(["flex items-center gap-xs truncate", { "text-neutral-foreground-low": !u.items }])
        }, [
          u.searchable && !u.disabled ? (f(), v("div", {
            key: 0,
            class: I(["flex items-center text-neutral-foreground-high", { secondary: u.secondary, hidden: !w(l) }]),
            onClick: d[1] || (d[1] = (r) => w(n)(!0, { source: "click" }))
          }, [
            P(a, {
              name: "search",
              class: "icon"
            }),
            fe(g("div", Dl, [
              g("span", El, [
                x(u.$slots, "searchText", {}, () => [
                  d[2] || (d[2] = ae("Search"))
                ], !0)
              ])
            ], 512), [
              [Ce, !w(t).length]
            ]),
            fe(g("input", {
              "onUpdate:modelValue": d[0] || (d[0] = (r) => ne(t) ? t.value = r : null),
              type: "search",
              class: "search",
              disabled: u.disabled
            }, null, 8, Hl), [
              [Me, w(t)]
            ])
          ], 2)) : H("", !0),
          x(u.$slots, "status", {}, void 0, !0)
        ], 2)
      ], 64);
    };
  }
}), ze = /* @__PURE__ */ G(Tl, [["__scopeId", "data-v-e4c3c647"]]), Ll = /* @__PURE__ */ q({
  __name: "Option",
  props: {
    selected: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 },
    noHover: { type: Boolean, default: !1 }
  },
  setup(o) {
    return (s, e) => (f(), v("div", {
      role: "option",
      tabindex: "0",
      class: I(["option-container", { secondary: s.secondary, disabled: s.disabled, noHover: s.noHover, selected: s.selected }])
    }, [
      x(s.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Ve = /* @__PURE__ */ G(Ll, [["__scopeId", "data-v-49bb22d1"]]), Pl = /* @__PURE__ */ q({
  __name: "BSelect",
  props: {
    modelValue: { default: void 0 },
    labelValue: { default: "" },
    items: {},
    icon: {},
    expanded: { type: Boolean, default: void 0 },
    labelKey: { default: "label" },
    valueKey: { default: "value" },
    searchable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    absolute: { type: Boolean, default: !0 },
    secondary: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t, l] = ie(
      e,
      "modelValue",
      c,
      null
    ), [n, u] = ie(
      e,
      "expanded",
      c,
      !1
    );
    let d = A(null), a = A("");
    le(
      () => e.modelValue,
      (i) => {
        if (!i) d.value = null;
        else {
          const b = e.items.findIndex((U) => U == i);
          d.value = b < 0 ? null : b;
        }
        t.value = e.modelValue;
      }
    );
    function r(i) {
      return de(i) ? i[e.labelKey] : i;
    }
    function m(i) {
      return de(i) ? i[e.valueKey] : i;
    }
    function p(i, b) {
      e.disabled || (l(i, { index: b }), d.value = b, u(!1, { source: "value-selected" }));
    }
    function h(i) {
      function b(U) {
        l(e.items[U], { index: U }), i.preventDefault();
      }
      switch (i.key) {
        case "ArrowUp":
          {
            if (d.value == 0) break;
            const U = d.value === null ? e.items.length - 1 : d.value - 1;
            b(U);
          }
          break;
        case "ArrowDown":
          {
            if (d.value == e.items.length - 1) break;
            const U = d.value === null ? 0 : d.value + 1;
            b(U);
          }
          break;
        case "Home":
          b(0);
          break;
        case "End":
          {
            const U = e.items.length - 1;
            b(U);
          }
          break;
      }
    }
    function y(i) {
      return !i || !e.searchable ? e.items : e.items.filter((b) => {
        if (de(b)) {
          if (b[e.labelKey].toLowerCase().includes(i.toLowerCase()))
            return b;
        } else if (b.toLowerCase().includes(i.toLowerCase()))
          return b;
      });
    }
    function B(i, b) {
      e.searchable && (b == null ? void 0 : b.source) == "click" ? u(!0, b) : u(i, b);
    }
    return (i, b) => {
      const U = W("BSelectContainer");
      return f(), F(U, {
        modelValue: w(n),
        "onUpdate:modelValue": [
          b[2] || (b[2] = ($) => ne(n) ? n.value = $ : null),
          B
        ],
        "label-value": i.labelValue,
        absolute: i.absolute,
        class: "b-select",
        disabled: i.disabled,
        required: i.required,
        "is-error": i.isError,
        "error-message": i.errorMessage,
        "info-message": i.infoMessage,
        secondary: i.secondary,
        "aria-multiselectable": "false",
        onKeyup: h
      }, Be({
        items: S(() => [
          (f(!0), v(Q, null, te(y(w(a)), ($, D) => (f(), F(Ve, {
            "aria-selected": m(w(t)) == m($),
            key: D,
            secondary: i.secondary,
            disabled: $.disabled,
            selected: m(w(t)) == m($),
            onClick: (z) => p($, D),
            onKeyup: me((z) => p($, D), ["space"])
          }, {
            default: S(() => [
              x(i.$slots, "item", {
                item: $,
                index: D
              }, () => [
                ae(R(r($)), 1)
              ])
            ]),
            _: 2
          }, 1032, ["aria-selected", "secondary", "disabled", "selected", "onClick", "onKeyup"]))), 128))
        ]),
        default: S(() => [
          P(ze, {
            modelValue: w(a),
            "onUpdate:modelValue": b[0] || (b[0] = ($) => ne(a) ? a.value = $ : a = $),
            expanded: w(n),
            "onUpdate:expanded": [
              b[1] || (b[1] = ($) => ne(n) ? n.value = $ : null),
              B
            ],
            disabled: i.disabled,
            icon: i.icon,
            secondary: i.secondary,
            items: i.items,
            searchable: i.searchable
          }, Be({
            status: S(() => [
              w(t) && (!w(n) && i.searchable || !i.searchable) ? x(i.$slots, "status", {
                key: 0,
                item: w(t)
              }, () => [
                ae(R(r(w(t))), 1)
              ]) : !w(n) && i.searchable || !i.searchable ? x(i.$slots, "default", { key: 1 }) : H("", !0)
            ]),
            _: 2
          }, [
            i.$slots.searchText ? {
              name: "searchText",
              fn: S(() => [
                x(i.$slots, "searchText")
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["modelValue", "expanded", "disabled", "icon", "secondary", "items", "searchable"])
        ]),
        _: 2
      }, [
        i.$slots.actions ? {
          name: "actions",
          fn: S(() => [
            x(i.$slots, "actions")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["modelValue", "label-value", "absolute", "disabled", "required", "is-error", "error-message", "info-message", "secondary"]);
    };
  }
}), zl = {
  install(o) {
    o.component("BSelect", Pl);
  }
}, Ol = { class: "select-count" }, Wl = /* @__PURE__ */ q({
  __name: "BMultiSelect",
  props: {
    modelValue: { default: void 0 },
    labelValue: { default: "" },
    icon: {},
    expanded: { type: Boolean, default: void 0 },
    labelKey: { default: "label" },
    selectedKey: { default: "selected" },
    searchable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    absolute: { type: Boolean, default: !0 },
    labelFormatter: {}
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t, l] = ie(
      e,
      "expanded",
      c,
      !1
    ), n = A(""), u = Y(
      () => e.modelValue.filter((p) => p[e.selectedKey] == !0).length
    ), d = Y(
      () => u.value && !e.disabled && (!t.value && e.searchable || !e.searchable)
    );
    function a(p) {
      if (e.disabled) return;
      p[e.selectedKey] = !p[e.selectedKey];
      const h = p[e.selectedKey] ? { selected: [p], deselected: [] } : { selected: [], deselected: [p] };
      c("update:modelValue", e.modelValue, h);
    }
    function r(p) {
      return !p || !e.searchable ? e.modelValue : e.modelValue.filter((h) => {
        if (h[e.labelKey].toLowerCase().includes(p.toLowerCase()))
          return h;
      });
    }
    function m(p, h) {
      e.searchable && (h == null ? void 0 : h.source) == "click" ? l(!0, h) : l(p, h);
    }
    return (p, h) => {
      const y = W("BCheckbox"), B = W("BSelectContainer");
      return f(), F(B, {
        modelValue: w(t),
        "onUpdate:modelValue": [
          h[2] || (h[2] = (i) => ne(t) ? t.value = i : null),
          m
        ],
        labelValue: p.labelValue,
        class: "b-select",
        disabled: p.disabled,
        required: p.required,
        "is-error": p.isError,
        "error-message": p.errorMessage,
        "info-message": p.infoMessage,
        absolute: p.absolute,
        "aria-multiselectable": "true"
      }, Be({
        items: S(() => [
          (f(!0), v(Q, null, te(r(n.value), (i, b) => (f(), F(Ve, {
            "aria-selected": (
              // @ts-ignore
              i[p.selectedKey]
            ),
            key: b,
            disabled: i.disabled,
            "no-hover": "",
            class: "flex items-center gap-xxs",
            onClick: (U) => a(i),
            onKeyup: me((U) => a(i), ["space"])
          }, {
            default: S(() => [
              P(y, {
                modelValue: (
                  // @ts-ignore
                  i[p.selectedKey]
                ),
                class: "pointer-events-none"
              }, null, 8, ["modelValue"]),
              x(p.$slots, "item", {
                item: i,
                index: b
              }, () => [
                ae(R(i[p.labelKey]), 1)
              ], !0)
            ]),
            _: 2
          }, 1032, ["aria-selected", "disabled", "onClick", "onKeyup"]))), 128))
        ]),
        default: S(() => [
          P(ze, {
            modelValue: n.value,
            "onUpdate:modelValue": h[0] || (h[0] = (i) => n.value = i),
            expanded: w(t),
            "onUpdate:expanded": [
              h[1] || (h[1] = (i) => ne(t) ? t.value = i : null),
              m
            ],
            disabled: p.disabled,
            icon: p.icon,
            items: p.modelValue,
            searchable: p.searchable
          }, Be({
            status: S(() => [
              d.value ? x(p.$slots, "status", {
                key: 0,
                selected: u.value
              }, () => [
                x(p.$slots, "status-text", { selected: u.value }, () => [
                  h[3] || (h[3] = g("span", { class: "font-bold" }, "Selected", -1))
                ], !0)
              ], !0) : !w(t) && p.searchable || !p.searchable ? x(p.$slots, "default", { key: 1 }, void 0, !0) : H("", !0)
            ]),
            _: 2
          }, [
            p.$slots.searchText ? {
              name: "searchText",
              fn: S(() => [
                x(p.$slots, "searchText", {}, void 0, !0)
              ]),
              key: "0"
            } : void 0
          ]), 1032, ["modelValue", "expanded", "disabled", "icon", "items", "searchable"])
        ]),
        _: 2
      }, [
        d.value ? {
          name: "complement",
          fn: S(() => [
            g("span", Ol, R(u.value), 1)
          ]),
          key: "0"
        } : void 0,
        p.$slots.actions ? {
          name: "actions",
          fn: S(() => [
            x(p.$slots, "actions", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["modelValue", "labelValue", "disabled", "required", "is-error", "error-message", "info-message", "absolute"]);
    };
  }
}), Ul = /* @__PURE__ */ G(Wl, [["__scopeId", "data-v-0c101024"]]), jl = {
  install(o) {
    o.component("BMultiSelect", Ul);
  }
}, He = /* @__PURE__ */ q({
  __name: "BIcon",
  props: {
    name: {},
    size: { default: "24px" },
    filled: { type: Boolean, default: !1 }
  },
  setup(o) {
    return ke((s) => ({
      "9e43273a": s.size
    })), (s, e) => (f(), v("span", {
      class: I(["material-symbols-rounded b-icon", { filled: s.filled }])
    }, R(s.name), 3));
  }
}), Rl = {
  install(o) {
    o.component("BIcon", He);
  }
}, Fl = { class: "flex flex-col gap-xxs" }, _l = {
  key: 0,
  class: "title"
}, Nl = {
  key: 1,
  class: "message"
}, ql = { class: "type-icon cursor-pointer rotate-transition group" }, Zl = /* @__PURE__ */ q({
  __name: "BAlert",
  props: {
    title: {},
    message: { default: "" },
    type: { default: "info" },
    size: { default: "medium" },
    icon: { default: "" },
    expandable: { type: Boolean, default: !1 },
    closable: { type: Boolean, default: !1 },
    hideIcon: { type: Boolean, default: !1 },
    iconPosition: { default: "start" }
  },
  emits: ["close"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    let t = A(!1), l = A(), n = A();
    const u = new ResizeObserver(a), d = Y(
      () => {
        switch (e.type) {
          case "info":
          case "neutral":
            return "info";
          case "warning":
          case "danger":
            return "error";
          case "success":
            return "check_circle";
          default:
            return "info";
        }
      }
    );
    he(() => {
      l.value && u.observe(l.value, { box: "border-box" }), n.value && u.observe(n.value, { box: "border-box" });
    }), De(a), we(() => {
      u && u.disconnect();
    });
    function a() {
      if (!n.value || !l.value) return;
      const r = getComputedStyle(l.value), m = parseInt(r.paddingTop), p = parseInt(r.paddingBottom);
      l.value.style.height = `${n.value.scrollHeight + m + p}px`, n.value.style.width = "fit-content";
      const h = Math.max(n.value.offsetWidth);
      l.value && (l.value.style.width || l.value.offsetWidth != h) ? n.value.style.width = "100%" : n.value.style.width = `${h}px`;
    }
    return (r, m) => (f(), v("div", {
      ref_key: "card",
      ref: l,
      class: I([[
        r.type,
        r.size,
        {
          "items-start": r.expandable,
          "items-center": !r.expandable || !w(t)
        }
      ], "alert transition-[height] duration-100"])
    }, [
      P(ve, { name: "content" }, {
        default: S(() => [
          g("div", {
            ref_key: "content",
            ref: n,
            class: "flex gap-sm items-center transition-[max-height] duration-300"
          }, [
            r.hideIcon ? H("", !0) : (f(), v("div", {
              key: 0,
              class: I(["type-icon", [`self-${r.iconPosition}`]])
            }, [
              P(He, {
                name: r.icon || d.value
              }, null, 8, ["name"])
            ], 2)),
            x(r.$slots, "default", {}, () => [
              g("div", Fl, [
                r.title ? (f(), v("h6", _l, R(r.title), 1)) : H("", !0),
                !r.expandable || w(t) ? (f(), v("p", Nl, R(r.message), 1)) : H("", !0)
              ])
            ], !0)
          ], 512)
        ]),
        _: 3
      }),
      x(r.$slots, "actions", {}, () => [
        g("div", ql, [
          g("div", {
            class: I(["flex items-center transition-transform ease-in-out duration-300", { "rotate-180": w(t) }])
          }, [
            r.expandable ? (f(), F(He, {
              key: 0,
              name: "expand_more",
              onClick: m[0] || (m[0] = (p) => ne(t) ? t.value = !w(t) : t = !w(t))
            })) : H("", !0)
          ], 2),
          r.closable ? (f(), F(He, {
            key: 0,
            name: "close",
            onClick: m[1] || (m[1] = (p) => c("close"))
          })) : H("", !0)
        ])
      ], !0)
    ], 2));
  }
}), ct = /* @__PURE__ */ G(Zl, [["__scopeId", "data-v-d4f8397d"]]), Kl = {
  install(o) {
    o.component("BAlert", ct);
  }
}, Xl = /* @__PURE__ */ q({
  __name: "BCard",
  props: {
    className: {}
  },
  setup(o) {
    return (s, e) => (f(), v("div", {
      class: I(["b-card", s.className])
    }, [
      x(s.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Gl = /* @__PURE__ */ G(Xl, [["__scopeId", "data-v-8c850343"]]), Jl = {
  install(o) {
    o.component("BCard", Gl);
  }
}, Ql = /* @__PURE__ */ q({
  __name: "Overlay",
  props: {
    modelValue: { type: Boolean, default: !1 },
    zIndex: { default: 1e3 }
  },
  emits: ["click"],
  setup(o, { emit: s }) {
    ke((l) => ({
      "7681f9aa": l.zIndex
    }));
    const e = o, c = s, t = A(e.modelValue);
    return le(
      () => e.modelValue,
      (l) => {
        t.value = l;
      }
    ), (l, n) => (f(), v(Q, null, [
      P(ve, { name: "fade-in" }, {
        default: S(() => [
          t.value ? (f(), v("div", {
            key: 0,
            class: "background-div",
            onClick: n[0] || (n[0] = (u) => c("click"))
          })) : H("", !0)
        ]),
        _: 1
      }),
      x(l.$slots, "default", {}, void 0, !0)
    ], 64));
  }
}), ft = /* @__PURE__ */ G(Ql, [["__scopeId", "data-v-97457df7"]]), Yl = /* @__PURE__ */ q({
  __name: "BDialog",
  props: {
    modelValue: { type: Boolean, default: !1 },
    width: { default: "fit-content" },
    height: { default: "fit-content" },
    noOutsideClose: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    let t = A(e.modelValue);
    const l = A();
    le(
      () => e.modelValue,
      (u) => {
        t.value = u;
      }
    );
    function n() {
      var u;
      e.noOutsideClose ? ((u = l.value) == null || u.classList.add("bounce-active"), setTimeout(() => {
        var d;
        (d = l.value) == null || d.classList.remove("bounce-active");
      }, 100)) : (t.value = !1, c("update:modelValue", !1));
    }
    return (u, d) => (f(), F(Ee, { to: "body" }, [
      P(ft, {
        modelValue: w(t),
        "onUpdate:modelValue": d[0] || (d[0] = (a) => ne(t) ? t.value = a : t = a),
        "z-index": 1002,
        onClick: n
      }, {
        default: S(() => [
          P(ve, { name: "bounce" }, {
            default: S(() => [
              w(t) ? (f(), v("div", {
                key: 0,
                ref_key: "dialog",
                ref: l,
                class: "dialog",
                style: re({ width: u.width, height: u.height })
              }, [
                x(u.$slots, "default", {}, void 0, !0)
              ], 4)) : H("", !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["modelValue"])
    ]));
  }
}), pt = /* @__PURE__ */ G(Yl, [["__scopeId", "data-v-a1253de2"]]), ea = {
  install(o) {
    o.component("BDialog", pt);
  }
}, ta = {
  key: 0,
  class: "label-value"
}, la = {
  key: 1,
  class: "text-primary-foreground-low ml-xxs"
}, aa = /* @__PURE__ */ q({
  __name: "Label",
  props: {
    labelValue: { default: "" },
    infoMessage: { default: "" },
    tooltipMinWidth: { default: "none" },
    required: { type: Boolean, default: !1 }
  },
  setup(o) {
    return (s, e) => {
      const c = W("BIcon"), t = W("BTooltip");
      return s.labelValue ? (f(), v("h5", ta, [
        ae(R(s.labelValue) + " ", 1),
        s.infoMessage ? (f(), F(t, {
          key: 0,
          class: "ml-xxs"
        }, {
          text: S(() => [
            g("div", {
              class: I(["tooltip-text", {
                "whitespace-nowrap break-words text-wrap": s.tooltipMinWidth != "none"
              }]),
              style: re({ minWidth: s.tooltipMinWidth })
            }, R(s.infoMessage), 7)
          ]),
          default: S(() => [
            P(c, {
              name: "info",
              class: "info-icon"
            })
          ]),
          _: 1
        })) : H("", !0),
        s.required ? (f(), v("span", la, "*")) : H("", !0)
      ])) : H("", !0);
    };
  }
}), Re = /* @__PURE__ */ G(aa, [["__scopeId", "data-v-93834668"]]), oa = { class: "b-container" }, na = {
  key: 0,
  class: "mb-xxs flex justify-between items-center"
}, sa = ["role", "aria-disabled", "aria-required"], ia = { class: "flex items-center gap-xs ml-auto" }, ra = {
  key: 0,
  class: "text-danger-foreground-low text-start p3"
}, ua = /* @__PURE__ */ q({
  __name: "Container",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    labelValue: { default: "" },
    role: { default: "listbox" },
    disabled: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    required: { type: Boolean, default: !1 },
    closeOnBlur: { type: Boolean, default: !0 },
    hideBottom: { type: Boolean, default: !1 },
    maxHeight: { default: "none" },
    minWidth: { default: "15em" },
    secondary: { type: Boolean, default: !1 },
    hideArrow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = new MutationObserver(p), t = s, [l, n] = ie(
      e,
      "modelValue",
      t,
      !1
    ), u = A(), d = A(), a = Y(
      () => e.disabled ? !1 : l.value
    ), r = A(e.minWidth);
    function m(y) {
      if (!e.closeOnBlur || !l.value || !y.target || !(y.target instanceof Element))
        return;
      const B = y.target.closest(".b-label-container");
      u.value != B && n(!1, { source: "blur-sm" });
    }
    function p() {
      var y;
      r.value = ((y = u.value) == null ? void 0 : y.clientWidth) + "px";
    }
    he(() => {
      document.addEventListener("click", m), u.value && c.observe(u.value, { attributes: !0 });
    }), De(p), we(() => {
      document.removeEventListener("click", m), c.disconnect();
    });
    function h() {
      e.disabled || n(!l.value, { source: "click" });
    }
    return (y, B) => {
      const i = W("BIcon");
      return f(), v("div", oa, [
        y.labelValue ? (f(), v("div", na, [
          P(Re, {
            "label-value": y.labelValue,
            "info-message": y.infoMessage,
            required: y.required
          }, null, 8, ["label-value", "info-message", "required"])
        ])) : H("", !0),
        g("div", {
          ref_key: "container",
          ref: u,
          role: y.role,
          "aria-disabled": y.disabled,
          "aria-required": y.required,
          class: I(["b-label-container", { "pointer-events-none": y.disabled }]),
          tabindex: "0"
        }, [
          x(y.$slots, "label", {}, () => [
            g("div", {
              ref_key: "label",
              ref: d,
              class: I(["label-container", {
                disabled: y.disabled,
                secondary: y.secondary,
                expanded: a.value,
                "hide-bottom": y.hideBottom,
                error: y.isError
              }]),
              style: re({ "max-height": y.maxHeight, "min-width": y.minWidth }),
              onClick: h,
              onKeyup: me(h, ["space"])
            }, [
              x(y.$slots, "default", {}, void 0, !0),
              g("div", ia, [
                x(y.$slots, "complement", {}, void 0, !0),
                y.hideArrow ? H("", !0) : (f(), F(i, {
                  key: 0,
                  name: "keyboard_arrow_down",
                  class: I(["arrow-icon", {
                    "text-neutral-interaction-disabled": y.disabled,
                    "text-danger-interaction-default": y.isError,
                    expanded: a.value
                  }])
                }, null, 8, ["class"]))
              ])
            ], 38)
          ], !0),
          P(ve, { name: "content" }, {
            default: S(() => [
              x(y.$slots, "content", { minWidth: r.value }, void 0, !0)
            ]),
            _: 3
          })
        ], 10, sa),
        g("div", null, [
          y.isError ? (f(), v("small", ra, R(y.errorMessage), 1)) : H("", !0)
        ])
      ]);
    };
  }
}), mt = /* @__PURE__ */ G(ua, [["__scopeId", "data-v-46b4b9b4"]]), da = { class: "font-bold text-neutral-interaction-default" }, ca = { class: "select-count" }, fa = ["aria-selected", "tabindex"], pa = ["onClick", "onKeyup"], ma = { class: "text-neutral-interaction-default" }, va = { class: "flex items-center gap-xs" }, ga = {
  key: 0,
  class: "flex flex-col gap-xs pb-xxs overflow-auto custom-scroll max-h-[12em] mr-xxs mb-xxs"
}, ha = {
  key: 0,
  class: "flex items-center text-xl gap-xs pb-xxs border-b-xxs border-neutral-default mb-xxs px-xs"
}, ba = ["onUpdate:modelValue", "disabled", "placeholder"], ya = { class: "flex items-center gap-xs" }, Ca = /* @__PURE__ */ q({
  __name: "BFilter",
  props: {
    modelValue: { default: void 0 },
    labelValue: { default: "" },
    icon: { default: "filter_list" },
    expanded: { type: Boolean, default: void 0 },
    labelKey: { default: "label" },
    selectedKey: { default: "selected" },
    searchText: { default: "Search" },
    searchable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    absolute: { type: Boolean, default: !1 },
    error: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    required: { type: Boolean, default: !1 },
    closeOnBlur: { type: Boolean, default: !0 },
    hideBottom: { type: Boolean, default: !1 },
    maxHeight: { default: "" },
    minWidth: { default: "22em" },
    secondary: { type: Boolean, default: !1 },
    hideArrow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:expandedModel", "apply"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t, l] = ie(
      e,
      "expanded",
      c,
      !1
    );
    let n = A({}), u = A(-1), d = A(a());
    function a() {
      let i = [];
      return Object.keys(e.modelValue).forEach((b) => {
        i.push(
          e.modelValue[b].filter(
            (U) => U[e.selectedKey] == !0
          )
        );
      }), i.length;
    }
    function r(i) {
      if (e.disabled) return;
      i[e.selectedKey] = !i[e.selectedKey];
      const b = i[e.selectedKey] ? { selected: [i], deselected: [] } : { selected: [], deselected: [i] };
      i[e.selectedKey] ? d.value++ : d.value--, c("update:modelValue", e.modelValue, b);
    }
    function m(i) {
      u.value === i ? u.value = -1 : u.value = i;
    }
    function p(i) {
      return i.filter((b) => b[e.selectedKey] == !0).length;
    }
    function h(i, b) {
      return b ? i.filter((U) => {
        if (U[e.labelKey].toLowerCase().includes(b.toLowerCase()))
          return U;
      }) : i;
    }
    function y() {
      Object.keys(e.modelValue).forEach((i) => {
        e.modelValue[i] = e.modelValue[i].map((b) => (b[e.selectedKey] = !1, b));
      }), d.value = 0, B();
    }
    function B() {
      c("apply");
    }
    return (i, b) => {
      const U = W("BIcon"), $ = W("BCheckbox"), D = W("BButton");
      return f(), F(mt, {
        modelValue: w(t),
        labelValue: i.labelValue,
        class: "b-filter",
        disabled: i.disabled,
        isError: i.error,
        errorMessage: i.errorMessage,
        infoMessage: i.infoMessage,
        required: i.required,
        closeOnBlur: !0,
        hideBottom: !1,
        maxHeight: i.maxHeight,
        minWidth: i.minWidth,
        secondary: i.secondary,
        hideArrow: i.hideArrow,
        "onUpdate:modelValue": b[1] || (b[1] = (z, Z) => i.$emit("update:expandedModel", z))
      }, Be({
        items: S(() => [
          (f(!0), v(Q, null, te(Object.entries(i.modelValue), (z, Z) => (f(), v("li", {
            role: "option",
            "aria-selected": (
              // @ts-ignore
              i.modelValue[Z][i.selectedKey]
            ),
            key: z[0],
            class: I(["flex flex-col gap-[.75em] select-none h-max transition-[height] max-h-[3em] overflow-hidden", { active: w(u) === Z }]),
            tabindex: Z,
            style: { transition: "max-height 0.2s ease" }
          }, [
            g("div", {
              class: I(["flex items-center justify-between text-neutral-interaction-default w-full h-full cursor-pointer *:p-xs hover:text-primary-interaction-default hover:bg-primary-surface-hover", {
                "bg-primary-surface-default text-primary-interaction-default font-bold": w(u) === Z
              }]),
              onClick: $e((j) => m(Z), ["prevent"]),
              onKeyup: me((j) => m(Z), ["space"])
            }, [
              g("p", ma, R(z[0]), 1),
              g("div", va, [
                p(z[1]) ? x(i.$slots, "status", { key: 0 }, () => [
                  g("span", {
                    class: I(["select-count font-normal", {
                      active: w(u) === Z
                    }])
                  }, R(p(z[1])), 3)
                ], !0) : H("", !0),
                g("div", {
                  class: I(["flex items-center w-fit h-fit transition-transform ease-in-out duration-300 cursor-pointer text-xl", [
                    w(u) === Z ? "rotate-180 text-primary-interaction-default" : "text-neutral-interaction-default"
                  ]])
                }, [
                  P(U, {
                    name: "expand_more",
                    size: "xl"
                  })
                ], 2)
              ])
            ], 42, pa),
            P(ve, { name: "content" }, {
              default: S(() => [
                w(u) === Z ? (f(), v("ul", ga, [
                  i.searchable && !i.disabled ? (f(), v("div", ha, [
                    P(U, {
                      name: "search",
                      class: "text-neutral-foreground-low",
                      size: "xl"
                    }),
                    fe(g("input", {
                      "onUpdate:modelValue": (j) => w(n)[z[0]] = j,
                      type: "search",
                      class: "h-full w-full p-0 m-0 border-none text-xs pb-[.05em] placeholder:text-neutral-foreground-low outline-hidden border-none",
                      style: { "box-shadow": "none" },
                      disabled: i.disabled,
                      placeholder: i.searchText
                    }, null, 8, ba), [
                      [Me, w(n)[z[0]]]
                    ])
                  ])) : H("", !0),
                  (f(!0), v(Q, null, te(h(
                    z[1],
                    w(n)[z[0]]
                  ), (j, T) => (f(), F(Ve, {
                    "no-hover": "",
                    disabled: j.disabled,
                    key: T,
                    onClick: (M) => r(j),
                    onKey: (M) => r(j),
                    class: "flex items-center pl-xxs gap-xs"
                  }, {
                    default: S(() => [
                      P($, {
                        modelValue: (
                          // @ts-ignore
                          j[i.selectedKey]
                        ),
                        class: "pointer-events-none"
                      }, null, 8, ["modelValue"]),
                      ae(" " + R(j[i.labelKey]), 1)
                    ]),
                    _: 2
                  }, 1032, ["disabled", "onClick", "onKey"]))), 128))
                ])) : H("", !0)
              ]),
              _: 2
            }, 1024)
          ], 10, fa))), 128))
        ]),
        actions: S(() => [
          x(i.$slots, "actions", {}, () => [
            g("div", ya, [
              P(D, {
                size: "small",
                variant: "plain",
                onClick: y,
                disabled: !w(d)
              }, {
                default: S(() => [
                  x(i.$slots, "clear-text", {}, () => [
                    b[3] || (b[3] = ae(" Clear "))
                  ], !0)
                ]),
                _: 3
              }, 8, ["disabled"]),
              P(D, {
                type: "button",
                disabled: !w(d),
                size: "small",
                onClick: B
              }, {
                default: S(() => [
                  x(i.$slots, "apply-text", {}, () => [
                    b[4] || (b[4] = ae(" Apply "))
                  ], !0)
                ]),
                _: 3
              }, 8, ["disabled"])
            ])
          ], !0)
        ]),
        default: S(() => [
          P(ze, {
            expanded: w(t),
            "onUpdate:expanded": [
              b[0] || (b[0] = (z) => ne(t) ? t.value = z : null),
              w(l)
            ],
            disabled: i.disabled,
            icon: i.icon,
            items: i.modelValue
          }, {
            status: S(() => [
              i.disabled ? !w(t) || i.disabled ? x(i.$slots, "default", { key: 1 }, void 0, !0) : H("", !0) : x(i.$slots, "status", {
                key: 0,
                selected: w(d)
              }, () => [
                g("span", da, [
                  x(i.$slots, "status-text", { selected: w(d) }, () => [
                    b[2] || (b[2] = ae(" Filters "))
                  ], !0)
                ])
              ], !0)
            ]),
            _: 3
          }, 8, ["expanded", "disabled", "icon", "items", "onUpdate:expanded"])
        ]),
        _: 2
      }, [
        w(d) && !i.disabled ? {
          name: "complement",
          fn: S(() => [
            g("span", ca, R(w(d)), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["modelValue", "labelValue", "disabled", "isError", "errorMessage", "infoMessage", "required", "maxHeight", "minWidth", "secondary", "hideArrow"]);
    };
  }
}), Ba = /* @__PURE__ */ G(Ca, [["__scopeId", "data-v-60a009a2"]]), wa = {
  install(o) {
    o.component("BFilter", Ba);
  }
}, ka = {
  key: 0,
  class: "flex justify-between items-center"
}, Va = {
  key: 0,
  class: "b-input-max-length"
}, $a = ["width", "height"], Ma = {
  key: 1,
  class: "flex gap-2 items-center justify-center"
}, xa = { class: "flex flex-col items-center gap-xs" }, Ia = { class: "flex items-center gap-xs" }, Aa = { class: "file-name text-neutral-foreground-low truncate max-w-7xl" }, Sa = {
  key: 2,
  class: "flex flex-col items-center gap-xs"
}, Da = { class: "file-name cursor-pointer text-primary-foreground-low" }, Ea = { class: "file-name text-neutral-foreground-low" }, Ha = ["disabled"], Ta = ["maxlength", "placeholder", "disabled"], La = {
  key: 3,
  class: "flex items-center h-fit"
}, Pa = ["disabled", "value", "placeholder", "type", "max", "min", "maxlength"], za = ["disabled"], Oa = {
  key: 4,
  class: "b-input-message-error"
}, Wa = {
  key: 5,
  class: "b-input-message-info"
}, Ua = /* @__PURE__ */ q({
  __name: "BInput",
  props: {
    modelValue: { default: void 0 },
    labelValue: { default: "" },
    type: { default: "text" },
    mask: { default: void 0 },
    max: { default: void 0 },
    min: { default: void 0 },
    step: { default: 1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    size: { default: "100" },
    isTextArea: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    placeholder: { default: "" },
    textAlign: { default: "start" },
    tooltipMinWidth: { default: "none" },
    icon: { default: "" },
    appendIcon: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "focus", "blur"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    let t = A(), l = A(!1), n = A(!1), u = A(!1), d = A(!1), a = A(!1), r = A("");
    const m = Y(() => e.isError || l.value), p = Y(() => {
      const C = e.type;
      return C === "color" || C === "email" || u.value ? "text" : C;
    }), h = Y(() => {
      if (V("color")) return 7;
      if ((e.max || e.max === 0) && (!e.mask || e.isTextArea))
        return e.max;
    }), y = Y(() => V("search") ? "search" : e.appendIcon ? "" : e.icon), B = Y(() => V("password") ? u.value ? "visibility_off" : "visibility" : e.appendIcon ? e.icon : ""), i = Y(() => ({
      focus: n.value,
      error: m.value,
      disabled: e.disabled
    })), b = Y(() => ({ "text-align": e.textAlign }));
    ge(U), le(() => e.modelValue, U), le(() => e.type, U);
    function U() {
      var C;
      V("file") ? (d.value = !!e.modelValue, e.modelValue && (r.value = ((C = e.modelValue) == null ? void 0 : C.name) || "")) : t.value = e.modelValue || e.modelValue == 0 ? e.modelValue : "";
    }
    function $() {
      if (e.isError) {
        l.value = !1;
        return;
      }
      V("email") ? l.value = !st(t.value) : k("domain") ? l.value = !it(t.value) : k("url") ? l.value = !rt(t.value) : !e.isTextArea && (e.max || e.max === 0) && t.value && t.value.length > e.max ? l.value = !0 : l.value = !1;
    }
    function D(C) {
      const E = C.target.files || C.dataTransfer.files;
      a.value = !1, E && E.length > 0 ? (d.value = !0, r.value = E[0].name || "", c("update:modelValue", E[0])) : (d.value = !1, r.value = "", c("update:modelValue", void 0));
    }
    function z() {
      d.value = !1, r.value = "", c("update:modelValue", void 0);
    }
    function Z() {
      switch (e.size) {
        case "xs":
          return 56;
        case "sm":
          return 66;
        case "base":
          return 76;
        case "lg":
          return 86;
        case "xl":
          return 96;
        case "100":
          return 76;
        default:
          return 76;
      }
    }
    function j() {
      !e.isTextArea && e.mask && V("text") && (t.value = nt(t.value, e.mask)), V("number") && ((e.min || e.min === 0) && t.value < e.min ? t.value = e.min : (e.max || e.max === 0) && t.value > e.max && (t.value = e.max)), $(), c("update:modelValue", t.value);
    }
    function T(C) {
      n.value = !1, $(), c("blur", C);
    }
    function M(C) {
      n.value = !0, e.isError || (l.value = !1), c("focus", C);
    }
    function N(C) {
      isNaN(Number(t.value)) && (t.value = 0), !e.disabled && ((e.max || e.max === 0) && Number(t.value) >= e.max && C > 0 || (e.min || e.min === 0) && Number(t.value) <= e.min && C < 0 || (t.value = (Number(t.value) * 1e3 + C * e.step * 1e3) / 1e3, j()));
    }
    function k(C, E = !1) {
      return O(e.mask, C, E);
    }
    function V(C, E = !1) {
      return O(e.type, C, E);
    }
    function O(C, E, ee = !1) {
      let oe = C == E;
      return Array.isArray(E) && (oe = E.includes(C)), ee && (oe = !oe), oe;
    }
    return (C, E) => {
      var oe;
      const ee = W("BIcon");
      return f(), v("div", {
        class: I(["flex flex-col h-fit", [
          V("file", !0) ? "file-input-wrapper" : "standard-input-wrapper",
          "size-" + e.size
        ]]),
        style: re([{ gap: "6px" }, { opacity: e.disabled && !V("file") ? 0.5 : 1 }])
      }, [
        C.labelValue || h.value !== void 0 && !C.isTextArea && V("text") ? (f(), v("div", ka, [
          P(Re, {
            "label-value": C.labelValue,
            "info-message": e.infoMessage && !(m.value && e.errorMessage) ? e.infoMessage : "",
            "tooltip-min-width": C.tooltipMinWidth,
            required: C.required
          }, null, 8, ["label-value", "info-message", "tooltip-min-width", "required"]),
          h.value !== void 0 && !C.isTextArea && V("text") ? (f(), v("span", Va, R(((oe = w(t)) == null ? void 0 : oe.length) || 0) + "/" + R(h.value), 1)) : H("", !0)
        ])) : H("", !0),
        V("file") ? (f(), v("div", {
          key: 1,
          class: I(["w-full h-full file-drop-area", [{ "blur-[2px]": w(a) }, "file-" + e.size, "file"]]),
          onDragenter: E[0] || (E[0] = $e((se) => ne(a) ? a.value = !0 : a = !0, ["prevent"])),
          onDragover: E[1] || (E[1] = $e(() => {
          }, ["prevent"])),
          onDragleave: E[2] || (E[2] = $e((se) => ne(a) ? a.value = !1 : a = !1, ["prevent"])),
          onDrop: $e(D, ["prevent"])
        }, [
          w(d) ? (f(), v("div", Ma, [
            x(C.$slots, "uploaded-file", {}, () => [
              g("div", xa, [
                P(ee, {
                  name: "draft",
                  class: "file-icon"
                }),
                g("div", Ia, [
                  g("p", Aa, R(w(r)), 1),
                  P(ee, {
                    class: "cursor-pointer trash-icon",
                    name: "delete",
                    onClick: $e(z, ["stop"])
                  })
                ])
              ])
            ], !0)
          ])) : (f(), v("svg", {
            key: 0,
            width: Z(),
            height: Z(),
            viewBox: "0 0 76 76",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg"
          }, E[9] || (E[9] = [
            Ue('<path d="M63.5312 33.25H42.75C40.8603 33.25 39.0481 32.4993 37.7119 31.1631C36.3757 29.8269 35.625 28.0147 35.625 26.125V5.34375C35.625 5.18628 35.5624 5.03526 35.4511 4.92391C35.3397 4.81256 35.1887 4.75 35.0312 4.75H21.375C18.8554 4.75 16.4391 5.75089 14.6575 7.53249C12.8759 9.31408 11.875 11.7304 11.875 14.25V61.75C11.875 64.2696 12.8759 66.6859 14.6575 68.4675C16.4391 70.2491 18.8554 71.25 21.375 71.25H54.625C57.1446 71.25 59.5609 70.2491 61.3425 68.4675C63.1241 66.6859 64.125 64.2696 64.125 61.75V33.8438C64.125 33.6863 64.0624 33.5353 63.9511 33.4239C63.8397 33.3126 63.6887 33.25 63.5312 33.25Z" fill="var(--neutral-border-default)" data-v-a49d9ed1></path><path d="M62.228 27.9938L40.8812 6.647C40.8397 6.60573 40.7869 6.57766 40.7295 6.56631C40.672 6.55495 40.6125 6.56083 40.5584 6.5832C40.5043 6.60556 40.4581 6.64342 40.4254 6.69202C40.3928 6.74061 40.3752 6.79776 40.375 6.8563V26.125C40.375 26.7549 40.6252 27.3589 41.0706 27.8043C41.516 28.2497 42.1201 28.5 42.75 28.5H62.0187C62.0772 28.4997 62.1344 28.4822 62.183 28.4495C62.2315 28.4169 62.2694 28.3706 62.2918 28.3165C62.3141 28.2624 62.32 28.2029 62.3087 28.1455C62.2973 28.0881 62.2692 28.0353 62.228 27.9938Z" fill="var(--neutral-border-default)" data-v-a49d9ed1></path><g clip-path="url(#clip0_2300_5309_BInput)" data-v-a49d9ed1><circle cx="63" cy="63" r="7" fill="white" data-v-a49d9ed1></circle><path d="M63 50C55.8319 50 50 55.8319 50 63C50 70.1681 55.8319 76 63 76C70.1681 76 76 70.1681 76 63C76 55.8319 70.1681 50 63 50ZM68 64H64V68C64 68.2652 63.8946 68.5196 63.7071 68.7071C63.5196 68.8946 63.2652 69 63 69C62.7348 69 62.4804 68.8946 62.2929 68.7071C62.1054 68.5196 62 68.2652 62 68V64H58C57.7348 64 57.4804 63.8946 57.2929 63.7071C57.1054 63.5196 57 63.2652 57 63C57 62.7348 57.1054 62.4804 57.2929 62.2929C57.4804 62.1054 57.7348 62 58 62H62V58C62 57.7348 62.1054 57.4804 62.2929 57.2929C62.4804 57.1054 62.7348 57 63 57C63.2652 57 63.5196 57.1054 63.7071 57.2929C63.8946 57.4804 64 57.7348 64 58V62H68C68.2652 62 68.5196 62.1054 68.7071 62.2929C68.8946 62.4804 69 62.7348 69 63C69 63.2652 68.8946 63.5196 68.7071 63.7071C68.5196 63.8946 68.2652 64 68 64Z" fill="var(--primary-interaction-default)" data-v-a49d9ed1></path></g><defs data-v-a49d9ed1><clipPath id="clip0_2300_5309_BInput" data-v-a49d9ed1><rect width="26" height="26" fill="white" transform="translate(50 50)" data-v-a49d9ed1></rect></clipPath></defs>', 4)
          ]), 8, $a)),
          w(d) ? H("", !0) : (f(), v("div", Sa, [
            g("p", Da, R(C.labelValue || "Select a file"), 1),
            g("p", Ea, R(C.placeholder || "or drag and drop it here"), 1)
          ])),
          w(d) ? H("", !0) : (f(), v("input", {
            key: 3,
            ref: "inputFile",
            type: "file",
            class: "w-full h-full top-0 left-0 right-0 bottom-0 absolute opacity-0 z-1 cursor-pointer",
            onChange: D,
            disabled: C.disabled
          }, null, 40, Ha))
        ], 34)) : C.isTextArea ? (f(), v("div", {
          key: 2,
          class: I(["b-input-field-area", i.value])
        }, [
          fe(g("textarea", {
            "onUpdate:modelValue": E[3] || (E[3] = (se) => ne(t) ? t.value = se : t = se),
            class: "b-input-text-content w-full",
            style: re(b.value),
            maxlength: h.value,
            placeholder: C.placeholder,
            disabled: C.disabled,
            onBlur: T,
            onFocus: M,
            onInput: j
          }, null, 44, Ta), [
            [Me, w(t)]
          ])
        ], 2)) : (f(), v("div", La, [
          g("div", {
            class: I(["b-input-field-area flex-1", i.value])
          }, [
            y.value ? (f(), F(ee, {
              key: 0,
              name: y.value,
              class: "b-input-side-icon"
            }, null, 8, ["name"])) : H("", !0),
            fe(g("input", {
              "onUpdate:modelValue": E[4] || (E[4] = (se) => ne(t) ? t.value = se : t = se),
              class: "b-input-text-content",
              style: re(b.value),
              disabled: C.disabled,
              value: w(t),
              placeholder: C.placeholder,
              type: p.value,
              spellcheck: "false",
              max: h.value,
              min: C.min,
              maxlength: h.value,
              onInput: j,
              onFocus: M,
              onBlur: T
            }, null, 44, Pa), [
              [Dt, w(t)]
            ]),
            V("color") ? fe((f(), v("input", {
              key: 1,
              "onUpdate:modelValue": E[5] || (E[5] = (se) => ne(t) ? t.value = se : t = se),
              class: I(["color-display", { disabled: C.disabled }]),
              disabled: C.disabled,
              type: "color",
              onInput: j,
              onFocus: M,
              onBlur: T
            }, null, 42, za)), [
              [Me, w(t)]
            ]) : H("", !0),
            B.value ? (f(), F(ee, {
              key: 2,
              name: B.value,
              class: I(["b-input-side-icon", { "cursor-pointer": V("password") }]),
              onClick: E[6] || (E[6] = (se) => ne(u) ? u.value = !w(u) && V("password") : u = !w(u) && V("password"))
            }, null, 8, ["name", "class"])) : H("", !0)
          ], 2),
          V("number") ? (f(), v("div", {
            key: 0,
            class: I(["flex flex-col items-center ml-xxs", {
              "text-neutral-interaction-disabled": C.disabled && !m.value,
              "text-danger-interaction-default": m.value && !C.disabled
            }])
          }, [
            P(ee, {
              name: "arrow_drop_up",
              class: "number-icon",
              onClick: E[7] || (E[7] = (se) => N(1))
            }),
            P(ee, {
              name: "arrow_drop_down",
              class: "number-icon",
              onClick: E[8] || (E[8] = (se) => N(-1))
            })
          ], 2)) : H("", !0)
        ])),
        m.value && C.errorMessage ? (f(), v("small", Oa, R(C.errorMessage), 1)) : H("", !0),
        e.infoMessage && !(m.value && e.errorMessage) ? (f(), v("small", Wa, R(e.infoMessage), 1)) : H("", !0)
      ], 6);
    };
  }
}), ja = /* @__PURE__ */ G(Ua, [["__scopeId", "data-v-a49d9ed1"]]), Ra = {
  install(o) {
    o.component("BInput", ja);
  }
}, Fa = {
  key: 1,
  class: "flex-1"
}, _a = /* @__PURE__ */ q({
  __name: "MenuOption",
  props: {
    label: { default: "" },
    icon: { default: "" },
    selected: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(o) {
    return (s, e) => {
      const c = W("BIcon");
      return f(), F(Ve, {
        selected: s.selected,
        disabled: s.disabled,
        class: "b-menu-option"
      }, {
        default: S(() => [
          s.icon ? (f(), F(c, {
            key: 0,
            name: s.icon
          }, null, 8, ["name"])) : H("", !0),
          s.label ? (f(), v("span", Fa, R(s.label), 1)) : H("", !0),
          x(s.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 8, ["selected", "disabled"]);
    };
  }
}), vt = /* @__PURE__ */ G(_a, [["__scopeId", "data-v-d852b63f"]]), Na = { class: "b-menu" }, qa = /* @__PURE__ */ q({
  __name: "BMenu",
  props: {
    modelValue: { default: void 0 },
    items: {},
    getObject: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    ke((m) => ({
      "76bc8856": n.value
    }));
    const e = o, c = s, [t] = ie(e, "modelValue", c, ""), l = Y(() => [
      e.items.filter((m) => !m.bottom),
      e.items.filter((m) => m.bottom)
    ]), n = Y(() => {
      var m;
      if (document.readyState === "complete" || document.readyState === "interactive") {
        const p = (m = document.querySelector(".b-navbar")) == null ? void 0 : m.clientHeight;
        return p ? `calc(100vh - ${p}px)` : "100vh";
      }
      return "100vh";
    });
    ge(() => {
      const m = e.items.find((p) => ut(p.path || ""));
      m && u(m);
    });
    function u(m) {
      t.value = e.getObject ? m : d(m), c("update:modelValue", t.value);
    }
    function d(m) {
      return de(m) ? m.value : m;
    }
    function a(m) {
      if (m) {
        if (!m.startsWith("/")) return "/" + m;
      } else return "";
      return m;
    }
    function r() {
      return typeof W("router-link") != "string" ? "router-link" : typeof W("nuxt-link") != "string" ? "nuxt-link" : "a";
    }
    return (m, p) => {
      const h = W("BTooltip");
      return f(), v("div", Na, [
        (f(!0), v(Q, null, te(l.value, (y, B) => (f(), v("div", {
          class: "items-container",
          key: B
        }, [
          (f(!0), v(Q, null, te(y, (i) => (f(), F(h, {
            key: i.value,
            text: i.label
          }, {
            default: S(() => [
              (f(), F(Pe(r()), {
                class: "hover:no-underline",
                to: a(i.path),
                href: r() == "a" ? a(i.path) : void 0,
                onClick: (b) => u(i)
              }, {
                default: S(() => [
                  P(vt, {
                    icon: i.icon,
                    selected: i.value == d(w(t)),
                    disabled: i.disabled
                  }, null, 8, ["icon", "selected", "disabled"])
                ]),
                _: 2
              }, 1032, ["to", "href", "onClick"]))
            ]),
            _: 2
          }, 1032, ["text"]))), 128))
        ]))), 128))
      ]);
    };
  }
}), Za = /* @__PURE__ */ G(qa, [["__scopeId", "data-v-93bc751c"]]), Ka = {
  install(o) {
    o.component("BMenu", Za);
  }
}, Xa = ["src"], Ga = { class: "text-sm font-bold" }, Ja = { class: "flex flex-col items-center text-9xl px-xs pb-sm border-b-xxs text-neutral-interaction-default border-neutral-border-default gap-xs" }, Qa = ["src"], Ya = {
  key: 2,
  class: "text-sm text-center"
}, eo = {
  key: 3,
  class: "text-3xl font-bold mb-xxs text-center"
}, to = {
  key: 0,
  class: "flex flex-col items-center border-b-xxs text-neutral-interaction-default border-neutral-border-default"
}, lo = { class: "flex items-center w-full relative" }, ao = { class: "w-full flex flex-col divide-y-xxs divide-neutral-border-default font-bold max-h-[12em] overflow-auto custom-scroll" }, oo = ["onClick"], no = { class: "flex flex-col divide-y-xxs divide-neutral-border-default" }, so = { class: "text-sm font-bold" }, io = { class: "text-sm font-bold" }, ro = { class: "flex items-center justify-center px-xs py-sm pt-xl text-neutral-interaction-default font-bold text-xxs gap-5 *:cursor-pointer" }, uo = /* @__PURE__ */ q({
  __name: "BProfile",
  props: {
    modelValue: { default: void 0 },
    name: {},
    profilePicture: {},
    accounts: {},
    nameKey: { default: "name" },
    absolute: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "logout", "editProfile", "editAccount", "changeAccount", "privacyPolicyFunction", "termsOfUseFucntion"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, null);
    let l = A(!1), n = A(!1), u = A("");
    function d(m) {
      return e.accounts ? m ? e.accounts.filter((p) => {
        if (p[e.nameKey].toLowerCase().includes(m.toLowerCase()))
          return p;
      }) : e.accounts : [];
    }
    function a(m) {
      l.value = !1, t.value = m, c("update:modelValue", m), c("changeAccount", m);
    }
    function r(m) {
      setTimeout(() => {
        l.value = m;
      });
    }
    return (m, p) => {
      const h = W("BIcon"), y = W("BButton"), B = W("BSelectContainer");
      return f(), F(B, {
        modelValue: w(l),
        "onUpdate:modelValue": p[9] || (p[9] = (i) => ne(l) ? l.value = i : l = i),
        class: "b-profile",
        "aria-multiselectable": "false",
        absolute: m.absolute,
        disabled: m.disabled,
        "dont-have-max-height": "",
        "min-width": "25em"
      }, {
        items: S(() => [
          g("div", Ja, [
            m.profilePicture ? (f(), v("img", {
              key: 0,
              class: "profile-picture w-[1.3em] h-[1.3em] mb-xxs text-8xl",
              src: m.profilePicture,
              alt: "profile picture"
            }, null, 8, Qa)) : (f(), F(h, {
              key: 1,
              name: "account_circle",
              size: "1"
            })),
            w(t) && w(t)[m.nameKey] && m.name ? (f(), v("p", Ya, R(m.name), 1)) : H("", !0),
            w(t) && w(t)[m.nameKey] || m.name ? (f(), v("h4", eo, R(w(t) && w(t)[m.nameKey] || m.name), 1)) : H("", !0),
            P(y, {
              type: "submit",
              variant: "primary",
              onClick: p[1] || (p[1] = (i) => c("editProfile")),
              class: "mb-xxs truncate",
              disabled: !m.name && !m.profilePicture
            }, {
              default: S(() => [
                x(m.$slots, "editProfile", {}, () => [
                  p[10] || (p[10] = ae(" Edit profile "))
                ], !0)
              ]),
              _: 3
            }, 8, ["disabled"])
          ]),
          m.accounts && m.accounts.length ? (f(), v("div", to, [
            g("div", lo, [
              g("div", {
                class: I(["absolute left-1.5 text-xl", {
                  "text-primary-interaction-default": w(n) === !0
                }])
              }, [
                P(h, {
                  name: "search",
                  size: "xl"
                })
              ], 2),
              fe(g("input", {
                "onUpdate:modelValue": p[2] || (p[2] = (i) => ne(u) ? u.value = i : u = i),
                type: "search",
                class: "input-default",
                onFocus: p[3] || (p[3] = (i) => ne(n) ? n.value = !0 : n = !0),
                onBlur: p[4] || (p[4] = (i) => ne(n) ? n.value = !1 : n = !1),
                placeholder: "Search"
              }, null, 544), [
                [Me, w(u)]
              ])
            ]),
            g("div", {
              class: I(["w-full text-neutral-interaction-default", {
                "pr-xxs py-xxs": d(w(u)).length > 4
              }])
            }, [
              g("div", ao, [
                (f(!0), v(Q, null, te(d(w(u)), (i, b) => (f(), v("div", {
                  key: b,
                  class: "profile-option justify-start w-full *:text-sm hover:bg-neutral-surface-highlight",
                  onClick: (U) => a(i)
                }, [
                  x(m.$slots, "account", {
                    account: i,
                    index: b,
                    active: JSON.stringify(w(t) || {}) == JSON.stringify(i || {})
                  }, () => [
                    g("p", {
                      class: I(["text-sm", {
                        "*:underline": JSON.stringify(w(t) || {}) == JSON.stringify(i || {})
                      }])
                    }, R(i[m.nameKey]), 3)
                  ], !0)
                ], 8, oo))), 128))
              ])
            ], 2)
          ])) : H("", !0),
          g("div", no, [
            w(t) ? (f(), v("div", {
              key: 0,
              class: "profile-option action text-neutral-interaction-default hover:bg-neutral-surface-highlight",
              onClick: p[5] || (p[5] = (i) => c("editAccount"))
            }, [
              P(h, {
                name: "person",
                size: "xl"
              }),
              g("p", so, [
                x(m.$slots, "editAccount", {}, () => [
                  p[11] || (p[11] = ae(" Edit account "))
                ], !0)
              ])
            ])) : H("", !0),
            g("div", {
              class: "text-danger-interaction-default profile-option action hover:bg-danger-surface-default",
              onClick: p[6] || (p[6] = (i) => c("logout"))
            }, [
              P(h, {
                name: "logout",
                size: "xl"
              }),
              g("p", io, [
                x(m.$slots, "logout", {}, () => [
                  p[12] || (p[12] = ae(" Logout "))
                ], !0)
              ])
            ])
          ]),
          g("div", ro, [
            g("p", {
              onClick: p[7] || (p[7] = (i) => c("privacyPolicyFunction")),
              class: "hover:underline"
            }, [
              x(m.$slots, "privacyPolicy", {}, () => [
                p[13] || (p[13] = ae(" Privacy Policy "))
              ], !0)
            ]),
            g("p", {
              onClick: p[8] || (p[8] = (i) => c("termsOfUseFucntion")),
              class: "hover:underline"
            }, [
              x(m.$slots, "termsOfUse", {}, () => [
                p[14] || (p[14] = ae(" Terms of use "))
              ], !0)
            ])
          ])
        ]),
        default: S(() => [
          w(l) ? H("", !0) : (f(), v("div", {
            key: 0,
            class: "flex items-center gap-xs text-2xl mr-xxs text-neutral-interaction-default",
            onClick: p[0] || (p[0] = (i) => r(!w(l)))
          }, [
            m.profilePicture ? (f(), v("img", {
              key: 0,
              class: "profile-picture w-[1em] h-[1em]",
              src: m.profilePicture,
              alt: "profile picture"
            }, null, 8, Xa)) : (f(), F(h, {
              key: 1,
              name: "account_circle"
            })),
            g("p", Ga, R(w(t) && w(t)[m.nameKey] || m.name), 1)
          ]))
        ]),
        _: 3
      }, 8, ["modelValue", "absolute", "disabled"]);
    };
  }
}), co = /* @__PURE__ */ G(uo, [["__scopeId", "data-v-ae2a966c"]]), fo = {
  install(o) {
    o.component("BProfile", co);
  }
}, po = {
  key: 0,
  class: "flex w-full"
}, mo = ["onClick"], vo = { class: "step-value mr-[.6em]" }, go = {
  key: 0,
  class: "before-triangle-cover"
}, ho = {
  key: 1,
  class: "after-triangle-cover"
}, bo = {
  key: 1,
  class: "flex justify-end"
}, yo = {
  key: 0,
  class: "background"
}, Co = ["data-after-content", "onClick"], Bo = /* @__PURE__ */ q({
  __name: "BStepper",
  props: {
    modelValue: { default: void 0 },
    items: {},
    size: { default: "medium" },
    disabled: { type: Boolean, default: !1 },
    allowedSkip: { type: Boolean, default: !1 },
    background: { default: "var(--neutral-background-default)" },
    version: { default: 1 }
  },
  emits: ["update:modelValue", "changeStep"],
  setup(o, { emit: s }) {
    ke((p) => ({
      "2e6ecb51": p.background
    }));
    const e = o, c = A(e.modelValue), t = A(0), l = A(0), n = A(/* @__PURE__ */ new Set());
    n.value.add(0), ge(() => {
      c.value || d(e.items[0], 0);
    }), le(
      () => e.modelValue,
      () => {
        c.value = e.modelValue;
        const p = m(c.value);
        p != -1 && (t.value = p, n.value.add(p), l.value < p && t.value === p && (l.value = p));
      }
    );
    const u = s;
    function d(p, h) {
      e.disabled || ((l.value + 1 === h || t.value > h || l.value >= h || e.allowedSkip) && (t.value = h, c.value = p, u("update:modelValue", p)), l.value < h && t.value === h && (l.value = h)), n.value.add(h), u("changeStep", p, h);
    }
    function a(p) {
      return !n.value.has(p) && p < l.value && e.allowedSkip;
    }
    function r(p) {
      return de(p) ? p.value : p;
    }
    function m(p) {
      return e.items.findIndex((h) => r(h) == r(p));
    }
    return (p, h) => {
      const y = W("BIcon");
      return f(), v(Q, null, [
        p.version == 1 ? (f(), v("div", po, [
          (f(!0), v(Q, null, te(p.items, (B, i) => (f(), v("button", {
            key: `step-button-${i}`,
            class: I(["step-button", [
              p.size,
              {
                "active-button": i === t.value,
                "fisrt-button": i === 0,
                "last-button": !p.items[i + 1],
                "middle-button": i !== 0 && p.items[i + 1],
                "even-button": i % 2 == 0,
                "past-button": i <= l.value
              }
            ]]),
            onClick: (b) => d(B, i)
          }, [
            g("span", vo, R(B.label ? B.label : B), 1),
            i !== 0 ? (f(), v("span", go)) : H("", !0),
            p.items[i + 1] ? (f(), v("span", ho)) : H("", !0)
          ], 10, mo))), 128))
        ])) : H("", !0),
        p.version == 2 ? (f(), v("div", bo, [
          (f(!0), v(Q, null, te(p.items, (B, i) => (f(), v("div", {
            key: `step-button-${i}`,
            class: I(["flex items-center", [p.size, p.items[i + 1] ? "w-full" : "w-fit"]])
          }, [
            g("div", {
              class: I(["button-container", { "scale-[1.2]": i === t.value }])
            }, [
              i === t.value ? (f(), v("div", yo, h[0] || (h[0] = [
                g("div", { class: "bg-primary-interaction-default h-[52.5%]" }, null, -1),
                g("div", { class: "netrual-border-color h-[47%]" }, null, -1)
              ]))) : (f(), v("div", {
                key: 1,
                class: I(["background", [
                  a(i) || i <= l.value ? "bg-primary-interaction-default" : "netrual-border-color"
                ]])
              }, null, 2)),
              g("button", {
                class: I(["step-button-circle", {
                  "active-button": i === t.value,
                  "past-button": i <= l.value,
                  "skip-button": a(i)
                }]),
                "data-after-content": B.label ? B.label : B,
                onClick: (b) => d(B, i)
              }, [
                P(y, {
                  name: B.icon ? B.icon : "image"
                }, null, 8, ["name"])
              ], 10, Co)
            ], 2),
            p.items[i + 1] ? (f(), v("span", {
              key: 0,
              class: I(["right-line", [
                i < l.value ? "bg-primary-interaction-default" : "netrual-border-color"
              ]])
            }, null, 2)) : H("", !0)
          ], 2))), 128))
        ])) : H("", !0)
      ], 64);
    };
  }
}), wo = /* @__PURE__ */ G(Bo, [["__scopeId", "data-v-6d0ac991"]]), ko = {
  install(o) {
    o.component("BStepper", wo);
  }
}, Vo = { class: "flex font-bold text-sm gap-xs w-fit" }, $o = ["onClick"], Mo = {
  key: 0,
  class: "flex items-center gap-xxs"
}, xo = { key: 1 }, Io = { key: 1 }, Ao = { key: 1 }, So = /* @__PURE__ */ q({
  __name: "BTab",
  props: {
    modelValue: { default: void 0 },
    items: {},
    isIcon: { type: Boolean, default: !1 },
    notCard: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = A(e.modelValue);
    ge(() => {
      c.value || l(e.items[0]);
    }), le(
      () => e.modelValue,
      (u) => c.value = u
    );
    const t = s;
    function l(u) {
      c.value = u, t("update:modelValue", u);
    }
    function n(u) {
      return de(u) ? u.value : u;
    }
    return (u, d) => {
      const a = W("BIcon");
      return f(), v("div", {
        class: I(["b-tab", {
          "bg-neutral-surface-highlight": !u.notCard
        }])
      }, [
        g("div", Vo, [
          (f(!0), v(Q, null, te(u.items, (r, m) => (f(), v("button", {
            key: m,
            class: I(["default-tab", { "active-tab": n(c.value) == n(r) }]),
            onClick: (p) => l(r)
          }, [
            w(de)(r) ? (f(), v("div", Mo, [
              r.icon ? (f(), F(a, {
                key: 0,
                name: r.icon
              }, null, 8, ["name"])) : H("", !0),
              r.label ? (f(), v("h5", xo, R(r.label), 1)) : H("", !0)
            ])) : (f(), v("div", Io, [
              u.isIcon ? (f(), F(a, {
                key: 0,
                name: r
              }, null, 8, ["name"])) : (f(), v("h5", Ao, R(r), 1))
            ]))
          ], 10, $o))), 128))
        ])
      ], 2);
    };
  }
}), Do = /* @__PURE__ */ G(So, [["__scopeId", "data-v-6c115e01"]]), Eo = {
  install(o) {
    o.component("BTab", Do);
  }
}, Ho = { class: "b-table-style" }, To = { key: 0 }, Lo = ["disabled"], Po = ["disabled"], zo = ["onClick"], Oo = { class: "truncate" }, Wo = {
  key: 2,
  style: { flex: "1" },
  class: "bg-white pointer-events-none"
}, Uo = { key: 1 }, jo = { key: 2 }, Ro = {
  key: 0,
  class: "skeleton-table-cell"
}, Fo = { key: 1 }, _o = { colspan: "100%" }, No = { key: 3 }, qo = { key: 4 }, Zo = {
  key: 0,
  class: "flex items-center justify-between mt-base text-neutral-foreground-low flex-wrap"
}, Ko = { class: "flex items-center gap-xs" }, Xo = { class: "text-sm" }, Go = { class: "text-sm" }, Jo = /* @__PURE__ */ q({
  __name: "BTable",
  props: {
    headers: {},
    items: {},
    options: {},
    page: { default: 1 },
    itemsPerPage: { default: 10 },
    numberOfItems: { default: 0 },
    renderPaginationInBackEnd: { type: Boolean, default: !1 },
    hideFooter: { type: Boolean, default: !1 },
    isHeaderFixed: { type: Boolean, default: !1 },
    enableSelection: { type: Boolean, default: !1 },
    enableAggregation: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 },
    noShadow: { type: Boolean, default: !1 },
    hasHover: { type: Boolean, default: !1 }
  },
  emits: ["update:page", "update:itemsPerPage", "sortBy", "pageItems", "selectAll"],
  setup(o, { emit: s }) {
    var j;
    const e = o, c = s, t = tt(), l = A(((j = e.options) == null ? void 0 : j.sortBy) || ""), n = A(e.items || []), u = A(b()), d = A(e.itemsPerPage || 10), a = A(e.page || 1), r = A([5, 10, 20, 50, 100]), m = A(!1), p = Y(() => {
      var T;
      return e.renderPaginationInBackEnd ? Math.ceil(e.numberOfItems / d.value) : Math.ceil(((T = e.items) == null ? void 0 : T.length) / d.value);
    }), h = Y(
      () => a.value === 1 ? 1 : (a.value - 1) * d.value + 1
    ), y = Y(
      () => (a.value - 1) * d.value + n.value.length
    ), B = Y(
      () => {
        var T;
        return e.renderPaginationInBackEnd ? e.numberOfItems : ((T = e.items) == null ? void 0 : T.length) || 0;
      }
    ), i = Y(() => {
      let T = e.headers.length;
      return e.enableSelection && T++, e.enableAggregation && T++, t.actions && T++, T;
    });
    ge(() => {
      var T;
      e.renderPaginationInBackEnd || (l.value ? D(l.value, (T = e.options) == null ? void 0 : T.sortDesc) : z(e.page, e.itemsPerPage));
    }), le(
      () => e.itemsPerPage,
      (T) => {
        $(T, !1);
      }
    ), le(
      () => e.page,
      (T) => {
        U(T, !1);
      }
    ), le(
      () => e.items,
      () => {
        n.value = e.items, e.renderPaginationInBackEnd || D(l.value, u.value[l.value], !1);
      },
      { deep: !0, immediate: !0 }
    );
    function b() {
      const T = {};
      return e.headers.forEach((M) => {
        var N;
        M.value == l.value ? T[M.value] = !!((N = e.options) != null && N.sortDesc) : T[M.value] = !1;
      }), T;
    }
    function U(T, M = !0) {
      a.value = T, M && c("update:page", T), z(T, d.value);
    }
    function $(T, M = !0) {
      d.value = T || 10, a.value = 1, M && c("update:itemsPerPage", T), c("update:page", 1), D(l.value, u.value[l.value]);
    }
    function D(T, M = !0, N = !0) {
      var k;
      e.renderPaginationInBackEnd ? N && c("sortBy", T, M) : (l.value = T, n.value = (k = e.items) == null ? void 0 : k.sort((V, O) => {
        const C = V[T], E = O[T];
        if (typeof C == "string" && typeof E == "string") {
          const ee = C.toLowerCase(), oe = E.toLowerCase();
          return M ? ee.localeCompare(oe) : oe.localeCompare(ee);
        } else {
          if (typeof C == "number" && typeof E == "number")
            return M ? C - E : E - C;
          if (C instanceof Date && E instanceof Date)
            return M ? C.getTime() - E.getTime() : E.getTime() - C.getTime();
          {
            const ee = String(C), oe = String(E), se = ee.toLowerCase(), pe = oe.toLowerCase();
            return M ? se.localeCompare(pe) : pe.localeCompare(se);
          }
        }
      })), z(a.value, d.value);
    }
    function z(T, M) {
      var N;
      if (e.renderPaginationInBackEnd)
        c("pageItems", T, M);
      else {
        const k = (T - 1) * M, V = k + M;
        n.value = (N = e.items) == null ? void 0 : N.slice(k, V);
      }
    }
    function Z(T) {
      var M;
      c("selectAll", T), (M = e.items) == null || M.map((N) => N.selected = T), n.value = e.items;
    }
    return (T, M) => {
      const N = W("BCheckbox"), k = W("BIcon"), V = W("BSelect"), O = W("BPagination");
      return f(), v(Q, null, [
        g("div", {
          class: I(["b-table", { "header-fixed-table": T.isHeaderFixed, "no-shadow": T.noShadow }])
        }, [
          g("table", Ho, [
            T.loading ? (f(), v("thead", Uo, [
              g("tr", null, [
                (f(!0), v(Q, null, te(i.value || 3, (C) => (f(), v("th", {
                  key: C,
                  class: "skeleton-table-cell"
                }, M[3] || (M[3] = [
                  g("div", { class: "skeleton-table-div" }, null, -1)
                ])))), 128))
              ])
            ])) : (f(), v("thead", To, [
              g("tr", null, [
                T.enableAggregation ? (f(), v("th", {
                  key: 0,
                  disabled: !n.value.length,
                  class: "first-th pointer-events-none",
                  style: { width: "2%" }
                }, null, 8, Lo)) : H("", !0),
                T.enableSelection ? (f(), v("th", {
                  key: 1,
                  disabled: !n.value.length,
                  class: I(["hover:bg-neutral-surface-default", { "first-th": !T.enableAggregation }]),
                  style: { width: "2%" }
                }, [
                  P(N, {
                    modelValue: m.value,
                    "onUpdate:modelValue": [
                      M[0] || (M[0] = (C) => m.value = C),
                      Z
                    ]
                  }, null, 8, ["modelValue"])
                ], 10, Po)) : H("", !0),
                (f(!0), v(Q, null, te(T.headers, (C, E) => (f(), v("th", {
                  key: E,
                  class: I(["cursor-pointer", {
                    "first-th": E === 0 && !T.enableSelection && !T.enableAggregation,
                    "last-th": !T.headers[E + 1] && !T.$slots.actions,
                    "pointer-events-none": !C.sortable
                  }]),
                  style: re({ width: C.width ? C.width : "fit-content" }),
                  onClick: (ee) => D(
                    C.value,
                    u.value[C.value] = !u.value[C.value]
                  )
                }, [
                  g("div", {
                    class: "flex w-full items-center gap-xs text-neutral-interaction-default",
                    style: re({
                      "justify-content": C.align ? C.align : "flex-start"
                    })
                  }, [
                    g("p", Oo, R(C.label), 1),
                    C.sortable ? (f(), v("span", {
                      key: 0,
                      class: I(["icon", {
                        "rotate-180": u.value[C.value],
                        "icon-active": C.value == l.value
                      }])
                    }, [
                      P(k, { name: "arrow_upward" })
                    ], 2)) : H("", !0)
                  ], 4)
                ], 14, zo))), 128)),
                T.$slots.actions ? (f(), v("th", Wo)) : H("", !0)
              ])
            ])),
            T.loading || !n.value.length ? (f(), v("tbody", jo, [
              T.loading ? (f(), v(Q, { key: 0 }, te(10, (C) => g("tr", { key: C }, [
                (f(!0), v(Q, null, te(i.value || 3, (E) => (f(), v("td", {
                  key: E,
                  class: "skeleton-table-cell"
                }, M[4] || (M[4] = [
                  g("div", { class: "skeleton-table-div" }, null, -1)
                ])))), 128)),
                T.$slots.actions ? (f(), v("td", Ro, M[5] || (M[5] = [
                  g("div", { class: "skeleton-table-div" }, null, -1)
                ]))) : H("", !0)
              ])), 64)) : n.value.length ? H("", !0) : (f(), v("tr", Fo, [
                g("td", _o, [
                  x(T.$slots, "empty-state", {}, void 0, !0)
                ])
              ]))
            ])) : (f(), v("tbody", No, [
              (f(!0), v(Q, null, te(n.value, (C, E) => (f(), v(Q, { key: E }, [
                g("tr", {
                  class: I(["*:py-sm *:px-lg text-neutral-foreground-low", { "hover:bg-primary-surface-default": T.hasHover }])
                }, [
                  T.enableAggregation ? x(T.$slots, "aggregation", {
                    key: 0,
                    item: C,
                    index: E
                  }, void 0, !0) : H("", !0),
                  T.enableSelection ? x(T.$slots, "select", {
                    key: 1,
                    item: C,
                    index: E
                  }, void 0, !0) : H("", !0),
                  (f(!0), v(Q, null, te(T.headers, (ee) => x(T.$slots, ee.value, {
                    key: ee.value,
                    item: C,
                    index: E
                  }, void 0, !0)), 128)),
                  T.$slots.actions ? x(T.$slots, "actions", {
                    key: 2,
                    item: C,
                    index: E
                  }, void 0, !0) : H("", !0)
                ], 2),
                C.expanded ? x(T.$slots, "childs", {
                  key: 0,
                  item: C,
                  index: E
                }, void 0, !0) : H("", !0)
              ], 64))), 128))
            ])),
            T.$slots.footer ? (f(), v("tfoot", qo, [
              x(T.$slots, "footer", {}, void 0, !0)
            ])) : H("", !0)
          ])
        ], 2),
        T.hideFooter ? H("", !0) : (f(), v("footer", Zo, [
          g("div", Ko, [
            g("p", Xo, [
              x(T.$slots, "items-per-page", {}, () => [
                M[6] || (M[6] = ae(" Items per page "))
              ], !0)
            ]),
            P(V, {
              modelValue: d.value,
              "onUpdate:modelValue": [
                M[1] || (M[1] = (C) => d.value = C),
                $
              ],
              items: r.value,
              absolute: ""
            }, {
              default: S(() => [
                ae(R(d.value), 1)
              ]),
              _: 1
            }, 8, ["modelValue", "items"])
          ]),
          P(O, {
            modelValue: a.value,
            "onUpdate:modelValue": [
              M[2] || (M[2] = (C) => a.value = C),
              U
            ],
            length: p.value
          }, null, 8, ["modelValue", "length"]),
          g("div", null, [
            g("p", Go, [
              x(T.$slots, "showing-page", {
                min: h.value,
                max: y.value,
                total: B.value
              }, () => [
                ae(" Showing " + R(h.value) + "-" + R(y.value) + " of " + R(B.value), 1)
              ], !0)
            ])
          ])
        ]))
      ], 64);
    };
  }
}), Qo = /* @__PURE__ */ G(Jo, [["__scopeId", "data-v-93ecbc98"]]), Yo = {
  install(o) {
    o.component("BTable", Qo);
  }
}, en = {
  key: 0,
  class: "flex absolute w-full h-full"
}, tn = { class: "relative z-1" }, ln = /* @__PURE__ */ q({
  __name: "Day",
  props: {
    modelValue: {},
    hovered: {},
    day: {},
    isCompare: { type: Boolean, default: !1 },
    maxInit: {},
    maxEnd: {},
    index: { default: 0 },
    size: { default: 1 },
    position: { default: "middle" }
  },
  emits: ["update:modelValue", "update:hovered", "select"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    function t(a, r = 0, m = !1) {
      var h;
      if (!e.modelValue || r > 0 && (e.size == 1 || !e.isCompare))
        return !1;
      let p = d(r);
      return (p == null ? void 0 : p.length) > 1 ? Xe(p[0], p[1], a, m) : m && ((h = p[0]) == null ? void 0 : h.toISOString().substr(0, 10)) === (a == null ? void 0 : a.toISOString().substr(0, 10));
    }
    function l(a, r = 0) {
      if (!e.hovered || !e.modelValue || r > 0 && !e.isCompare && e.size == 1 || e.size == 1 && !e.isCompare)
        return !1;
      let m = d(r);
      return m.length === 1 && Xe(m[0], e.hovered, a);
    }
    function n(a, r = 0) {
      var B, i, b;
      if (!e.modelValue || !e.isCompare && e.size == 1)
        return !1;
      let m = d(r);
      const p = a == null ? void 0 : a.toISOString().substr(0, 10);
      let h = (B = e.hovered) == null ? void 0 : B.toISOString().substr(0, 10), y = (i = m[0]) == null ? void 0 : i.toISOString().substr(0, 10);
      if (m.length > 1 && (h = (b = m[1]) == null ? void 0 : b.toISOString().substr(0, 10)), !(y != p && p != h)) {
        if (h == p && (h = y), !h || !p) return !1;
        if (p < h) return "is-bigger";
        if (p > h) return "is-smaller";
      }
    }
    function u(a) {
      return e.maxInit ? a.toISOString().substr(0, 10) <= e.maxInit.toISOString().substr(0, 10) : e.maxEnd ? a.toISOString().substr(0, 10) >= e.maxEnd.toISOString().substr(0, 10) : !1;
    }
    function d(a = 0) {
      if (!e.modelValue) return [];
      let r = e.modelValue;
      return e.isCompare && e.size > 1 && (r = e.modelValue[a]), r;
    }
    return (a, r) => a.day ? (f(), v("div", {
      key: 0,
      class: I(["day", [
        {
          "range-primary": t(a.day),
          "range-secondary": t(a.day, 1),
          "selected-primary": t(a.day, 0, !0),
          "selected-secondary": t(a.day, 1, !0),
          disabled: u(a.day),
          "hovered-primary": l(a.day),
          "hovered-secondary": l(a.day, 1),
          "is-compare": a.isCompare || a.size > 1
        },
        n(a.day),
        n(a.day, 1),
        a.position
      ]]),
      onMouseover: r[0] || (r[0] = (m) => c("update:hovered", a.day)),
      onMouseleave: r[1] || (r[1] = (m) => c("update:hovered", null)),
      onClick: r[2] || (r[2] = (m) => c("select", a.day))
    }, [
      (a.hovered == a.day && d(0).length > 1 || t(a.day, 1, !0)) && t(a.day, 0, !0) && (d(1).length < 2 || t(a.day, 1, !0)) && a.size > 1 && a.isCompare ? (f(), v("div", en, [
        r[3] || (r[3] = g("div", { class: "half-day bg-primary-interaction-default" }, null, -1)),
        g("div", {
          class: I([
            "half-day",
            t(a.day, 1, !0) ? "bg-primary-interaction-selected" : "bg-primary-surface-hover"
          ])
        }, null, 2)
      ])) : H("", !0),
      g("span", tn, R(a.day.getDate()), 1)
    ], 34)) : H("", !0);
  }
}), an = /* @__PURE__ */ G(ln, [["__scopeId", "data-v-bf893b2f"]]), on = /* @__PURE__ */ q({
  __name: "DateDialog",
  props: {
    show: { type: Boolean, default: !1 },
    items: {},
    vertical: { type: Boolean, default: !1 },
    width: { default: "90%" },
    maxHeight: { default: "none" },
    noPadding: { type: Boolean, default: !1 }
  },
  setup(o) {
    return (s, e) => {
      const c = W("BCard");
      return f(), F(ve, { name: "appear" }, {
        default: S(() => [
          s.show ? (f(), F(c, {
            key: 0,
            class: I(["absolute z-1 transition-transform top-[20%] left-[50%] -translate-x-1/2 flex items-center justify-center", {
              "overflow-auto": s.maxHeight != "none",
              "flex-wrap": !s.vertical,
              "flex-col": s.vertical,
              "p-sm gap-xs": !s.noPadding
            }]),
            style: re({
              "max-height": s.maxHeight,
              width: s.width
            })
          }, {
            default: S(() => [
              (f(!0), v(Q, null, te(s.items, (t) => x(s.$slots, "item", { item: t }, void 0, !0)), 256))
            ]),
            _: 3
          }, 8, ["class", "style"])) : H("", !0)
        ]),
        _: 3
      });
    };
  }
}), Qe = /* @__PURE__ */ G(on, [["__scopeId", "data-v-1102da5d"]]), nn = { class: "b-calendar flex relative w-fit" }, sn = { class: "relative flex items-center justify-center gap-xs mb-xs" }, rn = ["onClick"], un = { key: 0 }, dn = { class: "*:p-xxs" }, cn = ["onClick"], fn = ["onClick"], pn = /* @__PURE__ */ q({
  __name: "Calendar",
  props: {
    modelValue: {},
    initialDates: {},
    lang: { default: "en-US" },
    isCompare: { type: Boolean, default: !1 },
    maxInit: {},
    maxEnd: {}
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t, l] = ie(
      e,
      "modelValue",
      c,
      e.isCompare && e.initialDates.length != 1 ? [[], []] : []
    ), n = A(!0), u = A(!0), d = A(!1), a = A(!1), r = A(), m = A(0), p = Y(() => {
      const k = /* @__PURE__ */ new Date("2021-10-03T23:15:30"), V = [];
      for (let O = 0; O < 7; O++) {
        const C = k.toLocaleDateString(e.lang, { weekday: "long" }), E = C.charAt(0).toUpperCase() + C.charAt(1).toLowerCase();
        V.push(E), k.setDate(k.getDate() + 1);
      }
      return V;
    }), h = Y(() => qt(e.lang)), y = Y(() => {
      const k = [], V = e.initialDates[e.initialDates.length - 1].date;
      for (let O = V.getFullYear() + 56; O >= V.getFullYear() - 62; O--)
        k.push(O);
      return k;
    }), B = A(
      e.initialDates.map((k) => i(k.date, k.value))
    );
    le(
      () => e.lang,
      () => {
        b(0, !1);
      }
    ), le(
      () => e.initialDates,
      () => {
        B.value = e.initialDates.map(
          (k) => i(k.date, k.value)
        ), b();
      }
    );
    function i(k, V = 1) {
      return {
        title: j(k),
        weeks: Je(k),
        value: V,
        date: k
      };
    }
    function b(k, V = !0) {
      B.value.forEach((O) => {
        k && O.date.setMonth(O.date.getMonth() + k), V && (O.weeks = Je(O.date)), O.title = j(O.date);
      });
    }
    function U(k) {
      let V = t.value;
      if (e.isCompare && B.value.length != 1) {
        (!V[0] || V[1].length > 1) && (V = [[], []]);
        let O = 0;
        V[0].length > 1 && (O = 1), V[O] = $(k, V[O]);
      } else
        V = $(k, V);
      l(V, {});
    }
    function $(k, V) {
      return V.length > 1 || !V.length || B.value.length == 1 && !e.isCompare ? (V = [], V[0] = k) : k < V[0] ? (V[1] = V[0], V[0] = k) : V[1] = k, V;
    }
    function D(k) {
      d.value = !1;
      const V = m.value, O = B.value[V].date, C = B.value[V == B.value.length - 1 ? 0 : V + 1].date, E = B.value[V].value;
      O.setMonth(k), B.value.length > 1 && C.setMonth(O.getMonth() + E), b();
    }
    function z(k) {
      a.value = !1, d.value = !1;
      const V = m.value, O = B.value[V].date, C = B.value[V == B.value.length - 1 ? 0 : V + 1].date;
      let E = B.value[V].value;
      !(O.getMonth() == 1 && E == 1) && !(O.getMonth() == 11 && E == -1) && (E = 0), O.setFullYear(k), B.value.length > 1 && C.setFullYear(k + E), b();
    }
    function Z(k) {
      m.value = k, d.value && !a.value ? a.value = !0 : (d.value = !d.value, a.value = !1), b();
    }
    function j(k) {
      return a.value || d.value ? Ge(
        k.toLocaleDateString(e.lang, { year: "numeric" })
      ) : Ge(
        k.toLocaleDateString(e.lang, { year: "numeric", month: "long" })
      );
    }
    function T(k, V) {
      const O = V.filter((E) => E), C = O.findIndex((E) => E == k);
      return k == O[0] ? "start" : C == O.length - 1 ? "end" : "middle";
    }
    function M(k) {
      u.value = k === -1, n.value = !1, b(k), setTimeout(() => {
        n.value = !0;
      }, 100);
    }
    function N() {
      setTimeout(() => {
        d.value = !1, a.value = !1, b();
      }, 100);
    }
    return (k, V) => {
      const O = W("BIcon");
      return f(), v("div", nn, [
        (f(!0), v(Q, null, te(B.value, (C, E) => (f(), v("div", {
          key: E,
          class: "w-fit p-sm overflow-hidden"
        }, [
          g("header", sn, [
            E == 0 ? (f(), v("div", {
              key: 0,
              class: "calendar-arrow left-0",
              onClick: V[0] || (V[0] = (ee) => M(-1))
            }, [
              P(O, { name: "chevron_left" })
            ])) : H("", !0),
            P(ve, {
              name: u.value ? "slide-fade-out" : "slide-fade"
            }, {
              default: S(() => [
                n.value ? (f(), v("h1", {
                  key: 0,
                  class: "text-base font-bold cursor-pointer text-neutral-foreground-high",
                  tabindex: "0",
                  onBlur: N,
                  onClick: (ee) => Z(E)
                }, R(C.title), 41, rn)) : H("", !0)
              ]),
              _: 2
            }, 1032, ["name"]),
            B.value.length - 1 == E ? (f(), v("div", {
              key: 1,
              class: "calendar-arrow right-0",
              onClick: V[1] || (V[1] = (ee) => M(1))
            }, [
              P(O, { name: "chevron_right" })
            ])) : H("", !0)
          ]),
          g("main", null, [
            P(ve, {
              name: u.value ? "slide-fade-out" : "slide-fade"
            }, {
              default: S(() => [
                n.value ? (f(), v("table", un, [
                  g("thead", null, [
                    g("tr", dn, [
                      (f(!0), v(Q, null, te(p.value, (ee, oe) => (f(), v("th", { key: oe }, R(ee), 1))), 128))
                    ])
                  ]),
                  (f(!0), v(Q, null, te(C.weeks.filter((ee) => ee.some((oe) => oe)), (ee, oe) => (f(), v("tr", {
                    key: oe,
                    class: "*:py-xxs *:px-0"
                  }, [
                    (f(!0), v(Q, null, te(ee, (se, pe) => (f(), v("td", { key: pe }, [
                      P(an, {
                        modelValue: w(t),
                        "onUpdate:modelValue": V[2] || (V[2] = (be) => ne(t) ? t.value = be : null),
                        hovered: r.value,
                        "onUpdate:hovered": V[3] || (V[3] = (be) => r.value = be),
                        day: se,
                        "is-compare": k.isCompare,
                        size: B.value.length,
                        index: pe,
                        position: T(se, ee),
                        "max-init": k.maxInit,
                        "max-end": k.maxEnd,
                        onSelect: U
                      }, null, 8, ["modelValue", "hovered", "day", "is-compare", "size", "index", "position", "max-init", "max-end"])
                    ]))), 128))
                  ]))), 128))
                ])) : H("", !0)
              ]),
              _: 2
            }, 1032, ["name"])
          ])
        ]))), 128)),
        P(Qe, {
          show: d.value && !a.value,
          items: h.value,
          wrap: ""
        }, {
          item: S(({ item: C }) => [
            g("div", {
              class: I([[
                C.value === B.value[m.value].date.getMonth() ? "bg-primary-interaction-default" : "bg-primary-surface-highlight"
              ], "flex items-center justify-center flex-1 cursor-pointer min-w-[30%] text-neutral-foreground-negative text-sm p-sm border-xxs hover:bg-primary-interaction-hover"]),
              style: { "border-radius": "var(--rounded-base)" },
              onClick: (E) => D(C.value)
            }, R(C.label), 11, cn)
          ]),
          _: 1
        }, 8, ["show", "items"]),
        P(Qe, {
          show: a.value,
          items: y.value,
          vertical: "",
          "max-height": "70%",
          "no-padding": ""
        }, {
          item: S(({ item: C }) => [
            g("div", {
              class: I(["flex items-center justify-center cursor-pointer w-full p-xxs text-sm hover:bg-primary-surface-default hover:text-primary-interaction-default", {
                "text-primary-interaction-default bg-primary-surface-default": C === B.value[m.value].date.getFullYear()
              }]),
              onClick: (E) => z(C)
            }, R(C), 11, fn)
          ]),
          _: 1
        }, 8, ["show", "items"])
      ]);
    };
  }
}), gt = /* @__PURE__ */ G(pn, [["__scopeId", "data-v-887da1af"]]), mn = /* @__PURE__ */ q({
  __name: "BDate",
  props: {
    modelValue: {},
    lang: { default: "en-US" },
    isPeriod: { type: Boolean, default: !1 },
    maxInit: {},
    maxEnd: {}
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = A([]), t = A([
      {
        date: /* @__PURE__ */ new Date()
      }
    ]);
    ge(n), le(() => e.modelValue, n), le(() => e.isPeriod, () => c.value = []);
    const l = s;
    function n() {
      Array.isArray(e.modelValue) ? c.value = e.modelValue : c.value[0] = e.modelValue;
    }
    function u(d) {
      e.isPeriod ? l("update:modelValue", c.value) : (c.value = d, l("update:modelValue", d[0]));
    }
    return (d, a) => (f(), F(gt, {
      modelValue: c.value,
      "onUpdate:modelValue": [
        a[0] || (a[0] = (r) => c.value = r),
        u
      ],
      "initial-dates": t.value,
      "is-compare": d.isPeriod,
      lang: d.lang,
      "max-init": d.maxInit,
      "max-end": d.maxEnd
    }, null, 8, ["modelValue", "initial-dates", "is-compare", "lang", "max-init", "max-end"]));
  }
}), vn = {
  install(o) {
    o.component("BDate", mn);
  }
}, gn = { class: "colored font-bold whitespace-nowrap truncate" }, hn = /* @__PURE__ */ q({
  __name: "BTag",
  props: {
    text: { default: "" },
    color: { default: "primary" },
    size: { default: "medium" },
    type: { default: "default" },
    loading: { type: Boolean, default: !1 },
    closeable: { type: Boolean, default: !1 },
    icon: { default: "" },
    isAppendedIcon: { type: Boolean, default: !1 }
  },
  emits: ["close"],
  setup(o, { emit: s }) {
    const e = o, c = s, t = Y(() => e.isAppendedIcon ? "" : e.icon), l = Y(() => e.closeable ? "close" : e.isAppendedIcon ? e.icon : "");
    return (n, u) => {
      const d = W("BSpinner"), a = W("BIcon");
      return f(), v("div", {
        class: I([[n.color, n.type, n.size], "b-tag"])
      }, [
        n.loading ? (f(), F(d, {
          key: 0,
          class: "colored"
        })) : (f(), v(Q, { key: 1 }, [
          t.value ? (f(), F(a, {
            key: 0,
            class: "colored",
            name: t.value
          }, null, 8, ["name"])) : H("", !0),
          g("p", gn, [
            x(n.$slots, "default", {}, () => [
              ae(R(n.text), 1)
            ], !0)
          ]),
          l.value ? (f(), F(a, {
            key: 1,
            class: I(["colored", { "cursor-pointer": n.closeable }]),
            name: l.value,
            onClick: u[0] || (u[0] = (r) => n.closeable && c("close"))
          }, null, 8, ["class", "name"])) : H("", !0)
        ], 64))
      ], 2);
    };
  }
}), bn = /* @__PURE__ */ G(hn, [["__scopeId", "data-v-63b8931c"]]), yn = {
  install(o) {
    o.component("BTag", bn);
  }
}, Cn = { key: 0 }, Bn = { class: "flex flex-col items-center divide-y-xxs divide-neutral-default overflow-x-hidden" }, wn = { class: "flex flex-col w-full p-xs" }, kn = { class: "flex items-center justify-end gap-xs w-full" }, Vn = /* @__PURE__ */ q({
  __name: "BDateFilter",
  props: {
    modelValue: {},
    labelValue: { default: "" },
    lang: { default: "en-US" },
    maxInit: {},
    maxEnd: {},
    disabled: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    absolute: { type: Boolean, default: !0 },
    required: { type: Boolean },
    options: { default: dt }
  },
  emits: ["update:modelValue", "apply"],
  setup(o, { emit: s }) {
    var p;
    const e = o;
    let c = A(!1), t = A(e.modelValue ? e.modelValue : []), l = A(
      e.options.length && ((p = e.options.find((h) => h.selected)) == null ? void 0 : p.value) || ""
    ), n = A("");
    t.value.length && (n.value = d(t.value[0]) + (t.value[1] ? " - " + d(t.value[1]) : "")), ge(() => {
      if (l.value) {
        let h = e.options.find(
          (y) => y.value == l.value
        );
        t.value = h.calculate();
      }
    });
    const u = s;
    le(
      () => e.modelValue,
      (h) => t.value = h
    );
    function d(h) {
      if (h)
        return h.toLocaleDateString(e.lang, {
          year: "numeric",
          month: "short",
          day: "2-digit"
        });
    }
    function a(h) {
      const y = h.calculate();
      let B = y[0], i = y[1];
      e.maxInit && e.maxInit.toISOString().substr(0, 10) >= B.toISOString().substr(0, 10) || e.maxEnd && e.maxEnd.toISOString().substr(0, 10) <= i.toISOString().substr(0, 10) || (n.value = "", t.value = [B, i], l.value = h.value, u("update:modelValue", t.value));
    }
    function r() {
      l.value = "", n.value = "", t.value = [], u("update:modelValue", t.value);
    }
    function m() {
      t.value ? n.value = d(t.value[0]) + (t.value[1] ? " - " + d(t.value[1]) : "") : n.value = "", l.value = "", u("update:modelValue", t.value);
    }
    return (h, y) => {
      const B = W("BIcon"), i = W("BDate"), b = W("BButton"), U = W("BSelectContainer");
      return f(), F(U, {
        modelValue: w(c),
        "onUpdate:modelValue": y[2] || (y[2] = ($) => ne(c) ? c.value = $ : c = $),
        "label-value": h.labelValue,
        required: h.required,
        class: "b-select",
        "aria-multiselectable": "false",
        "dont-have-max-height": "",
        absolute: h.absolute,
        disabled: h.disabled,
        "is-error": h.isError,
        "error-message": h.errorMessage,
        "hide-arrow": "",
        onClick: () => {
        }
      }, {
        items: S(() => [
          g("div", Bn, [
            P(i, {
              modelValue: w(t),
              "onUpdate:modelValue": [
                y[0] || (y[0] = ($) => ne(t) ? t.value = $ : t = $),
                m
              ],
              lang: h.lang,
              "is-period": "",
              "max-init": h.maxInit,
              "max-end": h.maxEnd
            }, null, 8, ["modelValue", "lang", "max-init", "max-end"]),
            g("div", wn, [
              (f(!0), v(Q, null, te(h.options, ($, D) => (f(), F(Ve, {
                key: D,
                class: "px-xs py-sm",
                selected: w(l) === $.value,
                disabled: $.disabled,
                onClick: (z) => a($)
              }, {
                default: S(() => [
                  ae(R($.label), 1)
                ]),
                _: 2
              }, 1032, ["selected", "disabled", "onClick"]))), 128))
            ])
          ])
        ]),
        actions: S(() => [
          g("div", kn, [
            x(h.$slots, "actions", {}, () => [
              P(b, {
                size: "small",
                variant: "plain",
                onClick: r
              }, {
                default: S(() => [
                  x(h.$slots, "clear-text", {}, () => [
                    y[3] || (y[3] = ae(" Clear "))
                  ])
                ]),
                _: 3
              }),
              P(b, {
                size: "small",
                onClick: y[1] || (y[1] = ($) => u("apply", w(t)))
              }, {
                default: S(() => [
                  x(h.$slots, "apply-text", {}, () => [
                    y[4] || (y[4] = ae(" Apply "))
                  ])
                ]),
                _: 3
              })
            ])
          ])
        ]),
        default: S(() => {
          var $, D;
          return [
            g("div", {
              class: I(["flex items-center text-lg h-xl text-neutral-interaction-default", { "text-primary-interaction-default": w(c) }])
            }, [
              P(B, {
                name: "calendar_month",
                size: "lg"
              })
            ], 2),
            g("h5", {
              class: I(["whitespace-nowrap", { "font-bold": w(c) }])
            }, [
              w(n) || ($ = h.options.find((z) => z.value == w(l))) != null && $.label ? (f(), v("span", Cn, R(w(n) || ((D = h.options.find((z) => z.value == w(l))) == null ? void 0 : D.label)), 1)) : x(h.$slots, "default", { key: 1 })
            ], 2)
          ];
        }),
        _: 3
      }, 8, ["modelValue", "label-value", "required", "absolute", "disabled", "is-error", "error-message"]);
    };
  }
}), $n = {
  install(o) {
    o.component("BDateFilter", Vn);
  }
}, Mn = { class: "tooltip-content" }, xn = /* @__PURE__ */ q({
  __name: "BTooltip",
  props: {
    text: { default: "" },
    position: { default: "right" }
  },
  setup(o) {
    const s = o;
    let e = A(!1);
    const c = A(), t = A(), l = Y(() => {
      var d, a;
      return document.readyState === "complete" || document.readyState === "interactive" ? Number(
        (((a = (d = c.value) == null ? void 0 : d.computedStyleMap().get("--spacing-xxs")) == null ? void 0 : a.toString()) || "4px").replace("px", "")
      ) : 4;
    });
    async function n() {
      if (e.value = !0, await je(), !c.value || !t.value) return;
      const d = c.value.getBoundingClientRect(), a = window.innerWidth;
      u(d, t.value);
      const r = () => {
        e.value = !1, document.removeEventListener("wheel", r);
      };
      document.addEventListener("wheel", r);
      const m = t.value.getBoundingClientRect(), p = t.value.querySelector(
        ".tooltip-content"
      );
      if (p && (p.style.maxWidth = "none", p.style.wordBreak = "normal", p.style.whiteSpace = "normal", m.left + m.width > a)) {
        const h = m.width - p.offsetWidth;
        p.style.maxWidth = `${a - m.left - l.value - h}px`, p.style.wordBreak = "break-all", p.style.whiteSpace = "wrap", u(d, t.value);
      }
    }
    function u(d, a) {
      if (s.position === "left" || s.position === "right") {
        const r = s.position === "left" ? d.left - a.offsetWidth - l.value : d.right + l.value;
        a.style.left = `${Math.max(0, r)}px`, a.style.top = `${d.top + d.height / 2 - a.offsetHeight / 2}px`;
      } else {
        const r = s.position === "top" ? d.top - a.offsetHeight : d.bottom;
        a.style.top = `${Math.max(0, r)}px`, a.style.left = `${d.left + d.width / 2 - a.offsetWidth / 2}px`;
      }
    }
    return (d, a) => (f(), v("div", {
      ref_key: "content",
      ref: c,
      onMouseenter: n,
      onMouseleave: a[0] || (a[0] = (r) => ne(e) ? e.value = !1 : e = !1)
    }, [
      (f(), F(Ee, { to: "body" }, [
        P(ve, { name: "opacity" }, {
          default: S(() => [
            w(e) ? (f(), v("div", {
              key: 0,
              class: I(["tooltip", [d.position]]),
              ref_key: "tooltip",
              ref: t
            }, [
              a[1] || (a[1] = g("div", { class: "tooltip-triangle" }, null, -1)),
              g("div", Mn, [
                x(d.$slots, "text", {}, () => [
                  ae(R(d.text), 1)
                ], !0)
              ])
            ], 2)) : H("", !0)
          ]),
          _: 3
        })
      ])),
      x(d.$slots, "default", {}, void 0, !0)
    ], 544));
  }
}), In = /* @__PURE__ */ G(xn, [["__scopeId", "data-v-de88f0d8"]]), An = {
  install(o) {
    o.component("BTooltip", In);
  }
}, Sn = /* @__PURE__ */ q({
  __name: "BCollapse",
  props: {
    modelValue: { type: Boolean, default: !1 },
    duration: { default: 150 },
    noShadow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, t = A(e.modelValue);
    let l = A(), n = A();
    const u = new ResizeObserver(r), d = new MutationObserver(r);
    le(
      () => e.modelValue,
      () => {
        t.value = e.modelValue, r();
      }
    );
    const a = Y(() => {
      try {
        const p = Math.floor(e.duration);
        return Math.min(Math.max(p, 150), 1e3);
      } catch {
        return 150;
      }
    });
    he(() => {
      l.value && u.observe(l.value, { box: "border-box" }), n.value && (u.observe(n.value, { box: "border-box" }), d.observe(n.value, {
        childList: !0,
        subtree: !0,
        attributes: !0,
        attributeFilter: ["data-max-height"]
      }));
    }), De(r), we(() => {
      u && u.disconnect(), d && d.disconnect();
    });
    async function r() {
      n.value && (n.value.style.maxHeight = t.value ? `${n.value.scrollHeight}px` : "0px", n.value.style.maxHeight != n.value.dataset.maxHeight && (n.value.dataset.maxHeight = n.value.style.maxHeight));
    }
    function m() {
      t.value = !t.value, c("update:modelValue", t.value);
    }
    return (p, h) => {
      const y = W("BIcon"), B = W("BCard");
      return f(), F(B, {
        class: I(["b-collapse", { "no-shadow": p.noShadow }])
      }, {
        default: S(() => [
          g("div", {
            class: "w-full flex flex-col gap-sm",
            ref_key: "card",
            ref: l
          }, [
            g("div", {
              class: I(["flex items-center justify-end w-full text-base cursor-pointer", { "justify-between": p.$slots.header }]),
              onClick: m
            }, [
              x(p.$slots, "header", {}, void 0, !0),
              g("div", {
                class: I(["flex items-center w-fit h-fit transition-transform ease-in-out duration-300 text-2xl", { "rotate-180": t.value }])
              }, [
                P(y, {
                  name: "expand_more",
                  size: "xl",
                  class: "text-neutral-interaction-default font-bold"
                })
              ], 2)
            ], 2),
            P(ve, { name: "content" }, {
              default: S(() => [
                fe(g("div", {
                  ref_key: "content",
                  ref: n,
                  class: I(["content-wrapper top-full left-0 transition-[max-height]", { "b-hidden overflow-hidden": !t.value }]),
                  style: re({ "transition-duration": `${a.value}ms` }),
                  "data-max-height": "0px"
                }, [
                  x(p.$slots, "default", {}, void 0, !0)
                ], 6), [
                  [Ce, t.value]
                ])
              ]),
              _: 3
            })
          ], 512)
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
}), Dn = /* @__PURE__ */ G(Sn, [["__scopeId", "data-v-38c2e3dd"]]), En = {
  install(o) {
    o.component("BCollapse", Dn);
  }
}, Hn = { class: "b-round-menu relative flex items-center h-fit w-fit overflow-visible" }, Tn = /* @__PURE__ */ q({
  __name: "BRoundMenu",
  props: {
    items: {}
  },
  setup(o) {
    const s = o, e = A(!1), c = A([]);
    ge(() => {
      t();
    }), le(s.items, () => {
      t();
    });
    function t() {
      for (let l = 0; l < s.items.length; l++) {
        const u = l * 360 / s.items.length * Math.PI / 180, d = s.items.length < 7 ? 60 : s.items.length < 10 ? 7 * s.items.length : 6 * s.items.length, a = d * Math.cos(u), r = d * Math.sin(u);
        c.value.push(`${a}px, ${r}px, 0`);
      }
    }
    return (l, n) => {
      const u = W("BRoundButton");
      return f(), v("div", Hn, [
        (f(!0), v(Q, null, te(l.items, (d, a) => (f(), v("div", {
          key: a,
          class: "item",
          style: re(
            e.value ? {
              transform: `translate3d(${c.value[a]})`,
              "-webkit-transform": `translate3d(${c.value[a]})`
            } : {}
          )
        }, [
          P(u, {
            background: d.background,
            icon: d.icon,
            text: d.text,
            onClick: (r) => d.action()
          }, null, 8, ["background", "icon", "text", "onClick"])
        ], 4))), 128)),
        g("div", {
          class: I(["item", { "z-1": !e.value }])
        }, [
          P(u, {
            color: e.value ? "neutral" : "success",
            onClick: n[0] || (n[0] = (d) => e.value = !e.value)
          }, null, 8, ["color"])
        ], 2)
      ]);
    };
  }
}), Ln = /* @__PURE__ */ G(Tn, [["__scopeId", "data-v-aad4eaaa"]]), Pn = {
  install(o) {
    o.component("BRoundMenu", Ln);
  }
};
class zn {
  constructor() {
    Ke(this, "events");
    this.events = {};
  }
  on(s, e) {
    this.events[s] || (this.events[s] = []), this.events[s].push(e);
  }
  off(s, e) {
    this.events[s] && (this.events[s] = this.events[s].filter((c) => c !== e));
  }
  emit(s, ...e) {
    this.events[s] && this.events[s].forEach((c) => c(...e));
  }
}
const ce = new zn(), On = q({
  components: {
    BButton: at,
    BDialog: pt
  },
  data() {
    return {
      title: "",
      message: "",
      acceptText: "",
      cancelText: "",
      visible: !1,
      onConfirm: () => Boolean,
      onCancel: (o) => Boolean
    };
  },
  mounted() {
    ce.on("open-confirm", this.openDialog);
  },
  methods: {
    handleConfirm() {
      this.visible = !1, ce.emit("confirm");
    },
    handleCancel() {
      this.visible = !1, ce.emit("cancel");
    },
    openDialog(o) {
      Object.keys(o).forEach((s) => {
        this[s] = o[s];
      }), this.visible = !0;
    }
  },
  beforeUnmount() {
    ce.off("open-confirm", this.openDialog);
  }
}), Wn = { class: "flex flex-col p-xl gap-sm" }, Un = {
  key: 0,
  class: "font-bold text-lg text-neutral-foreground-high"
}, jn = { class: "text-sm text-neutral-foreground-low" }, Rn = { class: "flex justify-end w-full gap-xs mt-sm" };
function Fn(o, s, e, c, t, l) {
  const n = W("BButton"), u = W("BDialog");
  return f(), F(u, {
    modelValue: o.visible,
    "onUpdate:modelValue": s[0] || (s[0] = (d) => o.visible = d),
    "no-outside-close": ""
  }, {
    default: S(() => [
      g("div", Wn, [
        o.title ? (f(), v("h2", Un, R(o.title), 1)) : H("", !0),
        g("p", jn, R(o.message), 1),
        g("div", Rn, [
          P(n, {
            variant: "plain",
            onClick: o.handleCancel
          }, {
            default: S(() => [
              ae(R(o.cancelText), 1)
            ]),
            _: 1
          }, 8, ["onClick"]),
          P(n, { onClick: o.handleConfirm }, {
            default: S(() => [
              ae(R(o.acceptText), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ])
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const _n = /* @__PURE__ */ G(On, [["render", Fn]]), Nn = {
  install(o) {
    o.component("BConfirm", _n);
  }
}, qn = /* @__PURE__ */ q({
  __name: "BToast",
  setup(o) {
    const s = A([]), e = A(
      ["top", "bottom"].flatMap(
        (l) => ["left", "right"].map((n) => ({
          vertical: l,
          horizontal: n
        }))
      )
    );
    he(() => {
      ce.on("open-toast", c), ce.on("close-toast", t);
    }), we(() => {
      ce.off("open-toast", c), ce.off("close-toast", t);
    });
    function c(l) {
      const n = {
        id: l.id,
        title: "",
        message: "",
        type: "danger",
        top: !1,
        bottom: !1,
        right: !1,
        left: !1,
        button: "",
        action: () => {
        },
        ...l,
        visible: !0
      };
      s.value.push(n), l.timeout && setTimeout(() => {
        t(n.id);
      }, l.timeout);
    }
    function t(l) {
      if (!l) return;
      const n = s.value.find((u) => u.id === l);
      n && (n.visible = !1, setTimeout(() => {
        s.value = s.value.filter((u) => u.id !== l);
      }, 600));
    }
    return (l, n) => {
      const u = W("BButton");
      return f(!0), v(Q, null, te(e.value, (d) => (f(), v("div", {
        class: I(["toast-container", [d.vertical, d.horizontal]]),
        key: d.vertical + d.horizontal
      }, [
        (f(!0), v(Q, null, te(s.value.filter(
          (a) => a[d.vertical] && a[d.horizontal]
        ), (a) => (f(), F(ve, {
          key: a.id,
          name: a.right ? "slide-right" : "slide-left",
          appear: ""
        }, {
          default: S(() => [
            a.visible ? (f(), F(ct, {
              key: 0,
              class: "b-toast",
              title: a.title,
              message: a.message,
              type: a.type,
              "icon-position": "center",
              closable: "",
              onClose: (r) => t(a.id)
            }, Be({ _: 2 }, [
              a.button ? {
                name: "actions",
                fn: S(() => [
                  P(u, {
                    class: "whitespace-nowrap",
                    size: "small",
                    variant: "secondary",
                    color: a.type,
                    onClick: a.action
                  }, {
                    default: S(() => [
                      ae(R(a.button), 1)
                    ]),
                    _: 2
                  }, 1032, ["color", "onClick"])
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["title", "message", "type", "onClose"])) : H("", !0)
          ]),
          _: 2
        }, 1032, ["name"]))), 128))
      ], 2))), 128);
    };
  }
}), Zn = /* @__PURE__ */ G(qn, [["__scopeId", "data-v-81d6c967"]]), Kn = {
  install(o) {
    o.component("BToast", Zn);
  }
}, Xn = /* @__PURE__ */ q({
  __name: "BDateComparator",
  props: {
    modelValue: {},
    lang: { default: "en-US" },
    isCompare: { type: Boolean, default: !1 },
    maxInit: {},
    maxEnd: {}
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, t = A(e.isCompare ? [[], []] : []), l = A([
      {
        date: new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() - 1))
      },
      {
        date: /* @__PURE__ */ new Date(),
        value: -1
      }
    ]);
    ge(() => {
      n();
    }), le(() => e.modelValue, () => n()), le(() => e.isCompare, () => {
      u(), c("update:modelValue", t.value);
    });
    function n() {
      e.modelValue ? t.value = e.modelValue : u();
    }
    function u() {
      e.isCompare ? t.value = [[], []] : t.value = [];
    }
    function d(a) {
      Array.isArray(a) && (t.value = a, c("update:modelValue", t.value));
    }
    return (a, r) => (f(), F(gt, {
      modelValue: t.value,
      "onUpdate:modelValue": [
        r[0] || (r[0] = (m) => t.value = m),
        d
      ],
      "initial-dates": l.value,
      "is-compare": a.isCompare,
      lang: a.lang,
      "max-init": a.maxInit,
      "max-end": a.maxEnd
    }, null, 8, ["modelValue", "initial-dates", "is-compare", "lang", "max-init", "max-end"]));
  }
}), Gn = {
  install(o) {
    o.component("BDateComparator", Xn);
  }
}, Jn = { key: 0 }, Qn = { class: "flex" }, Yn = { class: "flex flex-col justify-between border-r-xxs border-neutral-default w-fit truncate rounded-l-sm overflow-hidden p-xs" }, es = { class: "flex flex-col" }, ts = { class: "px-xs py-sm" }, ls = { class: "flex flex-col items-end gap-base relative overflow-hidden" }, as = { class: "flex items-center justify-end gap-xs w-full border-t-xxs border-neutral-default p-sm" }, os = /* @__PURE__ */ q({
  __name: "BDateComparatorFilter",
  props: {
    modelValue: {},
    labelValue: { default: "" },
    lang: { default: "en-US" },
    separator: {},
    isCompare: { type: Boolean, default: !1 },
    maxInit: {},
    maxEnd: {},
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    absolute: { type: Boolean, default: !1 },
    expanded: { type: Boolean, default: !1 },
    alignRight: { type: Boolean, default: !1 },
    options: { default: dt }
  },
  emits: ["update:modelValue", "update:expanded", "update:isCompare", "apply"],
  setup(o, { emit: s }) {
    var B;
    const e = o;
    ge(() => {
      if (n.value) {
        let i = e.options.find(
          (b) => b.value == n.value
        );
        p(i.calculate()), l.value = !1, c("update:isCompare", l.value);
      } else e.modelValue && (e.modelValue && Array.isArray(e.modelValue[0]) && !l.value ? (l.value = !0, c("update:isCompare", !0)) : l.value && (l.value = !1, c("update:isCompare", !1)), m(!0));
    }), le(
      () => e.modelValue,
      (i) => {
        i && Array.isArray(i[0]) ? l.value || (l.value = !0, c("update:isCompare", !0)) : l.value && (l.value = !1, c("update:isCompare", !1)), u.value = i;
      }
    ), le(
      () => e.isCompare,
      () => {
        var i;
        l.value = e.isCompare, l.value ? n.value = "" : n.value = ((i = e.options.find((b) => b.selected)) == null ? void 0 : i.value) || "";
      }
    ), le(
      () => e.expanded,
      () => t.value = e.expanded
    );
    const c = s;
    let t = A(e.expanded), l = A(!1), n = A(
      e.options.length && !e.isCompare && ((B = e.options.find((i) => i.selected)) == null ? void 0 : B.value) || ""
    ), u = A(
      e.modelValue ? e.modelValue : e.isCompare ? [[], []] : []
    ), d = A("");
    function a(i, b) {
      return i.toLocaleDateString(
        e.lang,
        { year: "numeric", month: "short", day: "2-digit" }
      );
    }
    function r() {
      return e.lang.includes("pt") ? "e" : "and";
    }
    function m(i = !1) {
      u.value && l.value ? u.value[1].length > 0 ? d.value = `${a(u.value[0][0]) + (u.value[0][1] ? " - " + a(u.value[0][1]) : "")} ${e.separator || r()} ${a(u.value[1][0]) + (u.value[1][1] ? " - " + a(u.value[1][1]) : "")}` : u.value[0].length > 0 ? d.value = a(u.value[0][0]) + (u.value[0][1] ? " - " + a(u.value[0][1]) : "") : d.value = "" : u.value && u.value.length > 0 ? d.value = a(u.value[0]) + (u.value[1] ? " - " + a(u.value[1]) : "") : d.value = "", i || c("update:modelValue", u.value);
    }
    function p(i) {
      u.value = i, c("update:modelValue", u.value);
    }
    function h(i) {
      l.value = !1, c("update:isCompare", !1), n.value = i.value, d.value = "", setTimeout(() => {
        p(i.calculate());
      }, 100);
    }
    function y() {
      p(void 0), n.value = "", d.value = "";
    }
    return (i, b) => {
      const U = W("BIcon"), $ = W("BCheckbox"), D = W("BDateComparator"), z = W("BButton"), Z = W("BExpandableContainer");
      return f(), F(Z, {
        modelValue: w(t),
        "onUpdate:modelValue": [
          b[5] || (b[5] = (j) => ne(t) ? t.value = j : t = j),
          b[6] || (b[6] = (j) => c("update:expanded", w(t)))
        ],
        disabled: i.disabled,
        required: i.required,
        absolute: i.absolute,
        "label-value": i.labelValue,
        "is-error": i.isError,
        "error-message": i.errorMessage,
        "align-right": i.alignRight,
        "hide-arrow": ""
      }, {
        content: S(() => [
          g("div", Qn, [
            g("div", Yn, [
              g("div", es, [
                (f(!0), v(Q, null, te(i.options, (j, T) => (f(), F(Ve, {
                  key: T,
                  class: "px-xs py-sm",
                  selected: w(n) == j.value,
                  disabled: j.disabled,
                  onClick: (M) => h(j)
                }, {
                  default: S(() => [
                    ae(R(j.label), 1)
                  ]),
                  _: 2
                }, 1032, ["selected", "disabled", "onClick"]))), 128))
              ]),
              g("div", ts, [
                P($, {
                  modelValue: w(l),
                  "onUpdate:modelValue": [
                    b[0] || (b[0] = (j) => ne(l) ? l.value = j : l = j),
                    b[1] || (b[1] = (j) => {
                      c("update:isCompare", j), ne(n) ? n.value = "" : n = "";
                    })
                  ]
                }, {
                  default: S(() => [
                    x(i.$slots, "compare-text", {}, () => [
                      b[7] || (b[7] = ae(" Compare two periods "))
                    ])
                  ]),
                  _: 3
                }, 8, ["modelValue"])
              ])
            ]),
            g("div", ls, [
              P(D, {
                class: "px-sm pt-xxs",
                modelValue: w(u),
                "onUpdate:modelValue": [
                  b[2] || (b[2] = (j) => ne(u) ? u.value = j : u = j),
                  b[3] || (b[3] = (j) => m(!1))
                ],
                lang: i.lang,
                "is-compare": w(l),
                "max-init": i.maxInit,
                "max-end": i.maxEnd
              }, null, 8, ["modelValue", "lang", "is-compare", "max-init", "max-end"]),
              g("div", as, [
                x(i.$slots, "actions", {}, () => [
                  P(z, {
                    size: "small",
                    variant: "plain",
                    onClick: y
                  }, {
                    default: S(() => [
                      x(i.$slots, "clear-text", {}, () => [
                        b[8] || (b[8] = ae(" Clear "))
                      ])
                    ]),
                    _: 3
                  }),
                  P(z, {
                    size: "small",
                    onClick: b[4] || (b[4] = (j) => c("apply", w(u)))
                  }, {
                    default: S(() => [
                      x(i.$slots, "apply-text", {}, () => [
                        b[9] || (b[9] = ae(" Apply "))
                      ])
                    ]),
                    _: 3
                  })
                ])
              ])
            ])
          ])
        ]),
        default: S(() => {
          var j, T;
          return [
            g("div", {
              class: I(["flex items-center text-lg h-xl text-neutral-interaction-default", {
                "text-primary-interaction-default": w(t),
                "text-danger-interaction-default": i.isError
              }])
            }, [
              P(U, {
                name: "calendar_month",
                size: "lg"
              })
            ], 2),
            g("h5", {
              class: I(["whitespace-nowrap", { "font-bold": w(t) }])
            }, [
              w(d) || (j = i.options.find((M) => M.value == w(n))) != null && j.label ? (f(), v("span", Jn, R(w(d) || ((T = i.options.find((M) => M.value == w(n))) == null ? void 0 : T.label)), 1)) : x(i.$slots, "default", { key: 1 })
            ], 2)
          ];
        }),
        _: 3
      }, 8, ["modelValue", "disabled", "required", "absolute", "label-value", "is-error", "error-message", "align-right"]);
    };
  }
}), ns = {
  install(o) {
    o.component("BDateComparatorFilter", os);
  }
}, ss = { class: "p-sm" }, is = /* @__PURE__ */ q({
  __name: "BExpandableContainer",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    labelValue: { default: "" },
    absolute: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    required: { type: Boolean, default: !1 },
    closeOnBlur: { type: Boolean, default: !0 },
    alignRight: { type: Boolean, default: !1 },
    maxHeight: { default: "40px" },
    minWidth: { default: "unset" },
    minWidthCard: {},
    secondary: { type: Boolean, default: !1 },
    hideArrow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t, l] = ie(
      e,
      "modelValue",
      c,
      !1
    ), n = A(), u = Y(
      () => e.disabled ? !1 : t.value
    ), d = Y(
      () => u.value ? e.absolute : !0
    );
    function a(r, m) {
      l(r, m);
    }
    return (r, m) => (f(), F(mt, {
      modelValue: w(t),
      "onUpdate:modelValue": [
        m[0] || (m[0] = (p) => ne(t) ? t.value = p : null),
        a
      ],
      "label-value": r.labelValue,
      "close-on-blur": r.closeOnBlur,
      disabled: r.disabled,
      "is-error": r.isError,
      "error-message": r.errorMessage,
      "info-message": r.infoMessage,
      required: r.required,
      "max-height": r.maxHeight,
      "min-width": r.minWidth,
      secondary: r.secondary,
      "hide-arrow": r.hideArrow
    }, Be({
      content: S(({ minWidth: p }) => [
        fe(g("div", {
          ref_key: "content",
          ref: n,
          class: I(["content-wrapper text-xs top-full transition-[max-height] w-fit duration-100", [
            {
              "absolute z-80": d.value,
              "max-h-fit": u.value,
              "left-0": !r.alignRight,
              "right-0": r.alignRight
            }
          ]]),
          style: re({ "min-width": p })
        }, [
          g("div", {
            class: I(["content -translate-y-full transition-translate duration-100 ease-out mt-xs", [{ "translate-y-[0]": u.value }]])
          }, [
            x(r.$slots, "card", {}, () => [
              g("div", {
                ref: "contentRef",
                class: "bg-neutral-surface-default shadow-neutral-selected border-xxs border-neutral-default rounded-xs",
                style: re(`max-height: ${r.maxHeight}px`)
              }, [
                g("div", ss, [
                  x(r.$slots, "content")
                ])
              ], 4)
            ])
          ], 2)
        ], 6), [
          [Ce, u.value]
        ])
      ]),
      default: S(() => [
        x(r.$slots, "default")
      ]),
      _: 2
    }, [
      r.$slots.complement ? {
        name: "complement",
        fn: S(() => [
          x(r.$slots, "complement")
        ]),
        key: "0"
      } : void 0,
      r.$slots.label ? {
        name: "label",
        fn: S(() => [
          x(r.$slots, "label")
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["modelValue", "label-value", "close-on-blur", "disabled", "is-error", "error-message", "info-message", "required", "max-height", "min-width", "secondary", "hide-arrow"]));
  }
}), rs = {
  install(o) {
    o.component("BExpandableContainer", is);
  }
}, us = { class: "relative" }, ds = { class: "flex items-center gap-sm" }, cs = { class: "flex flex-col gap-xs w-full" }, fs = { class: "flex items-center gap-sm" }, ps = { class: "flex items-center gap-xxs" }, ms = { class: "flex flex-col items-center overflow-hidden relative h-[1em] w-fit text-neutral-interaction-default" }, vs = { class: "flex flex-col" }, gs = /* @__PURE__ */ q({
  __name: "BColorPicker",
  props: {
    modelValue: { default: void 0 },
    type: { default: "hexa" },
    noShadow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:type"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    he(() => {
      window.addEventListener("mousemove", j), window.addEventListener("mouseup", () => {
        t.value = !1, l.value = !1, n.value = !1;
      }), window.addEventListener("touchmove", k), window.addEventListener("touchend", () => {
        t.value = !1, l.value = !1, n.value = !1;
      }), ee(), setTimeout(() => {
        pe();
      }, 100);
    }), we(() => {
      window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", () => {
        t.value = !1, l.value = !1, n.value = !1;
      }), window.removeEventListener("touchmove", k), window.removeEventListener("touchend", () => {
        t.value = !1, l.value = !1, n.value = !1;
      });
    }), le(
      () => e.type,
      () => {
        const L = B.value.findIndex((K) => K == e.type);
        i.value = L !== -1 ? L : 0, Oe(!1);
      }
    ), le(
      () => e.modelValue,
      () => {
        y.value != e.modelValue && (y.value = e.modelValue || y.value, pe());
      }
    );
    const t = A(!1), l = A(!1), n = A(!1), u = A(), d = A(), a = A(), r = A(), m = A(e.modelValue || "rgba(255, 255, 255, 1)"), p = A("hsl(0, 100%, 50%)"), h = A(1), y = A(e.modelValue || $()), B = A(["hexa", "hsla", "hwb", "hsva", "rgba"]), i = A(
      B.value.findIndex((L) => L == e.type) !== -1 ? B.value.findIndex((L) => L == e.type) : 0
    ), b = A(!1), U = A(!1);
    function $() {
      return e.type == "hexa" ? "#ffffffff" : e.type == "hsla" ? "0, 100%, 0%, 1" : e.type == "hwb" ? "0 100% 0% / 1" : e.type == "hsva" ? "0, 0%, 100%, 1" : "255, 255, 255, 1";
    }
    function D(L) {
      t.value = !0, O(L);
    }
    function z(L) {
      l.value = !0, V(L);
    }
    function Z(L) {
      n.value = !0, C(L);
    }
    function j(L) {
      O(L), V(L), C(L);
    }
    function T(L) {
      Z(L.touches[0]);
    }
    function M(L) {
      z(L.touches[0]);
    }
    function N(L) {
      D(L.touches[0]);
    }
    function k(L) {
      j(L.touches[0]);
    }
    function V(L) {
      var K;
      if (l.value && d.value) {
        const _ = d.value.closest(".slider"), X = (K = r.value) == null ? void 0 : K.getContext("2d");
        if (!_ || !r.value || !X) return;
        const J = oe(
          L,
          d.value,
          _
        ).left;
        d.value.style.left = J + "px";
        const ue = _.clientWidth - 10, ye = J / ue;
        h.value = ye, ee(p.value, ye), se();
      }
    }
    function O(L) {
      var K, _;
      if (t.value && u.value) {
        const X = (K = u.value) == null ? void 0 : K.closest(".slider"), J = (_ = d.value) == null ? void 0 : _.closest(
          ".slider"
        );
        if (!X || !r.value || !J) return;
        const ue = oe(
          L,
          u.value,
          X
        ).left;
        u.value.style.left = ue + "px";
        const ye = E(X, ue);
        p.value = ye, J.style.background = `linear-gradient(
            to right,
            #ffffff 0%,
            ${ye}
        )`, ee(ye, h.value), se();
      }
    }
    function C(L) {
      var K;
      if (n.value && a.value) {
        const _ = (K = r.value) == null ? void 0 : K.getContext("2d");
        if (!r.value || !_) return;
        const X = oe(
          L,
          a.value,
          r.value,
          !0
        );
        a.value.style.left = X.left + "px", a.value.style.top = X.top + "px";
        const J = _.getImageData(
          Math.min(r.value.clientWidth - 1, X.left + 5),
          Math.min(r.value.clientHeight - 1, X.top),
          1,
          1
        ).data;
        m.value = `rgba(${J[0]}, ${J[1]}, ${J[2]}, ${J[3] / 255})`, y.value = Ae({
          r: J[0],
          g: J[1],
          b: J[2],
          a: J[3] / 255
        }), c("update:modelValue", y.value);
      }
    }
    function E(L, K) {
      const _ = document.createElement("canvas");
      _.width = L.clientWidth, _.height = L.clientHeight;
      const X = _.getContext("2d");
      if (!X) return "";
      const J = X.createLinearGradient(0, 0, _.width, 0);
      J.addColorStop(0, "hsl(0, 100%, 50%)"), J.addColorStop(1 / 6, "hsl(60, 100%, 50%)"), J.addColorStop(2 / 6, "hsl(120, 100%, 50%)"), J.addColorStop(3 / 6, "hsl(180, 100%, 50%)"), J.addColorStop(4 / 6, "hsl(240, 100%, 50%)"), J.addColorStop(5 / 6, "hsl(300, 100%, 50%)"), J.addColorStop(1, "hsl(360, 100%, 50%)"), X.fillStyle = J, X.fillRect(0, 0, _.width, _.height);
      const ue = X.getImageData(K, 0, 1, 1).data;
      return `rgba(${ue[0]}, ${ue[1]}, ${ue[2]}, ${ue[3] / 255})`;
    }
    function ee(L = "hsl(0, 100%, 50%)", K = 1) {
      const _ = r.value, X = _ == null ? void 0 : _.getContext("2d");
      if (!X || !_) return;
      _.width = _.clientWidth, _.height = _.clientHeight, X.clearRect(0, 0, _.width, _.height), X.globalAlpha = K;
      const J = X.createLinearGradient(0, 0, _.width, 0);
      J.addColorStop(0, "#ffffff"), J.addColorStop(1, L);
      const ue = X.createLinearGradient(0, 0, 0, _.height);
      ue.addColorStop(0, "rgba(0, 0, 0, 0)"), ue.addColorStop(1, "#000000"), X.fillStyle = J, X.fillRect(0, 0, _.width, _.height), X.fillStyle = ue, X.fillRect(0, 0, _.width, _.height);
    }
    function oe(L, K, _, X = !1) {
      const J = Te(
        L,
        K,
        _,
        { top: !0, left: !0 },
        { x: X ? 5 : 1, y: K.clientHeight },
        { x: X ? -5 : 0 }
      );
      return {
        left: J.x,
        top: J.y
      };
    }
    function se() {
      var J;
      const L = (J = r.value) == null ? void 0 : J.getContext("2d");
      if (!L || !a.value || !r.value) return;
      const K = Number(a.value.style.left.replace("px", "")) + 5, _ = Number(a.value.style.top.replace("px", "")), X = L.getImageData(
        Math.min(r.value.clientWidth - 1, K),
        Math.min(r.value.clientHeight - 1, _),
        1,
        1
      ).data;
      m.value = `rgba(${X[0]}, ${X[1]}, ${X[2]}, ${X[3] / 255})`, y.value = Ae({
        r: X[0],
        g: X[1],
        b: X[2],
        a: X[3] / 255
      }), c("update:modelValue", y.value);
    }
    function pe() {
      var qe, Ze;
      const L = (qe = u.value) == null ? void 0 : qe.closest(".slider"), K = (Ze = d.value) == null ? void 0 : Ze.closest(
        ".slider"
      );
      if (!u.value || !d.value || !a.value || !L || !K)
        return;
      const _ = be(), X = Math.min(1, _.h / 360), J = Math.min(
        L.clientWidth - 10,
        Math.max(0, (L.clientWidth - 10) * X)
      ), ue = K.clientWidth - 10, ye = Math.min(
        ue,
        Math.max(0, ue * _.a)
      ), _e = ye / ue;
      h.value = _e, u.value.style.left = J + "px", d.value.style.left = ye + "px";
      const We = E(L, J);
      p.value = We, K.style.background = `linear-gradient(
        to right,
        #ffffff 0%,
        ${We}
    )`, ee(We, _e);
      const Vt = jt(
        _.h,
        Number(_.s.toString().replace("%", "")),
        Number(_.v.toString().replace("%", "")),
        _.a
      );
      m.value = Ct(Vt);
      const Ne = Bt(_);
      a.value.style.left = Ne.x + "px", a.value.style.top = Ne.y + "px", c("update:modelValue", y.value);
    }
    function be() {
      var K;
      if (i.value == 0) {
        const _ = Wt(y.value);
        return Se(_.r, _.g, _.b, isNaN(_.a) ? 1 : _.a);
      } else if (i.value == 1) {
        const _ = xe(y.value, "hlsa"), X = ot(_.h, _.s, _.l, _.a);
        return Se(X.r, X.g, X.b, isNaN(X.a) ? 1 : X.a);
      } else if (i.value == 2) {
        const _ = xe(y.value, "hwb", " "), X = y.value.split("/"), J = Ut(
          _.h,
          _.w,
          _.b,
          Number((K = X[1]) == null ? void 0 : K.replace(")", ""))
        );
        return Se(J.r, J.g, J.b, isNaN(J.a) ? 1 : J.a);
      } else if (i.value == 3)
        return xe(y.value, "hsva");
      const L = xe(y.value);
      return Se(L.r, L.g, L.b, isNaN(L.a) ? 1 : L.a);
    }
    function Ae(L) {
      if (i.value == 0)
        return Rt(L.r, L.g, L.b, L.a);
      if (i.value == 1) {
        const K = Ft(L.r, L.g, L.b, L.a);
        return `${K.h.toFixed(0)}, ${K.s}, ${K.l}, ${K.a < 1 ? K.a.toFixed(2) : K.a}`;
      } else if (i.value == 2) {
        const K = _t(L.r, L.g, L.b, L.a);
        return `${K.h} ${K.w} ${K.b} / ${K.a < 1 ? K.a.toFixed(2) : K.a}`;
      } else if (i.value == 3) {
        const K = Se(L.r, L.g, L.b, L.a);
        return `${K.h}, ${K.s}, ${K.v}, ${K.a < 1 ? K.a.toFixed(2) : K.a}`;
      }
      return `${L.r}, ${L.g}, ${L.b}, ${L.a < 1 ? L.a.toFixed(2) : L.a}`;
    }
    function xe(L, K = "rgba", _ = ",") {
      if (!L) return "";
      const X = {}, J = Array.from(K), ue = L.split(_);
      return Fe(J, ue, X);
    }
    function yt(L, K = ",") {
      if (!L) return "";
      const _ = {}, X = L.split("(");
      if (X.length < 2) return;
      const J = Array.from(X[0]);
      X[1] = X[1].replace(")", "");
      const ue = X[1].split(K);
      return Fe(J, ue, _);
    }
    function Fe(L, K, _) {
      return L.forEach((X, J) => {
        _[X] = typeof K[J] == "string" ? Number(K[J].replace("%", "")) : K[J] || 1;
      }), _;
    }
    function Ct(L) {
      let K = "", _ = "";
      return Object.keys(L).forEach((X, J) => {
        _ += X, K += Object.keys(L).length - 1 == J ? L[X] : `${L[X]}, `;
      }), `${_}(${K})`;
    }
    function Bt(L) {
      const K = r.value;
      if (!K) return;
      const _ = {
        h: L.h,
        s: typeof L.s == "string" ? Number(L.s.replace("%", "")) : L.s,
        v: typeof L.v == "string" ? Number(L.v.replace("%", "")) : L.v,
        a: L.a
      }, X = Math.max(
        -5,
        Math.min(
          _.s / 100 * (K.clientWidth - 5),
          K.clientWidth - 5
        )
      ), J = Math.max(
        0,
        Math.min(
          (1 - _.v / 100) * K.clientHeight,
          K.clientHeight
        )
      );
      return {
        x: X,
        y: J
      };
    }
    function wt() {
      b.value = !0, setTimeout(() => {
        b.value = !1, i.value = i.value + 1 > B.value.length - 1 ? 0 : i.value + 1, Oe();
      }, 600);
    }
    function kt() {
      U.value = !0, setTimeout(() => {
        i.value = i.value - 1 < 0 ? B.value.length - 1 : i.value - 1, U.value = !1, Oe();
      }, 600);
    }
    function Oe(L = !0) {
      y.value = Ae(yt(m.value)), c("update:modelValue", y.value), L && c("update:type", B.value[i.value]);
    }
    return (L, K) => {
      const _ = W("BInput"), X = W("BIcon"), J = W("BCard");
      return f(), F(J, {
        id: "b-color-picker",
        class: I(["p-base flex flex-col gap-sm", { "no-shadow": L.noShadow }])
      }, {
        default: S(() => [
          g("div", us, [
            g("span", {
              class: "cursor cursor-area",
              ref_key: "cursorColorArea",
              ref: a,
              onMousedown: Z,
              onTouchstart: T
            }, null, 544),
            g("canvas", {
              class: "color-area",
              ref_key: "colorArea",
              ref: r,
              onMousedown: Z,
              onTouchstart: T
            }, null, 544)
          ]),
          g("div", ds, [
            g("div", {
              class: "color-circle",
              style: re({ background: m.value })
            }, null, 4),
            g("div", cs, [
              g("div", {
                class: "slider",
                onMousedown: D,
                onTouchstart: N
              }, [
                g("span", {
                  ref_key: "cursorColorSlider",
                  ref: u,
                  class: "cursor cursor-slider",
                  onMousedown: D,
                  onTouchstart: N
                }, null, 544)
              ], 32),
              g("div", {
                class: "slider-opacity slider flex justify-end",
                onMousedown: z,
                onTouchstart: M
              }, [
                g("span", {
                  class: "cursor cursor-slider",
                  ref_key: "cursorOpacitySlider",
                  ref: d,
                  onMousedown: z,
                  onTouchstart: M
                }, null, 544)
              ], 32)
            ])
          ]),
          g("div", fs, [
            P(_, {
              modelValue: y.value,
              "onUpdate:modelValue": [
                K[0] || (K[0] = (ue) => y.value = ue),
                pe
              ],
              "text-align": "center",
              class: "flex-1"
            }, null, 8, ["modelValue"]),
            g("div", ps, [
              g("div", ms, [
                fe(g("p", { class: "font-bold slide-down" }, R(B.value[i.value + 1 > B.value.length - 1 ? 0 : i.value + 1].toUpperCase()), 513), [
                  [Ce, b.value]
                ]),
                g("p", {
                  class: I(["font-bold", { "slide-down": b.value, "slide-up": U.value }])
                }, R(B.value[i.value].toUpperCase()), 3),
                fe(g("p", { class: "font-bold slide-up" }, R(B.value[i.value - 1 < 0 ? B.value.length - 1 : i.value - 1].toUpperCase()), 513), [
                  [Ce, U.value]
                ])
              ]),
              g("div", vs, [
                P(X, {
                  name: "arrow_drop_up",
                  class: "cursor-pointer flex items-center h-[.8em] text-neutral-interaction-default",
                  onClick: kt
                }),
                P(X, {
                  name: "arrow_drop_down",
                  class: "cursor-pointer flex items-center h-[.8em] text-neutral-interaction-default",
                  onClick: wt
                })
              ])
            ])
          ])
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
}), hs = /* @__PURE__ */ G(gs, [["__scopeId", "data-v-5f44c89c"]]), bs = {
  install(o) {
    o.component("BColorPicker", hs);
  }
}, ys = ["aria-disabled"], Cs = ["onMousedown", "onTouchstart"], Bs = /* @__PURE__ */ q({
  __name: "Slider",
  props: {
    modelValue: { default: void 0 },
    size: { default: "small" },
    max: { default: 0 },
    unit: { default: "" },
    color: { default: "" },
    showTooltip: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    vertical: { type: Boolean, default: !1 },
    fillColors: {},
    isRange: { type: Boolean, default: !1 },
    steps: { default: void 0 },
    neutralBackground: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    ke((k) => ({
      "5488f378": k.color,
      "0dbc22ed": r.value
    }));
    const e = o, c = s;
    he(() => {
      window.addEventListener("mousemove", j), window.addEventListener("mouseup", y), window.addEventListener("touchmove", D), window.addEventListener("touhend", y), M();
    }), we(() => {
      window.removeEventListener("mousemove", j), window.removeEventListener("mouseup", y), window.removeEventListener("touchmove", D), window.removeEventListener("touhend", y);
    }), le(
      () => e.modelValue,
      () => {
        t.value = B(), M();
        const k = i();
        (!e.modelValue || !e.modelValue.length || k.find(
          (V, O) => e.modelValue && V != e.modelValue[O]
        ) != null) && c("update:modelValue", k);
      }
    ), le(
      () => e.vertical,
      () => {
        t.value = B(), setTimeout(() => {
          M();
        }, 200);
      }
    ), le(
      () => e.size,
      () => {
        t.value = B(), setTimeout(() => {
          M();
        }, 100);
      }
    ), le(
      () => e.max,
      () => {
        c("update:modelValue", i());
      }
    );
    const t = A(B()), l = A([!1]);
    e.isRange && l.value.push(!1);
    const n = A(), u = A(), d = A(), a = Y(() => {
      const k = Math.min(...t.value), V = Math.max(...t.value);
      return e.isRange ? `${h(k)} - ${h(V)}` : h(V);
    }), r = Y(() => e.neutralBackground || !e.color ? "" : Le(e.color));
    function m(k) {
      const V = k * 100 + "%", O = {};
      if (e.vertical ? O.bottom = V : O.left = V, e.disabled) return O;
      if (e.fillColors && e.fillColors.length) {
        const C = Math.min(...t.value), E = Math.max(...t.value) - C, ee = k - C, oe = E / e.fillColors.length, se = e.fillColors.find((pe, be) => {
          const Ae = be * oe, xe = (be + 1) * oe;
          if (ee >= Ae && ee <= xe && e.fillColors)
            return e.fillColors[be];
        });
        O.background = se;
      } else e.color && p(k) && (O.background = e.color);
      return O;
    }
    function p(k) {
      const V = Math.max(...t.value), O = Math.min(...t.value), C = k;
      return C <= V && C >= O;
    }
    function h(k) {
      const V = e.max ? e.unit : e.unit || "%";
      return `${((e.max || 100) * k).toFixed(1) + V}`;
    }
    function y() {
      l.value = l.value.map(() => !1);
    }
    function B() {
      var V;
      const k = [0, 0];
      return (V = e.modelValue) == null || V.forEach((O, C) => {
        let E = O;
        e.max && (E = O / e.max), k[C] = b(
          Math.min(1, Math.max(0, E))
        );
      }), k;
    }
    function i() {
      const k = [0, 0];
      return t.value.forEach((V, O) => {
        let C = V;
        e.max && (C = V * e.max), k[O] = C;
      }), k;
    }
    function b(k) {
      return !e.steps || !e.steps.length ? k : e.steps.reduce((V, O) => Math.abs(O - k) < Math.abs(V - k) ? O : V);
    }
    function U(k) {
      z(k.touches[0]);
    }
    function $(k, V) {
      Z(k.touches[0], V);
    }
    function D(k) {
      j(k.touches[0]);
    }
    function z(k) {
      if (!d.value || !n.value) return;
      let V = 0;
      const O = Te(k, n.value[0], d.value);
      let C = 1 / 0;
      if (e.vertical) {
        const E = O.y;
        n.value.forEach((ee, oe) => {
          const se = Number(ee.style.bottom.replace("px", "")), pe = Math.abs(se - E);
          pe < C && (C = pe, V = oe);
        });
      } else {
        const E = O.x;
        n.value.forEach((ee, oe) => {
          const se = ee.offsetLeft, pe = Math.abs(se - E);
          pe < C && (C = pe, V = oe);
        });
      }
      Z(k, V);
    }
    function Z(k, V) {
      n.value && (y(), l.value[V] = !0, T(
        k,
        n.value[V],
        l.value[V],
        V
      ));
    }
    function j(k) {
      l.value.forEach((V, O) => {
        n.value && T(k, n.value[O], V, O);
      });
    }
    function T(k, V, O, C = 0) {
      if (!O || !V || !d.value) return;
      let E = 0;
      const ee = Te(k, V, d.value);
      if (e.vertical) {
        const oe = ee.y, se = d.value.clientHeight - V.clientHeight / 2;
        E = b(oe / se);
      } else {
        const oe = ee.x, se = d.value.clientWidth - V.clientWidth / 2;
        E = b(oe / se);
      }
      N(), t.value[C] = E, c("update:modelValue", i());
    }
    function M() {
      var k;
      (k = n.value) == null || k.forEach((V, O) => {
        if (!(!V || !d.value))
          if (e.vertical) {
            const C = d.value.clientHeight, E = Math.min(
              C,
              Math.max(0, C * t.value[O])
            ), ee = Number(V.style.borderWidth.replace("px", "")) / 2;
            V.style.bottom = E - V.clientHeight / 3 - ee + "px", V.style.left = "50%";
          } else {
            const C = d.value.clientWidth, E = Math.min(
              C,
              Math.max(0, C * t.value[O])
            ), ee = Number(
              V == null ? void 0 : V.computedStyleMap().get("--border-width-xs").toString().replace("px", "")
            ) / 2;
            V.style.left = E - V.clientWidth / 3 - ee + "px", V.style.bottom = "50%";
          }
      }), N();
    }
    function N() {
      if (!(!u.value || !n.value || !d.value))
        if (e.vertical) {
          const k = d.value.clientHeight, V = n.value.map(
            (oe) => oe.clientHeight / 2
          ), C = n.value.map((oe) => oe.offsetTop).map(
            (oe, se) => k - oe - V[se]
          ), E = e.isRange ? Math.min(...C) : 0, ee = Math.max(0, Math.max(...C));
          u.value.style.bottom = E + "px", u.value.style.height = Math.abs(ee - E) + "px", u.value.style.left = "50%", u.value.style.width = "100%";
        } else {
          const k = n.value.map(
            (C) => C.offsetLeft + C.clientWidth / 3
          ), V = e.isRange ? Math.min(...k) : 0, O = Math.max(...k);
          u.value.style.left = V + "px", u.value.style.width = Math.abs(O - V) + n.value[0].clientWidth / 6 + "px", u.value.style.bottom = "50%", u.value.style.height = "100%";
        }
    }
    return (k, V) => {
      const O = W("BTooltip");
      return f(), v("div", {
        ref_key: "slider",
        ref: d,
        class: I(["slider", [
          k.size,
          {
            disabled: k.disabled,
            vertical: k.vertical,
            horizontal: !k.vertical,
            "step-slider": k.steps && k.steps.length,
            "neutral-bg": k.neutralBackground,
            "is-custom-color": !!r.value
          }
        ]]),
        "aria-disabled": k.disabled,
        onMousedown: z,
        onTouchstart: U
      }, [
        (f(!0), v(Q, null, te(l.value, (C, E) => (f(), v("span", {
          ref_for: !0,
          ref_key: "cursors",
          ref: n,
          key: E,
          class: I(["cursor cursor-slider relative select-none", { grabbing: C, colored: k.color }]),
          onMousedown: (ee) => Z(ee, E),
          onTouchstart: (ee) => $(ee, E)
        }, [
          k.showTooltip ? (f(), F(O, {
            key: 0,
            text: a.value,
            position: k.vertical ? "right" : "top",
            class: "cursor-tooltip select-none"
          }, null, 8, ["text", "position"])) : H("", !0)
        ], 42, Cs))), 128)),
        g("div", {
          ref_key: "fillBar",
          ref: u,
          class: I(["fill-bar", {
            "flex-col-reverse": k.vertical,
            "have-fill-colors": k.fillColors && k.fillColors.length,
            colored: k.color && !(k.fillColors && k.fillColors.length) && !k.disabled
          }])
        }, [
          (f(!0), v(Q, null, te(k.fillColors, (C) => (f(), v("div", {
            class: "w-full h-full",
            style: re({ background: C })
          }, null, 4))), 256))
        ], 2),
        (f(!0), v(Q, null, te(k.steps, (C) => (f(), v("div", {
          key: C,
          class: I(["step", { active: p(C) }]),
          style: re(m(C))
        }, null, 6))), 128))
      ], 42, ys);
    };
  }
}), ht = /* @__PURE__ */ G(Bs, [["__scopeId", "data-v-191a1d42"]]), ws = /* @__PURE__ */ q({
  __name: "BSlider",
  props: {
    modelValue: { default: 0 },
    size: { default: "small" },
    max: { default: 0 },
    unit: { default: "" },
    color: { default: "" },
    showTooltip: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    vertical: { type: Boolean, default: !1 },
    fillColors: {},
    steps: {},
    neutralBackground: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    le(() => e.modelValue, () => {
      l([e.modelValue], !1);
    });
    const t = A([e.modelValue]);
    function l(n, u = !0) {
      t.value = n, u && c("update:modelValue", n[0]);
    }
    return (n, u) => (f(), F(ht, {
      class: "b-slider",
      modelValue: t.value,
      "onUpdate:modelValue": [
        u[0] || (u[0] = (d) => t.value = d),
        l
      ],
      size: n.size,
      "show-tooltip": n.showTooltip,
      disabled: n.disabled,
      vertical: n.vertical,
      max: n.max,
      unit: n.unit,
      color: n.color,
      "fill-colors": n.fillColors,
      steps: n.steps,
      "neutral-background": n.neutralBackground
    }, null, 8, ["modelValue", "size", "show-tooltip", "disabled", "vertical", "max", "unit", "color", "fill-colors", "steps", "neutral-background"]));
  }
}), ks = {
  install(o) {
    o.component("BSlider", ws);
  }
}, Vs = /* @__PURE__ */ q({
  __name: "BRangeSlider",
  props: {
    modelValue: { default: void 0 },
    size: { default: "small" },
    max: { default: 0 },
    unit: { default: "" },
    color: { default: "" },
    showTooltip: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    vertical: { type: Boolean, default: !1 },
    fillColors: {},
    steps: {},
    neutralBackground: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    le(() => e.modelValue, () => {
      l(e.modelValue || [0, 0], !1);
    });
    const t = A(e.modelValue || [0, 0]);
    function l(n, u = !0) {
      t.value = n, u && c("update:modelValue", n);
    }
    return (n, u) => (f(), F(ht, {
      class: "b-range-slider",
      modelValue: t.value,
      "onUpdate:modelValue": [
        u[0] || (u[0] = (d) => t.value = d),
        l
      ],
      size: n.size,
      "show-tooltip": n.showTooltip,
      disabled: n.disabled,
      vertical: n.vertical,
      max: n.max,
      unit: n.unit,
      color: n.color,
      "fill-colors": n.fillColors,
      steps: n.steps,
      "neutral-background": n.neutralBackground,
      "is-range": ""
    }, null, 8, ["modelValue", "size", "show-tooltip", "disabled", "vertical", "max", "unit", "color", "fill-colors", "steps", "neutral-background"]));
  }
}), $s = {
  install(o) {
    o.component("BRangeSlider", Vs);
  }
}, Ms = { class: "progress-holder" }, xs = {
  key: 0,
  class: "progress-label"
}, Is = {
  key: 0,
  class: "progress-label absolute"
}, As = /* @__PURE__ */ q({
  __name: "BProgressBar",
  props: {
    modelValue: { default: 0 },
    size: { default: "medium" },
    type: { default: "primary" },
    color: { default: "" },
    icon: { default: "" },
    infoMessage: { default: "" },
    steps: { default: 0 },
    animationType: { default: void 0 },
    displayPercentage: { default: void 0 },
    neutralBackground: { type: Boolean, default: !1 }
  },
  setup(o) {
    const s = o, e = Y(() => {
      let l = s.modelValue * 100;
      return s.steps ? l = s.modelValue / s.steps * 100 : s.animationType && (l = 50), Math.max(0, Math.min(100, l)) + "%";
    }), c = Y(() => s.neutralBackground || !s.color ? "" : Le(s.color)), t = Y(() => s.infoMessage ? "BTooltip" : "div");
    return (l, n) => {
      const u = W("BIcon");
      return l.steps ? (f(), v("div", {
        key: 1,
        class: I(["b-step-bar flex flex-row gap-xs", [l.size, l.type, { "neutral-bg": l.neutralBackground }]])
      }, [
        (f(!0), v(Q, null, te(s.steps, (d) => (f(), v("div", {
          key: d,
          class: I(["step", {
            filled: d <= l.modelValue,
            "neutral-bg": l.neutralBackground
          }]),
          style: re({
            background: d <= l.modelValue ? l.color : c.value,
            width: 100 / s.steps + "%"
          })
        }, null, 6))), 128))
      ], 2)) : (f(), v("div", {
        key: 0,
        class: I(["b-progress-bar", [l.size, l.type, { "neutral-bg": l.neutralBackground }]]),
        style: re({ background: c.value })
      }, [
        g("div", Ms, [
          g("div", {
            class: I(["progress-fill", [l.size, l.animationType]]),
            style: re({ background: l.color, width: e.value })
          }, [
            l.displayPercentage == "bar" && !l.animationType ? (f(), v("label", xs, R(e.value), 1)) : H("", !0)
          ], 6),
          l.displayPercentage == "center" && !l.animationType ? (f(), v("label", Is, R(e.value), 1)) : H("", !0)
        ]),
        !l.animationType && (l.icon || l.$slots["icon-slot"]) ? (f(), F(Pe(t.value), {
          key: 0,
          class: "progress-icon",
          text: l.infoMessage,
          position: "bottom",
          style: re({
            left: e.value,
            color: l.color
          })
        }, {
          default: S(() => [
            x(l.$slots, "icon-slot", {}, () => [
              P(u, { name: l.icon }, null, 8, ["name"])
            ], !0)
          ]),
          _: 3
        }, 8, ["text", "style"])) : H("", !0)
      ], 6));
    };
  }
}), Ss = /* @__PURE__ */ G(As, [["__scopeId", "data-v-a64348c7"]]), Ds = {
  install(o) {
    o.component("BProgressBar", Ss);
  }
}, Es = {
  key: 0,
  class: "flex flex-row justify-between items-center mb-xxs"
}, Hs = {
  key: 0,
  class: "text-neutral-foreground-low font-bold text-xs"
}, Ts = { class: "max-w-full" }, Ls = { class: "whitespace-normal break-all" }, Ps = ["disabled", "placeholder"], zs = { key: 1 }, Os = { class: "p3 text-neutral-foreground-low" }, Ws = {
  key: 0,
  class: "error-default"
}, Us = /* @__PURE__ */ q({
  __name: "BTagInput",
  props: {
    modelValue: { default: void 0 },
    labelValue: { default: "" },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    allowDuplicate: { type: Boolean, default: !1 },
    max: { default: void 0 },
    isError: { type: Boolean, default: !1 },
    placeholder: { default: "" },
    mask: { default: void 0 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    he(() => {
      p();
    });
    let t = A([]);
    const l = A(!1), n = A(""), u = A(!1), d = A(""), a = A(null), r = {
      DUPLICATE: "Duplicated values are not allowed",
      INVALID_INPUT: "Please provide a valid input",
      MAX_VALUES: "Max number of values reached"
    };
    le(
      () => e.modelValue,
      () => {
        p();
      }
    );
    function m() {
      var N;
      const M = (N = a.value) == null ? void 0 : N.querySelector(
        "#input-default"
      );
      l.value = !0, M && M.focus();
    }
    function p() {
      t.value = e.modelValue || [];
    }
    function h(M) {
      if (!u.value && !Nt(M)) {
        if (b(M)) {
          const N = M.split(/,|\n/).map((k) => k.trim());
          N.length > 0 && N.forEach((k) => {
            y(k) || t.value.push(k), $();
          });
        } else
          y(M) || (t.value.push(M), $());
        c("update:modelValue", t.value);
      }
    }
    function y(M) {
      return u.value = !1, !e.allowDuplicate && i(M) ? (U(r.DUPLICATE), !0) : M.trim().length === 0 ? (U(r.INVALID_INPUT), !0) : e.max !== void 0 && e.max > 0 && t.value.length > e.max - 1 ? (U(r.MAX_VALUES), !0) : !1;
    }
    function B() {
      setTimeout(() => {
        u.value = !1;
      }, 2e3);
    }
    function i(M) {
      return t.value.includes(M);
    }
    function b(M) {
      return M.includes(",") || M.includes(`
`);
    }
    function U(M) {
      d.value = M, u.value = !0, B();
    }
    function $() {
      d.value = "", n.value = "", u.value = !1;
    }
    function D(M) {
      n.value.length || (t.value.splice(M, 1), c("update:modelValue", t.value));
    }
    function z(M) {
      u.value = !st(M);
    }
    function Z(M) {
      u.value = !it(M);
    }
    function j(M) {
      u.value = !rt(M);
    }
    function T(M) {
      let N = M.target.value;
      N = nt(N, e.mask), e.mask == "email" ? z(N) : e.mask == "domain" ? Z(N) : e.mask == "url" && j(N);
    }
    return (M, N) => {
      const k = W("BTag"), V = W("BTooltip");
      return f(), v("div", {
        ref_key: "tagInput",
        ref: a
      }, [
        M.labelValue ? (f(), v("div", Es, [
          P(Re, {
            "label-value": M.labelValue,
            "info-message": M.infoMessage,
            required: M.required
          }, null, 8, ["label-value", "info-message", "required"]),
          M.max !== void 0 && M.max > 0 ? (f(), v("label", Hs, R(w(t).length) + " / " + R(M.max), 1)) : H("", !0)
        ])) : H("", !0),
        g("div", {
          class: I(["b-tag-input", {
            active: l.value && !M.disabled,
            error: u.value || M.isError,
            disabled: M.disabled
          }]),
          tabindex: "0",
          onFocus: m,
          onBlur: N[6] || (N[6] = (O) => l.value = !1)
        }, [
          (f(!0), v(Q, null, te(w(t), (O, C) => (f(), F(V, {
            key: O,
            position: "bottom",
            class: "max-w-full"
          }, {
            text: S(() => [
              g("div", Ts, [
                g("span", Ls, R(O), 1)
              ])
            ]),
            default: S(() => [
              P(k, {
                color: "neutral",
                class: "tag-padding max-w-full",
                text: O,
                closeable: "",
                onClose: (E) => D(C)
              }, null, 8, ["text", "onClose"])
            ]),
            _: 2
          }, 1024))), 128)),
          fe(g("textarea", {
            rows: "1",
            "onUpdate:modelValue": N[0] || (N[0] = (O) => n.value = O),
            id: "input-default",
            class: "input-default",
            disabled: M.disabled,
            placeholder: M.placeholder,
            onInput: T,
            onFocusout: N[1] || (N[1] = (O) => l.value = !1),
            onFocus: N[2] || (N[2] = (O) => l.value = !0),
            onKeydown: [
              N[3] || (N[3] = me(
                (O) => {
                  O.preventDefault(), h(n.value);
                },
                ["enter"]
              )),
              N[4] || (N[4] = me($e((O) => h(n.value), ["prevent"]), ["tab"])),
              N[5] || (N[5] = me((O) => D(w(t).length - 1), ["backspace"]))
            ]
          }, null, 40, Ps), [
            [Me, n.value]
          ])
        ], 34),
        M.$slots["info-text"] ? (f(), v("div", zs, [
          g("label", Os, [
            x(M.$slots, "info-text", {}, void 0, !0)
          ])
        ])) : H("", !0),
        g("div", null, [
          e.isError || u.value ? (f(), v("label", Ws, R(e.errorMessage || d.value), 1)) : H("", !0)
        ])
      ], 512);
    };
  }
}), js = /* @__PURE__ */ G(Us, [["__scopeId", "data-v-c4bb1c27"]]), Rs = {
  install(o) {
    o.component("BTagInput", js);
  }
}, Fs = "data:image/png;base64,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", _s = { class: "left-side" }, Ns = { class: "w-full h-full overflow-hidden relative" }, qs = { class: "absolute left-[-25%] top-[50%] translate-y-[-50%] flex items-center gap-xl" }, Zs = {
  width: "100%",
  height: "100%",
  viewBox: "-126 -126 252 252",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, Ks = { class: "right-content" }, Xs = /* @__PURE__ */ q({
  __name: "BContentScreen",
  props: {
    progression: { default: 0 },
    steps: { default: 0 },
    isImgRight: { type: Boolean, default: !1 },
    isAnimatedLogo: { type: Boolean, default: !1 }
  },
  emits: ["update:progression"],
  setup(o, { emit: s }) {
    const e = o, c = A(e.progression);
    le(
      () => e.progression,
      () => {
        c.value = e.progression;
      }
    );
    const t = s;
    return (l, n) => {
      const u = W("BProgressBar"), d = W("BCard");
      return f(), v("div", {
        class: I(["w-full h-screen flex", { "flex-row-reverse": l.isImgRight }])
      }, [
        g("div", _s, [
          x(l.$slots, "bg-logo", {}, () => [
            g("div", Ns, [
              g("div", qs, [
                (f(), v("svg", Zs, [
                  n[2] || (n[2] = g("circle", {
                    cx: "0",
                    cy: "0",
                    r: "8.5",
                    stroke: "#0057F4",
                    "stroke-width": "5",
                    fill: "#0057F4",
                    class: "circle-3"
                  }, null, -1)),
                  n[3] || (n[3] = g("circle", {
                    cx: "0",
                    cy: "0",
                    r: "72",
                    stroke: "#0057F4",
                    "stroke-width": "25",
                    class: "circle-2"
                  }, null, -1)),
                  g("circle", {
                    cx: "115",
                    cy: "0",
                    r: "8.5",
                    stroke: "#0057F4",
                    "stroke-width": "5",
                    fill: "#0057F4",
                    class: I({ "brius-animated-logo": l.isAnimatedLogo })
                  }, null, 2)
                ])),
                x(l.$slots, "bg-logo-text", {}, () => [
                  n[4] || (n[4] = Ue('<svg width="100%" height="100%" viewBox="0 0 219 62" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-2418cd4b><path d="M19.7199 30.9038C19.7199 34.8127 16.714 37.853 12.4199 37.853H0V12.6956H11.5611C15.4258 12.6956 18.4317 15.3015 18.4317 19.2104C18.4317 21.8164 17.1434 23.5537 15.4258 24.8567C18.0023 25.2576 19.7199 27.8635 19.7199 30.9038ZM4.29412 16.6045V23.1194H10.7353C12.4529 23.1194 14.1706 21.8164 14.1706 20.0791C14.1706 18.3418 12.8493 17.0388 10.7023 17.0388H4.29412V16.6045ZM15.4258 30.0351C15.4258 27.8635 13.7081 26.5605 11.9905 26.5605H4.29412V33.9441H11.5611C13.7081 33.9441 15.4258 32.2068 15.4258 30.0351Z" fill="#0057F4" data-v-2418cd4b></path><path d="M53.1484 33.5097V37.4187H51.4308C47.9955 37.4187 45.419 36.1157 44.1308 33.5097L40.2661 28.2978H37.6896V37.853H33.3955V12.6956H44.0978C48.8213 12.6956 52.653 16.1702 52.653 20.5134C52.653 24.4223 49.6471 27.4626 45.7824 28.3313L48.3589 31.8059C49.2177 33.1088 50.5059 33.5432 52.2236 33.5432H53.1484V33.5097ZM37.7227 24.4223H44.1638C46.3109 24.4223 48.0285 22.685 48.0285 20.5134C48.0285 18.3418 46.3109 16.6045 44.1638 16.6045H37.7227V24.4223Z" fill="#0057F4" data-v-2418cd4b></path><path d="M66.4268 12.6956H70.7209V37.8864H66.4268V12.6956Z" fill="#0057F4" data-v-2418cd4b></path><path d="M84 27.8635V12.6956H88.2941V27.8969C88.2941 31.3715 90.8706 33.9775 94.3059 33.9775C97.7412 33.9775 100.318 31.3715 100.318 27.8969V12.6956H104.612V28.3313C104.612 33.9775 99.8882 38.3207 93.9095 38.3207C88.6905 38.2873 84 33.9441 84 27.8635Z" fill="#0057F4" data-v-2418cd4b></path><path d="M118.253 30.5034H122.976C122.976 32.675 125.124 34.4123 127.7 34.4123C130.276 34.4123 131.994 33.1093 131.994 30.9377C131.994 28.7661 129.847 27.8974 126.412 27.0288C122.118 26.1601 118.682 23.9885 118.682 19.6452C118.682 15.302 122.547 12.2617 127.238 12.2617C132.39 12.2617 135.793 15.302 135.793 19.6452H131.135C131.135 17.4736 129.418 16.1706 126.841 16.1706C124.694 16.1706 122.547 17.4736 122.547 19.2109C122.547 21.3825 124.694 22.2512 127.7 23.1198C131.994 23.9885 135.826 26.1601 135.826 30.5034C135.826 35.2809 131.961 38.3212 126.841 38.3212C122.118 38.3212 118.253 34.8466 118.253 30.5034Z" fill="#0057F4" data-v-2418cd4b></path><path d="M0 61.32V50.8974H6.58006V52.4801H1.86067V55.3097H6.12868V56.8924H1.86067V61.32H0Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M18.8655 56.1087C18.8655 57.2317 18.6582 58.1935 18.2436 58.9942C17.8324 59.7915 17.2707 60.4022 16.5585 60.8263C15.8497 61.2504 15.0455 61.4625 14.1461 61.4625C13.2467 61.4625 12.4409 61.2504 11.7288 60.8263C11.0199 60.3989 10.4582 59.7865 10.0436 58.9892C9.63236 58.1885 9.42674 57.2283 9.42674 56.1087C9.42674 54.9857 9.63236 54.0255 10.0436 53.2282C10.4582 52.4275 11.0199 51.8151 11.7288 51.391C12.4409 50.9669 13.2467 50.7549 14.1461 50.7549C15.0455 50.7549 15.8497 50.9669 16.5585 51.391C17.2707 51.8151 17.8324 52.4275 18.2436 53.2282C18.6582 54.0255 18.8655 54.9857 18.8655 56.1087ZM16.9948 56.1087C16.9948 55.3182 16.8728 54.6515 16.6287 54.1086C16.388 53.5624 16.0536 53.1502 15.6256 52.872C15.1977 52.5904 14.7045 52.4496 14.1461 52.4496C13.5878 52.4496 13.0946 52.5904 12.6666 52.872C12.2386 53.1502 11.9026 53.5624 11.6585 54.1086C11.4178 54.6515 11.2974 55.3182 11.2974 56.1087C11.2974 56.8992 11.4178 57.5676 11.6585 58.1138C11.9026 58.6567 12.2386 59.0689 12.6666 59.3505C13.0946 59.6287 13.5878 59.7678 14.1461 59.7678C14.7045 59.7678 15.1977 59.6287 15.6256 59.3505C16.0536 59.0689 16.388 58.6567 16.6287 58.1138C16.8728 57.5676 16.9948 56.8992 16.9948 56.1087Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M22.0369 61.32V50.8974H25.8887C26.6777 50.8974 27.3398 51.0365 27.8747 51.3147C28.413 51.5929 28.8193 51.9831 29.0934 52.4852C29.371 52.9839 29.5097 53.5658 29.5097 54.2308C29.5097 54.8992 29.3693 55.4793 29.0884 55.9713C28.8109 56.4598 28.4013 56.8381 27.8597 57.1062C27.318 57.3708 26.6527 57.5031 25.8636 57.5031H23.1202V55.9357H25.6128C26.0742 55.9357 26.4521 55.8712 26.7463 55.7423C27.0405 55.6099 27.2578 55.4183 27.3983 55.1672C27.542 54.9127 27.6139 54.6006 27.6139 54.2308C27.6139 53.861 27.542 53.5454 27.3983 53.2842C27.2545 53.0196 27.0355 52.8194 26.7413 52.6837C26.447 52.5446 26.0676 52.475 25.6028 52.475H23.8976V61.32H22.0369ZM27.3431 56.5972L29.8859 61.32H27.8095L25.3119 56.5972H27.3431Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M37.5502 61.32V50.8974H41.402C42.191 50.8974 42.8531 51.0467 43.388 51.3452C43.9263 51.6438 44.3326 52.0543 44.6067 52.5768C44.8843 53.0959 45.023 53.6862 45.023 54.3478C45.023 55.0162 44.8843 55.6099 44.6067 56.129C44.3292 56.6481 43.9196 57.057 43.378 57.3555C42.8363 57.6507 42.1693 57.7983 41.3769 57.7983H38.8241V56.2461H41.1261C41.5875 56.2461 41.9654 56.1647 42.2596 56.0018C42.5538 55.839 42.7711 55.615 42.9116 55.33C43.0553 55.0451 43.1272 54.7176 43.1272 54.3478C43.1272 53.978 43.0553 53.6523 42.9116 53.3707C42.7711 53.0891 42.5521 52.8703 42.2546 52.7142C41.9603 52.5548 41.5808 52.475 41.1161 52.475H39.4109V61.32H37.5502Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M54.5262 50.8974H56.3869V57.7067C56.3869 58.4531 56.213 59.1096 55.8653 59.6762C55.5209 60.2428 55.0361 60.6855 54.4109 61.0045C53.7856 61.32 53.0551 61.4778 52.2192 61.4778C51.38 61.4778 50.6477 61.32 50.0225 61.0045C49.3973 60.6855 48.9124 60.2428 48.5681 59.6762C48.2237 59.1096 48.0515 58.4531 48.0515 57.7067V50.8974H49.9122V57.5489C49.9122 57.9832 50.0058 58.37 50.193 58.7092C50.3836 59.0485 50.6511 59.3149 50.9955 59.5082C51.3398 59.6982 51.7478 59.7932 52.2192 59.7932C52.6906 59.7932 53.0985 59.6982 53.4429 59.5082C53.7906 59.3149 54.0581 59.0485 54.2454 58.7092C54.4326 58.37 54.5262 57.9832 54.5262 57.5489V50.8974Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M59.8216 61.32V50.8974H63.7536C64.4959 50.8974 65.1128 51.0161 65.6043 51.2536C66.0991 51.4877 66.4686 51.8083 66.7126 52.2155C66.96 52.6226 67.0838 53.084 67.0838 53.5997C67.0838 54.0238 67.0035 54.3869 66.843 54.6888C66.6825 54.9874 66.4669 55.23 66.1961 55.4166C65.9252 55.6032 65.6226 55.7372 65.2883 55.8186V55.9204C65.6527 55.9407 66.0021 56.0544 66.3365 56.2614C66.6742 56.4649 66.95 56.7533 67.164 57.1265C67.378 57.4997 67.485 57.951 67.485 58.4802C67.485 59.0197 67.3563 59.5049 67.0988 59.9357C66.8414 60.3632 66.4535 60.7008 65.9353 60.9485C65.417 61.1962 64.765 61.32 63.9793 61.32H59.8216ZM61.6823 59.7424H63.6834C64.3588 59.7424 64.8453 59.6117 65.1428 59.3505C65.4438 59.0858 65.5942 58.7466 65.5942 58.3327C65.5942 58.0239 65.519 57.7457 65.3685 57.498C65.2181 57.247 65.0041 57.0502 64.7266 56.9077C64.4491 56.7618 64.1181 56.6889 63.7336 56.6889H61.6823V59.7424ZM61.6823 55.33H63.5229C63.8439 55.33 64.1331 55.2707 64.3906 55.1519C64.648 55.0298 64.8503 54.8584 64.9974 54.6379C65.1479 54.414 65.2231 54.1494 65.2231 53.844C65.2231 53.4403 65.0827 53.1078 64.8018 52.8465C64.5243 52.5853 64.1114 52.4547 63.563 52.4547H61.6823V55.33Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M70.516 61.32V50.8974H72.3766V59.7373H76.9004V61.32H70.516Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M81.7883 50.8974V61.32H79.9277V50.8974H81.7883Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M90.7975 53.7626C90.7507 53.3181 90.5535 52.9721 90.2057 52.7244C89.8614 52.4767 89.4133 52.3529 88.8617 52.3529C88.4738 52.3529 88.1411 52.4123 87.8636 52.531C87.5861 52.6497 87.3738 52.8109 87.2267 53.0145C87.0796 53.218 87.0043 53.4504 87.001 53.7117C87.001 53.9288 87.0495 54.1171 87.1464 54.2766C87.2467 54.436 87.3821 54.5718 87.5527 54.6837C87.7232 54.7923 87.9121 54.8839 88.1194 54.9585C88.3267 55.0332 88.5357 55.0959 88.7463 55.1468L89.7092 55.3911C90.0971 55.4827 90.4699 55.6066 90.8276 55.7626C91.1887 55.9187 91.5114 56.1155 91.7956 56.353C92.0831 56.5905 92.3105 56.8772 92.4777 57.213C92.6448 57.5489 92.7284 57.9425 92.7284 58.3937C92.7284 59.0044 92.5746 59.5422 92.267 60.007C91.9594 60.4684 91.5147 60.8297 90.933 61.091C90.3545 61.3488 89.6541 61.4778 88.8316 61.4778C88.0325 61.4778 87.3387 61.3522 86.7502 61.1012C86.1651 60.8501 85.707 60.4837 85.376 60.0019C85.0484 59.5201 84.8712 58.9332 84.8444 58.241H86.675C86.7017 58.6041 86.8121 58.906 87.006 59.1469C87.1999 59.3878 87.4524 59.5676 87.7633 59.6864C88.0776 59.8051 88.4287 59.8645 88.8165 59.8645C89.2211 59.8645 89.5755 59.8034 89.8798 59.6813C90.1874 59.5557 90.4281 59.3827 90.602 59.1622C90.7758 58.9383 90.8644 58.677 90.8678 58.3785C90.8644 58.107 90.7859 57.8831 90.632 57.7067C90.4782 57.5269 90.2626 57.3776 89.9851 57.2588C89.7109 57.1367 89.3899 57.0281 89.0221 56.9331L87.8536 56.6278C87.0077 56.4073 86.339 56.0731 85.8475 55.6252C85.3593 55.174 85.1152 54.5752 85.1152 53.8287C85.1152 53.2146 85.2791 52.6769 85.6067 52.2155C85.9377 51.7541 86.3874 51.3961 86.9558 51.1417C87.5242 50.8838 88.1679 50.7549 88.8867 50.7549C89.6156 50.7549 90.2542 50.8838 90.8026 51.1417C91.3542 51.3961 91.7872 51.7507 92.1015 52.2053C92.4158 52.6565 92.578 53.1756 92.588 53.7626H90.7975Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M95.7996 61.32V50.8974H97.6602V55.3097H102.42V50.8974H104.285V61.32H102.42V56.8924H97.6602V61.32H95.7996Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M107.721 61.32V50.8974H114.402V52.4801H109.582V55.3097H114.056V56.8924H109.582V59.7373H114.442V61.32H107.721Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M117.712 61.32V50.8974H121.564C122.353 50.8974 123.015 51.0365 123.55 51.3147C124.088 51.5929 124.495 51.9831 124.769 52.4852C125.046 52.9839 125.185 53.5658 125.185 54.2308C125.185 54.8992 125.045 55.4793 124.764 55.9713C124.486 56.4598 124.077 56.8381 123.535 57.1062C122.993 57.3708 122.328 57.5031 121.539 57.5031H118.796V55.9357H121.288C121.75 55.9357 122.127 55.8712 122.422 55.7423C122.716 55.6099 122.933 55.4183 123.074 55.1672C123.217 54.9127 123.289 54.6006 123.289 54.2308C123.289 53.861 123.217 53.5454 123.074 53.2842C122.93 53.0196 122.711 52.8194 122.417 52.6837C122.122 52.5446 121.743 52.475 121.278 52.475H119.573V61.32H117.712ZM123.019 56.5972L125.561 61.32H123.485L120.987 56.5972H123.019Z" fill="#5C5C5C" data-v-2418cd4b></path><path d="M133.892 53.7626C133.845 53.3181 133.648 52.9721 133.3 52.7244C132.956 52.4767 132.508 52.3529 131.956 52.3529C131.568 52.3529 131.236 52.4123 130.958 52.531C130.681 52.6497 130.468 52.8109 130.321 53.0145C130.174 53.218 130.099 53.4504 130.096 53.7117C130.096 53.9288 130.144 54.1171 130.241 54.2766C130.341 54.436 130.477 54.5718 130.647 54.6837C130.818 54.7923 131.007 54.8839 131.214 54.9585C131.421 55.0332 131.63 55.0959 131.841 55.1468L132.804 55.3911C133.192 55.4827 133.565 55.6066 133.922 55.7626C134.283 55.9187 134.606 56.1155 134.89 56.353C135.178 56.5905 135.405 56.8772 135.572 57.213C135.739 57.5489 135.823 57.9425 135.823 58.3937C135.823 59.0044 135.669 59.5422 135.362 60.007C135.054 60.4684 134.609 60.8297 134.028 61.091C133.449 61.3488 132.749 61.4778 131.926 61.4778C131.127 61.4778 130.433 61.3522 129.845 61.1012C129.26 60.8501 128.802 60.4837 128.471 60.0019C128.143 59.5201 127.966 58.9332 127.939 58.241H129.77C129.796 58.6041 129.907 58.906 130.101 59.1469C130.295 59.3878 130.547 59.5676 130.858 59.6864C131.172 59.8051 131.523 59.8645 131.911 59.8645C132.316 59.8645 132.67 59.8034 132.974 59.6813C133.282 59.5557 133.523 59.3827 133.697 59.1622C133.87 58.9383 133.959 58.677 133.962 58.3785C133.959 58.107 133.88 57.8831 133.727 57.7067C133.573 57.5269 133.357 57.3776 133.08 57.2588C132.806 57.1367 132.485 57.0281 132.117 56.9331L130.948 56.6278C130.102 56.4073 129.434 56.0731 128.942 55.6252C128.454 55.174 128.21 54.5752 128.21 53.8287C128.21 53.2146 128.374 52.6769 128.701 52.2155C129.032 51.7541 129.482 51.3961 130.05 51.1417C130.619 50.8838 131.262 50.7549 131.981 50.7549C132.71 50.7549 133.349 50.8838 133.897 51.1417C134.449 51.3961 134.882 51.7507 135.196 52.2053C135.51 52.6565 135.673 53.1756 135.683 53.7626H133.892Z" fill="#5C5C5C" data-v-2418cd4b></path></svg>', 1))
                ], !0)
              ])
            ])
          ], !0)
        ]),
        g("div", {
          class: I(["right-side", [l.isImgRight ? "mr-[28%]" : "ml-[28%]"]])
        }, [
          x(l.$slots, "default", {}, () => [
            g("div", Ks, [
              x(l.$slots, "logo", {}, () => [
                n[5] || (n[5] = g("img", {
                  src: Fs,
                  alt: "Brius logo",
                  class: "brius-logo"
                }, null, -1))
              ], !0),
              x(l.$slots, "progress-bar", {}, () => [
                P(u, {
                  class: "w-[95%]",
                  size: "small",
                  modelValue: c.value,
                  "onUpdate:modelValue": [
                    n[0] || (n[0] = (a) => c.value = a),
                    n[1] || (n[1] = (a) => t("update:progression", a))
                  ],
                  steps: l.steps
                }, null, 8, ["modelValue", "steps"])
              ], !0),
              x(l.$slots, "card", {}, () => [
                P(d, { class: "w-full" }, {
                  default: S(() => [
                    x(l.$slots, "card-content", {}, void 0, !0)
                  ]),
                  _: 3
                })
              ], !0),
              x(l.$slots, "actions", {}, void 0, !0)
            ])
          ], !0)
        ], 2)
      ], 2);
    };
  }
}), Gs = /* @__PURE__ */ G(Xs, [["__scopeId", "data-v-2418cd4b"]]), Js = {
  install(o) {
    o.component("BContentScreen", Gs);
  }
}, Qs = ["onClick"], Ys = { class: "data-list" }, ei = /* @__PURE__ */ q({
  __name: "BHistory",
  props: {
    modelValue: { default: void 0 },
    items: {},
    position: { default: "right" },
    type: { default: "primary" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t, l] = ie(
      e,
      "modelValue",
      c,
      null
    );
    return (n, u) => {
      const d = W("BIcon");
      return f(), v("div", {
        class: I(["b-history", { flex: n.position === "top" || n.position === "bottom" }])
      }, [
        (f(!0), v(Q, null, te(n.items, (a, r) => (f(), v("div", {
          key: r,
          class: I(["item", [
            n.position,
            a.type ? a.type : n.type,
            {
              "last-item": !n.items[r + 1],
              "first-item": r == 0,
              active: r == 0 && !w(t) && !n.disabled || a === w(t),
              disabled: n.disabled
            }
          ]]),
          onClick: (m) => !n.disabled && w(l)(a, { index: r })
        }, [
          g("div", {
            class: I(["circle", {
              "circle-icon": !!a.icon && !a.isIconRound,
              "round-icon": !!a.icon && a.isIconRound
            }])
          }, [
            a.icon ? (f(), F(d, {
              key: 0,
              name: a.icon,
              filled: !a.unfilled
            }, null, 8, ["name", "filled"])) : H("", !0)
          ], 2),
          g("div", {
            class: I(["custom-border", { "have-icon": !!a.icon && !a.isIconRound }])
          }, null, 2),
          g("div", Ys, [
            x(n.$slots, "item", {
              item: a,
              index: r,
              active: r == 0 && !w(t) && !n.disabled || a === w(t)
            }, void 0, !0)
          ])
        ], 10, Qs))), 128))
      ], 2);
    };
  }
}), ti = /* @__PURE__ */ G(ei, [["__scopeId", "data-v-a298c37e"]]), li = {
  install(o) {
    o.component("BHistory", ti);
  }
}, ai = {
  key: 0,
  class: "relative"
}, oi = { class: "pointer-events-none w-0 h-0" }, ni = ["disabled"], si = {
  key: 1,
  class: "flex flex-wrap gap-xxs my-xs max-w-[40em]"
}, ii = { class: "tag-default py-xxs" }, ri = { class: "font-bold text-xs truncate" }, ui = {
  key: 0,
  class: "text-xs italic text-neutral-foreground-low flex justify-center"
}, di = {
  key: 1,
  class: "text-xs italic text-neutral-foreground-low flex justify-center"
}, ci = { class: "flex justify-center w-full" }, fi = /* @__PURE__ */ q({
  __name: "BTagSelect",
  props: {
    modelValue: { default: void 0 },
    items: { default: void 0 },
    labelValue: { default: "" },
    icon: {},
    expanded: { type: Boolean, default: !1 },
    labelKey: { default: "label" },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    absolute: { type: Boolean, default: !1 },
    buttonText: { default: "Add" }
  },
  emits: ["update:modelValue", "update:items", "update:expanded"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    le(
      () => e.expanded,
      () => {
        a.value = e.expanded;
      }
    );
    const t = Y(() => r.value ? u.value.filter(($) => {
      var D, z, Z;
      if (de($)) {
        if ((z = (D = $[e.labelKey]) == null ? void 0 : D.toLowerCase()) != null && z.includes(r.value.toLowerCase()))
          return $;
      } else if ((Z = $ == null ? void 0 : $.toLowerCase()) != null && Z.includes(r.value.toLowerCase()))
        return $;
    }) : u.value), [l, n] = ie(
      e,
      "modelValue",
      c,
      []
    );
    l.value = l.value || [];
    const [u, d] = ie(
      e,
      "items",
      c,
      []
    ), a = A(e.expanded), r = A("");
    function m($) {
      if (!(e.isError || !$)) {
        if (B(u.value, $)) {
          r.value = "";
          return;
        }
        u.value.push($), d(u.value, { index: u.value.length - 1 }), r.value = "";
      }
    }
    function p($) {
      l.value.splice($, 1), n(l.value, { index: $ });
    }
    function h($) {
      function D(z) {
        n([...l.value, u.value[z]], { index: z }), $.preventDefault();
      }
      switch ($.key) {
        case "Home":
        case "ArrowDown":
          D(0);
          break;
        case "End":
        case "ArrowUp":
          {
            const z = u.value.length - 1;
            D(z);
          }
          break;
      }
    }
    function y($, D) {
      e.disabled || B(l.value, $) || (n([...l.value, $], D), a.value = !1, c("update:expanded", !1, { source: "value-selected" }));
    }
    function B($, D) {
      return de(D) ? $.find((z) => z[e.labelKey] === D[e.labelKey]) : $ == null ? void 0 : $.includes(D);
    }
    function i($) {
      $.target && setTimeout(() => {
        var D, z;
        (z = (D = $.target) == null ? void 0 : D.classList) != null && z.contains("close-icon") || (a.value = !0, c("update:expanded", !0, { source: "click" }));
      }, 1);
    }
    function b($, D) {
      a.value = $, c("update:expanded", $, D);
    }
    function U($, D) {
      (D == null ? void 0 : D.source) == "click" ? b(!0, D) : b($, D);
    }
    return ($, D) => {
      const z = W("BIcon"), Z = W("BTag"), j = W("BRoundButton"), T = W("BSelectContainer");
      return f(), F(T, {
        modelValue: a.value,
        "onUpdate:modelValue": [
          D[6] || (D[6] = (M) => a.value = M),
          U
        ],
        required: $.required,
        "label-value": $.labelValue,
        disabled: $.disabled,
        absolute: $.absolute,
        "is-error": $.isError,
        "error-message": $.errorMessage,
        "info-message": $.infoMessage,
        "max-height": "none",
        "min-width": "12em",
        onKeyup: h,
        onClick: D[7] || (D[7] = (M) => b(!0, { source: "click" }))
      }, {
        items: S(() => [
          !t.value.length && r.value.length ? (f(), v("div", ui, [
            x($.$slots, "no-items-found", {}, () => [
              D[10] || (D[10] = ae(" No result found. "))
            ], !0)
          ])) : w(u).length ? (f(!0), v(Q, { key: 2 }, te(t.value, (M, N) => (f(), F(Ve, {
            "aria-selected": B(w(l), M),
            key: `${w(de)(M) ? M[$.labelKey] : M}`,
            tabindex: "0",
            class: I({ "font-bold": B(w(l), M) }),
            onClick: (k) => y(M, N),
            onKeyup: me((k) => y(M, N), ["space"])
          }, {
            default: S(() => [
              x($.$slots, "item", {
                item: M,
                index: N
              }, () => [
                ae(R(w(de)(M) ? M[$.labelKey] : M), 1)
              ], !0)
            ]),
            _: 2
          }, 1032, ["aria-selected", "class", "onClick", "onKeyup"]))), 128)) : (f(), v("div", di, [
            x($.$slots, "no-items", {}, () => [
              D[11] || (D[11] = ae(" No tags created yet. "))
            ], !0)
          ]))
        ]),
        actions: S(() => [
          g("div", ci, [
            P(j, {
              onClick: D[5] || (D[5] = (M) => m(r.value)),
              text: $.buttonText,
              "always-open": ""
            }, null, 8, ["text"])
          ])
        ]),
        default: S(() => [
          P(ze, {
            modelValue: r.value,
            "onUpdate:modelValue": D[3] || (D[3] = (M) => r.value = M),
            expanded: a.value,
            "onUpdate:expanded": [
              D[4] || (D[4] = (M) => a.value = M),
              b
            ],
            disabled: $.disabled,
            icon: $.icon,
            items: $.items,
            onClick: i
          }, {
            searchText: S(() => [
              x($.$slots, "search-text", {}, () => [
                D[8] || (D[8] = ae("Search"))
              ], !0)
            ]),
            status: S(() => {
              var M;
              return [
                a.value || !((M = $.modelValue) != null && M.length) ? (f(), v("div", ai, [
                  fe(g("div", oi, [
                    g("span", {
                      class: I(["absolute text-neutral-foreground-low top-[50%] translate-y-[-50%]", { "text-danger-foreground-low": $.isError }])
                    }, [
                      x($.$slots, "search-text", {}, () => [
                        D[9] || (D[9] = ae("Search"))
                      ], !0)
                    ], 2)
                  ], 512), [
                    [Ce, !r.value.length]
                  ]),
                  fe(g("input", {
                    "onUpdate:modelValue": D[0] || (D[0] = (N) => r.value = N),
                    type: "text",
                    class: I(["search", {
                      "bg-danger-surface-default text-danger-foreground-low": $.isError,
                      "bg-neutral-surface-disabled text-neutral-foreground-low": $.disabled
                    }]),
                    onKeydown: [
                      D[1] || (D[1] = me((N) => m(r.value), ["enter"])),
                      D[2] || (D[2] = me($e((N) => m(r.value), ["prevent"]), ["tab"]))
                    ],
                    style: { "--tw-ring-color": "none !important" },
                    disabled: $.disabled
                  }, null, 42, ni), [
                    [Me, r.value]
                  ])
                ])) : (f(), v("div", si, [
                  (f(!0), v(Q, null, te(w(l), (N, k) => (f(), F(Z, {
                    color: "transparent",
                    class: "tag",
                    key: k
                  }, {
                    default: S(() => [
                      g("div", ii, [
                        g("p", ri, R(w(de)(N) ? N[$.labelKey] : N), 1),
                        P(z, {
                          name: "close",
                          onClick: (V) => p(k),
                          class: "close-icon"
                        }, null, 8, ["onClick"])
                      ])
                    ]),
                    _: 2
                  }, 1024))), 128))
                ]))
              ];
            }),
            _: 3
          }, 8, ["modelValue", "expanded", "disabled", "icon", "items"])
        ]),
        _: 3
      }, 8, ["modelValue", "required", "label-value", "disabled", "absolute", "is-error", "error-message", "info-message"]);
    };
  }
}), pi = /* @__PURE__ */ G(fi, [["__scopeId", "data-v-516e3e41"]]), mi = {
  install(o) {
    o.component("BTagSelect", pi);
  }
}, vi = { class: "flex items-center gap-xs" }, gi = { class: "flex" }, hi = {
  key: 0,
  class: "dots"
}, bi = ["onClick"], yi = /* @__PURE__ */ q({
  __name: "BPagination",
  props: {
    modelValue: { default: 1 },
    length: { default: 1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t, l] = ie(
      e,
      "modelValue",
      c,
      null
    ), n = Y(() => {
      const d = [];
      for (let a = 1; a <= e.length; a++)
        a === 1 || a === e.length || t.value === 1 && a < 4 || t.value === e.length && a >= e.length - 2 || t.value - 1 === a || t.value + 1 === a || t.value === a ? d.push(a) : (t.value <= e.length - 2 && a === e.length - 1 && e.length > 3 || t.value > 2 && e.length > 3 && a === 2) && d.push(-1);
      for (let a = 0; a < 2; a++) {
        const r = a == 0 ? d.findIndex((m) => m == -1) : d.findLastIndex((m) => m == -1);
        d[r + 1] - d[r - 1] == 2 && (d[r] = d[r - 1] + 1);
      }
      return d;
    });
    function u(d) {
      l(d, { page: d });
    }
    return (d, a) => {
      const r = W("BIcon");
      return f(), v("div", vi, [
        g("div", {
          class: I(["page-icon", { disabled: w(t) == 1 }]),
          onClick: a[0] || (a[0] = (m) => u(w(t) - 1))
        }, [
          P(r, { name: "chevron_left" })
        ], 2),
        g("div", gi, [
          (f(!0), v(Q, null, te(n.value, (m) => (f(), v("div", {
            key: m,
            class: "flex gap-xs"
          }, [
            m == -1 ? (f(), v("div", hi, " ... ")) : (f(), v("div", {
              key: 1,
              onClick: (p) => u(m),
              class: I(["page-number", { active: m === w(t) }])
            }, R(m), 11, bi))
          ]))), 128))
        ]),
        g("div", {
          class: I(["page-icon", { disabled: w(t) == d.length }]),
          onClick: a[1] || (a[1] = (m) => u(w(t) + 1))
        }, [
          P(r, { name: "chevron_right" })
        ], 2)
      ]);
    };
  }
}), Ci = /* @__PURE__ */ G(yi, [["__scopeId", "data-v-5ac3734f"]]), Bi = {
  install(o) {
    o.component("BPagination", Ci);
  }
}, wi = ["width", "height", "viewBox"], ki = { id: "highlight-mask" }, Vi = ["width", "height", "rx", "ry"], $i = ["src"], Mi = ["src"], xi = /* @__PURE__ */ q({
  __name: "BCrop",
  props: {
    modelValue: { default: void 0 },
    src: { default: void 0 },
    width: { default: "360px" },
    height: { default: "200px" }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = A(!1), t = A(), l = A(), n = A(), u = A(0), d = A(new Image()), a = new Image();
    a.src = e.src;
    const r = A({
      width: 0,
      height: 0
    }), m = new ResizeObserver(y), p = Y(() => {
      var z, Z;
      return (document.readyState === "complete" || document.readyState === "interactive") && ((Z = (z = t.value) == null ? void 0 : z.computedStyleMap().get("--border-radius-xl")) == null ? void 0 : Z.toString()) || "16px";
    }), h = s;
    he(async () => {
      window.addEventListener("mousemove", U), window.addEventListener("mouseup", () => {
        c.value = !1;
      }), window.addEventListener("touchmove", b), window.addEventListener("touchend", () => {
        c.value = !1;
      }), t.value && m.observe(t.value, { box: "border-box" }), a.onload = () => {
        $(u.value);
      };
    }), De(y), we(() => {
      m && m.disconnect(), window.removeEventListener("mousemove", U), window.removeEventListener("mouseup", () => {
        c.value = !1;
      }), window.removeEventListener("touchmove", b), window.removeEventListener("touchend", () => {
        c.value = !1;
      });
    });
    function y() {
      var z, Z, j, T;
      r.value.width = (z = t.value) != null && z.clientWidth ? ((Z = t.value) == null ? void 0 : Z.clientWidth) + 10 : 0, r.value.height = (j = t.value) != null && j.clientHeight ? ((T = t.value) == null ? void 0 : T.clientHeight) + 10 : 0;
    }
    function B(z) {
      c.value = !0, b(z);
    }
    function i(z) {
      c.value = !0, U(z);
    }
    function b(z) {
      U(z.touches[0]);
    }
    function U(z) {
      if (!l.value || !l.value.parentElement || !n.value || !c.value)
        return;
      const Z = Te(
        z,
        l.value,
        l.value.parentElement,
        { left: !0, top: !0 },
        { x: -1, y: -3 }
      );
      l.value.style.top = `${Z.y}px`, l.value.style.left = `${Z.x}px`, n.value.setAttribute("x", Z.x.toString()), n.value.setAttribute("y", Z.y.toString()), D(l.value, l.value.parentElement);
    }
    function $(z) {
      const Z = document.createElement("canvas"), j = Z.getContext("2d");
      if (!l.value || !l.value.parentElement || !j) return;
      const T = z + 1, M = l.value.parentElement.getBoundingClientRect(), N = l.value.getBoundingClientRect();
      Z.width = M.width, Z.height = M.height;
      const k = (M.width - a.width) / 2, V = (M.height - a.height) / 2;
      j.drawImage(a, k, V);
      const O = N.left + N.width / 2 - M.left, C = N.top + N.height / 2 - M.top;
      j.clearRect(0, 0, Z.width, Z.height), j.save(), j.translate(O, C), j.scale(T, T), j.translate(-O, -C), j.drawImage(a, k, V), j.restore();
      const E = Z.toDataURL("image/png");
      d.value = new Image(), d.value.src = E, d.value.onload = () => {
        !l.value || !l.value.parentElement || D(l.value, l.value.parentElement);
      };
    }
    function D(z, Z) {
      const j = z.getBoundingClientRect(), T = document.createElement("canvas"), M = T.getContext("2d");
      if (!M) return;
      T.width = j.width, T.height = j.height;
      const N = Z.getBoundingClientRect(), k = j.left - N.left, V = j.top - N.top, O = k, C = V, E = j.width, ee = j.height;
      M.drawImage(
        d.value,
        O,
        C,
        E,
        ee,
        0,
        0,
        j.width,
        j.height
      );
      const oe = T.toDataURL("image/png");
      h("update:modelValue", oe);
    }
    return (z, Z) => {
      const j = W("BIcon"), T = W("BSlider");
      return f(), v("div", {
        ref_key: "bCrop",
        ref: t,
        class: "b-crop w-full h-full"
      }, [
        g("div", {
          class: "relative w-full h-full bg-black rounded-xl",
          style: re({ "min-width": z.width, "min-height": z.height })
        }, [
          g("div", {
            class: "crop-img",
            onClick: i
          }, [
            (f(), v("svg", {
              class: "absolute z-1",
              width: r.value.width || "0px",
              height: r.value.height || "0px",
              viewBox: `0 0 ${r.value.width || 0} ${r.value.height || 0}`,
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              g("defs", null, [
                g("mask", ki, [
                  Z[1] || (Z[1] = g("rect", {
                    width: "100%",
                    height: "100%",
                    fill: "white"
                  }, null, -1)),
                  g("rect", {
                    ref_key: "selectedArea",
                    ref: n,
                    x: "0",
                    y: "0",
                    width: z.width,
                    height: z.height,
                    rx: p.value,
                    ry: p.value,
                    fill: "black"
                  }, null, 8, Vi)
                ])
              ]),
              Z[2] || (Z[2] = g("rect", {
                width: "100%",
                height: "100%",
                fill: "rgba(255, 255, 255, 0.7)",
                mask: "url(#highlight-mask)"
              }, null, -1))
            ], 8, wi)),
            g("img", {
              src: d.value.src,
              alt: "model value"
            }, null, 8, $i),
            g("img", {
              src: z.src,
              style: { position: "relative", visibility: "hidden" }
            }, null, 8, Mi)
          ]),
          g("div", {
            ref_key: "cropArea",
            ref: l,
            class: "crop-area",
            style: re({ width: z.width, height: z.height }),
            onMousedown: i,
            onTouchstart: B
          }, null, 36)
        ], 4),
        g("footer", null, [
          P(j, {
            name: "zoom_out",
            class: "select-none"
          }),
          P(T, {
            modelValue: u.value,
            "onUpdate:modelValue": [
              Z[0] || (Z[0] = (M) => u.value = M),
              $
            ],
            size: "small",
            max: 2
          }, null, 8, ["modelValue"]),
          P(j, {
            name: "zoom_in",
            class: "select-none"
          })
        ])
      ], 512);
    };
  }
}), Ii = /* @__PURE__ */ G(xi, [["__scopeId", "data-v-57c9e396"]]), Ai = {
  install(o) {
    o.component("BCrop", Ii);
  }
}, Si = { class: "b-card-icon" }, Di = { class: "flex justify-between" }, Ei = /* @__PURE__ */ q({
  __name: "BCardIcon",
  props: {
    title: { default: "" },
    icon: { default: "" },
    color: { default: "" },
    isIconRound: { type: Boolean, default: !1 }
  },
  setup(o) {
    return ke((s) => ({
      "17c9102a": s.color
    })), (s, e) => {
      const c = W("BIcon"), t = W("BCard");
      return f(), v("div", Si, [
        g("div", {
          class: I(["icon", {
            "round-icon": s.isIconRound,
            "colored-background": s.color,
            "colored-text": s.color && s.isIconRound
          }])
        }, [
          P(c, { name: s.icon }, null, 8, ["name"])
        ], 2),
        P(t, { class: "p-lg" }, {
          default: S(() => [
            g("header", Di, [
              g("h4", {
                class: I(["card-title", { "colored-text": s.color }])
              }, R(s.title), 3),
              x(s.$slots, "title-actions", {}, void 0, !0)
            ]),
            x(s.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        })
      ]);
    };
  }
}), Hi = /* @__PURE__ */ G(Ei, [["__scopeId", "data-v-b3350b42"]]), Ti = {
  install(o) {
    o.component("BCardIcon", Hi);
  }
}, Li = { class: "b-action-card" }, Pi = {
  key: 0,
  class: "py-sm"
}, zi = /* @__PURE__ */ q({
  __name: "BActionCard",
  props: {
    icon: { default: "" },
    color: { default: "" },
    hideDrag: { type: Boolean, default: !1 }
  },
  emits: ["dragstart", "dragging", "dragend", "delete"],
  setup(o, { emit: s }) {
    const e = A(!1), c = s;
    he(() => {
      window.addEventListener("mousemove", n), window.addEventListener("mouseup", u), window.addEventListener("touchmove", n), window.addEventListener("touhend", u);
    }), we(() => {
      window.removeEventListener("mousemove", n), window.removeEventListener("mouseup", u), window.removeEventListener("touchmove", n), window.removeEventListener("touhend", u);
    });
    function t(a, r) {
      e.value = a, c(a ? "dragstart" : "dragend", r);
    }
    function l(a) {
      t(!0, d(a));
    }
    function n(a) {
      e.value && c("dragging", d(a));
    }
    function u(a) {
      e.value && t(!1, d(a));
    }
    function d(a) {
      return a instanceof TouchEvent ? a.touches[0] : a;
    }
    return (a, r) => {
      const m = W("BIcon"), p = W("BCard");
      return f(), v("div", Li, [
        a.hideDrag ? H("", !0) : (f(), F(m, {
          key: 0,
          class: I(["icon cursor-grab", { "cursor-grabbing": e.value }]),
          name: "drag_indicator",
          onMousedown: l,
          onTouchstart: l
        }, null, 8, ["class"])),
        P(p, { class: "rounded-lg *:px-xl" }, {
          default: S(() => [
            g("header", {
              class: I(["flex items-center gap-xs bg-primary-interaction-default text-neutral-foreground-negative rounded-lg py-sm", { "rounded-b-none": a.$slots.card }]),
              style: re({ background: a.color })
            }, [
              a.icon ? (f(), F(m, {
                key: 0,
                name: a.icon
              }, null, 8, ["name"])) : H("", !0),
              x(a.$slots, "default", {}, void 0, !0)
            ], 6),
            a.$slots.card ? (f(), v("div", Pi, [
              x(a.$slots, "card", {}, void 0, !0)
            ])) : H("", !0)
          ]),
          _: 3
        }),
        P(m, {
          class: "icon cursor-pointer",
          name: "delete",
          onClick: r[0] || (r[0] = (h) => c("delete"))
        })
      ]);
    };
  }
}), Oi = /* @__PURE__ */ G(zi, [["__scopeId", "data-v-19b495c3"]]), Wi = {
  install(o) {
    o.component("BActionCard", Oi);
  }
}, Ui = { class: "flex flex-col gap-1" }, ji = { class: "option-description" }, Ri = /* @__PURE__ */ q({
  __name: "BStepOption",
  props: {
    title: { default: "" },
    description: { default: "" },
    icon: { default: "" },
    color: { default: "" },
    disabled: { type: Boolean, default: !1 },
    isIconRound: { type: Boolean, default: !1 }
  },
  setup(o) {
    return ke((s) => ({
      "9fd54306": s.color
    })), (s, e) => {
      const c = W("BIcon");
      return f(), v("div", {
        class: I(["b-step-option", { disabled: s.disabled }])
      }, [
        g("div", {
          class: I(["icon", {
            "round-icon": s.isIconRound,
            "colored-background": s.color,
            "colored-text": s.color && s.isIconRound
          }])
        }, [
          P(c, { name: s.icon }, null, 8, ["name"])
        ], 2),
        g("div", Ui, [
          g("h4", {
            class: I(["option-title", { "colored-text": s.color }])
          }, R(s.title), 3),
          g("p", ji, R(s.description), 1)
        ])
      ], 2);
    };
  }
}), Fi = /* @__PURE__ */ G(Ri, [["__scopeId", "data-v-5e7e299d"]]), _i = {
  install(o) {
    o.component("BStepOption", Fi);
  }
}, Ni = {
  key: 0,
  class: "flex gap-xxs items-center"
}, qi = {
  key: 1,
  class: "skeleton-div header"
}, Zi = { class: "flex items-end gap-xs" }, Ki = { class: "card-description" }, Xi = {
  key: 3,
  class: "skeleton-div content"
}, Gi = /* @__PURE__ */ q({
  __name: "BMetricCard",
  props: {
    title: { default: "" },
    description: { default: "" },
    value: { default: "" },
    icon: { default: "" },
    color: { default: "" },
    type: { default: "default" },
    size: { default: "medium" },
    infoMessage: { default: "" },
    infoType: { default: "primary" },
    tooltipMinWidth: { default: "none" },
    loading: { type: Boolean, default: !1 },
    noTooltip: { type: Boolean, default: !1 },
    boldTitle: { type: Boolean, default: !1 }
  },
  setup(o) {
    return ke((s) => ({
      "9bf418c2": s.color
    })), (s, e) => {
      const c = W("BIcon"), t = W("BTooltip"), l = W("BCard");
      return f(), F(l, {
        class: I(["b-metric-card", [s.type, s.size]])
      }, {
        default: S(() => [
          (s.title || s.icon || s.$slots["title-slot"]) && !s.loading ? (f(), v("div", Ni, [
            s.icon ? (f(), F(c, {
              key: 0,
              class: "icon",
              name: s.icon
            }, null, 8, ["name"])) : H("", !0),
            x(s.$slots, "title-slot", {}, () => [
              g("p", {
                class: I(["card-title", { "font-bold": s.boldTitle }])
              }, R(s.title), 3)
            ], !0),
            x(s.$slots, "info", {}, () => [
              s.infoMessage ? (f(), v(Q, { key: 0 }, [
                s.noTooltip ? (f(), v("p", {
                  key: 1,
                  class: I(["info-text info-label", [s.infoType]])
                }, R(s.infoMessage), 3)) : (f(), F(t, { key: 0 }, {
                  text: S(() => [
                    g("div", {
                      class: I(["tooltip-text", {
                        "whitespace-nowrap break-words text-wrap": s.tooltipMinWidth != "none"
                      }]),
                      style: re({ minWidth: s.tooltipMinWidth })
                    }, R(s.infoMessage), 7)
                  ]),
                  default: S(() => [
                    P(c, {
                      name: "info",
                      class: I(["info-icon info-label", [s.infoType]])
                    }, null, 8, ["class"])
                  ]),
                  _: 1
                }))
              ], 64)) : H("", !0)
            ], !0)
          ])) : s.loading ? (f(), v("div", qi)) : H("", !0),
          s.loading ? (f(), v("div", Xi)) : x(s.$slots, "content", { key: 2 }, () => [
            g("div", Zi, [
              x(s.$slots, "value-slot", {}, () => [
                g("p", {
                  class: I(["card-value", { "colored-text": s.color }])
                }, R(s.value), 3)
              ], !0),
              x(s.$slots, "description-slot", {}, () => [
                g("p", Ki, R(s.description), 1)
              ], !0)
            ])
          ], !0),
          s.loading ? H("", !0) : x(s.$slots, "default", { key: 4 }, void 0, !0)
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
}), Ji = /* @__PURE__ */ G(Gi, [["__scopeId", "data-v-2787417d"]]), Qi = {
  install(o) {
    o.component("BMetricCard", Ji);
  }
}, Yi = { key: 0 }, er = { class: "flex items-center justify-end gap-xs p-xs w-full border-t-xxs border-neutral-default" }, tr = /* @__PURE__ */ q({
  __name: "BDatePicker",
  props: {
    modelValue: { default: void 0 },
    expanded: { type: Boolean, default: !1 },
    labelValue: { default: "" },
    lang: { default: "en-US" },
    maxInit: {},
    maxEnd: {},
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    absolute: { type: Boolean, default: !1 },
    alignRight: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:expanded", "apply"],
  setup(o, { emit: s }) {
    const e = o, c = s, t = A(e.modelValue), l = A(e.expanded);
    le(
      () => e.modelValue,
      (a) => t.value = a
    ), le(
      () => e.expanded,
      (a) => l.value = a
    );
    function n(a) {
      return a.toLocaleDateString(e.lang, {
        year: "numeric",
        month: "short",
        day: "2-digit"
      });
    }
    function u(a) {
      t.value = a, c("update:modelValue", t.value);
    }
    function d(a) {
      l.value = a, c("update:expanded", l.value);
    }
    return (a, r) => {
      const m = W("BIcon"), p = W("BDate"), h = W("BButton"), y = W("BExpandableContainer");
      return f(), F(y, {
        modelValue: l.value,
        "onUpdate:modelValue": [
          r[3] || (r[3] = (B) => l.value = B),
          d
        ],
        disabled: a.disabled,
        required: a.required,
        absolute: a.absolute,
        "label-value": a.labelValue,
        "is-error": a.isError,
        "error-message": a.errorMessage,
        "align-right": a.alignRight,
        "hide-arrow": ""
      }, {
        content: S(() => [
          P(p, {
            modelValue: t.value,
            "onUpdate:modelValue": [
              r[0] || (r[0] = (B) => t.value = B),
              u
            ],
            lang: a.lang,
            "max-init": a.maxInit,
            "max-end": a.maxEnd
          }, null, 8, ["modelValue", "lang", "max-init", "max-end"]),
          g("div", er, [
            x(a.$slots, "actions", {}, () => [
              P(h, {
                size: "small",
                variant: "plain",
                onClick: r[1] || (r[1] = (B) => u(void 0))
              }, {
                default: S(() => [
                  x(a.$slots, "clear-text", {}, () => [
                    r[4] || (r[4] = ae(" Clear "))
                  ])
                ]),
                _: 3
              }),
              P(h, {
                size: "small",
                onClick: r[2] || (r[2] = (B) => c("apply", t.value))
              }, {
                default: S(() => [
                  x(a.$slots, "apply-text", {}, () => [
                    r[5] || (r[5] = ae(" Apply "))
                  ])
                ]),
                _: 3
              })
            ])
          ])
        ]),
        default: S(() => [
          g("div", {
            class: I(["flex items-center text-lg h-xl text-neutral-interaction-default", {
              "text-primary-interaction-default": l.value,
              "text-danger-interaction-default": a.isError
            }])
          }, [
            P(m, {
              name: "calendar_month",
              size: "lg"
            })
          ], 2),
          g("h5", {
            class: I(["whitespace-nowrap", { "font-bold": l.value }])
          }, [
            t.value ? (f(), v("span", Yi, R(n(t.value)), 1)) : x(a.$slots, "default", { key: 1 })
          ], 2)
        ]),
        _: 3
      }, 8, ["modelValue", "disabled", "required", "absolute", "label-value", "is-error", "error-message", "align-right"]);
    };
  }
}), lr = {
  install(o) {
    o.component("BDatePicker", tr);
  }
}, ar = { class: "flex items-center gap-xs w-full text-neutral-foreground-high font-bold" }, or = {
  key: 0,
  class: "divider"
}, nr = {
  key: 1,
  class: "divider"
}, sr = /* @__PURE__ */ q({
  __name: "BDivider",
  props: {
    position: { default: "right" }
  },
  setup(o) {
    return (s, e) => (f(), v("div", ar, [
      s.position != "right" ? (f(), v("div", or)) : H("", !0),
      x(s.$slots, "default", {}, void 0, !0),
      s.position != "left" ? (f(), v("div", nr)) : H("", !0)
    ]));
  }
}), ir = /* @__PURE__ */ G(sr, [["__scopeId", "data-v-1ea2d426"]]), rr = {
  install(o) {
    o.component("BDivider", ir);
  }
}, ur = /* @__PURE__ */ q({
  __name: "BSmartSelect",
  props: {
    modelValue: { default: void 0 },
    labelValue: { default: "" },
    items: {},
    icon: {},
    expanded: { type: Boolean, default: void 0 },
    valueKey: { default: "value" },
    labelKey: { default: "label" },
    searchable: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    required: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    isMultiple: { type: Boolean, default: !1 },
    getObject: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    absolute: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(o, { emit: s }) {
    const e = o, c = s, t = A(null), [l, n] = ie(e, "expanded", c, !1), u = Y(() => e.isMultiple ? "BMultiSelect" : "BSelect");
    ge(p), le(() => e.modelValue, p, { deep: !0, immediate: !0 }), le(() => e.isMultiple, () => {
      p(), d();
    });
    function d() {
      c("update:modelValue", m());
    }
    function a(i, b) {
      n(i, b);
    }
    function r() {
      t.value && (e.isMultiple ? t.value.forEach((i) => {
        i.selected = !1;
      }) : t.value = null, d());
    }
    function m() {
      if (t.value)
        return e.isMultiple ? t.value.filter((i) => i.selected).map((i) => h(i)) : h(t.value);
    }
    function p() {
      if (e.isMultiple) {
        const i = e.modelValue || [];
        t.value = e.items.map((b) => {
          const U = typeof b == "object" ? b : { [e.valueKey]: b, [e.labelKey]: b };
          return U.selected = i.findIndex(($) => B(b) == y($)) > -1, U;
        });
      } else
        t.value = e.items.find((i) => B(i) == y(e.modelValue));
    }
    function h(i) {
      return e.getObject ? i : B(i);
    }
    function y(i) {
      return e.getObject ? B(i) : i;
    }
    function B(i) {
      return typeof i == "object" ? i == null ? void 0 : i[e.valueKey] : i;
    }
    return (i, b) => {
      const U = W("BButton");
      return f(), F(Pe(u.value), {
        modelValue: t.value,
        "onUpdate:modelValue": [
          b[0] || (b[0] = ($) => t.value = $),
          d
        ],
        expanded: w(l),
        "onUpdate:expanded": [
          b[1] || (b[1] = ($) => ne(l) ? l.value = $ : null),
          a
        ],
        "label-value": i.labelValue,
        "label-key": i.labelKey,
        "value-key": i.valueKey,
        items: i.items,
        icon: i.icon,
        required: i.required,
        disabled: i.disabled,
        "info-message": i.infoMessage,
        "error-message": i.errorMessage,
        searchable: i.searchable,
        "is-error": i.isError,
        absolute: i.absolute
      }, Be({
        default: S(() => [
          x(i.$slots, "default")
        ]),
        _: 2
      }, [
        i.$slots.searchText ? {
          name: "searchText",
          fn: S(() => [
            x(i.$slots, "searchText")
          ]),
          key: "0"
        } : void 0,
        i.isMultiple ? {
          name: "status-text",
          fn: S(({ selected: $ }) => [
            i.$slots["status-text"] ? x(i.$slots, "status-text", {
              key: 0,
              selected: $
            }, () => [
              ae(R(i.labelValue), 1)
            ]) : H("", !0)
          ]),
          key: "1"
        } : i.$slots.status ? {
          name: "status",
          fn: S(() => [
            x(i.$slots, "status")
          ]),
          key: "2"
        } : void 0,
        i.$slots.item ? {
          name: "item",
          fn: S(({ item: $ }) => [
            x(i.$slots, "item", { item: $ })
          ]),
          key: "3"
        } : void 0,
        i.clearable ? {
          name: "actions",
          fn: S(() => [
            P(U, {
              variant: "plain",
              size: "small",
              onClick: r
            }, {
              default: S(() => [
                x(i.$slots, "clear-text", {}, () => [
                  b[2] || (b[2] = ae("Clear"))
                ])
              ]),
              _: 3
            })
          ]),
          key: "4"
        } : void 0
      ]), 1064, ["modelValue", "expanded", "label-value", "label-key", "value-key", "items", "icon", "required", "disabled", "info-message", "error-message", "searchable", "is-error", "absolute"]);
    };
  }
}), dr = {
  install(o) {
    o.component("BSmartSelect", ur);
  }
}, cr = /* @__PURE__ */ q({
  __name: "BAutoComplete",
  props: {
    modelValue: { default: void 0 },
    expanded: { type: Boolean, default: !1 },
    labelValue: { default: "" },
    items: {},
    absolute: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    required: { type: Boolean, default: !1 },
    placeholder: { default: "" },
    maxHeight: { default: "40px" },
    minWidth: { default: "15em" }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, ""), [l] = ie(e, "expanded", c, !1), n = Y(() => {
      var a;
      return t.value ? (a = e.items) == null ? void 0 : a.filter(
        (r) => r.toLowerCase().includes(t.value.toLowerCase())
      ) : e.items;
    });
    function u() {
      l.value = !0;
    }
    function d(a) {
      t.value = a;
    }
    return (a, r) => {
      const m = W("BInput"), p = W("BSelectContainer");
      return f(), F(p, {
        modelValue: w(l),
        "onUpdate:modelValue": r[1] || (r[1] = (h) => ne(l) ? l.value = h : null),
        absolute: a.absolute,
        "label-value": a.labelValue,
        disabled: a.disabled,
        "is-error": a.isError,
        "error-message": a.errorMessage,
        "info-message": a.infoMessage,
        required: a.required,
        "max-height": a.maxHeight,
        "min-width": a.minWidth
      }, {
        label: S(() => [
          P(m, {
            modelValue: w(t),
            "onUpdate:modelValue": r[0] || (r[0] = (h) => ne(t) ? t.value = h : null),
            disabled: a.disabled,
            "is-error": a.isError,
            "info-message": a.infoMessage,
            placeholder: a.placeholder,
            "min-width": a.minWidth,
            icon: "unfold_more",
            "append-icon": "",
            onFocus: u
          }, null, 8, ["modelValue", "disabled", "is-error", "info-message", "placeholder", "min-width"])
        ]),
        items: S(() => [
          (f(!0), v(Q, null, te(n.value, (h, y) => (f(), F(Ve, {
            "aria-selected": w(t) == h,
            key: y,
            class: I({
              "font-bold": w(t) == h
            }),
            onClick: (B) => d(h),
            onKeyup: me((B) => d(h), ["space"])
          }, {
            default: S(() => [
              x(a.$slots, "item", {
                item: h,
                index: y
              }, () => [
                ae(R(h), 1)
              ])
            ]),
            _: 2
          }, 1032, ["aria-selected", "class", "onClick", "onKeyup"]))), 128))
        ]),
        _: 3
      }, 8, ["modelValue", "absolute", "label-value", "disabled", "is-error", "error-message", "info-message", "required", "max-height", "min-width"]);
    };
  }
}), fr = {
  install(o) {
    o.component("BAutoComplete", cr);
  }
}, pr = /* @__PURE__ */ q({
  __name: "Items",
  props: {
    items: {}
  },
  setup(o) {
    const s = o, e = Y(() => {
      var l, n;
      const c = ((l = s.items) == null ? void 0 : l.filter((u) => !u.bottom)) || [], t = ((n = s.items) == null ? void 0 : n.filter((u) => u.bottom)) || [];
      return [c, t];
    });
    return (c, t) => {
      const l = W("BDivider"), n = W("BCard");
      return f(), F(n, { class: "custom-card" }, {
        default: S(() => [
          (f(!0), v(Q, null, te(e.value, (u, d) => (f(), v(Q, null, [
            x(c.$slots, "default", { items: u }, void 0, !0),
            d == 0 && u.length > 1 ? (f(), F(l, { key: 0 })) : H("", !0)
          ], 64))), 256))
        ]),
        _: 3
      });
    };
  }
}), bt = /* @__PURE__ */ G(pr, [["__scopeId", "data-v-951fd625"]]), mr = { class: "flex items-center gap-xs" }, vr = { class: "label" }, gr = /* @__PURE__ */ q({
  __name: "Item",
  props: {
    modelValue: { default: void 0 },
    selected: { type: Boolean, default: !1 },
    item: {},
    getObject: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:selected"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, ""), [l] = ie(
      e,
      "selected",
      c,
      !1
    );
    function n(r) {
      var m;
      (m = e.item.items) != null && m.length ? e.item.expanded = !e.item.expanded : (t.value = e.getObject ? r : r.value, l.value = !0, c("update:selected", !0));
    }
    function u(r) {
      l.value = r, c("update:selected", r);
    }
    function d() {
      setTimeout(() => {
        e.item.expanded = !1;
      }, 200);
    }
    function a(r) {
      return de(r) ? r.value : r;
    }
    return (r, m) => {
      const p = W("BIcon"), h = W("Item", !0);
      return f(), v("div", {
        class: "relative",
        tabindex: "0",
        onBlur: d
      }, [
        g("div", {
          class: I(["item", {
            selected: r.item.value === a(w(t)) || w(l),
            disabled: r.item.disabled
          }]),
          onClick: m[0] || (m[0] = (y) => n(r.item)),
          onKeydown: m[1] || (m[1] = me((y) => n(r.item), ["enter"]))
        }, [
          g("div", mr, [
            r.item.icon ? (f(), F(p, {
              key: 0,
              name: r.item.icon,
              class: "icon"
            }, null, 8, ["name"])) : H("", !0),
            g("p", vr, R(r.item.label), 1)
          ]),
          r.item.items && r.item.items.length ? (f(), F(p, {
            key: 0,
            name: "chevron_right",
            class: "icon icon-small"
          })) : H("", !0)
        ], 34),
        r.item.items && r.item.items.length && r.item.expanded ? (f(), F(bt, {
          key: 0,
          class: "sub-items",
          items: r.item.items
        }, {
          default: S(({ items: y }) => [
            (f(!0), v(Q, null, te(y, (B) => (f(), F(h, {
              modelValue: w(t),
              "onUpdate:modelValue": [
                m[2] || (m[2] = (i) => ne(t) ? t.value = i : null),
                n
              ],
              selected: B.selected,
              "onUpdate:selected": [(i) => B.selected = i, u],
              item: B,
              "get-object": r.getObject
            }, null, 8, ["modelValue", "selected", "onUpdate:selected", "item", "get-object"]))), 256))
          ]),
          _: 1
        }, 8, ["items"])) : H("", !0)
      ], 32);
    };
  }
}), hr = /* @__PURE__ */ G(gr, [["__scopeId", "data-v-7f0ddff1"]]), br = /* @__PURE__ */ q({
  __name: "BDropdown",
  props: {
    modelValue: { default: void 0 },
    expanded: { type: Boolean, default: !1 },
    labelValue: { default: "" },
    items: {},
    absolute: { type: Boolean, default: !0 },
    disabled: { type: Boolean, default: !1 },
    isError: { type: Boolean, default: !1 },
    errorMessage: { default: "" },
    infoMessage: { default: "" },
    required: { type: Boolean, default: !1 },
    maxHeight: { default: "40px" },
    minWidth: { default: "15em" },
    getObject: { type: Boolean, default: !1 },
    searchable: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:expanded"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, ""), [l] = ie(e, "expanded", c, !1), n = A(""), u = tt(), d = Y(() => {
      var b;
      if (e.items)
        return (b = r(e.items, t.value)) == null ? void 0 : b.label;
    }), a = Y(() => {
      if (e.items) {
        if (!n.value) return e.items;
      } else return [];
      return m(e.items, n.value);
    });
    ge(() => {
      B();
    });
    function r(b, U) {
      for (const $ of b) {
        if ($.value === i(U))
          return $;
        if ($.items) {
          const D = r($.items, U);
          if (D) return D;
        }
      }
    }
    function m(b, U) {
      const $ = [];
      for (const D of b) {
        let z = [];
        D.items && D.items.length && (z = m(D.items, U)), (D.label.toLowerCase().includes(U.toLowerCase()) || z.length) && (z.length && (D.items = z), $.push(D));
      }
      return $;
    }
    function p(b, U) {
      let $ = !1;
      for (const D of b)
        D.items && D.items.length ? D.selected = p(D.items, U) : D.selected = D.value == i(U), D.selected && ($ = !0);
      return $;
    }
    function h(b) {
      t.value = b, l.value = !1, B(), p(e.items, b);
    }
    function y() {
      l.value = !0, n.value = "";
    }
    function B() {
      setTimeout(() => {
        !l.value && !u.default && e.searchable && (n.value = d.value || "");
      });
    }
    function i(b) {
      return de(b) ? b.value : b;
    }
    return (b, U) => {
      const $ = W("BInput"), D = W("BExpandableContainer");
      return f(), F(D, {
        modelValue: w(l),
        "onUpdate:modelValue": [
          U[2] || (U[2] = (z) => ne(l) ? l.value = z : null),
          B
        ],
        absolute: b.absolute,
        "label-value": b.labelValue,
        disabled: b.disabled,
        "is-error": b.isError,
        "error-message": b.errorMessage,
        "info-message": b.infoMessage,
        required: b.required,
        "max-height": b.maxHeight,
        "min-width": b.minWidth
      }, {
        label: S(() => [
          x(b.$slots, "default", {}, () => [
            e.searchable ? (f(), F($, {
              key: 0,
              modelValue: n.value,
              "onUpdate:modelValue": U[0] || (U[0] = (z) => n.value = z),
              disabled: b.disabled,
              "is-error": b.isError,
              icon: "unfold_more",
              "append-icon": "",
              onFocus: y
            }, null, 8, ["modelValue", "disabled", "is-error"])) : H("", !0)
          ])
        ]),
        card: S(() => [
          P(bt, { items: a.value }, {
            default: S(({ items: z }) => [
              (f(!0), v(Q, null, te(z, (Z) => (f(), F(hr, {
                modelValue: w(t),
                "onUpdate:modelValue": [
                  U[1] || (U[1] = (j) => ne(t) ? t.value = j : null),
                  h
                ],
                selected: Z.selected,
                "onUpdate:selected": (j) => Z.selected = j,
                item: Z,
                "get-object": b.getObject
              }, null, 8, ["modelValue", "selected", "onUpdate:selected", "item", "get-object"]))), 256))
            ]),
            _: 1
          }, 8, ["items"])
        ]),
        default: S(() => [
          ae(R(d.value) + " ", 1)
        ]),
        _: 3
      }, 8, ["modelValue", "absolute", "label-value", "disabled", "is-error", "error-message", "info-message", "required", "max-height", "min-width"]);
    };
  }
}), yr = {
  install(o) {
    o.component("BDropdown", br);
  }
}, Cr = { class: "b-breadcrumb" }, Br = ["onClick"], wr = ["onClick"], kr = /* @__PURE__ */ q({
  __name: "BBreadcrumb",
  props: {
    modelValue: { default: void 0 },
    items: { default: void 0 },
    labelKey: { default: "label" },
    valueKey: { default: "value" },
    getObject: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, void 0), l = A([]), n = Y(() => {
      var B;
      if (!((B = e.items) != null && B.length)) return [];
      const p = [...e.items];
      let h = p.findIndex((i) => r(i));
      h === -1 && (h = 0);
      const y = [];
      for (let i = 0; i < p.length; i++)
        i === 0 || i === p.length - 1 || h === 0 && i < 2 || h === p.length - 1 && i >= p.length - 2 || h - 1 === i || h + 1 === i || h === i ? y.push(p[i]) : i === 1 && h > 1 ? y.push({
          icon: "more_horiz",
          items: p.slice(1, h - 1)
        }) : i === p.length - 2 && h < p.length - 2 && y.push({
          icon: "more_horiz",
          items: p.slice(h + 2, p.length - 1)
        });
      return y;
    });
    function u(p) {
      const h = e.getObject ? p : a(p);
      l.value = l.value.map(() => !1), setTimeout(() => {
        t.value = h, c("update:modelValue", h);
      }, 200);
    }
    function d(p) {
      return de(p) ? p[e.labelKey] : p;
    }
    function a(p) {
      return de(p) ? p[e.valueKey] : p;
    }
    function r(p) {
      const h = a(p);
      return a(t.value) == h;
    }
    async function m(p, h) {
      if (l.value[h] = !l.value[h], !l.value[h]) return;
      const B = p.target.getBoundingClientRect(), i = window.innerHeight;
      await je();
      const b = document.querySelector(
        `.more-options[index="${h}"]`
      );
      if (!b) return;
      b.style.left = `${B.left}px`, B.bottom + b.offsetHeight > i ? b.style.bottom = `${i - B.top}px` : b.style.top = `${B.bottom}px`;
      const U = ($) => {
        const D = Math.abs(b.offsetHeight - b.scrollHeight) > 3, z = $.type == "wheel", Z = b.contains($.target);
        (D ? z && !Z : z || !Z) && (l.value[h] = !1, document.removeEventListener("click", U), document.removeEventListener("wheel", U));
      };
      setTimeout(() => {
        document.addEventListener("click", U), document.addEventListener("wheel", U);
      }, 200);
    }
    return (p, h) => {
      const y = W("BIcon"), B = W("b-card");
      return f(), v("div", Cr, [
        (f(!0), v(Q, null, te(n.value, (i, b) => (f(), v(Q, { key: i }, [
          w(de)(i) && i.icon == "more_horiz" ? (f(), v("div", {
            key: 0,
            onClick: (U) => m(U, b)
          }, [
            P(y, {
              name: "more_horiz",
              class: "cursor-pointer"
            }),
            (f(), F(Ee, { to: "body" }, [
              P(ve, { name: "fade" }, {
                default: S(() => [
                  l.value[b] ? (f(), F(B, {
                    key: 0,
                    class: "more-options",
                    index: b
                  }, {
                    default: S(() => [
                      (f(!0), v(Q, null, te(i.items, (U) => (f(), F(Ve, {
                        key: U,
                        onClick: ($) => u(U)
                      }, {
                        default: S(() => [
                          ae(R(d(U)), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))), 128))
                    ]),
                    _: 2
                  }, 1032, ["index"])) : H("", !0)
                ]),
                _: 2
              }, 1024)
            ]))
          ], 8, Br)) : (f(), v("h5", {
            key: 1,
            class: I(["item", { active: r(i) }]),
            onClick: (U) => u(i)
          }, R(d(i)), 11, wr)),
          b < n.value.length - 1 ? (f(), F(y, {
            key: 2,
            name: "chevron_right"
          })) : H("", !0)
        ], 64))), 128))
      ]);
    };
  }
}), Vr = /* @__PURE__ */ G(kr, [["__scopeId", "data-v-62e326ab"]]), $r = {
  install(o) {
    o.component("BBreadcrumb", Vr);
  }
}, Mr = ["src", "alt"], xr = /* @__PURE__ */ q({
  __name: "BAvatar",
  props: {
    name: {},
    src: {},
    alt: {},
    size: { default: "medium" }
  },
  setup(o) {
    const s = o, e = Y(() => {
      if (!s.name) return "";
      const c = s.name.trim().split(" ");
      return c.length > 1 ? (c[0][0] + c[c.length - 1][0]).toUpperCase() : s.name.slice(0, 2).toUpperCase();
    });
    return (c, t) => (f(), v("div", {
      class: I(["b-avatar", c.size])
    }, [
      c.src ? (f(), v("img", {
        key: 0,
        src: c.src,
        alt: c.alt || c.name
      }, null, 8, Mr)) : H("", !0),
      g("span", {
        class: I({ "opacity-0": c.src })
      }, R(e.value), 3)
    ], 2));
  }
}), Ir = /* @__PURE__ */ G(xr, [["__scopeId", "data-v-32d5ff9c"]]), Ar = {
  install(o) {
    o.component("BAvatar", Ir);
  }
}, Sr = { class: "b-navbar" }, Dr = { class: "flex items-center gap-base" }, Er = { class: "flex items-center gap-base text-lg leading-lg font-light text-primary-foreground-high" }, Hr = { class: "flex items-center gap-base" }, Tr = /* @__PURE__ */ q({
  __name: "BNavbar",
  props: {
    modelValue: { default: void 0 },
    title: { default: "" },
    items: {},
    profile: {}
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(
      e,
      "modelValue",
      c,
      void 0
    ), l = A(!1), n = A(!1), u = Y(() => {
      var a, r;
      return document.readyState === "complete" || document.readyState === "interactive" ? Number(
        (((r = (a = document.body) == null ? void 0 : a.computedStyleMap().get("--spacing-xxs")) == null ? void 0 : r.toString()) || "4px").replace("px", "")
      ) : 4;
    });
    async function d(a) {
      if (l.value = !l.value, !l.value) return;
      const m = a.target.getBoundingClientRect(), p = window.innerHeight, h = window.innerWidth;
      await je();
      const y = document.querySelector(".notifications");
      if (!y) return;
      y.style.right = `${h - m.right}px`, m.bottom + y.offsetHeight > p ? y.style.bottom = `${p - m.top - u.value}px` : y.style.top = `${m.bottom + u.value}px`, document.body.appendChild(y);
      const B = (i) => {
        const b = Math.abs(y.offsetHeight - y.scrollHeight) > 3, U = i.type == "wheel", $ = y.contains(i.target);
        (b ? U && !$ : U || !$) && (l.value = !1, document.removeEventListener("click", B), document.removeEventListener("wheel", B));
      };
      setTimeout(() => {
        document.addEventListener("click", B), document.addEventListener("wheel", B);
      }, 200);
    }
    return (a, r) => {
      const m = W("BDropdown"), p = W("BIcon"), h = W("BCard"), y = W("BAvatar");
      return f(), v("div", Sr, [
        g("div", Dr, [
          g("div", Er, [
            x(a.$slots, "logo", {}, () => [
              r[2] || (r[2] = Ue('<svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none" data-v-2cf23078><path d="M40.5 20C40.5 8.95431 31.5457 0 20.5 0C9.4543 0 0.5 8.95431 0.5 20C0.5 31.0457 9.4543 40 20.5 40C31.5457 40 40.5 31.0457 40.5 20Z" fill="url(#paint0_linear_2159_846)" data-v-2cf23078></path><path d="M38.1604 20.0001C38.1604 10.2455 30.2528 2.33789 20.4982 2.33789C10.7436 2.33789 2.83594 10.2455 2.83594 20.0001C2.83594 29.7547 10.7436 37.6624 20.4982 37.6624C30.2528 37.6624 38.1604 29.7547 38.1604 20.0001Z" stroke="#FAFAFA" stroke-width="2.40312" stroke-miterlimit="10" data-v-2cf23078></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7876 20.902C14.5933 20.621 13.7248 19.9 13.4321 19.578C13.4632 18.9264 13.5596 18.2779 13.7211 17.645C14.195 15.7975 15.2189 14.1677 16.6794 12.9329C17.7002 12.0698 18.867 11.4478 20.0525 11.132C21.2271 10.8195 22.397 10.8101 23.4349 11.1056C24.19 11.3202 24.8504 11.6857 25.3957 12.1911C25.969 12.723 26.3885 13.3839 26.6402 14.1568C27.3332 16.2811 26.5672 18.7911 24.6421 20.7086C23.4473 21.8967 21.9278 22.7458 20.2467 23.1626C19.3424 23.3865 18.4024 23.4814 17.4547 23.4425C17.1338 23.4302 16.8062 23.4034 16.4837 23.3603C16.0632 22.5175 15.8461 21.3699 15.7876 20.902ZM15.7876 20.902C15.6835 20.0032 15.7114 19.0882 15.9352 18.2188C16.291 16.8332 17.0585 15.6109 18.1539 14.6856C18.9183 14.0402 19.7775 13.5768 20.6398 13.3481C21.4167 13.1413 22.1671 13.1289 22.8087 13.3124C23.3868 13.4756 24.1434 13.88 24.4666 14.8722C24.6686 15.4911 24.6499 16.2018 24.4122 16.928C24.1605 17.6916 23.6835 18.4396 23.0294 19.0897C22.1298 19.987 20.977 20.6277 19.6983 20.945C19.0037 21.1161 18.2797 21.1891 17.5479 21.1596C16.9575 21.1363 16.3874 21.0576 15.7876 20.902Z" fill="url(#paint1_angular_2159_846)" data-v-2cf23078></path><path d="M21.6728 29.3941C21.9944 29.4284 22.3315 29.4455 22.6796 29.4455V29.4408C25.1018 29.4408 28.0399 28.5839 29.9603 26.1283C30.3487 25.6307 30.2617 24.9107 29.7645 24.5219C29.2674 24.1331 28.5495 24.2202 28.1595 24.7178C27.4106 25.6742 26.3945 26.3663 25.1422 26.7706C23.7625 27.217 22.5211 27.1781 21.9042 27.1143C21.1585 27.0381 20.4515 26.8562 19.8021 26.5716C19.19 26.3041 18.6244 25.9464 18.1225 25.5063C17.4476 24.9146 16.8919 24.1848 16.4834 23.3589C15.9235 23.2992 14.5917 23.0367 13.752 22.5469C13.7846 22.6759 13.8218 22.8019 13.8607 22.9295C14.3812 24.6199 15.3367 26.1082 16.6201 27.2309C17.299 27.825 18.0635 28.3102 18.8901 28.671C19.757 29.0504 20.6923 29.2931 21.6728 29.3941Z" fill="white" data-v-2cf23078></path><path d="M13.4321 19.5783C13.0794 19.2859 12.7236 18.9406 12.416 18.5472C12.0275 18.0496 11.3081 17.9625 10.811 18.3513C10.3138 18.74 10.2268 19.4601 10.6152 19.9577C11.636 21.264 12.9939 22.1302 13.7522 22.5486C13.6351 22.1973 13.4321 21.1239 13.4321 19.5783Z" fill="url(#paint2_linear_2159_846)" data-v-2cf23078></path><path d="M13.4321 19.5781C13.7248 19.9001 14.5933 20.6211 15.7876 20.9021C15.8461 21.37 16.0632 22.5176 16.4837 23.3604C15.9237 23.3007 14.592 23.0383 13.7522 22.5484C13.6351 22.1971 13.4321 21.1237 13.4321 19.5781Z" fill="white" data-v-2cf23078></path><defs data-v-2cf23078><linearGradient id="paint0_linear_2159_846" x1="34.6407" y1="5.85756" x2="6.35756" y2="34.1424" gradientUnits="userSpaceOnUse" data-v-2cf23078><stop stop-color="#97D991" data-v-2cf23078></stop><stop offset="0.11" stop-color="#92D691" data-v-2cf23078></stop><stop offset="0.22" stop-color="#86D091" data-v-2cf23078></stop><stop offset="0.33" stop-color="#74C691" data-v-2cf23078></stop><stop offset="0.42" stop-color="#6DC192" data-v-2cf23078></stop><stop offset="0.55" stop-color="#5CB597" data-v-2cf23078></stop><stop offset="0.66" stop-color="#47A79E" data-v-2cf23078></stop><stop offset="0.74" stop-color="#3B9C98" data-v-2cf23078></stop><stop offset="0.89" stop-color="#1E7F88" data-v-2cf23078></stop><stop offset="1" stop-color="#02657A" data-v-2cf23078></stop></linearGradient><radialGradient id="paint1_angular_2159_846" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20.1617 17.1708) rotate(139.686) scale(8.34625 8.94344)" data-v-2cf23078><stop stop-color="white" data-v-2cf23078></stop><stop offset="1" stop-color="#DDDDDD" data-v-2cf23078></stop></radialGradient><linearGradient id="paint2_linear_2159_846" x1="10.8995" y1="18.5312" x2="13.7097" y2="21.3414" gradientUnits="userSpaceOnUse" data-v-2cf23078><stop stop-color="white" data-v-2cf23078></stop><stop offset="1" stop-color="#D9D9D9" data-v-2cf23078></stop></linearGradient></defs></svg>', 1)),
              x(a.$slots, "title", {}, () => [
                ae(R(a.title), 1)
              ], !0)
            ], !0)
          ]),
          r[3] || (r[3] = g("div", { class: "border-r-xxs border-r-neutral-default min-h-xl" }, null, -1)),
          x(a.$slots, "default", {}, () => [
            P(m, {
              modelValue: w(t),
              "onUpdate:modelValue": r[0] || (r[0] = (B) => ne(t) ? t.value = B : null),
              expanded: n.value,
              "onUpdate:expanded": r[1] || (r[1] = (B) => n.value = B),
              items: a.items,
              "get-object": ""
            }, null, 8, ["modelValue", "expanded", "items"])
          ], !0)
        ]),
        g("div", Hr, [
          x(a.$slots, "actions", {}, () => {
            var B, i;
            return [
              g("div", null, [
                P(p, {
                  class: "notification-icon",
                  name: "notifications",
                  onClick: d
                }),
                (f(), F(Ee, { to: "body" }, [
                  P(ve, { name: "fade" }, {
                    default: S(() => [
                      l.value ? (f(), F(h, {
                        key: 0,
                        class: "notifications"
                      }, {
                        default: S(() => [
                          x(a.$slots, "notifications", {}, void 0, !0)
                        ]),
                        _: 3
                      })) : H("", !0)
                    ]),
                    _: 3
                  })
                ]))
              ]),
              P(y, {
                name: (B = a.profile) == null ? void 0 : B.name,
                src: (i = a.profile) == null ? void 0 : i.src
              }, null, 8, ["name", "src"])
            ];
          }, !0)
        ])
      ]);
    };
  }
}), Lr = /* @__PURE__ */ G(Tr, [["__scopeId", "data-v-2cf23078"]]), Pr = {
  install(o) {
    o.component("BNavbar", Lr);
  }
}, zr = /* @__PURE__ */ q({
  __name: "BSidebar",
  props: {
    modelValue: { type: Boolean, default: !1 },
    width: { default: "fit-content" },
    noOutsideClose: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    const e = o, c = s;
    let t = A(e.modelValue);
    const l = A();
    le(
      () => e.modelValue,
      (u) => {
        t.value = u;
      }
    );
    function n() {
      e.noOutsideClose || (t.value = !1, c("update:modelValue", !1));
    }
    return (u, d) => (f(), F(Ee, { to: "body" }, [
      P(ft, {
        modelValue: w(t),
        "onUpdate:modelValue": d[0] || (d[0] = (a) => ne(t) ? t.value = a : t = a),
        onClick: n
      }, {
        default: S(() => [
          P(ve, { name: "slide-in" }, {
            default: S(() => [
              w(t) ? (f(), v("div", {
                key: 0,
                ref_key: "sidebar",
                ref: l,
                class: "sidebar",
                style: re({ width: u.width })
              }, [
                x(u.$slots, "default", {}, void 0, !0)
              ], 4)) : H("", !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["modelValue"])
    ]));
  }
}), Or = /* @__PURE__ */ G(zr, [["__scopeId", "data-v-83bf6c9c"]]), Wr = {
  install(o) {
    o.component("BSidebar", Or);
  }
}, Ur = {
  key: 0,
  class: "items-container"
}, jr = /* @__PURE__ */ q({
  __name: "Item",
  props: {
    modelValue: { default: void 0 },
    item: {},
    getObject: { type: Boolean, default: !1 },
    parentPath: { default: "" },
    selected: { type: Boolean, default: !1 },
    bold: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:selected"],
  setup(o, { emit: s }) {
    const e = o, c = s, [t] = ie(e, "modelValue", c, ""), l = Y(() => {
      let r = e.parentPath;
      return e.item.path && (!r.endsWith("/") && !e.item.path.startsWith("/") ? r += "/" : r.endsWith("/") && e.item.path.startsWith("/") && (r = r.slice(0, -1)), r += e.item.path), r;
    }), n = Y(() => e.item.value == d(t.value) || e.selected);
    function u(r) {
      if (r.items && r.items.length) {
        r.expanded = !r.expanded;
        return;
      }
      const m = e.getObject ? r : d(r);
      t.value = m, c("update:modelValue", m);
    }
    function d(r) {
      return de(r) ? r.value : r;
    }
    function a() {
      return typeof W("router-link") != "string" ? "router-link" : typeof W("nuxt-link") != "string" ? "nuxt-link" : e.item.items && e.item.items.length ? "div" : "a";
    }
    return (r, m) => {
      const p = W("BIcon"), h = W("Item", !0);
      return f(), F(Pe(a()), {
        key: r.item.value,
        class: I(["item", { selected: n.value }]),
        to: l.value,
        href: a() == "a" ? l.value : void 0
      }, {
        default: S(() => [
          P(vt, {
            class: I(["menu-item", { expanded: r.item.expanded, bold: r.bold }]),
            label: r.item.label,
            icon: r.item.icon,
            selected: n.value,
            disabled: r.item.disabled,
            onClick: m[0] || (m[0] = (y) => u(r.item))
          }, {
            default: S(() => [
              r.item.items && r.item.items.length ? (f(), F(p, {
                key: 0,
                name: "keyboard_arrow_down",
                class: I([{ "rotate-180": r.item.expanded }, "transition-transform"])
              }, null, 8, ["class"])) : H("", !0)
            ]),
            _: 1
          }, 8, ["class", "label", "icon", "selected", "disabled"]),
          P(ve, { name: "expand" }, {
            default: S(() => [
              r.item.items && r.item.items.length && r.item.expanded ? (f(), v("div", Ur, [
                (f(!0), v(Q, null, te(r.item.items, (y) => (f(), F(h, {
                  modelValue: w(t),
                  "onUpdate:modelValue": m[1] || (m[1] = (B) => ne(t) ? t.value = B : null),
                  selected: r.item.selected,
                  "onUpdate:selected": m[2] || (m[2] = (B) => r.item.selected = B),
                  key: y.value,
                  item: y,
                  "get-object": r.getObject,
                  "parent-path": l.value,
                  bold: ""
                }, null, 8, ["modelValue", "selected", "item", "get-object", "parent-path"]))), 128))
              ])) : H("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class", "to", "href"]);
    };
  }
}), Rr = /* @__PURE__ */ G(jr, [["__scopeId", "data-v-2b1fb60b"]]), Fr = { class: "b-side-menu" }, _r = /* @__PURE__ */ q({
  __name: "BSideMenu",
  props: {
    modelValue: { default: void 0 },
    items: {},
    parentPath: { default: "" },
    getObject: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(o, { emit: s }) {
    ke((r) => ({
      "3a53318e": l.value
    }));
    const e = o, c = s, [t] = ie(e, "modelValue", c, ""), l = Y(() => {
      var r;
      if (document.readyState === "complete" || document.readyState === "interactive") {
        const m = (r = document.querySelector(".b-navbar")) == null ? void 0 : r.clientHeight;
        return m ? `calc(100vh - ${m}px)` : "100vh";
      }
      return "100vh";
    });
    ge(() => {
      const r = n(e.items, e.parentPath).find(
        (m) => ut(m.path)
      );
      r && d(r.value);
    });
    function n(r, m = "") {
      var h;
      const p = [];
      for (const y of r) {
        const B = m ? `${m}/${y.path}` : y.path;
        (h = y.items) != null && h.length ? p.push(...n(y.items, B)) : p.push({ path: B || "", value: y.value });
      }
      return p;
    }
    function u(r, m) {
      let p = !1;
      for (const h of r)
        h.items && h.items.length ? h.selected = u(h.items, m) : h.selected = h.value == m, h.selected && (p = !0);
      return p;
    }
    function d(r) {
      const m = e.getObject ? r : a(r);
      t.value = m, u(e.items, m), c("update:modelValue", m);
    }
    function a(r) {
      return de(r) ? r.value : r;
    }
    return (r, m) => (f(), v("div", Fr, [
      (f(!0), v(Q, null, te(r.items, (p) => (f(), F(Rr, {
        modelValue: w(t),
        "onUpdate:modelValue": [
          m[0] || (m[0] = (h) => ne(t) ? t.value = h : null),
          d
        ],
        selected: p.selected,
        "onUpdate:selected": (h) => p.selected = h,
        key: p.value,
        item: p,
        "get-object": r.getObject,
        "parent-path": r.parentPath
      }, null, 8, ["modelValue", "selected", "onUpdate:selected", "item", "get-object", "parent-path"]))), 128))
    ]));
  }
}), Nr = /* @__PURE__ */ G(_r, [["__scopeId", "data-v-22bc579e"]]), qr = {
  install(o) {
    o.component("BSideMenu", Nr);
  }
}, Zr = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BActionCard: Wi,
  BAlert: Kl,
  BAutoComplete: fr,
  BAvatar: Ar,
  BBreadcrumb: $r,
  BButton: Ot,
  BCard: Jl,
  BCardIcon: Ti,
  BCheckbox: pl,
  BCollapse: En,
  BColorPicker: bs,
  BConfirm: Nn,
  BContentScreen: Js,
  BCrop: Ai,
  BDate: vn,
  BDateComparator: Gn,
  BDateComparatorFilter: ns,
  BDateFilter: $n,
  BDatePicker: lr,
  BDialog: ea,
  BDivider: rr,
  BDropdown: yr,
  BExpandableContainer: rs,
  BFilter: wa,
  BGroup: wl,
  BHistory: li,
  BIcon: Rl,
  BInput: Ra,
  BMenu: Ka,
  BMetricCard: Qi,
  BMultiSelect: jl,
  BNavbar: Pr,
  BPagination: Bi,
  BProfile: fo,
  BProgressBar: Ds,
  BRadio: yl,
  BRadioButton: Ml,
  BRangeSlider: $s,
  BRoundButton: Qt,
  BRoundMenu: Pn,
  BSelect: zl,
  BSelectContainer: Sl,
  BSideMenu: qr,
  BSidebar: Wr,
  BSlider: ks,
  BSmartSelect: dr,
  BSpinner: Yt,
  BStepOption: _i,
  BStepper: ko,
  BTab: Eo,
  BTable: Yo,
  BTag: yn,
  BTagInput: Rs,
  BTagSelect: mi,
  BToast: Kn,
  BToggle: nl,
  BTooltip: An
}, Symbol.toStringTag, { value: "Module" })), Ye = Zr, Jr = {
  install(o) {
    const s = document.createElement("link");
    s.rel = "stylesheet", s.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200", document.head.appendChild(s);
    for (const t in Ye) {
      const l = Ye[t];
      l && (typeof l.install == "function" || typeof l == "object") && o.use(l);
    }
    const e = (t) => new Promise((l) => {
      ce.emit("open-confirm", t);
      const n = () => {
        ce.off("confirm", n), ce.off("cancel", u), l(!0);
      }, u = () => {
        ce.off("confirm", n), ce.off("cancel", u), l(!1);
      };
      ce.on("confirm", n), ce.on("cancel", u);
    });
    o.config.globalProperties.$confirm = e, o.provide("confirm", e);
    const c = (t) => {
      const l = Date.now();
      return ce.emit("open-toast", { ...t, id: l }), t.timeout && setTimeout(() => {
        ce.emit("close-toast", l);
      }, t.timeout), l;
    };
    o.config.globalProperties.$toast = c, o.provide("toast", c);
  }
};
export {
  Jr as default,
  Gr as useClickOutside,
  ie as useOptionalModel
};
