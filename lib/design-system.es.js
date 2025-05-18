var $t = Object.defineProperty;
var Mt = (n, s, e) => s in n ? $t(n, s, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[s] = e;
var Ke = (n, s, e) => Mt(n, typeof s != "symbol" ? s + "" : s, e);
import { createElementBlock as v, openBlock as f, createElementVNode as g, defineComponent as Z, computed as Y, normalizeClass as A, createCommentVNode as T, createBlock as R, normalizeStyle as ie, Fragment as Q, renderSlot as x, ref as S, resolveComponent as O, isRef as ne, unref as B, createVNode as P, toDisplayString as F, shallowRef as xt, onMounted as he, onUnmounted as It, withKeys as me, withDirectives as fe, vShow as Ce, inject as et, watch as ae, reactive as At, provide as St, onUpdated as Se, onBeforeUnmount as we, createSlots as Be, withCtx as D, createTextVNode as oe, vModelText as $e, renderList as le, useCssVars as ke, Transition as ve, Teleport as De, withModifiers as We, onBeforeMount as ge, createStaticVNode as Ue, vModelDynamic as Dt, resolveDynamicComponent as Le, useSlots as tt, nextTick as je } from "vue";
const G = (n, s) => {
  const e = n.__vccOpts || n;
  for (const [c, t] of s)
    e[c] = t;
  return e;
}, Et = {}, Ht = {
  class: "b-spinner",
  viewBox: "0 0 50 50"
};
function Tt(n, s) {
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
const lt = /* @__PURE__ */ G(Et, [["render", Tt], ["__scopeId", "data-v-e10f870b"]]), Lt = ["id", "name", "type", "disabled"], Pt = ["for"], zt = /* @__PURE__ */ Z({
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
  setup(n) {
    const s = n, e = Y(() => !!(s.progress > 0 || s.loading));
    return (c, t) => (f(), v("button", {
      id: c.id,
      name: c.name || c.id,
      type: c.type,
      disabled: c.disabled,
      class: A(["b-button", [
        { disabled: c.disabled, "pointer-events-none": e.value },
        c.variant,
        c.size,
        c.color
      ]])
    }, [
      e.value ? (f(), v("div", {
        key: 0,
        class: A(["progress", { "rounded-r-sm": c.progress == 1 }]),
        style: ie({ width: c.progress * 100 + "%" })
      }, null, 6)) : T("", !0),
      e.value ? (f(), R(lt, { key: 1 })) : T("", !0),
      c.$slots.default ? (f(), v(Q, { key: 2 }, [
        c.name || c.id ? (f(), v("label", {
          key: 0,
          for: c.name || c.id,
          class: A([{ invisible: e.value }, "button-label cursor-[inherit]"])
        }, [
          x(c.$slots, "default", {}, void 0, !0)
        ], 10, Pt)) : (f(), v("div", {
          key: 1,
          class: A([{ invisible: e.value }, "button-label"])
        }, [
          x(c.$slots, "default", {}, void 0, !0)
        ], 2))
      ], 64)) : T("", !0)
    ], 10, Lt));
  }
}), at = /* @__PURE__ */ G(zt, [["__scopeId", "data-v-2b3008bf"]]), Ot = {
  install(n) {
    n.component("BButton", at);
  }
};
function xe(n) {
  const s = /* @__PURE__ */ new Date();
  let e, c;
  if (n === "today")
    e = s, c = s;
  else if (n === "yesterday") {
    const t = new Date(s.setDate(s.getDate() - 1));
    e = t, c = t;
  } else if (n.includes("last") && !n.includes("Month")) {
    const t = new Date(s.setDate(s.getDate() - 1)), l = parseInt(n.replace("last", ""));
    e = new Date(t.setDate(t.getDate() - l)), c = new Date((/* @__PURE__ */ new Date()).setDate((/* @__PURE__ */ new Date()).getDate() - 1));
  } else {
    const t = new Date(s.getFullYear(), s.getMonth(), 1), l = new Date(s.getFullYear(), s.getMonth() - 1, 1), o = new Date(t);
    o.setDate(0), e = l, c = o;
  }
  return [e, c];
}
function Wt(n) {
  const s = parseInt(n.slice(1, 3), 16), e = parseInt(n.slice(3, 5), 16), c = parseInt(n.slice(5, 7), 16), t = parseInt(n.slice(7, 9), 16) / 255;
  return {
    r: s,
    g: e,
    b: c,
    a: t
  };
}
function ot(n, s, e, c) {
  let t, l, o, u, d;
  n = n / 60, e <= 0.5 ? l = e * (s + 1) : l = e + s - e * s, t = e * 2 - l;
  function a(r, m, p) {
    return p < 0 && (p += 6), p >= 6 && (p -= 6), p < 1 ? (m - r) * p + r : p < 3 ? m : p < 4 ? (m - r) * (4 - p) + r : r;
  }
  return o = a(t, l, n + 2) * 255, u = a(t, l, n) * 255, d = a(t, l, n - 2) * 255, { r: o, g: u, b: d, a: c };
}
function Ut(n, s, e, c) {
  let t, l, o = [], u;
  for (l = ot(n, 1, 0.5, 1), o[0] = l.r / 255, o[1] = l.g / 255, o[2] = l.b / 255, u = s + e, u > 1 && (s = Number((s / u).toFixed(2)), e = Number((e / u).toFixed(2))), t = 0; t < 3; t++)
    o[t] *= 1 - s - e, o[t] += s, o[t] = Number(o[t] * 255);
  return { r: o[0], g: o[1], b: o[2], a: c };
}
function jt(n, s, e, c) {
  n = (n % 360 + 360) % 360, s = Math.max(0, Math.min(s, 100)) / 100, e = Math.max(0, Math.min(e, 100)) / 100;
  const t = e * s, l = t * (1 - Math.abs(n / 60 % 2 - 1)), o = e - t;
  let u, d, a;
  return n >= 0 && n < 60 ? (u = t, d = l, a = 0) : n >= 60 && n < 120 ? (u = l, d = t, a = 0) : n >= 120 && n < 180 ? (u = 0, d = t, a = l) : n >= 180 && n < 240 ? (u = 0, d = l, a = t) : n >= 240 && n < 300 ? (u = l, d = 0, a = t) : (u = t, d = 0, a = l), u = Math.round((u + o) * 255), d = Math.round((d + o) * 255), a = Math.round((a + o) * 255), { r: u, g: d, b: a, a: c };
}
function Rt(n, s, e, c) {
  const t = Math.round(c * 255).toString(16).padStart(2, "0");
  return `#${n.toString(16).padStart(2, "0")}${s.toString(16).padStart(2, "0")}${e.toString(16).padStart(2, "0")}${t}`;
}
function Ft(n, s, e, c) {
  n /= 255, s /= 255, e /= 255;
  const t = Math.max(n, s, e), l = Math.min(n, s, e), o = t - l;
  let u = 0, d = 0, a = (t + l) / 2;
  if (o !== 0) {
    switch (d = a > 0.5 ? o / (2 - t - l) : o / (t + l), t) {
      case n:
        u = (s - e) / o + (s < e ? 6 : 0);
        break;
      case s:
        u = (e - n) / o + 2;
        break;
      case e:
        u = (n - s) / o + 4;
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
function _t(n, s, e, c) {
  const t = Math.max(n, s, e), l = Math.min(n, s, e);
  if (t === l)
    return {
      h: 0,
      w: (100 * l / 255).toFixed(0) + "%",
      b: (100 - 100 * t / 255).toFixed(0) + "%",
      a: c
    };
  let o = 0;
  switch (t) {
    case n:
      o = (s - e) / (t - l) + 0;
      break;
    case s:
      o = (e - n) / (t - l) + 2;
      break;
    case e:
      o = (n - s) / (t - l) + 4;
      break;
  }
  return {
    h: (360 * ((o + 6) % 6 / 6)).toFixed(0),
    w: (100 * l / 255).toFixed(0) + "%",
    b: (100 - 100 * t / 255).toFixed(0) + "%",
    a: c
  };
}
function Ae(n, s, e, c) {
  let t, l, o, u, d, a, r = 0, m, p, h, y, w;
  return t = n / 255, l = s / 255, o = e / 255, p = Math.max(t, l, o), h = p - Math.min(t, l, o), y = (i) => (p - i) / 6 / h + 1 / 2, w = (i) => Math.round(i * 100) / 100, h == 0 ? r = m = 0 : (m = h / p, u = y(t), d = y(l), a = y(o), t === p ? r = a - d : l === p ? r = 1 / 3 + u - a : o === p && (r = 2 / 3 + d - u), r < 0 ? r += 1 : r > 1 && (r -= 1)), {
    h: Math.round(r * 360),
    s: `${w(m * 100).toFixed(0)}%`,
    v: `${w(p * 100).toFixed(0)}%`,
    a: c
  };
}
function Nt(n) {
  return n == null || n === "";
}
function de(n) {
  return typeof n == "object" && n !== null;
}
function Xe(n, s, e, c = !1) {
  const t = n == null ? void 0 : n.toISOString().substr(0, 10), l = s == null ? void 0 : s.toISOString().substr(0, 10), o = e == null ? void 0 : e.toISOString().substr(0, 10);
  if (c)
    return l == o || t == o;
  const u = `
        return (start < end && start < day && day < end) ||
        (start > end && start > day && day > end)
    `;
  return new Function("start", "end", "day", u)(t, l, o);
}
function Ge(n) {
  return n && n.charAt(0).toUpperCase() + n.slice(1);
}
function Je(n) {
  const s = n.getFullYear(), e = n.getMonth(), c = new Date(s, e, 1).getDay(), t = new Date(s, e + 1, 0).getDate(), l = [];
  let o = 1;
  for (let u = 0; u < 6; u++) {
    const d = [];
    for (let a = 0; a < 7; a++)
      if (u === 0 && a < c || o > t)
        d.push("");
      else {
        const r = new Date(s, e, o);
        d.push(r), o++;
      }
    l.push(d);
  }
  return l;
}
function qt(n = "en-US") {
  const s = /* @__PURE__ */ new Date("2021-01-03T23:15:30"), e = [];
  for (let c = 0; c < 12; c++) {
    const t = s.toLocaleDateString(n, { month: "short" });
    e.push({
      label: t,
      value: c
    }), s.setMonth(s.getMonth() + 1);
  }
  return e;
}
function He(n, s, e, c = { left: !0 }, t = {}, l = {}) {
  const o = n.clientX - s.clientWidth / 2 - e.getBoundingClientRect().left, u = e.clientWidth - (s.clientWidth - (typeof t.x == "number" ? t.x : 2)), d = Math.min(u, Math.max(l.x || 0, c.left ? o : u - o)), a = n.clientY - s.clientHeight / 2 - e.getBoundingClientRect().top, r = e.clientHeight - (s.clientHeight - (t.y || 0)), m = Math.min(r, Math.max(l.y || 0, c.top ? a : r - a));
  return {
    x: d,
    y: m
  };
}
function nt(n, s) {
  switch (s) {
    case "cpf":
      n = n.replace(/\D/g, ""), n = n.slice(0, 11), n = n.replace(/(\d{3})(\d)/, "$1.$2"), n = n.replace(/(\d{3})(\d)/, "$1.$2"), n = n.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      break;
    case "cnpj":
      n = n.replace(/\D/g, ""), n = n.slice(0, 14), n = n.replace(/(\d{2})(\d)/, "$1.$2"), n = n.replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3"), n = n.replace(/(\d{2})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3/$4"), n = n.replace(/(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, "$1.$2.$3/$4-$5");
      break;
    case "cep":
      n = n.replace(/\D/g, ""), n = n.slice(0, 8), n = n.replace(/(\d{5})(\d)/, "$1-$2");
      break;
  }
  return n;
}
function st(n) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(n);
}
function it(n) {
  return /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/.test(n);
}
function rt(n) {
  return /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/.test(n);
}
function Te(n, s = 0.3, e = [255, 255, 255]) {
  const c = document.createElement("div");
  c.style.color = n, document.body.appendChild(c);
  const t = getComputedStyle(c).color;
  document.body.removeChild(c);
  const l = t.match(/\d+/g);
  if (!l)
    return "";
  const o = l.map(Number), u = Math.round(o[0] * s + e[0] * (1 - s)), d = Math.round(o[1] * s + e[1] * (1 - s)), a = Math.round(o[2] * s + e[2] * (1 - s));
  return `rgb(${u}, ${d}, ${a})`;
}
function ut(n) {
  const s = window.location.pathname.split("/"), e = n.replace(/\/+$/, "").split("/");
  for (let c = 0; c < e.length; c++)
    if (s[c] !== e[c])
      return !1;
  return !0;
}
const dt = [
  {
    value: "today",
    label: "Today",
    calculate: () => xe("today")
  },
  {
    value: "yesterday",
    label: "Yesterday",
    calculate: () => xe("yesterday")
  },
  {
    value: "last7",
    label: "Last 7 days",
    calculate: () => xe("last7")
  },
  {
    value: "last15",
    label: "Last 15 days",
    calculate: () => xe("last15")
  },
  {
    value: "last30",
    label: "Last 30 days",
    calculate: () => xe("last30")
  },
  {
    value: "lastMonth",
    label: "Last month",
    calculate: () => xe("lastMonth")
  }
], Zt = ["id", "name", "type", "disabled"], Kt = { class: "content" }, Xt = {
  key: 0,
  class: "text"
}, Gt = /* @__PURE__ */ Z({
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
  setup(n) {
    const s = n;
    let e = S(!1);
    const c = Y(() => {
      const l = {};
      if (s.disabled)
        return l;
      if (s.background && s.variant != "plain" && (l["border-color"] = s.background), s.background && s.variant != "default" ? l.color = s.background : l.background = s.background, e.value) {
        if (s.background && s.variant == "default") {
          const o = Te(s.background, 0.5, [0, 0, 0]);
          l.background = o, l["border-color"] = o;
        } else if (s.background && s.variant == "reverse")
          l.background = s.background, l.color = "white";
        else if (s.background) {
          const o = Te(s.background, 0.4);
          l.background = o;
        }
        s.alwaysOpen || (l["z-index"] = 50);
      }
      return l;
    }), t = Y(() => s.icon ? s.icon : s.color == "danger" || s.color == "warning" || s.color == "neutral" ? "close" : "add");
    return (l, o) => {
      const u = O("BIcon");
      return f(), v("button", {
        id: l.id,
        name: l.name || l.id,
        type: l.type,
        disabled: l.disabled,
        class: A(["b-round-button", [
          l.size,
          l.color,
          l.variant,
          {
            disabled: l.disabled,
            "always-open": l.alwaysOpen,
            hovered: B(e)
          }
        ]]),
        style: ie(c.value),
        onMouseover: o[0] || (o[0] = (d) => ne(e) ? e.value = !0 : e = !0),
        onMouseout: o[1] || (o[1] = (d) => ne(e) ? e.value = !1 : e = !1)
      }, [
        g("div", Kt, [
          P(u, {
            name: t.value,
            class: "icon"
          }, null, 8, ["name"]),
          l.text ? (f(), v("span", Xt, F(l.text), 1)) : T("", !0)
        ])
      ], 46, Zt);
    };
  }
}), Jt = /* @__PURE__ */ G(Gt, [["__scopeId", "data-v-98aa6efb"]]), Qt = {
  install(n) {
    n.component("BRoundButton", Jt);
  }
}, Yt = {
  install(n) {
    n.component("BSpinner", lt);
  }
};
function se(n, s, e, c) {
  const t = xt(c);
  return [Y({
    get() {
      return n[s] === void 0 ? t.value : n[s];
    },
    set(u) {
      t.value = u, e(`update:${s}`, u);
    }
  }), (u, d) => {
    t.value = u, e(`update:${s}`, u, d);
  }];
}
function Zr(n, s) {
  const e = (c) => {
    n.value && !n.value.contains(c.target) && s(c);
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
}, al = /* @__PURE__ */ Z({
  __name: "BToggle",
  props: {
    id: {},
    name: {},
    modelValue: { type: Boolean, default: void 0 },
    rhs: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, !1);
    function l() {
      e.disabled || (t.value = !t.value);
    }
    return (o, u) => (f(), v("div", {
      id: o.id,
      name: o.name || o.id,
      role: "switch",
      "aria-checked": B(t),
      "aria-disabled": o.disabled,
      class: A(["b-toggle", { "flex-row-reverse": o.rhs, disabled: o.disabled }]),
      onClick: l
    }, [
      g("div", {
        tabindex: "0",
        class: A(["container", { active: B(t) }]),
        onKeyup: me(l, ["space"])
      }, [
        g("div", {
          class: A(["inline-block rounded-full w-[.85em] h-[.85em] bg-current transition", [B(t) ? "ml-[1em]" : "ml-[.125em]"]])
        }, null, 2)
      ], 34),
      o.$slots.default ? (f(), v(Q, { key: 0 }, [
        o.name || o.id ? (f(), v("label", {
          key: 0,
          for: o.name || o.id,
          class: "toggle-label cursor-[inherit]"
        }, [
          x(o.$slots, "default", {}, void 0, !0)
        ], 8, tl)) : (f(), v("div", ll, [
          x(o.$slots, "default", {}, void 0, !0)
        ]))
      ], 64)) : T("", !0)
    ], 10, el));
  }
}), ol = /* @__PURE__ */ G(al, [["__scopeId", "data-v-aac6e71d"]]), nl = {
  install(n) {
    n.component("BToggle", ol);
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
}, cl = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, !1), l = Y(() => e.allowIndeterminate ? t.value !== !1 : !!t.value), o = Y(() => t.value === null ? "mixed" : !!t.value);
    function u() {
      e.disabled || (e.allowIndeterminate ? t.value === !0 ? t.value = null : t.value === null ? t.value = !1 : t.value = !0 : t.value = !t.value);
    }
    return (d, a) => (f(), v("div", {
      id: d.id,
      name: d.name || d.id,
      role: "checkbox",
      "aria-checked": o.value,
      "aria-disabled": d.disabled,
      class: A(["b-checkbox", { "flex-row-reverse": d.rhs, disabled: d.disabled }]),
      onClick: u
    }, [
      g("div", {
        tabindex: "0",
        class: A(["content", { active: l.value }]),
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
          [Ce, B(t) === null]
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
          [Ce, B(t) === !0]
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
      ], 64)) : T("", !0)
    ], 10, sl));
  }
}), fl = /* @__PURE__ */ G(cl, [["__scopeId", "data-v-bdfdf609"]]), pl = {
  install(n) {
    n.component("BCheckbox", fl);
  }
}, ml = ["id", "name", "aria-checked", "aria-disabled"], vl = ["for"], gl = {
  key: 1,
  class: "radio-text"
}, hl = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, !1), l = et("groupState", null);
    ae(t, (d) => {
      d && l && e.groupValue !== void 0 && l.select(e.groupValue);
    }), ae(() => l == null ? void 0 : l.selected, (d) => {
      d && l && e.groupValue !== void 0 && (t.value = d == e.groupValue);
    });
    const o = Y(() => (l == null ? void 0 : l.disabled) || e.disabled);
    function u() {
      o.value || (t.value = !0);
    }
    return (d, a) => (f(), v("div", {
      id: d.id,
      name: d.name || d.id,
      role: "radio",
      "aria-checked": B(t),
      "aria-disabled": o.value,
      class: A(["b-radio", [d.variant, { disabled: o.value, active: B(t) }]]),
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
      ], 64)) : T("", !0)
    ], 10, ml));
  }
}), bl = /* @__PURE__ */ G(hl, [["__scopeId", "data-v-db432354"]]), yl = {
  install(n) {
    n.component("BRadio", bl);
  }
}, Cl = /* @__PURE__ */ Z({
  __name: "BGroup",
  props: {
    modelValue: { default: null },
    vertical: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = s, c = n, t = At({
      selected: c.modelValue,
      get disabled() {
        return c.disabled;
      },
      select: l
    });
    ae(() => c.modelValue, (o) => t.selected = o), St("groupState", t);
    function l(o) {
      t.selected = o, e("update:modelValue", o);
    }
    return (o, u) => (f(), v("div", {
      class: A(["b-group inline-flex", [o.vertical ? "vert" : "hor items-end"]])
    }, [
      x(o.$slots, "default")
    ], 2));
  }
}), Bl = /* @__PURE__ */ G(Cl, [["__scopeId", "data-v-0792efaa"]]), wl = {
  install(n) {
    n.component("BGroup", Bl);
  }
}, kl = ["id", "name", "aria-checked", "aria-disabled"], Vl = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, !1), l = et("groupState", null);
    ae(t, (d) => {
      d && l && e.groupValue !== void 0 && l.select(e.groupValue);
    }), ae(() => l == null ? void 0 : l.selected, (d) => {
      d && l && e.groupValue !== void 0 && (t.value = d == e.groupValue);
    });
    const o = Y(() => l && l.disabled || e.disabled);
    function u() {
      o.value || (t.value = !0);
    }
    return (d, a) => (f(), v("div", {
      id: d.id,
      name: d.name || d.id,
      role: "radio",
      "aria-checked": B(t),
      "aria-disabled": o.value,
      class: A(["bg-neutral-surface-default text-xs relative inline-flex min-h-[3em] min-w-[10em] cursor-pointer items-center justify-center py-base px-2xl font-bold tracking-wider uppercase select-none leading-xs border-xxs border-current text-neutral-interaction-default", [
        d.isDiv ? "b-radio-div" : "b-radio-button",
        { active: B(t), disabled: o.value }
      ]]),
      tabindex: "0",
      onClick: u,
      onKeyup: me(u, ["space"])
    }, [
      x(d.$slots, "default", {}, void 0, !0)
    ], 42, kl));
  }
}), $l = /* @__PURE__ */ G(Vl, [["__scopeId", "data-v-61c8da32"]]), Ml = {
  install(n) {
    n.component("BRadioButton", $l);
  }
}, xl = {
  key: 0,
  class: "actions",
  tabindex: "0"
}, Il = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t, l] = se(e, "modelValue", c, !1), o = S(), u = S(), d = S(), a = new ResizeObserver(p), r = new MutationObserver(p), m = Y(() => e.disabled ? !1 : t.value);
    he(() => {
      u.value && (o.value = u.value.querySelector(".b-label-container"), o.value && (r.observe(o.value, {
        characterData: !0,
        subtree: !0,
        childList: !0
      }), a.observe(o.value, { box: "border-box" })), d.value && a.observe(d.value, { box: "border-box" }), setTimeout(() => {
        p();
      }, 200));
    }), Se(p), we(() => {
      a && a.disconnect();
    });
    function p() {
      d.value && (d.value.style.maxHeight = m.value ? `${d.value.scrollHeight + 1}px` : "0px");
    }
    function h(y, w) {
      l(y, w || {});
    }
    return (y, w) => {
      const i = O("BExpandableContainer");
      return f(), v("div", {
        ref_key: "fatherContainer",
        ref: u
      }, [
        P(i, {
          modelValue: B(t),
          "onUpdate:modelValue": [
            w[0] || (w[0] = (b) => ne(t) ? t.value = b : null),
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
          content: D(() => [
            fe(g("div", {
              ref_key: "content",
              ref: d,
              class: "content-wrapper"
            }, [
              g("div", {
                class: A(["content transition-translate", {
                  secondary: y.secondary,
                  expanded: m.value,
                  "has-max-height": !y.dontHaveMaxHeight
                }])
              }, [
                x(y.$slots, "content", {}, () => [
                  g("ul", {
                    role: "list",
                    class: A(["items-list", [{ "p-xxs [&>*]:p-xs": !y.dontHaveMaxHeight }]])
                  }, [
                    x(y.$slots, "items", {}, void 0, !0)
                  ], 2)
                ], !0),
                y.$slots.actions ? (f(), v("div", xl, [
                  x(y.$slots, "actions", {}, void 0, !0)
                ])) : T("", !0)
              ], 2)
            ], 512), [
              [Ce, m.value]
            ])
          ]),
          default: D(() => [
            x(y.$slots, "default", {}, void 0, !0)
          ]),
          _: 2
        }, [
          y.$slots.complement ? {
            name: "complement",
            fn: D(() => [
              x(y.$slots, "complement", {}, void 0, !0)
            ]),
            key: "0"
          } : void 0,
          y.$slots.label ? {
            name: "label",
            fn: D(() => [
              x(y.$slots, "label", {}, void 0, !0)
            ]),
            key: "1"
          } : void 0
        ]), 1032, ["modelValue", "absolute", "label-value", "close-on-blur", "disabled", "is-error", "error-message", "info-message", "required", "max-height", "min-width", "secondary", "hide-arrow"])
      ], 512);
    };
  }
}), Al = /* @__PURE__ */ G(Il, [["__scopeId", "data-v-485b9f59"]]), Sl = {
  install(n) {
    n.component("BSelectContainer", Al);
  }
}, Dl = { class: "relative pointer-events-none" }, El = { class: "search-placeholder" }, Hl = ["disabled"], Tl = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, ""), [l, o] = se(e, "expanded", c, !1);
    return (u, d) => {
      const a = O("BIcon");
      return f(), v(Q, null, [
        u.icon ? (f(), R(a, {
          key: 0,
          name: u.icon,
          class: A(["icon shrink-0", { "text-primary-interaction-default": B(l) }])
        }, null, 8, ["name", "class"])) : T("", !0),
        g("span", {
          class: A(["flex items-center gap-xs truncate", { "text-neutral-foreground-low": !u.items }])
        }, [
          u.searchable && !u.disabled ? (f(), v("div", {
            key: 0,
            class: A(["flex items-center text-neutral-foreground-high", { secondary: u.secondary, hidden: !B(l) }]),
            onClick: d[1] || (d[1] = (r) => B(o)(!0, { source: "click" }))
          }, [
            P(a, {
              name: "search",
              class: "icon"
            }),
            fe(g("div", Dl, [
              g("span", El, [
                x(u.$slots, "searchText", {}, () => [
                  d[2] || (d[2] = oe("Search"))
                ], !0)
              ])
            ], 512), [
              [Ce, !B(t).length]
            ]),
            fe(g("input", {
              "onUpdate:modelValue": d[0] || (d[0] = (r) => ne(t) ? t.value = r : null),
              type: "search",
              class: "search",
              disabled: u.disabled
            }, null, 8, Hl), [
              [$e, B(t)]
            ])
          ], 2)) : T("", !0),
          x(u.$slots, "status", {}, void 0, !0)
        ], 2)
      ], 64);
    };
  }
}), Pe = /* @__PURE__ */ G(Tl, [["__scopeId", "data-v-8b8bd07c"]]), Ll = /* @__PURE__ */ Z({
  __name: "Option",
  props: {
    selected: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    secondary: { type: Boolean, default: !1 },
    noHover: { type: Boolean, default: !1 }
  },
  setup(n) {
    return (s, e) => (f(), v("div", {
      role: "option",
      tabindex: "0",
      class: A(["option-container", { secondary: s.secondary, disabled: s.disabled, noHover: s.noHover, selected: s.selected }])
    }, [
      x(s.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Ve = /* @__PURE__ */ G(Ll, [["__scopeId", "data-v-ade14e65"]]), Pl = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t, l] = se(e, "modelValue", c, null), [o, u] = se(e, "expanded", c, !1);
    let d = S(null), a = S("");
    ae(() => e.modelValue, (i) => {
      if (!i)
        d.value = null;
      else {
        const b = e.items.findIndex((W) => W == i);
        d.value = b < 0 ? null : b;
      }
      t.value = e.modelValue;
    });
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
      function b(W) {
        l(e.items[W], { index: W }), i.preventDefault();
      }
      switch (i.key) {
        case "ArrowUp":
          {
            if (d.value == 0)
              break;
            const W = d.value === null ? e.items.length - 1 : d.value - 1;
            b(W);
          }
          break;
        case "ArrowDown":
          {
            if (d.value == e.items.length - 1)
              break;
            const W = d.value === null ? 0 : d.value + 1;
            b(W);
          }
          break;
        case "Home":
          b(0);
          break;
        case "End":
          {
            const W = e.items.length - 1;
            b(W);
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
    function w(i, b) {
      e.searchable && (b == null ? void 0 : b.source) == "click" ? u(!0, b) : u(i, b);
    }
    return (i, b) => {
      const W = O("BSelectContainer");
      return f(), R(W, {
        modelValue: B(o),
        "onUpdate:modelValue": [
          b[2] || (b[2] = (V) => ne(o) ? o.value = V : null),
          w
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
        items: D(() => [
          (f(!0), v(Q, null, le(y(B(a)), (V, E) => (f(), R(Ve, {
            "aria-selected": m(B(t)) == m(V),
            key: E,
            secondary: i.secondary,
            disabled: V.disabled,
            selected: m(B(t)) == m(V),
            onClick: (z) => p(V, E),
            onKeyup: me((z) => p(V, E), ["space"])
          }, {
            default: D(() => [
              x(i.$slots, "item", {
                item: V,
                index: E
              }, () => [
                oe(F(r(V)), 1)
              ])
            ]),
            _: 2
          }, 1032, ["aria-selected", "secondary", "disabled", "selected", "onClick", "onKeyup"]))), 128))
        ]),
        default: D(() => [
          P(Pe, {
            modelValue: B(a),
            "onUpdate:modelValue": b[0] || (b[0] = (V) => ne(a) ? a.value = V : a = V),
            expanded: B(o),
            "onUpdate:expanded": [
              b[1] || (b[1] = (V) => ne(o) ? o.value = V : null),
              w
            ],
            disabled: i.disabled,
            icon: i.icon,
            secondary: i.secondary,
            items: i.items,
            searchable: i.searchable
          }, Be({
            status: D(() => [
              B(t) && (!B(o) && i.searchable || !i.searchable) ? x(i.$slots, "status", {
                key: 0,
                item: B(t)
              }, () => [
                oe(F(r(B(t))), 1)
              ]) : !B(o) && i.searchable || !i.searchable ? x(i.$slots, "default", { key: 1 }) : T("", !0)
            ]),
            _: 2
          }, [
            i.$slots.searchText ? {
              name: "searchText",
              fn: D(() => [
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
          fn: D(() => [
            x(i.$slots, "actions")
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["modelValue", "label-value", "absolute", "disabled", "required", "is-error", "error-message", "info-message", "secondary"]);
    };
  }
}), zl = {
  install(n) {
    n.component("BSelect", Pl);
  }
}, Ol = { class: "select-count" }, Wl = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t, l] = se(e, "expanded", c, !1), o = S(""), u = Y(() => e.modelValue.filter((p) => p[e.selectedKey] == !0).length), d = Y(() => u.value && !e.disabled && (!t.value && e.searchable || !e.searchable));
    function a(p) {
      if (e.disabled)
        return;
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
      const y = O("BCheckbox"), w = O("BSelectContainer");
      return f(), R(w, {
        modelValue: B(t),
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
        items: D(() => [
          (f(!0), v(Q, null, le(r(o.value), (i, b) => (f(), R(Ve, {
            "aria-selected": (
              // @ts-ignore
              i[p.selectedKey]
            ),
            key: b,
            disabled: i.disabled,
            "no-hover": "",
            class: "flex items-center gap-xxs",
            onClick: (W) => a(i),
            onKeyup: me((W) => a(i), ["space"])
          }, {
            default: D(() => [
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
                oe(F(i[p.labelKey]), 1)
              ], !0)
            ]),
            _: 2
          }, 1032, ["aria-selected", "disabled", "onClick", "onKeyup"]))), 128))
        ]),
        default: D(() => [
          P(Pe, {
            modelValue: o.value,
            "onUpdate:modelValue": h[0] || (h[0] = (i) => o.value = i),
            expanded: B(t),
            "onUpdate:expanded": [
              h[1] || (h[1] = (i) => ne(t) ? t.value = i : null),
              m
            ],
            disabled: p.disabled,
            icon: p.icon,
            items: p.modelValue,
            searchable: p.searchable
          }, Be({
            status: D(() => [
              d.value ? x(p.$slots, "status", {
                key: 0,
                selected: u.value
              }, () => [
                x(p.$slots, "status-text", { selected: u.value }, () => [
                  h[3] || (h[3] = g("span", { class: "font-bold" }, "Selected", -1))
                ], !0)
              ], !0) : !B(t) && p.searchable || !p.searchable ? x(p.$slots, "default", { key: 1 }, void 0, !0) : T("", !0)
            ]),
            _: 2
          }, [
            p.$slots.searchText ? {
              name: "searchText",
              fn: D(() => [
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
          fn: D(() => [
            g("span", Ol, F(u.value), 1)
          ]),
          key: "0"
        } : void 0,
        p.$slots.actions ? {
          name: "actions",
          fn: D(() => [
            x(p.$slots, "actions", {}, void 0, !0)
          ]),
          key: "1"
        } : void 0
      ]), 1032, ["modelValue", "labelValue", "disabled", "required", "is-error", "error-message", "info-message", "absolute"]);
    };
  }
}), Ul = /* @__PURE__ */ G(Wl, [["__scopeId", "data-v-b8588c83"]]), jl = {
  install(n) {
    n.component("BMultiSelect", Ul);
  }
}, Ee = /* @__PURE__ */ Z({
  __name: "BIcon",
  props: {
    name: {},
    size: { default: "24px" },
    filled: { type: Boolean, default: !1 }
  },
  setup(n) {
    return ke((s) => ({
      "9e43273a": s.size
    })), (s, e) => (f(), v("span", {
      class: A(["material-symbols-rounded b-icon", { filled: s.filled }])
    }, F(s.name), 3));
  }
}), Rl = {
  install(n) {
    n.component("BIcon", Ee);
  }
}, Fl = { class: "flex flex-col gap-xxs" }, _l = {
  key: 0,
  class: "title"
}, Nl = {
  key: 1,
  class: "message"
}, ql = { class: "type-icon cursor-pointer rotate-transition group" }, Zl = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s;
    let t = S(!1), l = S(), o = S();
    const u = new ResizeObserver(a), d = Y(() => {
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
    });
    he(() => {
      l.value && u.observe(l.value, { box: "border-box" }), o.value && u.observe(o.value, { box: "border-box" });
    }), Se(a), we(() => {
      u && u.disconnect();
    });
    function a() {
      if (!o.value || !l.value)
        return;
      const r = getComputedStyle(l.value), m = parseInt(r.paddingTop), p = parseInt(r.paddingBottom);
      l.value.style.height = `${o.value.scrollHeight + m + p}px`, o.value.style.width = "fit-content";
      const h = Math.max(o.value.offsetWidth);
      l.value && (l.value.style.width || l.value.offsetWidth != h) ? o.value.style.width = "100%" : o.value.style.width = `${h}px`;
    }
    return (r, m) => (f(), v("div", {
      ref_key: "card",
      ref: l,
      class: A([[
        r.type,
        r.size,
        {
          "items-start": r.expandable,
          "items-center": !r.expandable || !B(t)
        }
      ], "alert transition-[height] duration-100"])
    }, [
      P(ve, { name: "content" }, {
        default: D(() => [
          g("div", {
            ref_key: "content",
            ref: o,
            class: "flex gap-sm items-center transition-[max-height] duration-300"
          }, [
            r.hideIcon ? T("", !0) : (f(), v("div", {
              key: 0,
              class: A(["type-icon", [`self-${r.iconPosition}`]])
            }, [
              P(Ee, {
                name: r.icon || d.value
              }, null, 8, ["name"])
            ], 2)),
            x(r.$slots, "default", {}, () => [
              g("div", Fl, [
                r.title ? (f(), v("h6", _l, F(r.title), 1)) : T("", !0),
                !r.expandable || B(t) ? (f(), v("p", Nl, F(r.message), 1)) : T("", !0)
              ])
            ], !0)
          ], 512)
        ]),
        _: 3
      }),
      x(r.$slots, "actions", {}, () => [
        g("div", ql, [
          g("div", {
            class: A(["flex items-center transition-transform ease-in-out duration-300", { "rotate-180": B(t) }])
          }, [
            r.expandable ? (f(), R(Ee, {
              key: 0,
              name: "expand_more",
              onClick: m[0] || (m[0] = (p) => ne(t) ? t.value = !B(t) : t = !B(t))
            })) : T("", !0)
          ], 2),
          r.closable ? (f(), R(Ee, {
            key: 0,
            name: "close",
            onClick: m[1] || (m[1] = (p) => c("close"))
          })) : T("", !0)
        ])
      ], !0)
    ], 2));
  }
}), ct = /* @__PURE__ */ G(Zl, [["__scopeId", "data-v-780fc253"]]), Kl = {
  install(n) {
    n.component("BAlert", ct);
  }
}, Xl = /* @__PURE__ */ Z({
  __name: "BCard",
  props: {
    className: {}
  },
  setup(n) {
    return (s, e) => (f(), v("div", {
      class: A(["b-card", s.className])
    }, [
      x(s.$slots, "default", {}, void 0, !0)
    ], 2));
  }
}), Gl = /* @__PURE__ */ G(Xl, [["__scopeId", "data-v-f01e7ff2"]]), Jl = {
  install(n) {
    n.component("BCard", Gl);
  }
}, Ql = /* @__PURE__ */ Z({
  __name: "Overlay",
  props: {
    modelValue: { type: Boolean, default: !1 },
    zIndex: { default: 1e3 }
  },
  emits: ["click"],
  setup(n, { emit: s }) {
    ke((l) => ({
      26883047: l.zIndex
    }));
    const e = n, c = s, t = S(e.modelValue);
    return ae(() => e.modelValue, (l) => {
      t.value = l;
    }), (l, o) => (f(), v(Q, null, [
      P(ve, { name: "fade-in" }, {
        default: D(() => [
          t.value ? (f(), v("div", {
            key: 0,
            class: "background-div",
            onClick: o[0] || (o[0] = (u) => c("click"))
          })) : T("", !0)
        ]),
        _: 1
      }),
      x(l.$slots, "default", {}, void 0, !0)
    ], 64));
  }
}), ft = /* @__PURE__ */ G(Ql, [["__scopeId", "data-v-d530327c"]]), Yl = /* @__PURE__ */ Z({
  __name: "BDialog",
  props: {
    modelValue: { type: Boolean, default: !1 },
    width: { default: "fit-content" },
    height: { default: "fit-content" },
    noOutsideClose: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s;
    let t = S(e.modelValue);
    const l = S();
    ae(() => e.modelValue, (u) => {
      t.value = u;
    });
    function o() {
      var u;
      e.noOutsideClose ? ((u = l.value) == null || u.classList.add("bounce-active"), setTimeout(() => {
        var d;
        (d = l.value) == null || d.classList.remove("bounce-active");
      }, 100)) : (t.value = !1, c("update:modelValue", !1));
    }
    return (u, d) => (f(), R(De, { to: "body" }, [
      P(ft, {
        modelValue: B(t),
        "onUpdate:modelValue": d[0] || (d[0] = (a) => ne(t) ? t.value = a : t = a),
        "z-index": 1002,
        onClick: o
      }, {
        default: D(() => [
          P(ve, { name: "bounce" }, {
            default: D(() => [
              B(t) ? (f(), v("div", {
                key: 0,
                ref_key: "dialog",
                ref: l,
                class: "dialog",
                style: ie({ width: u.width, height: u.height })
              }, [
                x(u.$slots, "default", {}, void 0, !0)
              ], 4)) : T("", !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["modelValue"])
    ]));
  }
}), pt = /* @__PURE__ */ G(Yl, [["__scopeId", "data-v-a01fae75"]]), ea = {
  install(n) {
    n.component("BDialog", pt);
  }
}, ta = {
  key: 0,
  class: "label-value"
}, la = {
  key: 1,
  class: "text-primary-foreground-low ml-xxs"
}, aa = /* @__PURE__ */ Z({
  __name: "Label",
  props: {
    labelValue: { default: "" },
    infoMessage: { default: "" },
    tooltipMinWidth: { default: "none" },
    required: { type: Boolean, default: !1 }
  },
  setup(n) {
    return (s, e) => {
      const c = O("BIcon"), t = O("BTooltip");
      return s.labelValue ? (f(), v("h5", ta, [
        oe(F(s.labelValue) + " ", 1),
        s.infoMessage ? (f(), R(t, {
          key: 0,
          class: "ml-xxs"
        }, {
          text: D(() => [
            g("div", {
              class: A(["tooltip-text", {
                "whitespace-nowrap break-words text-wrap": s.tooltipMinWidth != "none"
              }]),
              style: ie({ minWidth: s.tooltipMinWidth })
            }, F(s.infoMessage), 7)
          ]),
          default: D(() => [
            P(c, {
              name: "info",
              class: "info-icon"
            })
          ]),
          _: 1
        })) : T("", !0),
        s.required ? (f(), v("span", la, "*")) : T("", !0)
      ])) : T("", !0);
    };
  }
}), Re = /* @__PURE__ */ G(aa, [["__scopeId", "data-v-a1c473fb"]]), oa = { class: "b-container" }, na = {
  key: 0,
  class: "mb-xxs flex justify-between items-center"
}, sa = ["role", "aria-disabled", "aria-required"], ia = { class: "flex items-center gap-xs ml-auto" }, ra = {
  key: 0,
  class: "text-danger-foreground-low text-start p3"
}, ua = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = new MutationObserver(p), t = s, [l, o] = se(e, "modelValue", t, !1), u = S(), d = S(), a = Y(() => e.disabled ? !1 : l.value), r = S(e.minWidth);
    function m(y) {
      if (!e.closeOnBlur || !l.value || !y.target || !(y.target instanceof Element))
        return;
      const w = y.target.closest(".b-label-container");
      u.value != w && o(!1, { source: "blur" });
    }
    function p() {
      var y;
      r.value = ((y = u.value) == null ? void 0 : y.clientWidth) + "px";
    }
    he(() => {
      document.addEventListener("click", m), u.value && c.observe(u.value, { attributes: !0 });
    }), Se(p), we(() => {
      document.removeEventListener("click", m), c.disconnect();
    });
    function h() {
      e.disabled || o(!l.value, { source: "click" });
    }
    return (y, w) => {
      const i = O("BIcon");
      return f(), v("div", oa, [
        y.labelValue ? (f(), v("div", na, [
          P(Re, {
            "label-value": y.labelValue,
            "info-message": y.infoMessage,
            required: y.required
          }, null, 8, ["label-value", "info-message", "required"])
        ])) : T("", !0),
        g("div", {
          ref_key: "container",
          ref: u,
          role: y.role,
          "aria-disabled": y.disabled,
          "aria-required": y.required,
          class: A(["b-label-container", { "pointer-events-none": y.disabled }]),
          tabindex: "0"
        }, [
          x(y.$slots, "label", {}, () => [
            g("div", {
              ref_key: "label",
              ref: d,
              class: A(["label-container", {
                disabled: y.disabled,
                secondary: y.secondary,
                expanded: a.value,
                "hide-bottom": y.hideBottom,
                error: y.isError
              }]),
              style: ie({ "max-height": y.maxHeight, "min-width": y.minWidth }),
              onClick: h,
              onKeyup: me(h, ["space"])
            }, [
              x(y.$slots, "default", {}, void 0, !0),
              g("div", ia, [
                x(y.$slots, "complement", {}, void 0, !0),
                y.hideArrow ? T("", !0) : (f(), R(i, {
                  key: 0,
                  name: "keyboard_arrow_down",
                  class: A(["arrow-icon", {
                    "text-neutral-interaction-disabled": y.disabled,
                    "text-danger-interaction-default": y.isError,
                    expanded: a.value
                  }])
                }, null, 8, ["class"]))
              ])
            ], 38)
          ], !0),
          P(ve, { name: "content" }, {
            default: D(() => [
              x(y.$slots, "content", { minWidth: r.value }, void 0, !0)
            ]),
            _: 3
          })
        ], 10, sa),
        g("div", null, [
          y.isError ? (f(), v("small", ra, F(y.errorMessage), 1)) : T("", !0)
        ])
      ]);
    };
  }
}), mt = /* @__PURE__ */ G(ua, [["__scopeId", "data-v-5732eb27"]]), da = { class: "font-bold text-neutral-interaction-default" }, ca = { class: "select-count" }, fa = ["aria-selected", "tabindex"], pa = ["onClick", "onKeyup"], ma = { class: "text-neutral-interaction-default" }, va = { class: "flex items-center gap-xs" }, ga = {
  key: 0,
  class: "flex flex-col gap-xs pb-xxs overflow-auto custom-scroll max-h-[12em] mr-xxs mb-xxs"
}, ha = {
  key: 0,
  class: "flex items-center text-xl gap-xs pb-xxs border-b-xxs border-neutral-default mb-xxs px-xs"
}, ba = ["onUpdate:modelValue", "disabled", "placeholder"], ya = { class: "flex items-center gap-xs" }, Ca = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t, l] = se(e, "expanded", c, !1);
    let o = S({}), u = S(-1), d = S(a());
    function a() {
      let i = [];
      return Object.keys(e.modelValue).forEach((b) => {
        i.push(e.modelValue[b].filter((W) => W[e.selectedKey] == !0));
      }), i.length;
    }
    function r(i) {
      if (e.disabled)
        return;
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
      return b ? i.filter((W) => {
        if (W[e.labelKey].toLowerCase().includes(b.toLowerCase()))
          return W;
      }) : i;
    }
    function y() {
      Object.keys(e.modelValue).forEach((i) => {
        e.modelValue[i] = e.modelValue[i].map((b) => (b[e.selectedKey] = !1, b));
      }), d.value = 0, w();
    }
    function w() {
      c("apply");
    }
    return (i, b) => {
      const W = O("BIcon"), V = O("BCheckbox"), E = O("BButton");
      return f(), R(mt, {
        modelValue: B(t),
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
        "onUpdate:modelValue": b[1] || (b[1] = (z, N) => i.$emit("update:expandedModel", z))
      }, Be({
        items: D(() => [
          (f(!0), v(Q, null, le(Object.entries(i.modelValue), (z, N) => (f(), v("li", {
            role: "option",
            "aria-selected": (
              // @ts-ignore
              i.modelValue[N][i.selectedKey]
            ),
            key: z[0],
            class: A(["flex flex-col gap-[.75em] select-none h-max transition-[height] max-h-[3em] overflow-hidden", { active: B(u) === N }]),
            tabindex: N,
            style: { transition: "max-height 0.2s ease" }
          }, [
            g("div", {
              class: A(["flex items-center justify-between text-neutral-interaction-default w-full h-full cursor-pointer [&>*]:p-xs hover:text-primary-interaction-default hover:bg-primary-surface-hover", {
                "bg-primary-surface-default text-primary-interaction-default font-bold": B(u) === N
              }]),
              onClick: We((U) => m(N), ["prevent"]),
              onKeyup: me((U) => m(N), ["space"])
            }, [
              g("p", ma, F(z[0]), 1),
              g("div", va, [
                p(z[1]) ? x(i.$slots, "status", { key: 0 }, () => [
                  g("span", {
                    class: A(["select-count font-normal", {
                      active: B(u) === N
                    }])
                  }, F(p(z[1])), 3)
                ], !0) : T("", !0),
                g("div", {
                  class: A(["flex items-center w-fit h-fit transition-transform ease-in-out duration-300 cursor-pointer text-xl", [
                    B(u) === N ? "rotate-180 text-primary-interaction-default" : "text-neutral-interaction-default"
                  ]])
                }, [
                  P(W, {
                    name: "expand_more",
                    size: "xl"
                  })
                ], 2)
              ])
            ], 42, pa),
            P(ve, { name: "content" }, {
              default: D(() => [
                B(u) === N ? (f(), v("ul", ga, [
                  i.searchable && !i.disabled ? (f(), v("div", ha, [
                    P(W, {
                      name: "search",
                      class: "text-neutral-foreground-low",
                      size: "xl"
                    }),
                    fe(g("input", {
                      "onUpdate:modelValue": (U) => B(o)[z[0]] = U,
                      type: "search",
                      class: "h-full w-full p-0 m-0 border-none text-xs pb-[.05em] placeholder:text-neutral-foreground-low outline-none border-none",
                      style: { "box-shadow": "none" },
                      disabled: i.disabled,
                      placeholder: i.searchText
                    }, null, 8, ba), [
                      [$e, B(o)[z[0]]]
                    ])
                  ])) : T("", !0),
                  (f(!0), v(Q, null, le(h(z[1], B(o)[z[0]]), (U, H) => (f(), R(Ve, {
                    "no-hover": "",
                    disabled: U.disabled,
                    key: H,
                    onClick: (M) => r(U),
                    onKey: (M) => r(U),
                    class: "flex items-center pl-xxs gap-xs"
                  }, {
                    default: D(() => [
                      P(V, {
                        modelValue: (
                          // @ts-ignore
                          U[i.selectedKey]
                        ),
                        class: "pointer-events-none"
                      }, null, 8, ["modelValue"]),
                      oe(" " + F(U[i.labelKey]), 1)
                    ]),
                    _: 2
                  }, 1032, ["disabled", "onClick", "onKey"]))), 128))
                ])) : T("", !0)
              ]),
              _: 2
            }, 1024)
          ], 10, fa))), 128))
        ]),
        actions: D(() => [
          x(i.$slots, "actions", {}, () => [
            g("div", ya, [
              P(E, {
                size: "small",
                variant: "plain",
                onClick: y,
                disabled: !B(d)
              }, {
                default: D(() => [
                  x(i.$slots, "clear-text", {}, () => [
                    b[3] || (b[3] = oe(" Clear "))
                  ], !0)
                ]),
                _: 3
              }, 8, ["disabled"]),
              P(E, {
                type: "button",
                disabled: !B(d),
                size: "small",
                onClick: w
              }, {
                default: D(() => [
                  x(i.$slots, "apply-text", {}, () => [
                    b[4] || (b[4] = oe(" Apply "))
                  ], !0)
                ]),
                _: 3
              }, 8, ["disabled"])
            ])
          ], !0)
        ]),
        default: D(() => [
          P(Pe, {
            expanded: B(t),
            "onUpdate:expanded": [
              b[0] || (b[0] = (z) => ne(t) ? t.value = z : null),
              B(l)
            ],
            disabled: i.disabled,
            icon: i.icon,
            items: i.modelValue
          }, {
            status: D(() => [
              i.disabled ? !B(t) || i.disabled ? x(i.$slots, "default", { key: 1 }, void 0, !0) : T("", !0) : x(i.$slots, "status", {
                key: 0,
                selected: B(d)
              }, () => [
                g("span", da, [
                  x(i.$slots, "status-text", { selected: B(d) }, () => [
                    b[2] || (b[2] = oe(" Filters "))
                  ], !0)
                ])
              ], !0)
            ]),
            _: 3
          }, 8, ["expanded", "disabled", "icon", "items", "onUpdate:expanded"])
        ]),
        _: 2
      }, [
        B(d) && !i.disabled ? {
          name: "complement",
          fn: D(() => [
            g("span", ca, F(B(d)), 1)
          ]),
          key: "0"
        } : void 0
      ]), 1032, ["modelValue", "labelValue", "disabled", "isError", "errorMessage", "infoMessage", "required", "maxHeight", "minWidth", "secondary", "hideArrow"]);
    };
  }
}), Ba = /* @__PURE__ */ G(Ca, [["__scopeId", "data-v-b2650482"]]), wa = {
  install(n) {
    n.component("BFilter", Ba);
  }
}, ka = {
  key: 0,
  class: "flex justify-between items-center"
}, Va = {
  key: 0,
  class: "max-length"
}, $a = {
  key: 1,
  class: "w-full h-full"
}, Ma = ["width", "height"], xa = {
  key: 1,
  class: "flex gap-2 items-center justify-center"
}, Ia = { class: "flex flex-col items-center gap-xs" }, Aa = { class: "flex items-center gap-xs" }, Sa = { class: "file-name text-neutral-foreground-low truncate max-w-7xl" }, Da = {
  key: 2,
  class: "flex flex-col items-center gap-xs"
}, Ea = { class: "file-name cursor-pointer text-primary-foreground-low" }, Ha = { class: "file-name text-neutral-foreground-low" }, Ta = ["maxlength", "placeholder", "disabled"], La = ["disabled", "value", "placeholder", "type", "max", "min", "maxlength"], Pa = ["disabled"], za = {
  key: 4,
  class: "error-message"
}, Oa = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s;
    let t = S(), l = S(!1), o = S(!1), u = S(!1), d = S(!1), a = S(!1), r = S("");
    const m = Y(() => {
      const k = e.type;
      return k === "color" || k === "email" || u.value ? "text" : k;
    }), p = Y(() => {
      if (C("color"))
        return 7;
      if ((e.max || e.max == 0) && (!e.mask || e.isTextArea))
        return e.max;
    }), h = Y(() => C("search") ? "search" : e.appendIcon ? "" : e.icon), y = Y(() => C("password") ? u.value ? "visibility_off" : "visibility" : e.appendIcon ? e.icon : ""), w = Y(() => {
      let k = "";
      return o.value && (k += " focus"), e.disabled && (k += " disabled"), (e.isError || l.value) && (k += " error"), k;
    }), i = Y(() => ({ "text-align": e.textAlign }));
    ge(b), ae(() => e.modelValue, b), ae(() => e.type, b);
    function b() {
      var k;
      C("file") ? (d.value = !!e.modelValue, e.modelValue && (r.value = ((k = e.modelValue) == null ? void 0 : k.name) || "")) : t.value = e.modelValue || e.modelValue == 0 ? e.modelValue : "";
    }
    function W() {
      C("email") ? l.value = !st(t.value) : q("domain") ? l.value = !it(t.value) : q("url") ? l.value = !rt(t.value) : l.value = !!((e.max || e.max === 0) && t.value.length > e.max);
    }
    function V(k) {
      const $ = k.target.files || k.dataTransfer.files;
      a.value = !1, d.value = !0, r.value = $[0].name || "", c("update:modelValue", $[0]);
    }
    function E() {
      d.value = !1, r.value = "", c("update:modelValue", void 0);
    }
    function z() {
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
      }
    }
    function N() {
      !e.isTextArea && e.mask && C("text") && (t.value = nt(t.value, e.mask)), C("number") && ((e.min || e.min === 0) && t.value < e.min ? t.value = e.min : (e.max || e.max === 0) && t.value > e.max && (t.value = e.max)), W(), c("update:modelValue", t.value);
    }
    function U() {
      o.value = !1, c("blur", t.value);
    }
    function H() {
      o.value = !0, c("focus", t.value);
    }
    function M(k) {
      isNaN(Number(t.value)) && (t.value = 0), !e.disabled && ((e.max || e.max === 0) && t.value >= e.max && k > 0 || (e.min || e.min === 0) && t.value <= e.min && k < 0 || (t.value = (Number(t.value) * 1e3 + k * 1e3) / 1e3, N()));
    }
    function q(k, $ = !1) {
      return I(e.mask, k, $);
    }
    function C(k, $ = !1) {
      return I(e.type, k, $);
    }
    function I(k, $, j = !1) {
      let ee = k == $;
      return Array.isArray($) && (ee = $.includes(k)), j && (ee = !ee), ee;
    }
    return (k, $) => {
      var ee;
      const j = O("BIcon");
      return f(), v("div", {
        class: A(["flex flex-col gap-xxs h-fit", [C("file", !0) ? `size-${k.size}` : `file-${k.size} file`]])
      }, [
        C("file", !0) && (k.labelValue || k.max || k.max == 0) ? (f(), v("div", ka, [
          P(Re, {
            "label-value": k.labelValue,
            "info-message": k.infoMessage,
            "tooltip-min-width": k.tooltipMinWidth,
            required: k.required
          }, null, 8, ["label-value", "info-message", "tooltip-min-width", "required"]),
          (k.max || k.max == 0) && C("text") ? (f(), v("span", Va, F(((ee = B(t)) == null ? void 0 : ee.length) || 0) + "/" + F(k.max), 1)) : T("", !0)
        ])) : T("", !0),
        C("file") ? (f(), v("div", $a, [
          g("div", {
            class: A(["relative cursor-pointer flex flex-col gap-xs items-center justify-center", { "blur-[2px]": B(a) }]),
            onDragenter: $[0] || ($[0] = (te) => ne(a) ? a.value = !0 : a = !0),
            onDragleave: $[1] || ($[1] = (te) => ne(a) ? a.value = !1 : a = !1),
            onDrag: V
          }, [
            B(d) ? (f(), v("div", xa, [
              x(k.$slots, "uploaded-file", {}, () => [
                g("div", Ia, [
                  P(j, {
                    name: "draft",
                    class: "file-icon"
                  }),
                  g("div", Aa, [
                    g("p", Sa, F(B(r)), 1),
                    P(j, {
                      class: "cursor-pointer trash-icon",
                      name: "delete",
                      onClick: E
                    })
                  ])
                ])
              ], !0)
            ])) : (f(), v("svg", {
              key: 0,
              width: z(),
              height: z(),
              viewBox: "0 0 76 76",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg"
            }, $[8] || ($[8] = [
              Ue('<path d="M63.5312 33.25H42.75C40.8603 33.25 39.0481 32.4993 37.7119 31.1631C36.3757 29.8269 35.625 28.0147 35.625 26.125V5.34375C35.625 5.18628 35.5624 5.03526 35.4511 4.92391C35.3397 4.81256 35.1887 4.75 35.0312 4.75H21.375C18.8554 4.75 16.4391 5.75089 14.6575 7.53249C12.8759 9.31408 11.875 11.7304 11.875 14.25V61.75C11.875 64.2696 12.8759 66.6859 14.6575 68.4675C16.4391 70.2491 18.8554 71.25 21.375 71.25H54.625C57.1446 71.25 59.5609 70.2491 61.3425 68.4675C63.1241 66.6859 64.125 64.2696 64.125 61.75V33.8438C64.125 33.6863 64.0624 33.5353 63.9511 33.4239C63.8397 33.3126 63.6887 33.25 63.5312 33.25Z" fill="var(--neutral-border-default)" data-v-907217c9></path><path d="M62.228 27.9938L40.8812 6.647C40.8397 6.60573 40.7869 6.57766 40.7295 6.56631C40.672 6.55495 40.6125 6.56083 40.5584 6.5832C40.5043 6.60556 40.4581 6.64342 40.4254 6.69202C40.3928 6.74061 40.3752 6.79776 40.375 6.8563V26.125C40.375 26.7549 40.6252 27.3589 41.0706 27.8043C41.516 28.2497 42.1201 28.5 42.75 28.5H62.0187C62.0772 28.4997 62.1344 28.4822 62.183 28.4495C62.2315 28.4169 62.2694 28.3706 62.2918 28.3165C62.3141 28.2624 62.32 28.2029 62.3087 28.1455C62.2973 28.0881 62.2692 28.0353 62.228 27.9938Z" fill="var(--neutral-border-default)" data-v-907217c9></path><g clip-path="url(#clip0_2300_5309)" data-v-907217c9><circle cx="63" cy="63" r="7" fill="white" data-v-907217c9></circle><path d="M63 50C55.8319 50 50 55.8319 50 63C50 70.1681 55.8319 76 63 76C70.1681 76 76 70.1681 76 63C76 55.8319 70.1681 50 63 50ZM68 64H64V68C64 68.2652 63.8946 68.5196 63.7071 68.7071C63.5196 68.8946 63.2652 69 63 69C62.7348 69 62.4804 68.8946 62.2929 68.7071C62.1054 68.5196 62 68.2652 62 68V64H58C57.7348 64 57.4804 63.8946 57.2929 63.7071C57.1054 63.5196 57 63.2652 57 63C57 62.7348 57.1054 62.4804 57.2929 62.2929C57.4804 62.1054 57.7348 62 58 62H62V58C62 57.7348 62.1054 57.4804 62.2929 57.2929C62.4804 57.1054 62.7348 57 63 57C63.2652 57 63.5196 57.1054 63.7071 57.2929C63.8946 57.4804 64 57.7348 64 58V62H68C68.2652 62 68.5196 62.1054 68.7071 62.2929C68.8946 62.4804 69 62.7348 69 63C69 63.2652 68.8946 63.5196 68.7071 63.7071C68.5196 63.8946 68.2652 64 68 64Z" fill="var(--primary-interaction-default)" data-v-907217c9></path></g><defs data-v-907217c9><clipPath id="clip0_2300_5309" data-v-907217c9><rect width="26" height="26" fill="white" transform="translate(50 50)" data-v-907217c9></rect></clipPath></defs>', 4)
            ]), 8, Ma)),
            B(d) ? T("", !0) : (f(), v("div", Da, [
              g("p", Ea, F(k.labelValue || "Select a file"), 1),
              g("p", Ha, F(k.placeholder || "or drag and drop it here"), 1)
            ])),
            B(d) ? T("", !0) : (f(), v("input", {
              key: 3,
              ref: "inputFile",
              type: "file",
              class: "w-full h-full top-0 left-0 right-0 bottom-0 absolute opacity-0 z-[1] cursor-pointer",
              onChange: V
            }, null, 544))
          ], 34)
        ])) : k.isTextArea ? fe((f(), v("textarea", {
          key: 2,
          "onUpdate:modelValue": $[2] || ($[2] = (te) => ne(t) ? t.value = te : t = te),
          class: A(["input-container b-textarea", w.value]),
          style: ie(i.value),
          maxlength: p.value,
          placeholder: k.placeholder,
          disabled: k.disabled,
          onBlur: U,
          onFocus: H,
          onInput: N
        }, null, 46, Ta)), [
          [$e, B(t)]
        ]) : (f(), v("div", {
          key: 3,
          class: A(["flex items-center h-fit", `size-${k.size}`])
        }, [
          g("div", {
            class: A(["input-container flex-1", w.value])
          }, [
            h.value ? (f(), R(j, {
              key: 0,
              name: h.value,
              class: A(["side-icon", {
                "text-danger-interaction-default": k.isError,
                "text-primary-foreground-low": B(o)
              }])
            }, null, 8, ["name", "class"])) : T("", !0),
            fe(g("input", {
              "onUpdate:modelValue": $[3] || ($[3] = (te) => ne(t) ? t.value = te : t = te),
              class: "input-default b-input",
              style: ie(i.value),
              disabled: k.disabled,
              value: B(t),
              placeholder: k.placeholder,
              type: m.value,
              spellcheck: "false",
              max: p.value,
              min: k.min,
              maxlength: p.value,
              onInput: N,
              onFocus: H,
              onBlur: U
            }, null, 44, La), [
              [Dt, B(t)]
            ]),
            C("color") ? fe((f(), v("input", {
              key: 1,
              "onUpdate:modelValue": $[4] || ($[4] = (te) => ne(t) ? t.value = te : t = te),
              class: A(["color-display", { disabled: k.disabled }]),
              disabled: k.disabled,
              type: "color",
              onInput: N,
              onFocus: H,
              onBlur: U
            }, null, 42, Pa)), [
              [$e, B(t)]
            ]) : T("", !0),
            y.value ? (f(), R(j, {
              key: 2,
              name: y.value,
              class: A(["side-icon", {
                "text-danger-interaction-default": k.isError,
                "text-primary-foreground-low": B(o),
                "cursor-pointer": C("password")
              }]),
              onClick: $[5] || ($[5] = (te) => ne(u) ? u.value = !B(u) && C("password") : u = !B(u) && C("password"))
            }, null, 8, ["name", "class"])) : T("", !0)
          ], 2),
          C("number") ? (f(), v("div", {
            key: 0,
            class: A(["flex flex-col items-center ml-xxs mt-xxs", [
              {
                "text-neutral-interaction-disabled": k.disabled,
                "text-danger-interaction-default": B(l)
              }
            ]])
          }, [
            P(j, {
              name: "arrow_drop_up",
              class: "number-icon",
              onClick: $[6] || ($[6] = (te) => M(+k.step))
            }),
            P(j, {
              name: "arrow_drop_down",
              class: "number-icon",
              onClick: $[7] || ($[7] = (te) => M(-k.step))
            })
          ], 2)) : T("", !0)
        ], 2)),
        k.isError || B(l) ? (f(), v("small", za, F(k.errorMessage), 1)) : T("", !0)
      ], 2);
    };
  }
}), Wa = /* @__PURE__ */ G(Oa, [["__scopeId", "data-v-907217c9"]]), Ua = {
  install(n) {
    n.component("BInput", Wa);
  }
}, ja = {
  key: 1,
  class: "flex-1"
}, Ra = /* @__PURE__ */ Z({
  __name: "MenuOption",
  props: {
    label: { default: "" },
    icon: { default: "" },
    selected: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 }
  },
  setup(n) {
    return (s, e) => {
      const c = O("BIcon");
      return f(), R(Ve, {
        selected: s.selected,
        disabled: s.disabled,
        class: "b-menu-option"
      }, {
        default: D(() => [
          s.icon ? (f(), R(c, {
            key: 0,
            name: s.icon
          }, null, 8, ["name"])) : T("", !0),
          s.label ? (f(), v("span", ja, F(s.label), 1)) : T("", !0),
          x(s.$slots, "default", {}, void 0, !0)
        ]),
        _: 3
      }, 8, ["selected", "disabled"]);
    };
  }
}), vt = /* @__PURE__ */ G(Ra, [["__scopeId", "data-v-df97b6b8"]]), Fa = { class: "b-menu" }, _a = /* @__PURE__ */ Z({
  __name: "BMenu",
  props: {
    modelValue: { default: void 0 },
    items: {},
    getObject: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    ke((m) => ({
      "8d878ec4": o.value
    }));
    const e = n, c = s, [t] = se(e, "modelValue", c, ""), l = Y(() => [
      e.items.filter((m) => !m.bottom),
      e.items.filter((m) => m.bottom)
    ]), o = Y(() => {
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
        if (!m.startsWith("/"))
          return "/" + m;
      } else return "";
      return m;
    }
    function r() {
      return typeof O("router-link") != "string" ? "router-link" : typeof O("nuxt-link") != "string" ? "nuxt-link" : "a";
    }
    return (m, p) => {
      const h = O("BTooltip");
      return f(), v("div", Fa, [
        (f(!0), v(Q, null, le(l.value, (y, w) => (f(), v("div", {
          class: "items-container",
          key: w
        }, [
          (f(!0), v(Q, null, le(y, (i) => (f(), R(h, {
            key: i.value,
            text: i.label
          }, {
            default: D(() => [
              (f(), R(Le(r()), {
                class: "hover:no-underline",
                to: a(i.path),
                href: r() == "a" ? a(i.path) : void 0,
                onClick: (b) => u(i)
              }, {
                default: D(() => [
                  P(vt, {
                    icon: i.icon,
                    selected: i.value == d(B(t)),
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
}), Na = /* @__PURE__ */ G(_a, [["__scopeId", "data-v-52e75318"]]), qa = {
  install(n) {
    n.component("BMenu", Na);
  }
}, Za = ["src"], Ka = { class: "text-sm font-bold" }, Xa = { class: "flex flex-col items-center text-9xl px-xs pb-sm border-b-xxs text-neutral-interaction-default border-neutral-default gap-xs" }, Ga = ["src"], Ja = {
  key: 2,
  class: "text-sm text-center"
}, Qa = {
  key: 3,
  class: "text-3xl font-bold mb-xxs text-center"
}, Ya = {
  key: 0,
  class: "flex flex-col items-center border-b-xxs text-neutral-interaction-default border-neutral-default"
}, eo = { class: "flex items-center w-full relative" }, to = { class: "w-full flex flex-col divide-y-xxs divide-neutral-default font-bold max-h-[12em] overflow-auto custom-scroll" }, lo = ["onClick"], ao = { class: "flex flex-col divide-y-xxs divide-neutral-default" }, oo = { class: "text-sm font-bold" }, no = { class: "text-sm font-bold" }, so = { class: "flex items-center justify-center px-xs py-sm pt-xl text-neutral-interaction-default font-bold text-xxs gap-5 [&>*]:cursor-pointer" }, io = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, null);
    let l = S(!1), o = S(!1), u = S("");
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
      const h = O("BIcon"), y = O("BButton"), w = O("BSelectContainer");
      return f(), R(w, {
        modelValue: B(l),
        "onUpdate:modelValue": p[9] || (p[9] = (i) => ne(l) ? l.value = i : l = i),
        class: "b-profile",
        "aria-multiselectable": "false",
        absolute: m.absolute,
        disabled: m.disabled,
        "dont-have-max-height": "",
        "min-width": "25em"
      }, {
        items: D(() => [
          g("div", Xa, [
            m.profilePicture ? (f(), v("img", {
              key: 0,
              class: "profile-picture w-[1.3em] h-[1.3em] mb-xxs text-8xl",
              src: m.profilePicture,
              alt: "profile picture"
            }, null, 8, Ga)) : (f(), R(h, {
              key: 1,
              name: "account_circle",
              size: "1"
            })),
            B(t) && B(t)[m.nameKey] && m.name ? (f(), v("p", Ja, F(m.name), 1)) : T("", !0),
            B(t) && B(t)[m.nameKey] || m.name ? (f(), v("h4", Qa, F(B(t) && B(t)[m.nameKey] || m.name), 1)) : T("", !0),
            P(y, {
              type: "submit",
              variant: "primary",
              onClick: p[1] || (p[1] = (i) => c("editProfile")),
              class: "mb-xxs truncate",
              disabled: !m.name && !m.profilePicture
            }, {
              default: D(() => [
                x(m.$slots, "editProfile", {}, () => [
                  p[10] || (p[10] = oe(" Edit profile "))
                ], !0)
              ]),
              _: 3
            }, 8, ["disabled"])
          ]),
          m.accounts && m.accounts.length ? (f(), v("div", Ya, [
            g("div", eo, [
              g("div", {
                class: A(["absolute left-1.5 text-xl", {
                  "text-primary-interaction-default": B(o) === !0
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
                onFocus: p[3] || (p[3] = (i) => ne(o) ? o.value = !0 : o = !0),
                onBlur: p[4] || (p[4] = (i) => ne(o) ? o.value = !1 : o = !1),
                placeholder: "Search"
              }, null, 544), [
                [$e, B(u)]
              ])
            ]),
            g("div", {
              class: A(["w-full text-neutral-interaction-default", {
                "pr-xxs py-xxs": d(B(u)).length > 4
              }])
            }, [
              g("div", to, [
                (f(!0), v(Q, null, le(d(B(u)), (i, b) => (f(), v("div", {
                  key: b,
                  class: "profile-option justify-start w-full [&>*]:text-sm hover:bg-neutral-surface-highlight",
                  onClick: (W) => a(i)
                }, [
                  x(m.$slots, "account", {
                    account: i,
                    index: b,
                    active: JSON.stringify(B(t) || {}) == JSON.stringify(i || {})
                  }, () => [
                    g("p", {
                      class: A(["text-sm", {
                        "[&>*]:underline": JSON.stringify(B(t) || {}) == JSON.stringify(i || {})
                      }])
                    }, F(i[m.nameKey]), 3)
                  ], !0)
                ], 8, lo))), 128))
              ])
            ], 2)
          ])) : T("", !0),
          g("div", ao, [
            B(t) ? (f(), v("div", {
              key: 0,
              class: "profile-option action text-neutral-interaction-default hover:bg-neutral-surface-highlight",
              onClick: p[5] || (p[5] = (i) => c("editAccount"))
            }, [
              P(h, {
                name: "person",
                size: "xl"
              }),
              g("p", oo, [
                x(m.$slots, "editAccount", {}, () => [
                  p[11] || (p[11] = oe(" Edit account "))
                ], !0)
              ])
            ])) : T("", !0),
            g("div", {
              class: "text-danger-interaction-default profile-option action hover:bg-danger-surface-default",
              onClick: p[6] || (p[6] = (i) => c("logout"))
            }, [
              P(h, {
                name: "logout",
                size: "xl"
              }),
              g("p", no, [
                x(m.$slots, "logout", {}, () => [
                  p[12] || (p[12] = oe(" Logout "))
                ], !0)
              ])
            ])
          ]),
          g("div", so, [
            g("p", {
              onClick: p[7] || (p[7] = (i) => c("privacyPolicyFunction")),
              class: "hover:underline"
            }, [
              x(m.$slots, "privacyPolicy", {}, () => [
                p[13] || (p[13] = oe(" Privacy Policy "))
              ], !0)
            ]),
            g("p", {
              onClick: p[8] || (p[8] = (i) => c("termsOfUseFucntion")),
              class: "hover:underline"
            }, [
              x(m.$slots, "termsOfUse", {}, () => [
                p[14] || (p[14] = oe(" Terms of use "))
              ], !0)
            ])
          ])
        ]),
        default: D(() => [
          B(l) ? T("", !0) : (f(), v("div", {
            key: 0,
            class: "flex items-center gap-xs text-2xl mr-xxs text-neutral-interaction-default",
            onClick: p[0] || (p[0] = (i) => r(!B(l)))
          }, [
            m.profilePicture ? (f(), v("img", {
              key: 0,
              class: "profile-picture w-[1em] h-[1em]",
              src: m.profilePicture,
              alt: "profile picture"
            }, null, 8, Za)) : (f(), R(h, {
              key: 1,
              name: "account_circle"
            })),
            g("p", Ka, F(B(t) && B(t)[m.nameKey] || m.name), 1)
          ]))
        ]),
        _: 3
      }, 8, ["modelValue", "absolute", "disabled"]);
    };
  }
}), ro = /* @__PURE__ */ G(io, [["__scopeId", "data-v-80438326"]]), uo = {
  install(n) {
    n.component("BProfile", ro);
  }
}, co = {
  key: 0,
  class: "flex w-full"
}, fo = ["onClick"], po = { class: "step-value mr-[.6em]" }, mo = {
  key: 0,
  class: "before-triangle-cover"
}, vo = {
  key: 1,
  class: "after-triangle-cover"
}, go = {
  key: 1,
  class: "flex justify-end"
}, ho = {
  key: 0,
  class: "background"
}, bo = ["data-after-content", "onClick"], yo = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    ke((p) => ({
      "1d8a7712": p.background
    }));
    const e = n, c = S(e.modelValue), t = S(0), l = S(0), o = S(/* @__PURE__ */ new Set());
    o.value.add(0), ge(() => {
      c.value || d(e.items[0], 0);
    }), ae(() => e.modelValue, () => {
      c.value = e.modelValue;
      const p = m(c.value);
      p != -1 && (t.value = p, o.value.add(p), l.value < p && t.value === p && (l.value = p));
    });
    const u = s;
    function d(p, h) {
      e.disabled || ((l.value + 1 === h || t.value > h || l.value >= h || e.allowedSkip) && (t.value = h, c.value = p, u("update:modelValue", p)), l.value < h && t.value === h && (l.value = h)), o.value.add(h), u("changeStep", p, h);
    }
    function a(p) {
      return !o.value.has(p) && p < l.value && e.allowedSkip;
    }
    function r(p) {
      return de(p) ? p.value : p;
    }
    function m(p) {
      return e.items.findIndex((h) => r(h) == r(p));
    }
    return (p, h) => {
      const y = O("BIcon");
      return f(), v(Q, null, [
        p.version == 1 ? (f(), v("div", co, [
          (f(!0), v(Q, null, le(p.items, (w, i) => (f(), v("button", {
            key: `step-button-${i}`,
            class: A(["step-button", [
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
            onClick: (b) => d(w, i)
          }, [
            g("span", po, F(w.label ? w.label : w), 1),
            i !== 0 ? (f(), v("span", mo)) : T("", !0),
            p.items[i + 1] ? (f(), v("span", vo)) : T("", !0)
          ], 10, fo))), 128))
        ])) : T("", !0),
        p.version == 2 ? (f(), v("div", go, [
          (f(!0), v(Q, null, le(p.items, (w, i) => (f(), v("div", {
            key: `step-button-${i}`,
            class: A(["flex items-center", [p.size, p.items[i + 1] ? "w-full" : "w-fit"]])
          }, [
            g("div", {
              class: A(["button-container", { "scale-[1.2]": i === t.value }])
            }, [
              i === t.value ? (f(), v("div", ho, h[0] || (h[0] = [
                g("div", { class: "bg-primary-interaction-default h-[52.5%]" }, null, -1),
                g("div", { class: "netrual-border-color h-[47%]" }, null, -1)
              ]))) : (f(), v("div", {
                key: 1,
                class: A(["background", [
                  a(i) || i <= l.value ? "bg-primary-interaction-default" : "netrual-border-color"
                ]])
              }, null, 2)),
              g("button", {
                class: A(["step-button-circle", {
                  "active-button": i === t.value,
                  "past-button": i <= l.value,
                  "skip-button": a(i)
                }]),
                "data-after-content": w.label ? w.label : w,
                onClick: (b) => d(w, i)
              }, [
                P(y, {
                  name: w.icon ? w.icon : "image"
                }, null, 8, ["name"])
              ], 10, bo)
            ], 2),
            p.items[i + 1] ? (f(), v("span", {
              key: 0,
              class: A(["right-line", [
                i < l.value ? "bg-primary-interaction-default" : "netrual-border-color"
              ]])
            }, null, 2)) : T("", !0)
          ], 2))), 128))
        ])) : T("", !0)
      ], 64);
    };
  }
}), Co = /* @__PURE__ */ G(yo, [["__scopeId", "data-v-fc10b7ac"]]), Bo = {
  install(n) {
    n.component("BStepper", Co);
  }
}, wo = { class: "flex font-bold text-sm gap-xs w-fit" }, ko = ["onClick"], Vo = {
  key: 0,
  class: "flex items-center gap-xxs"
}, $o = { key: 1 }, Mo = { key: 1 }, xo = { key: 1 }, Io = /* @__PURE__ */ Z({
  __name: "BTab",
  props: {
    modelValue: { default: void 0 },
    items: {},
    isIcon: { type: Boolean, default: !1 },
    notCard: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = S(e.modelValue);
    ge(() => {
      c.value || l(e.items[0]);
    }), ae(() => e.modelValue, (u) => c.value = u);
    const t = s;
    function l(u) {
      c.value = u, t("update:modelValue", u);
    }
    function o(u) {
      return de(u) ? u.value : u;
    }
    return (u, d) => {
      const a = O("BIcon");
      return f(), v("div", {
        class: A(["b-tab", {
          "bg-neutral-surface-highlight": !u.notCard
        }])
      }, [
        g("div", wo, [
          (f(!0), v(Q, null, le(u.items, (r, m) => (f(), v("button", {
            key: m,
            class: A(["default-tab", { "active-tab": o(c.value) == o(r) }]),
            onClick: (p) => l(r)
          }, [
            B(de)(r) ? (f(), v("div", Vo, [
              r.icon ? (f(), R(a, {
                key: 0,
                name: r.icon
              }, null, 8, ["name"])) : T("", !0),
              r.label ? (f(), v("h5", $o, F(r.label), 1)) : T("", !0)
            ])) : (f(), v("div", Mo, [
              u.isIcon ? (f(), R(a, {
                key: 0,
                name: r
              }, null, 8, ["name"])) : (f(), v("h5", xo, F(r), 1))
            ]))
          ], 10, ko))), 128))
        ])
      ], 2);
    };
  }
}), Ao = /* @__PURE__ */ G(Io, [["__scopeId", "data-v-4fc40f3a"]]), So = {
  install(n) {
    n.component("BTab", Ao);
  }
}, Do = { class: "b-table-style" }, Eo = { key: 0 }, Ho = ["disabled"], To = ["disabled"], Lo = ["onClick"], Po = { class: "truncate" }, zo = {
  key: 2,
  style: { flex: "1" },
  class: "bg-white pointer-events-none"
}, Oo = { key: 1 }, Wo = { key: 2 }, Uo = {
  key: 0,
  class: "skeleton-table-cell"
}, jo = { key: 1 }, Ro = { colspan: "100%" }, Fo = { key: 3 }, _o = { key: 4 }, No = {
  key: 0,
  class: "flex items-center justify-between mt-base text-neutral-foreground-low flex-wrap"
}, qo = { class: "flex items-center gap-xs" }, Zo = { class: "text-sm" }, Ko = { class: "text-sm" }, Xo = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    var U;
    const e = n, c = s, t = tt(), l = S(((U = e.options) == null ? void 0 : U.sortBy) || ""), o = S(e.items || []), u = S(b()), d = S(e.itemsPerPage || 10), a = S(e.page || 1), r = S([5, 10, 20, 50, 100]), m = S(!1), p = Y(() => {
      var H;
      return e.renderPaginationInBackEnd ? Math.ceil(e.numberOfItems / d.value) : Math.ceil(((H = e.items) == null ? void 0 : H.length) / d.value);
    }), h = Y(() => a.value === 1 ? 1 : (a.value - 1) * d.value + 1), y = Y(() => (a.value - 1) * d.value + o.value.length), w = Y(() => {
      var H;
      return e.renderPaginationInBackEnd ? e.numberOfItems : ((H = e.items) == null ? void 0 : H.length) || 0;
    }), i = Y(() => {
      let H = e.headers.length;
      return e.enableSelection && H++, e.enableAggregation && H++, t.actions && H++, H;
    });
    ge(() => {
      var H;
      e.renderPaginationInBackEnd || (l.value ? E(l.value, (H = e.options) == null ? void 0 : H.sortDesc) : z(e.page, e.itemsPerPage));
    }), ae(() => e.itemsPerPage, (H) => {
      V(H, !1);
    }), ae(() => e.page, (H) => {
      W(H, !1);
    }), ae(() => e.items, () => {
      o.value = e.items, e.renderPaginationInBackEnd || E(l.value, u.value[l.value], !1);
    }, { deep: !0, immediate: !0 });
    function b() {
      const H = {};
      return e.headers.forEach((M) => {
        var q;
        M.value == l.value ? H[M.value] = !!((q = e.options) != null && q.sortDesc) : H[M.value] = !1;
      }), H;
    }
    function W(H, M = !0) {
      a.value = H, M && c("update:page", H), z(H, d.value);
    }
    function V(H, M = !0) {
      d.value = H || 10, a.value = 1, M && c("update:itemsPerPage", H), c("update:page", 1), E(l.value, u.value[l.value]);
    }
    function E(H, M = !0, q = !0) {
      var C;
      e.renderPaginationInBackEnd ? q && c("sortBy", H, M) : (l.value = H, o.value = (C = e.items) == null ? void 0 : C.sort((I, k) => {
        const $ = I[H], j = k[H];
        if (typeof $ == "string" && typeof j == "string") {
          const ee = $.toLowerCase(), te = j.toLowerCase();
          return M ? ee.localeCompare(te) : te.localeCompare(ee);
        } else {
          if (typeof $ == "number" && typeof j == "number")
            return M ? $ - j : j - $;
          if ($ instanceof Date && j instanceof Date)
            return M ? $.getTime() - j.getTime() : j.getTime() - $.getTime();
          {
            const ee = String($), te = String(j), ue = ee.toLowerCase(), pe = te.toLowerCase();
            return M ? ue.localeCompare(pe) : pe.localeCompare(ue);
          }
        }
      })), z(a.value, d.value);
    }
    function z(H, M) {
      var q;
      if (e.renderPaginationInBackEnd)
        c("pageItems", H, M);
      else {
        const C = (H - 1) * M, I = C + M;
        o.value = (q = e.items) == null ? void 0 : q.slice(C, I);
      }
    }
    function N(H) {
      var M;
      c("selectAll", H), (M = e.items) == null || M.map((q) => q.selected = H), o.value = e.items;
    }
    return (H, M) => {
      const q = O("BCheckbox"), C = O("BIcon"), I = O("BSelect"), k = O("BPagination");
      return f(), v(Q, null, [
        g("div", {
          class: A(["b-table", { "header-fixed-table": H.isHeaderFixed, "no-shadow": H.noShadow }])
        }, [
          g("table", Do, [
            H.loading ? (f(), v("thead", Oo, [
              g("tr", null, [
                (f(!0), v(Q, null, le(i.value || 3, ($) => (f(), v("th", {
                  key: $,
                  class: "skeleton-table-cell"
                }, M[3] || (M[3] = [
                  g("div", { class: "skeleton-table-div" }, null, -1)
                ])))), 128))
              ])
            ])) : (f(), v("thead", Eo, [
              g("tr", null, [
                H.enableAggregation ? (f(), v("th", {
                  key: 0,
                  disabled: !o.value.length,
                  class: "first-th pointer-events-none",
                  style: { width: "2%" }
                }, null, 8, Ho)) : T("", !0),
                H.enableSelection ? (f(), v("th", {
                  key: 1,
                  disabled: !o.value.length,
                  class: A(["hover:bg-neutral-surface-default", { "first-th": !H.enableAggregation }]),
                  style: { width: "2%" }
                }, [
                  P(q, {
                    modelValue: m.value,
                    "onUpdate:modelValue": [
                      M[0] || (M[0] = ($) => m.value = $),
                      N
                    ]
                  }, null, 8, ["modelValue"])
                ], 10, To)) : T("", !0),
                (f(!0), v(Q, null, le(H.headers, ($, j) => (f(), v("th", {
                  key: j,
                  class: A(["cursor-pointer", {
                    "first-th": j === 0 && !H.enableSelection && !H.enableAggregation,
                    "last-th": !H.headers[j + 1] && !H.$slots.actions,
                    "pointer-events-none": !$.sortable
                  }]),
                  style: ie({ width: $.width ? $.width : "fit-content" }),
                  onClick: (ee) => E($.value, u.value[$.value] = !u.value[$.value])
                }, [
                  g("div", {
                    class: "flex w-full items-center gap-xs text-neutral-interaction-default",
                    style: ie({
                      "justify-content": $.align ? $.align : "flex-start"
                    })
                  }, [
                    g("p", Po, F($.label), 1),
                    $.sortable ? (f(), v("span", {
                      key: 0,
                      class: A(["icon", {
                        "rotate-180": u.value[$.value],
                        "icon-active": $.value == l.value
                      }])
                    }, [
                      P(C, { name: "arrow_upward" })
                    ], 2)) : T("", !0)
                  ], 4)
                ], 14, Lo))), 128)),
                H.$slots.actions ? (f(), v("th", zo)) : T("", !0)
              ])
            ])),
            H.loading || !o.value.length ? (f(), v("tbody", Wo, [
              H.loading ? (f(), v(Q, { key: 0 }, le(10, ($) => g("tr", { key: $ }, [
                (f(!0), v(Q, null, le(i.value || 3, (j) => (f(), v("td", {
                  key: j,
                  class: "skeleton-table-cell"
                }, M[4] || (M[4] = [
                  g("div", { class: "skeleton-table-div" }, null, -1)
                ])))), 128)),
                H.$slots.actions ? (f(), v("td", Uo, M[5] || (M[5] = [
                  g("div", { class: "skeleton-table-div" }, null, -1)
                ]))) : T("", !0)
              ])), 64)) : o.value.length ? T("", !0) : (f(), v("tr", jo, [
                g("td", Ro, [
                  x(H.$slots, "empty-state", {}, void 0, !0)
                ])
              ]))
            ])) : (f(), v("tbody", Fo, [
              (f(!0), v(Q, null, le(o.value, ($, j) => (f(), v(Q, { key: j }, [
                g("tr", {
                  class: A(["[&>*]:py-sm [&>*]:px-lg text-neutral-foreground-low", { "hover:bg-primary-surface-default": H.hasHover }])
                }, [
                  H.enableAggregation ? x(H.$slots, "aggregation", {
                    key: 0,
                    item: $,
                    index: j
                  }, void 0, !0) : T("", !0),
                  H.enableSelection ? x(H.$slots, "select", {
                    key: 1,
                    item: $,
                    index: j
                  }, void 0, !0) : T("", !0),
                  (f(!0), v(Q, null, le(H.headers, (ee) => x(H.$slots, ee.value, {
                    key: ee.value,
                    item: $,
                    index: j
                  }, void 0, !0)), 128)),
                  H.$slots.actions ? x(H.$slots, "actions", {
                    key: 2,
                    item: $,
                    index: j
                  }, void 0, !0) : T("", !0)
                ], 2),
                $.expanded ? x(H.$slots, "childs", {
                  key: 0,
                  item: $,
                  index: j
                }, void 0, !0) : T("", !0)
              ], 64))), 128))
            ])),
            H.$slots.footer ? (f(), v("tfoot", _o, [
              x(H.$slots, "footer", {}, void 0, !0)
            ])) : T("", !0)
          ])
        ], 2),
        H.hideFooter ? T("", !0) : (f(), v("footer", No, [
          g("div", qo, [
            g("p", Zo, [
              x(H.$slots, "items-per-page", {}, () => [
                M[6] || (M[6] = oe(" Items per page "))
              ], !0)
            ]),
            P(I, {
              modelValue: d.value,
              "onUpdate:modelValue": [
                M[1] || (M[1] = ($) => d.value = $),
                V
              ],
              items: r.value,
              absolute: ""
            }, {
              default: D(() => [
                oe(F(d.value), 1)
              ]),
              _: 1
            }, 8, ["modelValue", "items"])
          ]),
          P(k, {
            modelValue: a.value,
            "onUpdate:modelValue": [
              M[2] || (M[2] = ($) => a.value = $),
              W
            ],
            length: p.value
          }, null, 8, ["modelValue", "length"]),
          g("div", null, [
            g("p", Ko, [
              x(H.$slots, "showing-page", {
                min: h.value,
                max: y.value,
                total: w.value
              }, () => [
                oe(" Showing " + F(h.value) + "-" + F(y.value) + " of " + F(w.value), 1)
              ], !0)
            ])
          ])
        ]))
      ], 64);
    };
  }
}), Go = /* @__PURE__ */ G(Xo, [["__scopeId", "data-v-389cdfd1"]]), Jo = {
  install(n) {
    n.component("BTable", Go);
  }
}, Qo = {
  key: 0,
  class: "flex absolute w-full h-full"
}, Yo = { class: "relative z-[1]" }, en = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s;
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
    function o(a, r = 0) {
      var w, i, b;
      if (!e.modelValue || !e.isCompare && e.size == 1)
        return !1;
      let m = d(r);
      const p = a == null ? void 0 : a.toISOString().substr(0, 10);
      let h = (w = e.hovered) == null ? void 0 : w.toISOString().substr(0, 10), y = (i = m[0]) == null ? void 0 : i.toISOString().substr(0, 10);
      if (m.length > 1 && (h = (b = m[1]) == null ? void 0 : b.toISOString().substr(0, 10)), !(y != p && p != h)) {
        if (h == p && (h = y), !h || !p)
          return !1;
        if (p < h)
          return "is-bigger";
        if (p > h)
          return "is-smaller";
      }
    }
    function u(a) {
      return e.maxInit ? a.toISOString().substr(0, 10) <= e.maxInit.toISOString().substr(0, 10) : e.maxEnd ? a.toISOString().substr(0, 10) >= e.maxEnd.toISOString().substr(0, 10) : !1;
    }
    function d(a = 0) {
      if (!e.modelValue)
        return [];
      let r = e.modelValue;
      return e.isCompare && e.size > 1 && (r = e.modelValue[a]), r;
    }
    return (a, r) => a.day ? (f(), v("div", {
      key: 0,
      class: A(["day", [
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
        o(a.day),
        o(a.day, 1),
        a.position
      ]]),
      onMouseover: r[0] || (r[0] = (m) => c("update:hovered", a.day)),
      onMouseleave: r[1] || (r[1] = (m) => c("update:hovered", null)),
      onClick: r[2] || (r[2] = (m) => c("select", a.day))
    }, [
      (a.hovered == a.day && d(0).length > 1 || t(a.day, 1, !0)) && t(a.day, 0, !0) && (d(1).length < 2 || t(a.day, 1, !0)) && a.size > 1 && a.isCompare ? (f(), v("div", Qo, [
        r[3] || (r[3] = g("div", { class: "half-day bg-primary-interaction-default" }, null, -1)),
        g("div", {
          class: A([
            "half-day",
            t(a.day, 1, !0) ? "bg-primary-interaction-selected" : "bg-primary-surface-hover"
          ])
        }, null, 2)
      ])) : T("", !0),
      g("span", Yo, F(a.day.getDate()), 1)
    ], 34)) : T("", !0);
  }
}), tn = /* @__PURE__ */ G(en, [["__scopeId", "data-v-8374141a"]]), ln = /* @__PURE__ */ Z({
  __name: "DateDialog",
  props: {
    show: { type: Boolean, default: !1 },
    items: {},
    vertical: { type: Boolean, default: !1 },
    width: { default: "90%" },
    maxHeight: { default: "none" },
    noPadding: { type: Boolean, default: !1 }
  },
  setup(n) {
    return (s, e) => {
      const c = O("BCard");
      return f(), R(ve, { name: "appear" }, {
        default: D(() => [
          s.show ? (f(), R(c, {
            key: 0,
            class: A(["absolute z-[1] transition-transform top-[20%] left-[50%] -translate-x-1/2 flex items-center justify-center", {
              "overflow-auto": s.maxHeight != "none",
              "flex-wrap": !s.vertical,
              "flex-col": s.vertical,
              "p-sm gap-xs": !s.noPadding
            }]),
            style: ie({
              "max-height": s.maxHeight,
              width: s.width
            })
          }, {
            default: D(() => [
              (f(!0), v(Q, null, le(s.items, (t) => x(s.$slots, "item", { item: t }, void 0, !0)), 256))
            ]),
            _: 3
          }, 8, ["class", "style"])) : T("", !0)
        ]),
        _: 3
      });
    };
  }
}), Qe = /* @__PURE__ */ G(ln, [["__scopeId", "data-v-034dbe19"]]), an = { class: "b-calendar flex relative w-fit" }, on = { class: "relative flex items-center justify-center gap-xs mb-xs" }, nn = ["onClick"], sn = { key: 0 }, rn = { class: "[&>*]:p-xxs" }, un = ["onClick"], dn = ["onClick"], cn = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t, l] = se(e, "modelValue", c, e.isCompare && e.initialDates.length != 1 ? [[], []] : []), o = S(!0), u = S(!0), d = S(!1), a = S(!1), r = S(), m = S(0), p = Y(() => {
      const C = /* @__PURE__ */ new Date("2021-10-03T23:15:30"), I = [];
      for (let k = 0; k < 7; k++) {
        const $ = C.toLocaleDateString(e.lang, { weekday: "long" }), j = $.charAt(0).toUpperCase() + $.charAt(1).toLowerCase();
        I.push(j), C.setDate(C.getDate() + 1);
      }
      return I;
    }), h = Y(() => qt(e.lang)), y = Y(() => {
      const C = [], I = e.initialDates[e.initialDates.length - 1].date;
      for (let k = I.getFullYear() + 56; k >= I.getFullYear() - 62; k--)
        C.push(k);
      return C;
    }), w = S(e.initialDates.map((C) => i(C.date, C.value)));
    ae(() => e.lang, () => {
      b(0, !1);
    }), ae(() => e.initialDates, () => {
      w.value = e.initialDates.map((C) => i(C.date, C.value)), b();
    });
    function i(C, I = 1) {
      return {
        title: U(C),
        weeks: Je(C),
        value: I,
        date: C
      };
    }
    function b(C, I = !0) {
      w.value.forEach((k) => {
        C && k.date.setMonth(k.date.getMonth() + C), I && (k.weeks = Je(k.date)), k.title = U(k.date);
      });
    }
    function W(C) {
      let I = t.value;
      if (e.isCompare && w.value.length != 1) {
        (!I[0] || I[1].length > 1) && (I = [[], []]);
        let k = 0;
        I[0].length > 1 && (k = 1), I[k] = V(C, I[k]);
      } else
        I = V(C, I);
      l(I, {});
    }
    function V(C, I) {
      return I.length > 1 || !I.length || w.value.length == 1 && !e.isCompare ? (I = [], I[0] = C) : C < I[0] ? (I[1] = I[0], I[0] = C) : I[1] = C, I;
    }
    function E(C) {
      d.value = !1;
      const I = m.value, k = w.value[I].date, $ = w.value[I == w.value.length - 1 ? 0 : I + 1].date, j = w.value[I].value;
      k.setMonth(C), w.value.length > 1 && $.setMonth(k.getMonth() + j), b();
    }
    function z(C) {
      a.value = !1, d.value = !1;
      const I = m.value, k = w.value[I].date, $ = w.value[I == w.value.length - 1 ? 0 : I + 1].date;
      let j = w.value[I].value;
      !(k.getMonth() == 1 && j == 1) && !(k.getMonth() == 11 && j == -1) && (j = 0), k.setFullYear(C), w.value.length > 1 && $.setFullYear(C + j), b();
    }
    function N(C) {
      m.value = C, d.value && !a.value ? a.value = !0 : (d.value = !d.value, a.value = !1), b();
    }
    function U(C) {
      return a.value || d.value ? Ge(C.toLocaleDateString(e.lang, { year: "numeric" })) : Ge(C.toLocaleDateString(e.lang, { year: "numeric", month: "long" }));
    }
    function H(C, I) {
      const k = I.filter((j) => j), $ = k.findIndex((j) => j == C);
      return C == k[0] ? "start" : $ == k.length - 1 ? "end" : "middle";
    }
    function M(C) {
      u.value = C === -1, o.value = !1, b(C), setTimeout(() => {
        o.value = !0;
      }, 100);
    }
    function q() {
      setTimeout(() => {
        d.value = !1, a.value = !1, b();
      }, 100);
    }
    return (C, I) => {
      const k = O("BIcon");
      return f(), v("div", an, [
        (f(!0), v(Q, null, le(w.value, ($, j) => (f(), v("div", {
          key: j,
          class: "w-fit p-sm overflow-hidden"
        }, [
          g("header", on, [
            j == 0 ? (f(), v("div", {
              key: 0,
              class: "calendar-arrow left-0",
              onClick: I[0] || (I[0] = (ee) => M(-1))
            }, [
              P(k, { name: "chevron_left" })
            ])) : T("", !0),
            P(ve, {
              name: u.value ? "slide-fade-out" : "slide-fade"
            }, {
              default: D(() => [
                o.value ? (f(), v("h1", {
                  key: 0,
                  class: "text-base font-bold cursor-pointer text-neutral-foreground-high",
                  tabindex: "0",
                  onBlur: q,
                  onClick: (ee) => N(j)
                }, F($.title), 41, nn)) : T("", !0)
              ]),
              _: 2
            }, 1032, ["name"]),
            w.value.length - 1 == j ? (f(), v("div", {
              key: 1,
              class: "calendar-arrow right-0",
              onClick: I[1] || (I[1] = (ee) => M(1))
            }, [
              P(k, { name: "chevron_right" })
            ])) : T("", !0)
          ]),
          g("main", null, [
            P(ve, {
              name: u.value ? "slide-fade-out" : "slide-fade"
            }, {
              default: D(() => [
                o.value ? (f(), v("table", sn, [
                  g("tr", rn, [
                    (f(!0), v(Q, null, le(p.value, (ee, te) => (f(), v("th", { key: te }, F(ee), 1))), 128))
                  ]),
                  (f(!0), v(Q, null, le($.weeks.filter((ee) => ee.some((te) => te)), (ee, te) => (f(), v("tr", {
                    key: te,
                    class: "[&>*]:py-xxs [&>*]:px-none"
                  }, [
                    (f(!0), v(Q, null, le(ee, (ue, pe) => (f(), v("td", { key: pe }, [
                      P(tn, {
                        modelValue: B(t),
                        "onUpdate:modelValue": I[2] || (I[2] = (be) => ne(t) ? t.value = be : null),
                        hovered: r.value,
                        "onUpdate:hovered": I[3] || (I[3] = (be) => r.value = be),
                        day: ue,
                        "is-compare": C.isCompare,
                        size: w.value.length,
                        index: pe,
                        position: H(ue, ee),
                        "max-init": C.maxInit,
                        "max-end": C.maxEnd,
                        onSelect: W
                      }, null, 8, ["modelValue", "hovered", "day", "is-compare", "size", "index", "position", "max-init", "max-end"])
                    ]))), 128))
                  ]))), 128))
                ])) : T("", !0)
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
          item: D(({ item: $ }) => [
            g("div", {
              class: A([[
                $.value === w.value[m.value].date.getMonth() ? "bg-primary-interaction-default" : "bg-primary-surface-highlight"
              ], "flex items-center justify-center flex-1 cursor-pointer min-w-[30%] text-neutral-foreground-negative text-sm p-sm border-xxs rounded-base hover:bg-primary-interaction-hover"]),
              onClick: (j) => E($.value)
            }, F($.label), 11, un)
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
          item: D(({ item: $ }) => [
            g("div", {
              class: A(["flex items-center justify-center cursor-pointer w-full p-xxs text-sm hover:bg-primary-surface-default hover:text-primary-interaction-default", {
                "text-primary-interaction-default bg-primary-surface-default": $ === w.value[m.value].date.getFullYear()
              }]),
              onClick: (j) => z($)
            }, F($), 11, dn)
          ]),
          _: 1
        }, 8, ["show", "items"])
      ]);
    };
  }
}), gt = /* @__PURE__ */ G(cn, [["__scopeId", "data-v-c5113b8d"]]), fn = /* @__PURE__ */ Z({
  __name: "BDate",
  props: {
    modelValue: {},
    lang: { default: "en-US" },
    isPeriod: { type: Boolean, default: !1 },
    maxInit: {},
    maxEnd: {}
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = S([]), t = S([
      {
        date: /* @__PURE__ */ new Date()
      }
    ]);
    ge(o), ae(() => e.modelValue, o), ae(() => e.isPeriod, () => c.value = []);
    const l = s;
    function o() {
      Array.isArray(e.modelValue) ? c.value = e.modelValue : c.value[0] = e.modelValue;
    }
    function u(d) {
      e.isPeriod ? l("update:modelValue", c.value) : (c.value = d, l("update:modelValue", d[0]));
    }
    return (d, a) => (f(), R(gt, {
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
}), pn = {
  install(n) {
    n.component("BDate", fn);
  }
}, mn = { class: "colored font-bold whitespace-nowrap truncate" }, vn = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, t = Y(() => e.isAppendedIcon ? "" : e.icon), l = Y(() => e.closeable ? "close" : e.isAppendedIcon ? e.icon : "");
    return (o, u) => {
      const d = O("BSpinner"), a = O("BIcon");
      return f(), v("div", {
        class: A([[o.color, o.type, o.size], "b-tag"])
      }, [
        o.loading ? (f(), R(d, {
          key: 0,
          class: "colored"
        })) : (f(), v(Q, { key: 1 }, [
          t.value ? (f(), R(a, {
            key: 0,
            class: "colored",
            name: t.value
          }, null, 8, ["name"])) : T("", !0),
          g("p", mn, [
            x(o.$slots, "default", {}, () => [
              oe(F(o.text), 1)
            ], !0)
          ]),
          l.value ? (f(), R(a, {
            key: 1,
            class: A(["colored", { "cursor-pointer": o.closeable }]),
            name: l.value,
            onClick: u[0] || (u[0] = (r) => o.closeable && c("close"))
          }, null, 8, ["class", "name"])) : T("", !0)
        ], 64))
      ], 2);
    };
  }
}), gn = /* @__PURE__ */ G(vn, [["__scopeId", "data-v-da0aa505"]]), hn = {
  install(n) {
    n.component("BTag", gn);
  }
}, bn = { key: 0 }, yn = { class: "flex flex-col items-center divide-y-xxs divide-neutral-default overflow-x-hidden" }, Cn = { class: "flex flex-col w-full p-xs" }, Bn = { class: "flex items-center justify-end gap-xs w-full" }, wn = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    var p;
    const e = n;
    let c = S(!1), t = S(e.modelValue ? e.modelValue : []), l = S(e.options.length && ((p = e.options.find((h) => h.selected)) == null ? void 0 : p.value) || ""), o = S("");
    t.value.length && (o.value = d(t.value[0]) + (t.value[1] ? " - " + d(t.value[1]) : "")), ge(() => {
      if (l.value) {
        let h = e.options.find((y) => y.value == l.value);
        t.value = h.calculate();
      }
    });
    const u = s;
    ae(() => e.modelValue, (h) => t.value = h);
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
      let w = y[0], i = y[1];
      e.maxInit && e.maxInit.toISOString().substr(0, 10) >= w.toISOString().substr(0, 10) || e.maxEnd && e.maxEnd.toISOString().substr(0, 10) <= i.toISOString().substr(0, 10) || (o.value = "", t.value = [w, i], l.value = h.value, u("update:modelValue", t.value));
    }
    function r() {
      l.value = "", o.value = "", t.value = [], u("update:modelValue", t.value);
    }
    function m() {
      t.value ? o.value = d(t.value[0]) + (t.value[1] ? " - " + d(t.value[1]) : "") : o.value = "", l.value = "", u("update:modelValue", t.value);
    }
    return (h, y) => {
      const w = O("BIcon"), i = O("BDate"), b = O("BButton"), W = O("BSelectContainer");
      return f(), R(W, {
        modelValue: B(c),
        "onUpdate:modelValue": y[2] || (y[2] = (V) => ne(c) ? c.value = V : c = V),
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
        items: D(() => [
          g("div", yn, [
            P(i, {
              modelValue: B(t),
              "onUpdate:modelValue": [
                y[0] || (y[0] = (V) => ne(t) ? t.value = V : t = V),
                m
              ],
              lang: h.lang,
              "is-period": "",
              "max-init": h.maxInit,
              "max-end": h.maxEnd
            }, null, 8, ["modelValue", "lang", "max-init", "max-end"]),
            g("div", Cn, [
              (f(!0), v(Q, null, le(h.options, (V, E) => (f(), R(Ve, {
                key: E,
                class: "px-xs py-sm",
                selected: B(l) === V.value,
                disabled: V.disabled,
                onClick: (z) => a(V)
              }, {
                default: D(() => [
                  oe(F(V.label), 1)
                ]),
                _: 2
              }, 1032, ["selected", "disabled", "onClick"]))), 128))
            ])
          ])
        ]),
        actions: D(() => [
          g("div", Bn, [
            x(h.$slots, "actions", {}, () => [
              P(b, {
                size: "small",
                variant: "plain",
                onClick: r
              }, {
                default: D(() => [
                  x(h.$slots, "clear-text", {}, () => [
                    y[3] || (y[3] = oe(" Clear "))
                  ])
                ]),
                _: 3
              }),
              P(b, {
                size: "small",
                onClick: y[1] || (y[1] = (V) => u("apply", B(t)))
              }, {
                default: D(() => [
                  x(h.$slots, "apply-text", {}, () => [
                    y[4] || (y[4] = oe(" Apply "))
                  ])
                ]),
                _: 3
              })
            ])
          ])
        ]),
        default: D(() => {
          var V, E;
          return [
            g("div", {
              class: A(["flex items-center text-lg h-xl text-neutral-interaction-default", { "text-primary-interaction-default": B(c) }])
            }, [
              P(w, {
                name: "calendar_month",
                size: "lg"
              })
            ], 2),
            g("h5", {
              class: A(["whitespace-nowrap", { "font-bold": B(c) }])
            }, [
              B(o) || (V = h.options.find((z) => z.value == B(l))) != null && V.label ? (f(), v("span", bn, F(B(o) || ((E = h.options.find((z) => z.value == B(l))) == null ? void 0 : E.label)), 1)) : x(h.$slots, "default", { key: 1 })
            ], 2)
          ];
        }),
        _: 3
      }, 8, ["modelValue", "label-value", "required", "absolute", "disabled", "is-error", "error-message"]);
    };
  }
}), kn = {
  install(n) {
    n.component("BDateFilter", wn);
  }
}, Vn = { class: "tooltip-content" }, $n = /* @__PURE__ */ Z({
  __name: "BTooltip",
  props: {
    text: { default: "" },
    position: { default: "right" }
  },
  setup(n) {
    const s = n;
    let e = S(!1);
    const c = S(), t = S(), l = Y(() => {
      var d, a;
      return document.readyState === "complete" || document.readyState === "interactive" ? Number((((a = (d = c.value) == null ? void 0 : d.computedStyleMap().get("--spacing-xxs")) == null ? void 0 : a.toString()) || "4px").replace("px", "")) : 4;
    });
    async function o() {
      if (e.value = !0, await je(), !c.value || !t.value)
        return;
      const d = c.value.getBoundingClientRect(), a = window.innerWidth;
      u(d, t.value);
      const r = () => {
        e.value = !1, document.removeEventListener("wheel", r);
      };
      document.addEventListener("wheel", r);
      const m = t.value.getBoundingClientRect(), p = t.value.querySelector(".tooltip-content");
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
      onMouseenter: o,
      onMouseleave: a[0] || (a[0] = (r) => ne(e) ? e.value = !1 : e = !1)
    }, [
      (f(), R(De, { to: "body" }, [
        P(ve, { name: "opacity" }, {
          default: D(() => [
            B(e) ? (f(), v("div", {
              key: 0,
              class: A(["tooltip", [d.position]]),
              ref_key: "tooltip",
              ref: t
            }, [
              a[1] || (a[1] = g("div", { class: "tooltip-triangle" }, null, -1)),
              g("div", Vn, [
                x(d.$slots, "text", {}, () => [
                  oe(F(d.text), 1)
                ], !0)
              ])
            ], 2)) : T("", !0)
          ]),
          _: 3
        })
      ])),
      x(d.$slots, "default", {}, void 0, !0)
    ], 544));
  }
}), Mn = /* @__PURE__ */ G($n, [["__scopeId", "data-v-e5823e8f"]]), xn = {
  install(n) {
    n.component("BTooltip", Mn);
  }
}, In = /* @__PURE__ */ Z({
  __name: "BCollapse",
  props: {
    modelValue: { type: Boolean, default: !1 },
    duration: { default: 150 },
    noShadow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s, t = S(e.modelValue);
    let l = S(), o = S();
    const u = new ResizeObserver(r), d = new MutationObserver(r);
    ae(() => e.modelValue, () => {
      t.value = e.modelValue, r();
    });
    const a = Y(() => {
      try {
        const p = Math.floor(e.duration);
        return Math.min(Math.max(p, 150), 1e3);
      } catch {
        return 150;
      }
    });
    he(() => {
      l.value && u.observe(l.value, { box: "border-box" }), o.value && (u.observe(o.value, { box: "border-box" }), d.observe(o.value, {
        childList: !0,
        subtree: !0,
        attributes: !0,
        attributeFilter: ["data-max-height"]
      }));
    }), Se(r), we(() => {
      u && u.disconnect(), d && d.disconnect();
    });
    async function r() {
      o.value && (o.value.style.maxHeight = t.value ? `${o.value.scrollHeight}px` : "0px", o.value.style.maxHeight != o.value.dataset.maxHeight && (o.value.dataset.maxHeight = o.value.style.maxHeight));
    }
    function m() {
      t.value = !t.value, c("update:modelValue", t.value);
    }
    return (p, h) => {
      const y = O("BIcon"), w = O("BCard");
      return f(), R(w, {
        class: A(["b-collapse", { "no-shadow": p.noShadow }])
      }, {
        default: D(() => [
          g("div", {
            class: "w-full flex flex-col gap-sm",
            ref_key: "card",
            ref: l
          }, [
            g("div", {
              class: A(["flex items-center justify-end w-full text-base cursor-pointer", { "justify-between": p.$slots.header }]),
              onClick: m
            }, [
              x(p.$slots, "header", {}, void 0, !0),
              g("div", {
                class: A(["flex items-center w-fit h-fit transition-transform ease-in-out duration-300 text-2xl", { "rotate-180": t.value }])
              }, [
                P(y, {
                  name: "expand_more",
                  size: "xl",
                  class: "text-neutral-interaction-default font-bold"
                })
              ], 2)
            ], 2),
            P(ve, { name: "content" }, {
              default: D(() => [
                fe(g("div", {
                  ref_key: "content",
                  ref: o,
                  class: A(["content-wrapper top-full left-0 transition-[max-height]", { "b-hidden overflow-hidden": !t.value }]),
                  style: ie({ "transition-duration": `${a.value}ms` }),
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
}), An = /* @__PURE__ */ G(In, [["__scopeId", "data-v-a26c3f3a"]]), Sn = {
  install(n) {
    n.component("BCollapse", An);
  }
}, Dn = { class: "b-round-menu relative flex items-center h-fit w-fit overflow-visible" }, En = /* @__PURE__ */ Z({
  __name: "BRoundMenu",
  props: {
    items: {}
  },
  setup(n) {
    const s = n, e = S(!1), c = S([]);
    ge(() => {
      t();
    }), ae(s.items, () => {
      t();
    });
    function t() {
      for (let l = 0; l < s.items.length; l++) {
        const u = l * 360 / s.items.length * Math.PI / 180, d = s.items.length < 7 ? 60 : s.items.length < 10 ? 7 * s.items.length : 6 * s.items.length, a = d * Math.cos(u), r = d * Math.sin(u);
        c.value.push(`${a}px, ${r}px, 0`);
      }
    }
    return (l, o) => {
      const u = O("BRoundButton");
      return f(), v("div", Dn, [
        (f(!0), v(Q, null, le(l.items, (d, a) => (f(), v("div", {
          key: a,
          class: "item",
          style: ie(e.value ? {
            transform: `translate3d(${c.value[a]})`,
            "-webkit-transform": `translate3d(${c.value[a]})`
          } : {})
        }, [
          P(u, {
            background: d.background,
            icon: d.icon,
            text: d.text,
            onClick: (r) => d.action()
          }, null, 8, ["background", "icon", "text", "onClick"])
        ], 4))), 128)),
        g("div", {
          class: A(["item", { "z-[1]": !e.value }])
        }, [
          P(u, {
            color: e.value ? "neutral" : "success",
            onClick: o[0] || (o[0] = (d) => e.value = !e.value)
          }, null, 8, ["color"])
        ], 2)
      ]);
    };
  }
}), Hn = /* @__PURE__ */ G(En, [["__scopeId", "data-v-02df01c8"]]), Tn = {
  install(n) {
    n.component("BRoundMenu", Hn);
  }
};
class Ln {
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
const ce = new Ln(), Pn = Z({
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
      onCancel: (n) => Boolean
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
    openDialog(n) {
      Object.keys(n).forEach((s) => {
        this[s] = n[s];
      }), this.visible = !0;
    }
  },
  beforeUnmount() {
    ce.off("open-confirm", this.openDialog);
  }
}), zn = { class: "flex flex-col p-xl gap-sm" }, On = {
  key: 0,
  class: "font-bold text-lg text-neutral-foreground-high"
}, Wn = { class: "text-sm text-neutral-foreground-low" }, Un = { class: "flex justify-end w-full gap-xs mt-sm" };
function jn(n, s, e, c, t, l) {
  const o = O("BButton"), u = O("BDialog");
  return f(), R(u, {
    modelValue: n.visible,
    "onUpdate:modelValue": s[0] || (s[0] = (d) => n.visible = d),
    "no-outside-close": ""
  }, {
    default: D(() => [
      g("div", zn, [
        n.title ? (f(), v("h2", On, F(n.title), 1)) : T("", !0),
        g("p", Wn, F(n.message), 1),
        g("div", Un, [
          P(o, {
            variant: "plain",
            onClick: n.handleCancel
          }, {
            default: D(() => [
              oe(F(n.cancelText), 1)
            ]),
            _: 1
          }, 8, ["onClick"]),
          P(o, { onClick: n.handleConfirm }, {
            default: D(() => [
              oe(F(n.acceptText), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ])
      ])
    ]),
    _: 1
  }, 8, ["modelValue"]);
}
const Rn = /* @__PURE__ */ G(Pn, [["render", jn]]), Fn = {
  install(n) {
    n.component("BConfirm", Rn);
  }
}, _n = /* @__PURE__ */ Z({
  __name: "BToast",
  setup(n) {
    const s = S([]), e = S(["top", "bottom"].flatMap((l) => ["left", "right"].map((o) => ({
      vertical: l,
      horizontal: o
    }))));
    he(() => {
      ce.on("open-toast", c), ce.on("close-toast", t);
    }), we(() => {
      ce.off("open-toast", c), ce.off("close-toast", t);
    });
    function c(l) {
      const o = {
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
      s.value.push(o), l.timeout && setTimeout(() => {
        t(o.id);
      }, l.timeout);
    }
    function t(l) {
      if (!l)
        return;
      const o = s.value.find((u) => u.id === l);
      o && (o.visible = !1, setTimeout(() => {
        s.value = s.value.filter((u) => u.id !== l);
      }, 600));
    }
    return (l, o) => {
      const u = O("BButton");
      return f(!0), v(Q, null, le(e.value, (d) => (f(), v("div", {
        class: A(["toast-container", [d.vertical, d.horizontal]]),
        key: d.vertical + d.horizontal
      }, [
        (f(!0), v(Q, null, le(s.value.filter((a) => a[d.vertical] && a[d.horizontal]), (a) => (f(), R(ve, {
          key: a.id,
          name: a.right ? "slide-right" : "slide-left",
          appear: ""
        }, {
          default: D(() => [
            a.visible ? (f(), R(ct, {
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
                fn: D(() => [
                  P(u, {
                    class: "whitespace-nowrap",
                    size: "small",
                    variant: "secondary",
                    color: a.type,
                    onClick: a.action
                  }, {
                    default: D(() => [
                      oe(F(a.button), 1)
                    ]),
                    _: 2
                  }, 1032, ["color", "onClick"])
                ]),
                key: "0"
              } : void 0
            ]), 1032, ["title", "message", "type", "onClose"])) : T("", !0)
          ]),
          _: 2
        }, 1032, ["name"]))), 128))
      ], 2))), 128);
    };
  }
}), Nn = /* @__PURE__ */ G(_n, [["__scopeId", "data-v-c56b689b"]]), qn = {
  install(n) {
    n.component("BToast", Nn);
  }
}, Zn = /* @__PURE__ */ Z({
  __name: "BDateComparator",
  props: {
    modelValue: {},
    lang: { default: "en-US" },
    isCompare: { type: Boolean, default: !1 },
    maxInit: {},
    maxEnd: {}
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s, t = S(e.isCompare ? [[], []] : []), l = S([
      {
        date: new Date((/* @__PURE__ */ new Date()).setMonth((/* @__PURE__ */ new Date()).getMonth() - 1))
      },
      {
        date: /* @__PURE__ */ new Date(),
        value: -1
      }
    ]);
    ge(() => {
      o();
    }), ae(() => e.modelValue, () => o()), ae(() => e.isCompare, () => {
      u(), c("update:modelValue", t.value);
    });
    function o() {
      e.modelValue ? t.value = e.modelValue : u();
    }
    function u() {
      e.isCompare ? t.value = [[], []] : t.value = [];
    }
    function d(a) {
      Array.isArray(a) && (t.value = a, c("update:modelValue", t.value));
    }
    return (a, r) => (f(), R(gt, {
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
}), Kn = {
  install(n) {
    n.component("BDateComparator", Zn);
  }
}, Xn = { key: 0 }, Gn = { class: "flex" }, Jn = { class: "flex flex-col justify-between border-r-xxs border-neutral-default w-fit truncate rounded-l-sm overflow-hidden p-xs" }, Qn = { class: "flex flex-col" }, Yn = { class: "px-xs py-sm" }, es = { class: "flex flex-col items-end gap-base relative overflow-hidden" }, ts = { class: "flex items-center justify-end gap-xs w-full border-t-xxs border-neutral-default p-sm" }, ls = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    var w;
    const e = n;
    ge(() => {
      if (o.value) {
        let i = e.options.find((b) => b.value == o.value);
        p(i.calculate()), l.value = !1, c("update:isCompare", l.value);
      } else e.modelValue && (e.modelValue && Array.isArray(e.modelValue[0]) && !l.value ? (l.value = !0, c("update:isCompare", !0)) : l.value && (l.value = !1, c("update:isCompare", !1)), m(!0));
    }), ae(() => e.modelValue, (i) => {
      i && Array.isArray(i[0]) ? l.value || (l.value = !0, c("update:isCompare", !0)) : l.value && (l.value = !1, c("update:isCompare", !1)), u.value = i;
    }), ae(() => e.isCompare, () => {
      var i;
      l.value = e.isCompare, l.value ? o.value = "" : o.value = ((i = e.options.find((b) => b.selected)) == null ? void 0 : i.value) || "";
    }), ae(() => e.expanded, () => t.value = e.expanded);
    const c = s;
    let t = S(e.expanded), l = S(!1), o = S(e.options.length && !e.isCompare && ((w = e.options.find((i) => i.selected)) == null ? void 0 : w.value) || ""), u = S(e.modelValue ? e.modelValue : e.isCompare ? [[], []] : []), d = S("");
    function a(i, b) {
      return i.toLocaleDateString(e.lang, { year: "numeric", month: "short", day: "2-digit" });
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
      l.value = !1, c("update:isCompare", !1), o.value = i.value, d.value = "", setTimeout(() => {
        p(i.calculate());
      }, 100);
    }
    function y() {
      p(void 0), o.value = "", d.value = "";
    }
    return (i, b) => {
      const W = O("BIcon"), V = O("BCheckbox"), E = O("BDateComparator"), z = O("BButton"), N = O("BExpandableContainer");
      return f(), R(N, {
        modelValue: B(t),
        "onUpdate:modelValue": [
          b[5] || (b[5] = (U) => ne(t) ? t.value = U : t = U),
          b[6] || (b[6] = (U) => c("update:expanded", B(t)))
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
        content: D(() => [
          g("div", Gn, [
            g("div", Jn, [
              g("div", Qn, [
                (f(!0), v(Q, null, le(i.options, (U, H) => (f(), R(Ve, {
                  key: H,
                  class: "px-xs py-sm",
                  selected: B(o) == U.value,
                  disabled: U.disabled,
                  onClick: (M) => h(U)
                }, {
                  default: D(() => [
                    oe(F(U.label), 1)
                  ]),
                  _: 2
                }, 1032, ["selected", "disabled", "onClick"]))), 128))
              ]),
              g("div", Yn, [
                P(V, {
                  modelValue: B(l),
                  "onUpdate:modelValue": [
                    b[0] || (b[0] = (U) => ne(l) ? l.value = U : l = U),
                    b[1] || (b[1] = (U) => {
                      c("update:isCompare", U), ne(o) ? o.value = "" : o = "";
                    })
                  ]
                }, {
                  default: D(() => [
                    x(i.$slots, "compare-text", {}, () => [
                      b[7] || (b[7] = oe(" Compare two periods "))
                    ])
                  ]),
                  _: 3
                }, 8, ["modelValue"])
              ])
            ]),
            g("div", es, [
              P(E, {
                class: "px-sm pt-xxs",
                modelValue: B(u),
                "onUpdate:modelValue": [
                  b[2] || (b[2] = (U) => ne(u) ? u.value = U : u = U),
                  b[3] || (b[3] = (U) => m(!1))
                ],
                lang: i.lang,
                "is-compare": B(l),
                "max-init": i.maxInit,
                "max-end": i.maxEnd
              }, null, 8, ["modelValue", "lang", "is-compare", "max-init", "max-end"]),
              g("div", ts, [
                x(i.$slots, "actions", {}, () => [
                  P(z, {
                    size: "small",
                    variant: "plain",
                    onClick: y
                  }, {
                    default: D(() => [
                      x(i.$slots, "clear-text", {}, () => [
                        b[8] || (b[8] = oe(" Clear "))
                      ])
                    ]),
                    _: 3
                  }),
                  P(z, {
                    size: "small",
                    onClick: b[4] || (b[4] = (U) => c("apply", B(u)))
                  }, {
                    default: D(() => [
                      x(i.$slots, "apply-text", {}, () => [
                        b[9] || (b[9] = oe(" Apply "))
                      ])
                    ]),
                    _: 3
                  })
                ])
              ])
            ])
          ])
        ]),
        default: D(() => {
          var U, H;
          return [
            g("div", {
              class: A(["flex items-center text-lg h-xl text-neutral-interaction-default", {
                "text-primary-interaction-default": B(t),
                "text-danger-interaction-default": i.isError
              }])
            }, [
              P(W, {
                name: "calendar_month",
                size: "lg"
              })
            ], 2),
            g("h5", {
              class: A(["whitespace-nowrap", { "font-bold": B(t) }])
            }, [
              B(d) || (U = i.options.find((M) => M.value == B(o))) != null && U.label ? (f(), v("span", Xn, F(B(d) || ((H = i.options.find((M) => M.value == B(o))) == null ? void 0 : H.label)), 1)) : x(i.$slots, "default", { key: 1 })
            ], 2)
          ];
        }),
        _: 3
      }, 8, ["modelValue", "disabled", "required", "absolute", "label-value", "is-error", "error-message", "align-right"]);
    };
  }
}), as = {
  install(n) {
    n.component("BDateComparatorFilter", ls);
  }
}, os = { class: "bg-neutral-surface-default shadow-neutral-selected border-xxs border-neutral-default rounded-sm" }, ns = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t, l] = se(e, "modelValue", c, !1), o = S(), u = Y(() => e.disabled ? !1 : t.value), d = Y(() => u.value ? e.absolute : !0);
    function a(r, m) {
      l(r, m);
    }
    return (r, m) => (f(), R(mt, {
      modelValue: B(t),
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
      content: D(({ minWidth: p }) => [
        fe(g("div", {
          ref_key: "content",
          ref: o,
          class: A(["content-wrapper text-xs top-full transition-[max-height] w-fit duration-100", [
            {
              "absolute z-[80]": d.value,
              "max-h-fit": u.value,
              "left-0": !r.alignRight,
              "right-0": r.alignRight
            }
          ]]),
          style: ie({ "min-width": p })
        }, [
          g("div", {
            class: A(["content translate-y-[-100%] transition-translate duration-100 ease-out mt-xs", [{ "translate-y-[0]": u.value }]])
          }, [
            x(r.$slots, "card", {}, () => [
              g("div", os, [
                x(r.$slots, "content")
              ])
            ])
          ], 2)
        ], 6), [
          [Ce, u.value]
        ])
      ]),
      default: D(() => [
        x(r.$slots, "default")
      ]),
      _: 2
    }, [
      r.$slots.complement ? {
        name: "complement",
        fn: D(() => [
          x(r.$slots, "complement")
        ]),
        key: "0"
      } : void 0,
      r.$slots.label ? {
        name: "label",
        fn: D(() => [
          x(r.$slots, "label")
        ]),
        key: "1"
      } : void 0
    ]), 1032, ["modelValue", "label-value", "close-on-blur", "disabled", "is-error", "error-message", "info-message", "required", "max-height", "min-width", "secondary", "hide-arrow"]));
  }
}), ss = {
  install(n) {
    n.component("BExpandableContainer", ns);
  }
}, is = { class: "relative" }, rs = { class: "flex items-center gap-sm" }, us = { class: "flex flex-col gap-xs w-full" }, ds = { class: "flex items-center gap-sm" }, cs = { class: "flex items-center gap-xxs" }, fs = { class: "flex flex-col items-center overflow-hidden relative h-[1em] w-fit text-neutral-interaction-default" }, ps = { class: "flex flex-col" }, ms = /* @__PURE__ */ Z({
  __name: "BColorPicker",
  props: {
    modelValue: { default: void 0 },
    type: { default: "hexa" },
    noShadow: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:type"],
  setup(n, { emit: s }) {
    const e = n, c = s;
    he(() => {
      window.addEventListener("mousemove", U), window.addEventListener("mouseup", () => {
        t.value = !1, l.value = !1, o.value = !1;
      }), window.addEventListener("touchmove", C), window.addEventListener("touchend", () => {
        t.value = !1, l.value = !1, o.value = !1;
      }), ee(), setTimeout(() => {
        pe();
      }, 100);
    }), we(() => {
      window.removeEventListener("mousemove", U), window.removeEventListener("mouseup", () => {
        t.value = !1, l.value = !1, o.value = !1;
      }), window.removeEventListener("touchmove", C), window.removeEventListener("touchend", () => {
        t.value = !1, l.value = !1, o.value = !1;
      });
    }), ae(() => e.type, () => {
      const L = w.value.findIndex((K) => K == e.type);
      i.value = L !== -1 ? L : 0, ze(!1);
    }), ae(() => e.modelValue, () => {
      y.value != e.modelValue && (y.value = e.modelValue || y.value, pe());
    });
    const t = S(!1), l = S(!1), o = S(!1), u = S(), d = S(), a = S(), r = S(), m = S(e.modelValue || "rgba(255, 255, 255, 1)"), p = S("hsl(0, 100%, 50%)"), h = S(1), y = S(e.modelValue || V()), w = S(["hexa", "hsla", "hwb", "hsva", "rgba"]), i = S(w.value.findIndex((L) => L == e.type) !== -1 ? w.value.findIndex((L) => L == e.type) : 0), b = S(!1), W = S(!1);
    function V() {
      return e.type == "hexa" ? "#ffffffff" : e.type == "hsla" ? "0, 100%, 0%, 1" : e.type == "hwb" ? "0 100% 0% / 1" : e.type == "hsva" ? "0, 0%, 100%, 1" : "255, 255, 255, 1";
    }
    function E(L) {
      t.value = !0, k(L);
    }
    function z(L) {
      l.value = !0, I(L);
    }
    function N(L) {
      o.value = !0, $(L);
    }
    function U(L) {
      k(L), I(L), $(L);
    }
    function H(L) {
      N(L.touches[0]);
    }
    function M(L) {
      z(L.touches[0]);
    }
    function q(L) {
      E(L.touches[0]);
    }
    function C(L) {
      U(L.touches[0]);
    }
    function I(L) {
      var K;
      if (l.value && d.value) {
        const _ = d.value.closest(".slider"), X = (K = r.value) == null ? void 0 : K.getContext("2d");
        if (!_ || !r.value || !X)
          return;
        const J = te(L, d.value, _).left;
        d.value.style.left = J + "px";
        const re = _.clientWidth - 10, ye = J / re;
        h.value = ye, ee(p.value, ye), ue();
      }
    }
    function k(L) {
      var K, _;
      if (t.value && u.value) {
        const X = (K = u.value) == null ? void 0 : K.closest(".slider"), J = (_ = d.value) == null ? void 0 : _.closest(".slider");
        if (!X || !r.value || !J)
          return;
        const re = te(L, u.value, X).left;
        u.value.style.left = re + "px";
        const ye = j(X, re);
        p.value = ye, J.style.background = `linear-gradient(
            to right,
            #ffffff 0%,
            ${ye}
        )`, ee(ye, h.value), ue();
      }
    }
    function $(L) {
      var K;
      if (o.value && a.value) {
        const _ = (K = r.value) == null ? void 0 : K.getContext("2d");
        if (!r.value || !_)
          return;
        const X = te(L, a.value, r.value, !0);
        a.value.style.left = X.left + "px", a.value.style.top = X.top + "px";
        const J = _.getImageData(Math.min(r.value.clientWidth - 1, X.left + 5), Math.min(r.value.clientHeight - 1, X.top), 1, 1).data;
        m.value = `rgba(${J[0]}, ${J[1]}, ${J[2]}, ${J[3] / 255})`, y.value = Ie({
          r: J[0],
          g: J[1],
          b: J[2],
          a: J[3] / 255
        }), c("update:modelValue", y.value);
      }
    }
    function j(L, K) {
      const _ = document.createElement("canvas");
      _.width = L.clientWidth, _.height = L.clientHeight;
      const X = _.getContext("2d");
      if (!X)
        return "";
      const J = X.createLinearGradient(0, 0, _.width, 0);
      J.addColorStop(0, "hsl(0, 100%, 50%)"), J.addColorStop(1 / 6, "hsl(60, 100%, 50%)"), J.addColorStop(2 / 6, "hsl(120, 100%, 50%)"), J.addColorStop(3 / 6, "hsl(180, 100%, 50%)"), J.addColorStop(4 / 6, "hsl(240, 100%, 50%)"), J.addColorStop(5 / 6, "hsl(300, 100%, 50%)"), J.addColorStop(1, "hsl(360, 100%, 50%)"), X.fillStyle = J, X.fillRect(0, 0, _.width, _.height);
      const re = X.getImageData(K, 0, 1, 1).data;
      return `rgba(${re[0]}, ${re[1]}, ${re[2]}, ${re[3] / 255})`;
    }
    function ee(L = "hsl(0, 100%, 50%)", K = 1) {
      const _ = r.value, X = _ == null ? void 0 : _.getContext("2d");
      if (!X || !_)
        return;
      _.width = _.clientWidth, _.height = _.clientHeight, X.clearRect(0, 0, _.width, _.height), X.globalAlpha = K;
      const J = X.createLinearGradient(0, 0, _.width, 0);
      J.addColorStop(0, "#ffffff"), J.addColorStop(1, L);
      const re = X.createLinearGradient(0, 0, 0, _.height);
      re.addColorStop(0, "rgba(0, 0, 0, 0)"), re.addColorStop(1, "#000000"), X.fillStyle = J, X.fillRect(0, 0, _.width, _.height), X.fillStyle = re, X.fillRect(0, 0, _.width, _.height);
    }
    function te(L, K, _, X = !1) {
      const J = He(L, K, _, { top: !0, left: !0 }, { x: X ? 5 : 1, y: K.clientHeight }, { x: X ? -5 : 0 });
      return {
        left: J.x,
        top: J.y
      };
    }
    function ue() {
      var J;
      const L = (J = r.value) == null ? void 0 : J.getContext("2d");
      if (!L || !a.value || !r.value)
        return;
      const K = Number(a.value.style.left.replace("px", "")) + 5, _ = Number(a.value.style.top.replace("px", "")), X = L.getImageData(Math.min(r.value.clientWidth - 1, K), Math.min(r.value.clientHeight - 1, _), 1, 1).data;
      m.value = `rgba(${X[0]}, ${X[1]}, ${X[2]}, ${X[3] / 255})`, y.value = Ie({
        r: X[0],
        g: X[1],
        b: X[2],
        a: X[3] / 255
      }), c("update:modelValue", y.value);
    }
    function pe() {
      var qe, Ze;
      const L = (qe = u.value) == null ? void 0 : qe.closest(".slider"), K = (Ze = d.value) == null ? void 0 : Ze.closest(".slider");
      if (!u.value || !d.value || !a.value || !L || !K)
        return;
      const _ = be(), X = Math.min(1, _.h / 360), J = Math.min(L.clientWidth - 10, Math.max(0, (L.clientWidth - 10) * X)), re = K.clientWidth - 10, ye = Math.min(re, Math.max(0, re * _.a)), _e = ye / re;
      h.value = _e, u.value.style.left = J + "px", d.value.style.left = ye + "px";
      const Oe = j(L, J);
      p.value = Oe, K.style.background = `linear-gradient(
        to right,
        #ffffff 0%,
        ${Oe}
    )`, ee(Oe, _e);
      const Vt = jt(_.h, Number(_.s.toString().replace("%", "")), Number(_.v.toString().replace("%", "")), _.a);
      m.value = Ct(Vt);
      const Ne = Bt(_);
      a.value.style.left = Ne.x + "px", a.value.style.top = Ne.y + "px", c("update:modelValue", y.value);
    }
    function be() {
      var K;
      if (i.value == 0) {
        const _ = Wt(y.value);
        return Ae(_.r, _.g, _.b, isNaN(_.a) ? 1 : _.a);
      } else if (i.value == 1) {
        const _ = Me(y.value, "hlsa"), X = ot(_.h, _.s, _.l, _.a);
        return Ae(X.r, X.g, X.b, isNaN(X.a) ? 1 : X.a);
      } else if (i.value == 2) {
        const _ = Me(y.value, "hwb", " "), X = y.value.split("/"), J = Ut(_.h, _.w, _.b, Number((K = X[1]) == null ? void 0 : K.replace(")", "")));
        return Ae(J.r, J.g, J.b, isNaN(J.a) ? 1 : J.a);
      } else if (i.value == 3)
        return Me(y.value, "hsva");
      const L = Me(y.value);
      return Ae(L.r, L.g, L.b, isNaN(L.a) ? 1 : L.a);
    }
    function Ie(L) {
      if (i.value == 0)
        return Rt(L.r, L.g, L.b, L.a);
      if (i.value == 1) {
        const K = Ft(L.r, L.g, L.b, L.a);
        return `${K.h.toFixed(0)}, ${K.s}, ${K.l}, ${K.a < 1 ? K.a.toFixed(2) : K.a}`;
      } else if (i.value == 2) {
        const K = _t(L.r, L.g, L.b, L.a);
        return `${K.h} ${K.w} ${K.b} / ${K.a < 1 ? K.a.toFixed(2) : K.a}`;
      } else if (i.value == 3) {
        const K = Ae(L.r, L.g, L.b, L.a);
        return `${K.h}, ${K.s}, ${K.v}, ${K.a < 1 ? K.a.toFixed(2) : K.a}`;
      }
      return `${L.r}, ${L.g}, ${L.b}, ${L.a < 1 ? L.a.toFixed(2) : L.a}`;
    }
    function Me(L, K = "rgba", _ = ",") {
      if (!L)
        return "";
      const X = {}, J = Array.from(K), re = L.split(_);
      return Fe(J, re, X);
    }
    function yt(L, K = ",") {
      if (!L)
        return "";
      const _ = {}, X = L.split("(");
      if (X.length < 2)
        return;
      const J = Array.from(X[0]);
      X[1] = X[1].replace(")", "");
      const re = X[1].split(K);
      return Fe(J, re, _);
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
      if (!K)
        return;
      const _ = {
        h: L.h,
        s: typeof L.s == "string" ? Number(L.s.replace("%", "")) : L.s,
        v: typeof L.v == "string" ? Number(L.v.replace("%", "")) : L.v,
        a: L.a
      }, X = Math.max(-5, Math.min(_.s / 100 * (K.clientWidth - 5), K.clientWidth - 5)), J = Math.max(0, Math.min((1 - _.v / 100) * K.clientHeight, K.clientHeight));
      return {
        x: X,
        y: J
      };
    }
    function wt() {
      b.value = !0, setTimeout(() => {
        b.value = !1, i.value = i.value + 1 > w.value.length - 1 ? 0 : i.value + 1, ze();
      }, 600);
    }
    function kt() {
      W.value = !0, setTimeout(() => {
        i.value = i.value - 1 < 0 ? w.value.length - 1 : i.value - 1, W.value = !1, ze();
      }, 600);
    }
    function ze(L = !0) {
      y.value = Ie(yt(m.value)), c("update:modelValue", y.value), L && c("update:type", w.value[i.value]);
    }
    return (L, K) => {
      const _ = O("BInput"), X = O("BIcon"), J = O("BCard");
      return f(), R(J, {
        id: "b-color-picker",
        class: A(["p-base flex flex-col gap-sm", { "no-shadow": L.noShadow }])
      }, {
        default: D(() => [
          g("div", is, [
            g("span", {
              class: "cursor cursor-area",
              ref_key: "cursorColorArea",
              ref: a,
              onMousedown: N,
              onTouchstart: H
            }, null, 544),
            g("canvas", {
              class: "color-area",
              ref_key: "colorArea",
              ref: r,
              onMousedown: N,
              onTouchstart: H
            }, null, 544)
          ]),
          g("div", rs, [
            g("div", {
              class: "color-circle",
              style: ie({ background: m.value })
            }, null, 4),
            g("div", us, [
              g("div", {
                class: "slider",
                onMousedown: E,
                onTouchstart: q
              }, [
                g("span", {
                  ref_key: "cursorColorSlider",
                  ref: u,
                  class: "cursor cursor-slider",
                  onMousedown: E,
                  onTouchstart: q
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
          g("div", ds, [
            P(_, {
              modelValue: y.value,
              "onUpdate:modelValue": [
                K[0] || (K[0] = (re) => y.value = re),
                pe
              ],
              "text-align": "center",
              class: "flex-1"
            }, null, 8, ["modelValue"]),
            g("div", cs, [
              g("div", fs, [
                fe(g("p", { class: "font-bold slide-down" }, F(w.value[i.value + 1 > w.value.length - 1 ? 0 : i.value + 1].toUpperCase()), 513), [
                  [Ce, b.value]
                ]),
                g("p", {
                  class: A(["font-bold", { "slide-down": b.value, "slide-up": W.value }])
                }, F(w.value[i.value].toUpperCase()), 3),
                fe(g("p", { class: "font-bold slide-up" }, F(w.value[i.value - 1 < 0 ? w.value.length - 1 : i.value - 1].toUpperCase()), 513), [
                  [Ce, W.value]
                ])
              ]),
              g("div", ps, [
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
}), vs = /* @__PURE__ */ G(ms, [["__scopeId", "data-v-dad594aa"]]), gs = {
  install(n) {
    n.component("BColorPicker", vs);
  }
}, hs = ["aria-disabled"], bs = ["onMousedown", "onTouchstart"], ys = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    ke((C) => ({
      "04a45c89": C.color,
      dab12070: r.value
    }));
    const e = n, c = s;
    he(() => {
      window.addEventListener("mousemove", U), window.addEventListener("mouseup", y), window.addEventListener("touchmove", E), window.addEventListener("touhend", y), M();
    }), we(() => {
      window.removeEventListener("mousemove", U), window.removeEventListener("mouseup", y), window.removeEventListener("touchmove", E), window.removeEventListener("touhend", y);
    }), ae(() => e.modelValue, () => {
      t.value = w(), M();
      const C = i();
      (!e.modelValue || !e.modelValue.length || C.find((I, k) => e.modelValue && I != e.modelValue[k]) != null) && c("update:modelValue", C);
    }), ae(() => e.vertical, () => {
      t.value = w(), setTimeout(() => {
        M();
      }, 200);
    }), ae(() => e.size, () => {
      t.value = w(), setTimeout(() => {
        M();
      }, 100);
    }), ae(() => e.max, () => {
      c("update:modelValue", i());
    });
    const t = S(w()), l = S([!1]);
    e.isRange && l.value.push(!1);
    const o = S(), u = S(), d = S(), a = Y(() => {
      const C = Math.min(...t.value), I = Math.max(...t.value);
      return e.isRange ? `${h(C)} - ${h(I)}` : h(I);
    }), r = Y(() => e.neutralBackground || !e.color ? "" : Te(e.color));
    function m(C) {
      const I = C * 100 + "%", k = {};
      if (e.vertical ? k.bottom = I : k.left = I, e.disabled)
        return k;
      if (e.fillColors && e.fillColors.length) {
        const $ = Math.min(...t.value), j = Math.max(...t.value) - $, ee = C - $, te = j / e.fillColors.length, ue = e.fillColors.find((pe, be) => {
          const Ie = be * te, Me = (be + 1) * te;
          if (ee >= Ie && ee <= Me && e.fillColors)
            return e.fillColors[be];
        });
        k.background = ue;
      } else e.color && p(C) && (k.background = e.color);
      return k;
    }
    function p(C) {
      const I = Math.max(...t.value), k = Math.min(...t.value), $ = C;
      return $ <= I && $ >= k;
    }
    function h(C) {
      const I = e.max ? e.unit : e.unit || "%";
      return `${((e.max || 100) * C).toFixed(1) + I}`;
    }
    function y() {
      l.value = l.value.map(() => !1);
    }
    function w() {
      var I;
      const C = [0, 0];
      return (I = e.modelValue) == null || I.forEach((k, $) => {
        let j = k;
        e.max && (j = k / e.max), C[$] = b(Math.min(1, Math.max(0, j)));
      }), C;
    }
    function i() {
      const C = [0, 0];
      return t.value.forEach((I, k) => {
        let $ = I;
        e.max && ($ = I * e.max), C[k] = $;
      }), C;
    }
    function b(C) {
      return !e.steps || !e.steps.length ? C : e.steps.reduce((I, k) => Math.abs(k - C) < Math.abs(I - C) ? k : I);
    }
    function W(C) {
      z(C.touches[0]);
    }
    function V(C, I) {
      N(C.touches[0], I);
    }
    function E(C) {
      U(C.touches[0]);
    }
    function z(C) {
      if (!d.value || !o.value)
        return;
      let I = 0;
      const k = He(C, o.value[0], d.value);
      let $ = 1 / 0;
      if (e.vertical) {
        const j = k.y;
        o.value.forEach((ee, te) => {
          const ue = Number(ee.style.bottom.replace("px", "")), pe = Math.abs(ue - j);
          pe < $ && ($ = pe, I = te);
        });
      } else {
        const j = k.x;
        o.value.forEach((ee, te) => {
          const ue = ee.offsetLeft, pe = Math.abs(ue - j);
          pe < $ && ($ = pe, I = te);
        });
      }
      N(C, I);
    }
    function N(C, I) {
      o.value && (y(), l.value[I] = !0, H(C, o.value[I], l.value[I], I));
    }
    function U(C) {
      l.value.forEach((I, k) => {
        o.value && H(C, o.value[k], I, k);
      });
    }
    function H(C, I, k, $ = 0) {
      if (!k || !I || !d.value)
        return;
      let j = 0;
      const ee = He(C, I, d.value);
      if (e.vertical) {
        const te = ee.y, ue = d.value.clientHeight - I.clientHeight / 2;
        j = b(te / ue);
      } else {
        const te = ee.x, ue = d.value.clientWidth - I.clientWidth / 2;
        j = b(te / ue);
      }
      q(), t.value[$] = j, c("update:modelValue", i());
    }
    function M() {
      var C;
      (C = o.value) == null || C.forEach((I, k) => {
        if (!(!I || !d.value))
          if (e.vertical) {
            const $ = d.value.clientHeight, j = Math.min($, Math.max(0, $ * t.value[k])), ee = Number(I.style.borderWidth.replace("px", "")) / 2;
            I.style.bottom = j - I.clientHeight / 3 - ee + "px", I.style.left = "50%";
          } else {
            const $ = d.value.clientWidth, j = Math.min($, Math.max(0, $ * t.value[k])), ee = Number(I == null ? void 0 : I.computedStyleMap().get("--border-width-xs").toString().replace("px", "")) / 2;
            I.style.left = j - I.clientWidth / 3 - ee + "px", I.style.bottom = "50%";
          }
      }), q();
    }
    function q() {
      if (!(!u.value || !o.value || !d.value))
        if (e.vertical) {
          const C = d.value.clientHeight, I = o.value.map((te) => te.clientHeight / 2), $ = o.value.map((te) => te.offsetTop).map((te, ue) => C - te - I[ue]), j = e.isRange ? Math.min(...$) : 0, ee = Math.max(0, Math.max(...$));
          u.value.style.bottom = j + "px", u.value.style.height = Math.abs(ee - j) + "px", u.value.style.left = "50%", u.value.style.width = "100%";
        } else {
          const C = o.value.map(($) => $.offsetLeft + $.clientWidth / 3), I = e.isRange ? Math.min(...C) : 0, k = Math.max(...C);
          u.value.style.left = I + "px", u.value.style.width = Math.abs(k - I) + o.value[0].clientWidth / 6 + "px", u.value.style.bottom = "50%", u.value.style.height = "100%";
        }
    }
    return (C, I) => {
      const k = O("BTooltip");
      return f(), v("div", {
        ref_key: "slider",
        ref: d,
        class: A(["slider", [
          C.size,
          {
            disabled: C.disabled,
            vertical: C.vertical,
            horizontal: !C.vertical,
            "step-slider": C.steps && C.steps.length,
            "neutral-bg": C.neutralBackground,
            "is-custom-color": !!r.value
          }
        ]]),
        "aria-disabled": C.disabled,
        onMousedown: z,
        onTouchstart: W
      }, [
        (f(!0), v(Q, null, le(l.value, ($, j) => (f(), v("span", {
          ref_for: !0,
          ref_key: "cursors",
          ref: o,
          key: j,
          class: A(["cursor cursor-slider relative select-none", { grabbing: $, colored: C.color }]),
          onMousedown: (ee) => N(ee, j),
          onTouchstart: (ee) => V(ee, j)
        }, [
          C.showTooltip ? (f(), R(k, {
            key: 0,
            text: a.value,
            position: C.vertical ? "right" : "top",
            class: "cursor-tooltip select-none"
          }, null, 8, ["text", "position"])) : T("", !0)
        ], 42, bs))), 128)),
        g("div", {
          ref_key: "fillBar",
          ref: u,
          class: A(["fill-bar", {
            "flex-col-reverse": C.vertical,
            "have-fill-colors": C.fillColors && C.fillColors.length,
            colored: C.color && !(C.fillColors && C.fillColors.length) && !C.disabled
          }])
        }, [
          (f(!0), v(Q, null, le(C.fillColors, ($) => (f(), v("div", {
            class: "w-full h-full",
            style: ie({ background: $ })
          }, null, 4))), 256))
        ], 2),
        (f(!0), v(Q, null, le(C.steps, ($) => (f(), v("div", {
          key: $,
          class: A(["step", { active: p($) }]),
          style: ie(m($))
        }, null, 6))), 128))
      ], 42, hs);
    };
  }
}), ht = /* @__PURE__ */ G(ys, [["__scopeId", "data-v-826fbd80"]]), Cs = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s;
    ae(() => e.modelValue, () => {
      l([e.modelValue], !1);
    });
    const t = S([e.modelValue]);
    function l(o, u = !0) {
      t.value = o, u && c("update:modelValue", o[0]);
    }
    return (o, u) => (f(), R(ht, {
      class: "b-slider",
      modelValue: t.value,
      "onUpdate:modelValue": [
        u[0] || (u[0] = (d) => t.value = d),
        l
      ],
      size: o.size,
      "show-tooltip": o.showTooltip,
      disabled: o.disabled,
      vertical: o.vertical,
      max: o.max,
      unit: o.unit,
      color: o.color,
      "fill-colors": o.fillColors,
      steps: o.steps,
      "neutral-background": o.neutralBackground
    }, null, 8, ["modelValue", "size", "show-tooltip", "disabled", "vertical", "max", "unit", "color", "fill-colors", "steps", "neutral-background"]));
  }
}), Bs = {
  install(n) {
    n.component("BSlider", Cs);
  }
}, ws = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s;
    ae(() => e.modelValue, () => {
      l(e.modelValue || [0, 0], !1);
    });
    const t = S(e.modelValue || [0, 0]);
    function l(o, u = !0) {
      t.value = o, u && c("update:modelValue", o);
    }
    return (o, u) => (f(), R(ht, {
      class: "b-range-slider",
      modelValue: t.value,
      "onUpdate:modelValue": [
        u[0] || (u[0] = (d) => t.value = d),
        l
      ],
      size: o.size,
      "show-tooltip": o.showTooltip,
      disabled: o.disabled,
      vertical: o.vertical,
      max: o.max,
      unit: o.unit,
      color: o.color,
      "fill-colors": o.fillColors,
      steps: o.steps,
      "neutral-background": o.neutralBackground,
      "is-range": ""
    }, null, 8, ["modelValue", "size", "show-tooltip", "disabled", "vertical", "max", "unit", "color", "fill-colors", "steps", "neutral-background"]));
  }
}), ks = {
  install(n) {
    n.component("BRangeSlider", ws);
  }
}, Vs = { class: "progress-holder" }, $s = {
  key: 0,
  class: "progress-label"
}, Ms = {
  key: 0,
  class: "progress-label absolute"
}, xs = /* @__PURE__ */ Z({
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
  setup(n) {
    const s = n, e = Y(() => {
      let l = s.modelValue * 100;
      return s.steps ? l = s.modelValue / s.steps * 100 : s.animationType && (l = 50), Math.max(0, Math.min(100, l)) + "%";
    }), c = Y(() => s.neutralBackground || !s.color ? "" : Te(s.color)), t = Y(() => s.infoMessage ? "BTooltip" : "div");
    return (l, o) => {
      const u = O("BIcon");
      return l.steps ? (f(), v("div", {
        key: 1,
        class: A(["b-step-bar flex flex-row gap-xs", [l.size, l.type, { "neutral-bg": l.neutralBackground }]])
      }, [
        (f(!0), v(Q, null, le(s.steps, (d) => (f(), v("div", {
          key: d,
          class: A(["step", {
            filled: d <= l.modelValue,
            "neutral-bg": l.neutralBackground
          }]),
          style: ie({
            background: d <= l.modelValue ? l.color : c.value,
            width: 100 / s.steps + "%"
          })
        }, null, 6))), 128))
      ], 2)) : (f(), v("div", {
        key: 0,
        class: A(["b-progress-bar", [l.size, l.type, { "neutral-bg": l.neutralBackground }]]),
        style: ie({ background: c.value })
      }, [
        g("div", Vs, [
          g("div", {
            class: A(["progress-fill", [l.size, l.animationType]]),
            style: ie({ background: l.color, width: e.value })
          }, [
            l.displayPercentage == "bar" && !l.animationType ? (f(), v("label", $s, F(e.value), 1)) : T("", !0)
          ], 6),
          l.displayPercentage == "center" && !l.animationType ? (f(), v("label", Ms, F(e.value), 1)) : T("", !0)
        ]),
        !l.animationType && (l.icon || l.$slots["icon-slot"]) ? (f(), R(Le(t.value), {
          key: 0,
          class: "progress-icon",
          text: l.infoMessage,
          position: "bottom",
          style: ie({
            left: e.value,
            color: l.color
          })
        }, {
          default: D(() => [
            x(l.$slots, "icon-slot", {}, () => [
              P(u, { name: l.icon }, null, 8, ["name"])
            ], !0)
          ]),
          _: 3
        }, 8, ["text", "style"])) : T("", !0)
      ], 6));
    };
  }
}), Is = /* @__PURE__ */ G(xs, [["__scopeId", "data-v-d5b6df96"]]), As = {
  install(n) {
    n.component("BProgressBar", Is);
  }
}, Ss = {
  key: 0,
  class: "flex flex-row justify-between items-center mb-xxs"
}, Ds = {
  key: 0,
  class: "text-neutral-foreground-low font-bold text-xs"
}, Es = { class: "max-w-[100%]" }, Hs = { class: "whitespace-normal break-all" }, Ts = ["disabled", "placeholder"], Ls = { key: 1 }, Ps = { class: "p3 text-neutral-foreground-low" }, zs = {
  key: 0,
  class: "error-default"
}, Os = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s;
    he(() => {
      p();
    });
    let t = S([]);
    const l = S(!1), o = S(""), u = S(!1), d = S(""), a = S(null), r = {
      DUPLICATE: "Duplicated values are not allowed",
      INVALID_INPUT: "Please provide a valid input",
      MAX_VALUES: "Max number of values reached"
    };
    ae(() => e.modelValue, () => {
      p();
    });
    function m() {
      var q;
      const M = (q = a.value) == null ? void 0 : q.querySelector("#input-default");
      l.value = !0, M && M.focus();
    }
    function p() {
      t.value = e.modelValue || [];
    }
    function h(M) {
      if (!u.value && !Nt(M)) {
        if (b(M)) {
          const q = M.split(/,|\n/).map((C) => C.trim());
          q.length > 0 && q.forEach((C) => {
            y(C) || t.value.push(C), V();
          });
        } else
          y(M) || (t.value.push(M), V());
        c("update:modelValue", t.value);
      }
    }
    function y(M) {
      return u.value = !1, !e.allowDuplicate && i(M) ? (W(r.DUPLICATE), !0) : M.trim().length === 0 ? (W(r.INVALID_INPUT), !0) : e.max !== void 0 && e.max > 0 && t.value.length > e.max - 1 ? (W(r.MAX_VALUES), !0) : !1;
    }
    function w() {
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
    function W(M) {
      d.value = M, u.value = !0, w();
    }
    function V() {
      d.value = "", o.value = "", u.value = !1;
    }
    function E(M) {
      o.value.length || (t.value.splice(M, 1), c("update:modelValue", t.value));
    }
    function z(M) {
      u.value = !st(M);
    }
    function N(M) {
      u.value = !it(M);
    }
    function U(M) {
      u.value = !rt(M);
    }
    function H(M) {
      let q = M.target.value;
      q = nt(q, e.mask), e.mask == "email" ? z(q) : e.mask == "domain" ? N(q) : e.mask == "url" && U(q);
    }
    return (M, q) => {
      const C = O("BTag"), I = O("BTooltip");
      return f(), v("div", {
        ref_key: "tagInput",
        ref: a
      }, [
        M.labelValue ? (f(), v("div", Ss, [
          P(Re, {
            "label-value": M.labelValue,
            "info-message": M.infoMessage,
            required: M.required
          }, null, 8, ["label-value", "info-message", "required"]),
          M.max !== void 0 && M.max > 0 ? (f(), v("label", Ds, F(B(t).length) + " / " + F(M.max), 1)) : T("", !0)
        ])) : T("", !0),
        g("div", {
          class: A(["b-tag-input", {
            active: l.value && !M.disabled,
            error: u.value || M.isError,
            disabled: M.disabled
          }]),
          tabindex: "0",
          onFocus: m,
          onBlur: q[6] || (q[6] = (k) => l.value = !1)
        }, [
          (f(!0), v(Q, null, le(B(t), (k, $) => (f(), R(I, {
            key: k,
            position: "bottom",
            class: "max-w-full"
          }, {
            text: D(() => [
              g("div", Es, [
                g("span", Hs, F(k), 1)
              ])
            ]),
            default: D(() => [
              P(C, {
                color: "neutral",
                class: "tag-padding max-w-full",
                text: k,
                closeable: "",
                onClose: (j) => E($)
              }, null, 8, ["text", "onClose"])
            ]),
            _: 2
          }, 1024))), 128)),
          fe(g("textarea", {
            rows: "1",
            "onUpdate:modelValue": q[0] || (q[0] = (k) => o.value = k),
            id: "input-default",
            class: "input-default",
            disabled: M.disabled,
            placeholder: M.placeholder,
            onInput: H,
            onFocusout: q[1] || (q[1] = (k) => l.value = !1),
            onFocus: q[2] || (q[2] = (k) => l.value = !0),
            onKeydown: [
              q[3] || (q[3] = me((k) => {
                k.preventDefault(), h(o.value);
              }, ["enter"])),
              q[4] || (q[4] = me(We((k) => h(o.value), ["prevent"]), ["tab"])),
              q[5] || (q[5] = me((k) => E(B(t).length - 1), ["backspace"]))
            ]
          }, null, 40, Ts), [
            [$e, o.value]
          ])
        ], 34),
        M.$slots["info-text"] ? (f(), v("div", Ls, [
          g("label", Ps, [
            x(M.$slots, "info-text", {}, void 0, !0)
          ])
        ])) : T("", !0),
        g("div", null, [
          e.isError || u.value ? (f(), v("label", zs, F(e.errorMessage || d.value), 1)) : T("", !0)
        ])
      ], 512);
    };
  }
}), Ws = /* @__PURE__ */ G(Os, [["__scopeId", "data-v-010bae8e"]]), Us = {
  install(n) {
    n.component("BTagInput", Ws);
  }
}, js = "data:image/png;base64,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", Rs = { class: "left-side" }, Fs = { class: "w-full h-full overflow-hidden relative" }, _s = { class: "absolute left-[-25%] top-[50%] translate-y-[-50%] flex items-center gap-xl" }, Ns = {
  width: "100%",
  height: "100%",
  viewBox: "-126 -126 252 252",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, qs = { class: "right-content" }, Zs = /* @__PURE__ */ Z({
  __name: "BContentScreen",
  props: {
    progression: { default: 0 },
    steps: { default: 0 },
    isImgRight: { type: Boolean, default: !1 },
    isAnimatedLogo: { type: Boolean, default: !1 }
  },
  emits: ["update:progression"],
  setup(n, { emit: s }) {
    const e = n, c = S(e.progression);
    ae(() => e.progression, () => {
      c.value = e.progression;
    });
    const t = s;
    return (l, o) => {
      const u = O("BProgressBar"), d = O("BCard");
      return f(), v("div", {
        class: A(["w-full h-screen flex", { "flex-row-reverse": l.isImgRight }])
      }, [
        g("div", Rs, [
          x(l.$slots, "bg-logo", {}, () => [
            g("div", Fs, [
              g("div", _s, [
                (f(), v("svg", Ns, [
                  o[2] || (o[2] = g("circle", {
                    cx: "0",
                    cy: "0",
                    r: "8.5",
                    stroke: "#0057F4",
                    "stroke-width": "5",
                    fill: "#0057F4",
                    class: "circle-3"
                  }, null, -1)),
                  o[3] || (o[3] = g("circle", {
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
                    class: A({ "brius-animated-logo": l.isAnimatedLogo })
                  }, null, 2)
                ])),
                x(l.$slots, "bg-logo-text", {}, () => [
                  o[4] || (o[4] = Ue('<svg width="100%" height="100%" viewBox="0 0 219 62" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-647768d7><path d="M19.7199 30.9038C19.7199 34.8127 16.714 37.853 12.4199 37.853H0V12.6956H11.5611C15.4258 12.6956 18.4317 15.3015 18.4317 19.2104C18.4317 21.8164 17.1434 23.5537 15.4258 24.8567C18.0023 25.2576 19.7199 27.8635 19.7199 30.9038ZM4.29412 16.6045V23.1194H10.7353C12.4529 23.1194 14.1706 21.8164 14.1706 20.0791C14.1706 18.3418 12.8493 17.0388 10.7023 17.0388H4.29412V16.6045ZM15.4258 30.0351C15.4258 27.8635 13.7081 26.5605 11.9905 26.5605H4.29412V33.9441H11.5611C13.7081 33.9441 15.4258 32.2068 15.4258 30.0351Z" fill="#0057F4" data-v-647768d7></path><path d="M53.1484 33.5097V37.4187H51.4308C47.9955 37.4187 45.419 36.1157 44.1308 33.5097L40.2661 28.2978H37.6896V37.853H33.3955V12.6956H44.0978C48.8213 12.6956 52.653 16.1702 52.653 20.5134C52.653 24.4223 49.6471 27.4626 45.7824 28.3313L48.3589 31.8059C49.2177 33.1088 50.5059 33.5432 52.2236 33.5432H53.1484V33.5097ZM37.7227 24.4223H44.1638C46.3109 24.4223 48.0285 22.685 48.0285 20.5134C48.0285 18.3418 46.3109 16.6045 44.1638 16.6045H37.7227V24.4223Z" fill="#0057F4" data-v-647768d7></path><path d="M66.4268 12.6956H70.7209V37.8864H66.4268V12.6956Z" fill="#0057F4" data-v-647768d7></path><path d="M84 27.8635V12.6956H88.2941V27.8969C88.2941 31.3715 90.8706 33.9775 94.3059 33.9775C97.7412 33.9775 100.318 31.3715 100.318 27.8969V12.6956H104.612V28.3313C104.612 33.9775 99.8882 38.3207 93.9095 38.3207C88.6905 38.2873 84 33.9441 84 27.8635Z" fill="#0057F4" data-v-647768d7></path><path d="M118.253 30.5034H122.976C122.976 32.675 125.124 34.4123 127.7 34.4123C130.276 34.4123 131.994 33.1093 131.994 30.9377C131.994 28.7661 129.847 27.8974 126.412 27.0288C122.118 26.1601 118.682 23.9885 118.682 19.6452C118.682 15.302 122.547 12.2617 127.238 12.2617C132.39 12.2617 135.793 15.302 135.793 19.6452H131.135C131.135 17.4736 129.418 16.1706 126.841 16.1706C124.694 16.1706 122.547 17.4736 122.547 19.2109C122.547 21.3825 124.694 22.2512 127.7 23.1198C131.994 23.9885 135.826 26.1601 135.826 30.5034C135.826 35.2809 131.961 38.3212 126.841 38.3212C122.118 38.3212 118.253 34.8466 118.253 30.5034Z" fill="#0057F4" data-v-647768d7></path><path d="M0 61.32V50.8974H6.58006V52.4801H1.86067V55.3097H6.12868V56.8924H1.86067V61.32H0Z" fill="#5C5C5C" data-v-647768d7></path><path d="M18.8655 56.1087C18.8655 57.2317 18.6582 58.1935 18.2436 58.9942C17.8324 59.7915 17.2707 60.4022 16.5585 60.8263C15.8497 61.2504 15.0455 61.4625 14.1461 61.4625C13.2467 61.4625 12.4409 61.2504 11.7288 60.8263C11.0199 60.3989 10.4582 59.7865 10.0436 58.9892C9.63236 58.1885 9.42674 57.2283 9.42674 56.1087C9.42674 54.9857 9.63236 54.0255 10.0436 53.2282C10.4582 52.4275 11.0199 51.8151 11.7288 51.391C12.4409 50.9669 13.2467 50.7549 14.1461 50.7549C15.0455 50.7549 15.8497 50.9669 16.5585 51.391C17.2707 51.8151 17.8324 52.4275 18.2436 53.2282C18.6582 54.0255 18.8655 54.9857 18.8655 56.1087ZM16.9948 56.1087C16.9948 55.3182 16.8728 54.6515 16.6287 54.1086C16.388 53.5624 16.0536 53.1502 15.6256 52.872C15.1977 52.5904 14.7045 52.4496 14.1461 52.4496C13.5878 52.4496 13.0946 52.5904 12.6666 52.872C12.2386 53.1502 11.9026 53.5624 11.6585 54.1086C11.4178 54.6515 11.2974 55.3182 11.2974 56.1087C11.2974 56.8992 11.4178 57.5676 11.6585 58.1138C11.9026 58.6567 12.2386 59.0689 12.6666 59.3505C13.0946 59.6287 13.5878 59.7678 14.1461 59.7678C14.7045 59.7678 15.1977 59.6287 15.6256 59.3505C16.0536 59.0689 16.388 58.6567 16.6287 58.1138C16.8728 57.5676 16.9948 56.8992 16.9948 56.1087Z" fill="#5C5C5C" data-v-647768d7></path><path d="M22.0369 61.32V50.8974H25.8887C26.6777 50.8974 27.3398 51.0365 27.8747 51.3147C28.413 51.5929 28.8193 51.9831 29.0934 52.4852C29.371 52.9839 29.5097 53.5658 29.5097 54.2308C29.5097 54.8992 29.3693 55.4793 29.0884 55.9713C28.8109 56.4598 28.4013 56.8381 27.8597 57.1062C27.318 57.3708 26.6527 57.5031 25.8636 57.5031H23.1202V55.9357H25.6128C26.0742 55.9357 26.4521 55.8712 26.7463 55.7423C27.0405 55.6099 27.2578 55.4183 27.3983 55.1672C27.542 54.9127 27.6139 54.6006 27.6139 54.2308C27.6139 53.861 27.542 53.5454 27.3983 53.2842C27.2545 53.0196 27.0355 52.8194 26.7413 52.6837C26.447 52.5446 26.0676 52.475 25.6028 52.475H23.8976V61.32H22.0369ZM27.3431 56.5972L29.8859 61.32H27.8095L25.3119 56.5972H27.3431Z" fill="#5C5C5C" data-v-647768d7></path><path d="M37.5502 61.32V50.8974H41.402C42.191 50.8974 42.8531 51.0467 43.388 51.3452C43.9263 51.6438 44.3326 52.0543 44.6067 52.5768C44.8843 53.0959 45.023 53.6862 45.023 54.3478C45.023 55.0162 44.8843 55.6099 44.6067 56.129C44.3292 56.6481 43.9196 57.057 43.378 57.3555C42.8363 57.6507 42.1693 57.7983 41.3769 57.7983H38.8241V56.2461H41.1261C41.5875 56.2461 41.9654 56.1647 42.2596 56.0018C42.5538 55.839 42.7711 55.615 42.9116 55.33C43.0553 55.0451 43.1272 54.7176 43.1272 54.3478C43.1272 53.978 43.0553 53.6523 42.9116 53.3707C42.7711 53.0891 42.5521 52.8703 42.2546 52.7142C41.9603 52.5548 41.5808 52.475 41.1161 52.475H39.4109V61.32H37.5502Z" fill="#5C5C5C" data-v-647768d7></path><path d="M54.5262 50.8974H56.3869V57.7067C56.3869 58.4531 56.213 59.1096 55.8653 59.6762C55.5209 60.2428 55.0361 60.6855 54.4109 61.0045C53.7856 61.32 53.0551 61.4778 52.2192 61.4778C51.38 61.4778 50.6477 61.32 50.0225 61.0045C49.3973 60.6855 48.9124 60.2428 48.5681 59.6762C48.2237 59.1096 48.0515 58.4531 48.0515 57.7067V50.8974H49.9122V57.5489C49.9122 57.9832 50.0058 58.37 50.193 58.7092C50.3836 59.0485 50.6511 59.3149 50.9955 59.5082C51.3398 59.6982 51.7478 59.7932 52.2192 59.7932C52.6906 59.7932 53.0985 59.6982 53.4429 59.5082C53.7906 59.3149 54.0581 59.0485 54.2454 58.7092C54.4326 58.37 54.5262 57.9832 54.5262 57.5489V50.8974Z" fill="#5C5C5C" data-v-647768d7></path><path d="M59.8216 61.32V50.8974H63.7536C64.4959 50.8974 65.1128 51.0161 65.6043 51.2536C66.0991 51.4877 66.4686 51.8083 66.7126 52.2155C66.96 52.6226 67.0838 53.084 67.0838 53.5997C67.0838 54.0238 67.0035 54.3869 66.843 54.6888C66.6825 54.9874 66.4669 55.23 66.1961 55.4166C65.9252 55.6032 65.6226 55.7372 65.2883 55.8186V55.9204C65.6527 55.9407 66.0021 56.0544 66.3365 56.2614C66.6742 56.4649 66.95 56.7533 67.164 57.1265C67.378 57.4997 67.485 57.951 67.485 58.4802C67.485 59.0197 67.3563 59.5049 67.0988 59.9357C66.8414 60.3632 66.4535 60.7008 65.9353 60.9485C65.417 61.1962 64.765 61.32 63.9793 61.32H59.8216ZM61.6823 59.7424H63.6834C64.3588 59.7424 64.8453 59.6117 65.1428 59.3505C65.4438 59.0858 65.5942 58.7466 65.5942 58.3327C65.5942 58.0239 65.519 57.7457 65.3685 57.498C65.2181 57.247 65.0041 57.0502 64.7266 56.9077C64.4491 56.7618 64.1181 56.6889 63.7336 56.6889H61.6823V59.7424ZM61.6823 55.33H63.5229C63.8439 55.33 64.1331 55.2707 64.3906 55.1519C64.648 55.0298 64.8503 54.8584 64.9974 54.6379C65.1479 54.414 65.2231 54.1494 65.2231 53.844C65.2231 53.4403 65.0827 53.1078 64.8018 52.8465C64.5243 52.5853 64.1114 52.4547 63.563 52.4547H61.6823V55.33Z" fill="#5C5C5C" data-v-647768d7></path><path d="M70.516 61.32V50.8974H72.3766V59.7373H76.9004V61.32H70.516Z" fill="#5C5C5C" data-v-647768d7></path><path d="M81.7883 50.8974V61.32H79.9277V50.8974H81.7883Z" fill="#5C5C5C" data-v-647768d7></path><path d="M90.7975 53.7626C90.7507 53.3181 90.5535 52.9721 90.2057 52.7244C89.8614 52.4767 89.4133 52.3529 88.8617 52.3529C88.4738 52.3529 88.1411 52.4123 87.8636 52.531C87.5861 52.6497 87.3738 52.8109 87.2267 53.0145C87.0796 53.218 87.0043 53.4504 87.001 53.7117C87.001 53.9288 87.0495 54.1171 87.1464 54.2766C87.2467 54.436 87.3821 54.5718 87.5527 54.6837C87.7232 54.7923 87.9121 54.8839 88.1194 54.9585C88.3267 55.0332 88.5357 55.0959 88.7463 55.1468L89.7092 55.3911C90.0971 55.4827 90.4699 55.6066 90.8276 55.7626C91.1887 55.9187 91.5114 56.1155 91.7956 56.353C92.0831 56.5905 92.3105 56.8772 92.4777 57.213C92.6448 57.5489 92.7284 57.9425 92.7284 58.3937C92.7284 59.0044 92.5746 59.5422 92.267 60.007C91.9594 60.4684 91.5147 60.8297 90.933 61.091C90.3545 61.3488 89.6541 61.4778 88.8316 61.4778C88.0325 61.4778 87.3387 61.3522 86.7502 61.1012C86.1651 60.8501 85.707 60.4837 85.376 60.0019C85.0484 59.5201 84.8712 58.9332 84.8444 58.241H86.675C86.7017 58.6041 86.8121 58.906 87.006 59.1469C87.1999 59.3878 87.4524 59.5676 87.7633 59.6864C88.0776 59.8051 88.4287 59.8645 88.8165 59.8645C89.2211 59.8645 89.5755 59.8034 89.8798 59.6813C90.1874 59.5557 90.4281 59.3827 90.602 59.1622C90.7758 58.9383 90.8644 58.677 90.8678 58.3785C90.8644 58.107 90.7859 57.8831 90.632 57.7067C90.4782 57.5269 90.2626 57.3776 89.9851 57.2588C89.7109 57.1367 89.3899 57.0281 89.0221 56.9331L87.8536 56.6278C87.0077 56.4073 86.339 56.0731 85.8475 55.6252C85.3593 55.174 85.1152 54.5752 85.1152 53.8287C85.1152 53.2146 85.2791 52.6769 85.6067 52.2155C85.9377 51.7541 86.3874 51.3961 86.9558 51.1417C87.5242 50.8838 88.1679 50.7549 88.8867 50.7549C89.6156 50.7549 90.2542 50.8838 90.8026 51.1417C91.3542 51.3961 91.7872 51.7507 92.1015 52.2053C92.4158 52.6565 92.578 53.1756 92.588 53.7626H90.7975Z" fill="#5C5C5C" data-v-647768d7></path><path d="M95.7996 61.32V50.8974H97.6602V55.3097H102.42V50.8974H104.285V61.32H102.42V56.8924H97.6602V61.32H95.7996Z" fill="#5C5C5C" data-v-647768d7></path><path d="M107.721 61.32V50.8974H114.402V52.4801H109.582V55.3097H114.056V56.8924H109.582V59.7373H114.442V61.32H107.721Z" fill="#5C5C5C" data-v-647768d7></path><path d="M117.712 61.32V50.8974H121.564C122.353 50.8974 123.015 51.0365 123.55 51.3147C124.088 51.5929 124.495 51.9831 124.769 52.4852C125.046 52.9839 125.185 53.5658 125.185 54.2308C125.185 54.8992 125.045 55.4793 124.764 55.9713C124.486 56.4598 124.077 56.8381 123.535 57.1062C122.993 57.3708 122.328 57.5031 121.539 57.5031H118.796V55.9357H121.288C121.75 55.9357 122.127 55.8712 122.422 55.7423C122.716 55.6099 122.933 55.4183 123.074 55.1672C123.217 54.9127 123.289 54.6006 123.289 54.2308C123.289 53.861 123.217 53.5454 123.074 53.2842C122.93 53.0196 122.711 52.8194 122.417 52.6837C122.122 52.5446 121.743 52.475 121.278 52.475H119.573V61.32H117.712ZM123.019 56.5972L125.561 61.32H123.485L120.987 56.5972H123.019Z" fill="#5C5C5C" data-v-647768d7></path><path d="M133.892 53.7626C133.845 53.3181 133.648 52.9721 133.3 52.7244C132.956 52.4767 132.508 52.3529 131.956 52.3529C131.568 52.3529 131.236 52.4123 130.958 52.531C130.681 52.6497 130.468 52.8109 130.321 53.0145C130.174 53.218 130.099 53.4504 130.096 53.7117C130.096 53.9288 130.144 54.1171 130.241 54.2766C130.341 54.436 130.477 54.5718 130.647 54.6837C130.818 54.7923 131.007 54.8839 131.214 54.9585C131.421 55.0332 131.63 55.0959 131.841 55.1468L132.804 55.3911C133.192 55.4827 133.565 55.6066 133.922 55.7626C134.283 55.9187 134.606 56.1155 134.89 56.353C135.178 56.5905 135.405 56.8772 135.572 57.213C135.739 57.5489 135.823 57.9425 135.823 58.3937C135.823 59.0044 135.669 59.5422 135.362 60.007C135.054 60.4684 134.609 60.8297 134.028 61.091C133.449 61.3488 132.749 61.4778 131.926 61.4778C131.127 61.4778 130.433 61.3522 129.845 61.1012C129.26 60.8501 128.802 60.4837 128.471 60.0019C128.143 59.5201 127.966 58.9332 127.939 58.241H129.77C129.796 58.6041 129.907 58.906 130.101 59.1469C130.295 59.3878 130.547 59.5676 130.858 59.6864C131.172 59.8051 131.523 59.8645 131.911 59.8645C132.316 59.8645 132.67 59.8034 132.974 59.6813C133.282 59.5557 133.523 59.3827 133.697 59.1622C133.87 58.9383 133.959 58.677 133.962 58.3785C133.959 58.107 133.88 57.8831 133.727 57.7067C133.573 57.5269 133.357 57.3776 133.08 57.2588C132.806 57.1367 132.485 57.0281 132.117 56.9331L130.948 56.6278C130.102 56.4073 129.434 56.0731 128.942 55.6252C128.454 55.174 128.21 54.5752 128.21 53.8287C128.21 53.2146 128.374 52.6769 128.701 52.2155C129.032 51.7541 129.482 51.3961 130.05 51.1417C130.619 50.8838 131.262 50.7549 131.981 50.7549C132.71 50.7549 133.349 50.8838 133.897 51.1417C134.449 51.3961 134.882 51.7507 135.196 52.2053C135.51 52.6565 135.673 53.1756 135.683 53.7626H133.892Z" fill="#5C5C5C" data-v-647768d7></path></svg>', 1))
                ], !0)
              ])
            ])
          ], !0)
        ]),
        g("div", {
          class: A(["right-side", [l.isImgRight ? "mr-[28%]" : "ml-[28%]"]])
        }, [
          x(l.$slots, "default", {}, () => [
            g("div", qs, [
              x(l.$slots, "logo", {}, () => [
                o[5] || (o[5] = g("img", {
                  src: js,
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
                    o[0] || (o[0] = (a) => c.value = a),
                    o[1] || (o[1] = (a) => t("update:progression", a))
                  ],
                  steps: l.steps
                }, null, 8, ["modelValue", "steps"])
              ], !0),
              x(l.$slots, "card", {}, () => [
                P(d, { class: "w-full" }, {
                  default: D(() => [
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
}), Ks = /* @__PURE__ */ G(Zs, [["__scopeId", "data-v-647768d7"]]), Xs = {
  install(n) {
    n.component("BContentScreen", Ks);
  }
}, Gs = ["onClick"], Js = { class: "data-list" }, Qs = /* @__PURE__ */ Z({
  __name: "BHistory",
  props: {
    modelValue: { default: void 0 },
    items: {},
    position: { default: "right" },
    type: { default: "primary" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s, [t, l] = se(e, "modelValue", c, null);
    return (o, u) => {
      const d = O("BIcon");
      return f(), v("div", {
        class: A(["b-history", { flex: o.position === "top" || o.position === "bottom" }])
      }, [
        (f(!0), v(Q, null, le(o.items, (a, r) => (f(), v("div", {
          key: r,
          class: A(["item", [
            o.position,
            a.type ? a.type : o.type,
            {
              "last-item": !o.items[r + 1],
              "first-item": r == 0,
              active: r == 0 && !B(t) && !o.disabled || a === B(t),
              disabled: o.disabled
            }
          ]]),
          onClick: (m) => !o.disabled && B(l)(a, { index: r })
        }, [
          g("div", {
            class: A(["circle", {
              "circle-icon": !!a.icon && !a.isIconRound,
              "round-icon": !!a.icon && a.isIconRound
            }])
          }, [
            a.icon ? (f(), R(d, {
              key: 0,
              name: a.icon,
              filled: !a.unfilled
            }, null, 8, ["name", "filled"])) : T("", !0)
          ], 2),
          g("div", {
            class: A(["custom-border", { "have-icon": !!a.icon && !a.isIconRound }])
          }, null, 2),
          g("div", Js, [
            x(o.$slots, "item", {
              item: a,
              index: r,
              active: r == 0 && !B(t) && !o.disabled || a === B(t)
            }, void 0, !0)
          ])
        ], 10, Gs))), 128))
      ], 2);
    };
  }
}), Ys = /* @__PURE__ */ G(Qs, [["__scopeId", "data-v-c2081d46"]]), ei = {
  install(n) {
    n.component("BHistory", Ys);
  }
}, ti = {
  key: 0,
  class: "relative"
}, li = { class: "pointer-events-none w-0 h-0" }, ai = ["disabled"], oi = {
  key: 1,
  class: "flex flex-wrap gap-xxs my-xs max-w-[40em]"
}, ni = { class: "tag-default py-xxs" }, si = { class: "font-bold text-xs truncate" }, ii = {
  key: 0,
  class: "text-xs italic text-neutral-foreground-low flex justify-center"
}, ri = {
  key: 1,
  class: "text-xs italic text-neutral-foreground-low flex justify-center"
}, ui = { class: "flex justify-center w-full" }, di = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s;
    ae(() => e.expanded, () => {
      a.value = e.expanded;
    });
    const t = Y(() => r.value ? u.value.filter((V) => {
      var E, z, N;
      if (de(V)) {
        if ((z = (E = V[e.labelKey]) == null ? void 0 : E.toLowerCase()) != null && z.includes(r.value.toLowerCase()))
          return V;
      } else if ((N = V == null ? void 0 : V.toLowerCase()) != null && N.includes(r.value.toLowerCase()))
        return V;
    }) : u.value), [l, o] = se(e, "modelValue", c, []);
    l.value = l.value || [];
    const [u, d] = se(e, "items", c, []), a = S(e.expanded), r = S("");
    function m(V) {
      if (!(e.isError || !V)) {
        if (w(u.value, V)) {
          r.value = "";
          return;
        }
        u.value.push(V), d(u.value, { index: u.value.length - 1 }), r.value = "";
      }
    }
    function p(V) {
      l.value.splice(V, 1), o(l.value, { index: V });
    }
    function h(V) {
      function E(z) {
        o([...l.value, u.value[z]], { index: z }), V.preventDefault();
      }
      switch (V.key) {
        case "Home":
        case "ArrowDown":
          E(0);
          break;
        case "End":
        case "ArrowUp":
          {
            const z = u.value.length - 1;
            E(z);
          }
          break;
      }
    }
    function y(V, E) {
      e.disabled || w(l.value, V) || (o([...l.value, V], E), a.value = !1, c("update:expanded", !1, { source: "value-selected" }));
    }
    function w(V, E) {
      return de(E) ? V.find((z) => z[e.labelKey] === E[e.labelKey]) : V == null ? void 0 : V.includes(E);
    }
    function i(V) {
      V.target && setTimeout(() => {
        var E, z;
        (z = (E = V.target) == null ? void 0 : E.classList) != null && z.contains("close-icon") || (a.value = !0, c("update:expanded", !0, { source: "click" }));
      }, 1);
    }
    function b(V, E) {
      a.value = V, c("update:expanded", V, E);
    }
    function W(V, E) {
      (E == null ? void 0 : E.source) == "click" ? b(!0, E) : b(V, E);
    }
    return (V, E) => {
      const z = O("BIcon"), N = O("BTag"), U = O("BRoundButton"), H = O("BSelectContainer");
      return f(), R(H, {
        modelValue: a.value,
        "onUpdate:modelValue": [
          E[6] || (E[6] = (M) => a.value = M),
          W
        ],
        required: V.required,
        "label-value": V.labelValue,
        disabled: V.disabled,
        absolute: V.absolute,
        "is-error": V.isError,
        "error-message": V.errorMessage,
        "info-message": V.infoMessage,
        "max-height": "none",
        "min-width": "12em",
        onKeyup: h,
        onClick: E[7] || (E[7] = (M) => b(!0, { source: "click" }))
      }, {
        items: D(() => [
          !t.value.length && r.value.length ? (f(), v("div", ii, [
            x(V.$slots, "no-items-found", {}, () => [
              E[10] || (E[10] = oe(" No result found. "))
            ], !0)
          ])) : B(u).length ? (f(!0), v(Q, { key: 2 }, le(t.value, (M, q) => (f(), R(Ve, {
            "aria-selected": w(B(l), M),
            key: `${B(de)(M) ? M[V.labelKey] : M}`,
            tabindex: "0",
            class: A({ "font-bold": w(B(l), M) }),
            onClick: (C) => y(M, q),
            onKeyup: me((C) => y(M, q), ["space"])
          }, {
            default: D(() => [
              x(V.$slots, "item", {
                item: M,
                index: q
              }, () => [
                oe(F(B(de)(M) ? M[V.labelKey] : M), 1)
              ], !0)
            ]),
            _: 2
          }, 1032, ["aria-selected", "class", "onClick", "onKeyup"]))), 128)) : (f(), v("div", ri, [
            x(V.$slots, "no-items", {}, () => [
              E[11] || (E[11] = oe(" No tags created yet. "))
            ], !0)
          ]))
        ]),
        actions: D(() => [
          g("div", ui, [
            P(U, {
              onClick: E[5] || (E[5] = (M) => m(r.value)),
              text: V.buttonText,
              "always-open": ""
            }, null, 8, ["text"])
          ])
        ]),
        default: D(() => [
          P(Pe, {
            modelValue: r.value,
            "onUpdate:modelValue": E[3] || (E[3] = (M) => r.value = M),
            expanded: a.value,
            "onUpdate:expanded": [
              E[4] || (E[4] = (M) => a.value = M),
              b
            ],
            disabled: V.disabled,
            icon: V.icon,
            items: V.items,
            onClick: i
          }, {
            searchText: D(() => [
              x(V.$slots, "search-text", {}, () => [
                E[8] || (E[8] = oe("Search"))
              ], !0)
            ]),
            status: D(() => {
              var M;
              return [
                a.value || !((M = V.modelValue) != null && M.length) ? (f(), v("div", ti, [
                  fe(g("div", li, [
                    g("span", {
                      class: A(["absolute text-neutral-foreground-low top-[50%] translate-y-[-50%]", { "text-danger-foreground-low": V.isError }])
                    }, [
                      x(V.$slots, "search-text", {}, () => [
                        E[9] || (E[9] = oe("Search"))
                      ], !0)
                    ], 2)
                  ], 512), [
                    [Ce, !r.value.length]
                  ]),
                  fe(g("input", {
                    "onUpdate:modelValue": E[0] || (E[0] = (q) => r.value = q),
                    type: "text",
                    class: A(["search", {
                      "bg-danger-surface-default text-danger-foreground-low": V.isError,
                      "bg-neutral-surface-disabled text-neutral-foreground-low": V.disabled
                    }]),
                    onKeydown: [
                      E[1] || (E[1] = me((q) => m(r.value), ["enter"])),
                      E[2] || (E[2] = me(We((q) => m(r.value), ["prevent"]), ["tab"]))
                    ],
                    style: { "--tw-ring-color": "none !important" },
                    disabled: V.disabled
                  }, null, 42, ai), [
                    [$e, r.value]
                  ])
                ])) : (f(), v("div", oi, [
                  (f(!0), v(Q, null, le(B(l), (q, C) => (f(), R(N, {
                    color: "transparent",
                    class: "tag",
                    key: C
                  }, {
                    default: D(() => [
                      g("div", ni, [
                        g("p", si, F(B(de)(q) ? q[V.labelKey] : q), 1),
                        P(z, {
                          name: "close",
                          onClick: (I) => p(C),
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
}), ci = /* @__PURE__ */ G(di, [["__scopeId", "data-v-1d02aa9b"]]), fi = {
  install(n) {
    n.component("BTagSelect", ci);
  }
}, pi = { class: "flex items-center gap-xs" }, mi = { class: "flex" }, vi = {
  key: 0,
  class: "dots"
}, gi = ["onClick"], hi = /* @__PURE__ */ Z({
  __name: "BPagination",
  props: {
    modelValue: { default: 1 },
    length: { default: 1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s, [t, l] = se(e, "modelValue", c, null), o = Y(() => {
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
      const r = O("BIcon");
      return f(), v("div", pi, [
        g("div", {
          class: A(["page-icon", { disabled: B(t) == 1 }]),
          onClick: a[0] || (a[0] = (m) => u(B(t) - 1))
        }, [
          P(r, { name: "chevron_left" })
        ], 2),
        g("div", mi, [
          (f(!0), v(Q, null, le(o.value, (m) => (f(), v("div", {
            key: m,
            class: "flex gap-xs"
          }, [
            m == -1 ? (f(), v("div", vi, "...")) : (f(), v("div", {
              key: 1,
              onClick: (p) => u(m),
              class: A(["page-number", { active: m === B(t) }])
            }, F(m), 11, gi))
          ]))), 128))
        ]),
        g("div", {
          class: A(["page-icon", { disabled: B(t) == d.length }]),
          onClick: a[1] || (a[1] = (m) => u(B(t) + 1))
        }, [
          P(r, { name: "chevron_right" })
        ], 2)
      ]);
    };
  }
}), bi = /* @__PURE__ */ G(hi, [["__scopeId", "data-v-36eb0a59"]]), yi = {
  install(n) {
    n.component("BPagination", bi);
  }
}, Ci = ["width", "height", "viewBox"], Bi = { id: "highlight-mask" }, wi = ["width", "height", "rx", "ry"], ki = ["src"], Vi = ["src"], $i = /* @__PURE__ */ Z({
  __name: "BCrop",
  props: {
    modelValue: { default: void 0 },
    src: { default: void 0 },
    width: { default: "360px" },
    height: { default: "200px" }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = S(!1), t = S(), l = S(), o = S(), u = S(0), d = S(new Image()), a = new Image();
    a.src = e.src;
    const r = S({
      width: 0,
      height: 0
    }), m = new ResizeObserver(y), p = Y(() => {
      var z, N;
      return (document.readyState === "complete" || document.readyState === "interactive") && ((N = (z = t.value) == null ? void 0 : z.computedStyleMap().get("--border-radius-xl")) == null ? void 0 : N.toString()) || "16px";
    }), h = s;
    he(async () => {
      window.addEventListener("mousemove", W), window.addEventListener("mouseup", () => {
        c.value = !1;
      }), window.addEventListener("touchmove", b), window.addEventListener("touchend", () => {
        c.value = !1;
      }), t.value && m.observe(t.value, { box: "border-box" }), a.onload = () => {
        V(u.value);
      };
    }), Se(y), we(() => {
      m && m.disconnect(), window.removeEventListener("mousemove", W), window.removeEventListener("mouseup", () => {
        c.value = !1;
      }), window.removeEventListener("touchmove", b), window.removeEventListener("touchend", () => {
        c.value = !1;
      });
    });
    function y() {
      var z, N, U, H;
      r.value.width = (z = t.value) != null && z.clientWidth ? ((N = t.value) == null ? void 0 : N.clientWidth) + 10 : 0, r.value.height = (U = t.value) != null && U.clientHeight ? ((H = t.value) == null ? void 0 : H.clientHeight) + 10 : 0;
    }
    function w(z) {
      c.value = !0, b(z);
    }
    function i(z) {
      c.value = !0, W(z);
    }
    function b(z) {
      W(z.touches[0]);
    }
    function W(z) {
      if (!l.value || !l.value.parentElement || !o.value || !c.value)
        return;
      const N = He(z, l.value, l.value.parentElement, { left: !0, top: !0 }, { x: -1, y: -3 });
      l.value.style.top = `${N.y}px`, l.value.style.left = `${N.x}px`, o.value.setAttribute("x", N.x.toString()), o.value.setAttribute("y", N.y.toString()), E(l.value, l.value.parentElement);
    }
    function V(z) {
      const N = document.createElement("canvas"), U = N.getContext("2d");
      if (!l.value || !l.value.parentElement || !U)
        return;
      const H = z + 1, M = l.value.parentElement.getBoundingClientRect(), q = l.value.getBoundingClientRect();
      N.width = M.width, N.height = M.height;
      const C = (M.width - a.width) / 2, I = (M.height - a.height) / 2;
      U.drawImage(a, C, I);
      const k = q.left + q.width / 2 - M.left, $ = q.top + q.height / 2 - M.top;
      U.clearRect(0, 0, N.width, N.height), U.save(), U.translate(k, $), U.scale(H, H), U.translate(-k, -$), U.drawImage(a, C, I), U.restore();
      const j = N.toDataURL("image/png");
      d.value = new Image(), d.value.src = j, d.value.onload = () => {
        !l.value || !l.value.parentElement || E(l.value, l.value.parentElement);
      };
    }
    function E(z, N) {
      const U = z.getBoundingClientRect(), H = document.createElement("canvas"), M = H.getContext("2d");
      if (!M)
        return;
      H.width = U.width, H.height = U.height;
      const q = N.getBoundingClientRect(), C = U.left - q.left, I = U.top - q.top, k = C, $ = I, j = U.width, ee = U.height;
      M.drawImage(d.value, k, $, j, ee, 0, 0, U.width, U.height);
      const te = H.toDataURL("image/png");
      h("update:modelValue", te);
    }
    return (z, N) => {
      const U = O("BIcon"), H = O("BSlider");
      return f(), v("div", {
        ref_key: "bCrop",
        ref: t,
        class: "b-crop w-full h-full"
      }, [
        g("div", {
          class: "relative w-full h-full bg-black rounded-xl",
          style: ie({ "min-width": z.width, "min-height": z.height })
        }, [
          g("div", {
            class: "crop-img",
            onClick: i
          }, [
            (f(), v("svg", {
              class: "absolute z-[1]",
              width: r.value.width || "0px",
              height: r.value.height || "0px",
              viewBox: `0 0 ${r.value.width || 0} ${r.value.height || 0}`,
              xmlns: "http://www.w3.org/2000/svg"
            }, [
              g("defs", null, [
                g("mask", Bi, [
                  N[1] || (N[1] = g("rect", {
                    width: "100%",
                    height: "100%",
                    fill: "white"
                  }, null, -1)),
                  g("rect", {
                    ref_key: "selectedArea",
                    ref: o,
                    x: "0",
                    y: "0",
                    width: z.width,
                    height: z.height,
                    rx: p.value,
                    ry: p.value,
                    fill: "black"
                  }, null, 8, wi)
                ])
              ]),
              N[2] || (N[2] = g("rect", {
                width: "100%",
                height: "100%",
                fill: "rgba(255, 255, 255, 0.7)",
                mask: "url(#highlight-mask)"
              }, null, -1))
            ], 8, Ci)),
            g("img", {
              src: d.value.src,
              alt: "model value"
            }, null, 8, ki),
            g("img", {
              src: z.src,
              style: { position: "relative", visibility: "hidden" }
            }, null, 8, Vi)
          ]),
          g("div", {
            ref_key: "cropArea",
            ref: l,
            class: "crop-area",
            style: ie({ width: z.width, height: z.height }),
            onMousedown: i,
            onTouchstart: w
          }, null, 36)
        ], 4),
        g("footer", null, [
          P(U, {
            name: "zoom_out",
            class: "select-none"
          }),
          P(H, {
            modelValue: u.value,
            "onUpdate:modelValue": [
              N[0] || (N[0] = (M) => u.value = M),
              V
            ],
            size: "small",
            max: 2
          }, null, 8, ["modelValue"]),
          P(U, {
            name: "zoom_in",
            class: "select-none"
          })
        ])
      ], 512);
    };
  }
}), Mi = /* @__PURE__ */ G($i, [["__scopeId", "data-v-4d8dbf28"]]), xi = {
  install(n) {
    n.component("BCrop", Mi);
  }
}, Ii = { class: "b-card-icon" }, Ai = { class: "flex justify-between" }, Si = /* @__PURE__ */ Z({
  __name: "BCardIcon",
  props: {
    title: { default: "" },
    icon: { default: "" },
    color: { default: "" },
    isIconRound: { type: Boolean, default: !1 }
  },
  setup(n) {
    return ke((s) => ({
      "2c544557": s.color
    })), (s, e) => {
      const c = O("BIcon"), t = O("BCard");
      return f(), v("div", Ii, [
        g("div", {
          class: A(["icon", {
            "round-icon": s.isIconRound,
            "colored-background": s.color,
            "colored-text": s.color && s.isIconRound
          }])
        }, [
          P(c, { name: s.icon }, null, 8, ["name"])
        ], 2),
        P(t, { class: "p-lg" }, {
          default: D(() => [
            g("header", Ai, [
              g("h4", {
                class: A(["card-title", { "colored-text": s.color }])
              }, F(s.title), 3),
              x(s.$slots, "title-actions", {}, void 0, !0)
            ]),
            x(s.$slots, "default", {}, void 0, !0)
          ]),
          _: 3
        })
      ]);
    };
  }
}), Di = /* @__PURE__ */ G(Si, [["__scopeId", "data-v-a98b8282"]]), Ei = {
  install(n) {
    n.component("BCardIcon", Di);
  }
}, Hi = { class: "b-action-card" }, Ti = {
  key: 0,
  class: "py-sm"
}, Li = /* @__PURE__ */ Z({
  __name: "BActionCard",
  props: {
    icon: { default: "" },
    color: { default: "" },
    hideDrag: { type: Boolean, default: !1 }
  },
  emits: ["dragstart", "dragging", "dragend", "delete"],
  setup(n, { emit: s }) {
    const e = S(!1), c = s;
    he(() => {
      window.addEventListener("mousemove", o), window.addEventListener("mouseup", u), window.addEventListener("touchmove", o), window.addEventListener("touhend", u);
    }), we(() => {
      window.removeEventListener("mousemove", o), window.removeEventListener("mouseup", u), window.removeEventListener("touchmove", o), window.removeEventListener("touhend", u);
    });
    function t(a, r) {
      e.value = a, c(a ? "dragstart" : "dragend", r);
    }
    function l(a) {
      t(!0, d(a));
    }
    function o(a) {
      e.value && c("dragging", d(a));
    }
    function u(a) {
      e.value && t(!1, d(a));
    }
    function d(a) {
      return a instanceof TouchEvent ? a.touches[0] : a;
    }
    return (a, r) => {
      const m = O("BIcon"), p = O("BCard");
      return f(), v("div", Hi, [
        a.hideDrag ? T("", !0) : (f(), R(m, {
          key: 0,
          class: A(["icon cursor-grab", { "cursor-grabbing": e.value }]),
          name: "drag_indicator",
          onMousedown: l,
          onTouchstart: l
        }, null, 8, ["class"])),
        P(p, { class: "rounded-base [&>*]:px-xl" }, {
          default: D(() => [
            g("header", {
              class: A(["flex items-center gap-xs bg-primary-interaction-default text-neutral-foreground-negative rounded-base py-sm", { "rounded-b-none": a.$slots.card }]),
              style: ie({ background: a.color })
            }, [
              a.icon ? (f(), R(m, {
                key: 0,
                name: a.icon
              }, null, 8, ["name"])) : T("", !0),
              x(a.$slots, "default", {}, void 0, !0)
            ], 6),
            a.$slots.card ? (f(), v("div", Ti, [
              x(a.$slots, "card", {}, void 0, !0)
            ])) : T("", !0)
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
}), Pi = /* @__PURE__ */ G(Li, [["__scopeId", "data-v-442cd4ad"]]), zi = {
  install(n) {
    n.component("BActionCard", Pi);
  }
}, Oi = { class: "flex flex-col gap-1" }, Wi = { class: "option-description" }, Ui = /* @__PURE__ */ Z({
  __name: "BStepOption",
  props: {
    title: { default: "" },
    description: { default: "" },
    icon: { default: "" },
    color: { default: "" },
    disabled: { type: Boolean, default: !1 },
    isIconRound: { type: Boolean, default: !1 }
  },
  setup(n) {
    return ke((s) => ({
      d8ab66ce: s.color
    })), (s, e) => {
      const c = O("BIcon");
      return f(), v("div", {
        class: A(["b-step-option", { disabled: s.disabled }])
      }, [
        g("div", {
          class: A(["icon", { "round-icon": s.isIconRound, "colored-background": s.color, "colored-text": s.color && s.isIconRound }])
        }, [
          P(c, { name: s.icon }, null, 8, ["name"])
        ], 2),
        g("div", Oi, [
          g("h4", {
            class: A(["option-title", { "colored-text": s.color }])
          }, F(s.title), 3),
          g("p", Wi, F(s.description), 1)
        ])
      ], 2);
    };
  }
}), ji = /* @__PURE__ */ G(Ui, [["__scopeId", "data-v-39f30650"]]), Ri = {
  install(n) {
    n.component("BStepOption", ji);
  }
}, Fi = {
  key: 0,
  class: "flex gap-xxs items-center"
}, _i = {
  key: 1,
  class: "skeleton-div header"
}, Ni = { class: "flex items-end gap-xs" }, qi = { class: "card-description" }, Zi = {
  key: 3,
  class: "skeleton-div content"
}, Ki = /* @__PURE__ */ Z({
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
  setup(n) {
    return ke((s) => ({
      "7a193913": s.color
    })), (s, e) => {
      const c = O("BIcon"), t = O("BTooltip"), l = O("BCard");
      return f(), R(l, {
        class: A(["b-metric-card", [s.type, s.size]])
      }, {
        default: D(() => [
          (s.title || s.icon || s.$slots["title-slot"]) && !s.loading ? (f(), v("div", Fi, [
            s.icon ? (f(), R(c, {
              key: 0,
              class: "icon",
              name: s.icon
            }, null, 8, ["name"])) : T("", !0),
            x(s.$slots, "title-slot", {}, () => [
              g("p", {
                class: A(["card-title", { "font-bold": s.boldTitle }])
              }, F(s.title), 3)
            ], !0),
            x(s.$slots, "info", {}, () => [
              s.infoMessage ? (f(), v(Q, { key: 0 }, [
                s.noTooltip ? (f(), v("p", {
                  key: 1,
                  class: A(["info-text info-label", [s.infoType]])
                }, F(s.infoMessage), 3)) : (f(), R(t, { key: 0 }, {
                  text: D(() => [
                    g("div", {
                      class: A(["tooltip-text", {
                        "whitespace-nowrap break-words text-wrap": s.tooltipMinWidth != "none"
                      }]),
                      style: ie({ minWidth: s.tooltipMinWidth })
                    }, F(s.infoMessage), 7)
                  ]),
                  default: D(() => [
                    P(c, {
                      name: "info",
                      class: A(["info-icon info-label", [s.infoType]])
                    }, null, 8, ["class"])
                  ]),
                  _: 1
                }))
              ], 64)) : T("", !0)
            ], !0)
          ])) : s.loading ? (f(), v("div", _i)) : T("", !0),
          s.loading ? (f(), v("div", Zi)) : x(s.$slots, "content", { key: 2 }, () => [
            g("div", Ni, [
              x(s.$slots, "value-slot", {}, () => [
                g("p", {
                  class: A(["card-value", { "colored-text": s.color }])
                }, F(s.value), 3)
              ], !0),
              x(s.$slots, "description-slot", {}, () => [
                g("p", qi, F(s.description), 1)
              ], !0)
            ])
          ], !0),
          s.loading ? T("", !0) : x(s.$slots, "default", { key: 4 }, void 0, !0)
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
}), Xi = /* @__PURE__ */ G(Ki, [["__scopeId", "data-v-0838999f"]]), Gi = {
  install(n) {
    n.component("BMetricCard", Xi);
  }
}, Ji = { key: 0 }, Qi = { class: "flex items-center justify-end gap-xs p-xs w-full border-t-xxs border-neutral-default" }, Yi = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, t = S(e.modelValue), l = S(e.expanded);
    ae(() => e.modelValue, (a) => t.value = a), ae(() => e.expanded, (a) => l.value = a);
    function o(a) {
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
      const m = O("BIcon"), p = O("BDate"), h = O("BButton"), y = O("BExpandableContainer");
      return f(), R(y, {
        modelValue: l.value,
        "onUpdate:modelValue": [
          r[3] || (r[3] = (w) => l.value = w),
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
        content: D(() => [
          P(p, {
            modelValue: t.value,
            "onUpdate:modelValue": [
              r[0] || (r[0] = (w) => t.value = w),
              u
            ],
            lang: a.lang,
            "max-init": a.maxInit,
            "max-end": a.maxEnd
          }, null, 8, ["modelValue", "lang", "max-init", "max-end"]),
          g("div", Qi, [
            x(a.$slots, "actions", {}, () => [
              P(h, {
                size: "small",
                variant: "plain",
                onClick: r[1] || (r[1] = (w) => u(void 0))
              }, {
                default: D(() => [
                  x(a.$slots, "clear-text", {}, () => [
                    r[4] || (r[4] = oe(" Clear "))
                  ])
                ]),
                _: 3
              }),
              P(h, {
                size: "small",
                onClick: r[2] || (r[2] = (w) => c("apply", t.value))
              }, {
                default: D(() => [
                  x(a.$slots, "apply-text", {}, () => [
                    r[5] || (r[5] = oe(" Apply "))
                  ])
                ]),
                _: 3
              })
            ])
          ])
        ]),
        default: D(() => [
          g("div", {
            class: A(["flex items-center text-lg h-xl text-neutral-interaction-default", {
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
            class: A(["whitespace-nowrap", { "font-bold": l.value }])
          }, [
            t.value ? (f(), v("span", Ji, F(o(t.value)), 1)) : x(a.$slots, "default", { key: 1 })
          ], 2)
        ]),
        _: 3
      }, 8, ["modelValue", "disabled", "required", "absolute", "label-value", "is-error", "error-message", "align-right"]);
    };
  }
}), er = {
  install(n) {
    n.component("BDatePicker", Yi);
  }
}, tr = { class: "flex items-center gap-xs w-full text-neutral-foreground-high font-bold" }, lr = {
  key: 0,
  class: "divider"
}, ar = {
  key: 1,
  class: "divider"
}, or = /* @__PURE__ */ Z({
  __name: "BDivider",
  props: {
    position: { default: "right" }
  },
  setup(n) {
    return (s, e) => (f(), v("div", tr, [
      s.position != "right" ? (f(), v("div", lr)) : T("", !0),
      x(s.$slots, "default", {}, void 0, !0),
      s.position != "left" ? (f(), v("div", ar)) : T("", !0)
    ]));
  }
}), nr = /* @__PURE__ */ G(or, [["__scopeId", "data-v-f719e0ce"]]), sr = {
  install(n) {
    n.component("BDivider", nr);
  }
}, ir = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, t = S(null), [l, o] = se(e, "expanded", c, !1), u = Y(() => e.isMultiple ? "BMultiSelect" : "BSelect");
    ge(p), ae(() => e.modelValue, p, { deep: !0, immediate: !0 }), ae(() => e.isMultiple, () => {
      p(), d();
    });
    function d() {
      c("update:modelValue", m());
    }
    function a(i, b) {
      o(i, b);
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
          const W = typeof b == "object" ? b : { [e.valueKey]: b, [e.labelKey]: b };
          return W.selected = i.findIndex((V) => w(b) == y(V)) > -1, W;
        });
      } else
        t.value = e.items.find((i) => w(i) == y(e.modelValue));
    }
    function h(i) {
      return e.getObject ? i : w(i);
    }
    function y(i) {
      return e.getObject ? w(i) : i;
    }
    function w(i) {
      return typeof i == "object" ? i == null ? void 0 : i[e.valueKey] : i;
    }
    return (i, b) => {
      const W = O("BButton");
      return f(), R(Le(u.value), {
        modelValue: t.value,
        "onUpdate:modelValue": [
          b[0] || (b[0] = (V) => t.value = V),
          d
        ],
        expanded: B(l),
        "onUpdate:expanded": [
          b[1] || (b[1] = (V) => ne(l) ? l.value = V : null),
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
        default: D(() => [
          x(i.$slots, "default")
        ]),
        _: 2
      }, [
        i.$slots.searchText ? {
          name: "searchText",
          fn: D(() => [
            x(i.$slots, "searchText")
          ]),
          key: "0"
        } : void 0,
        i.isMultiple ? {
          name: "status-text",
          fn: D(({ selected: V }) => [
            i.$slots["status-text"] ? x(i.$slots, "status-text", {
              key: 0,
              selected: V
            }, () => [
              oe(F(i.labelValue), 1)
            ]) : T("", !0)
          ]),
          key: "1"
        } : i.$slots.status ? {
          name: "status",
          fn: D(() => [
            x(i.$slots, "status")
          ]),
          key: "2"
        } : void 0,
        i.$slots.item ? {
          name: "item",
          fn: D(({ item: V }) => [
            x(i.$slots, "item", { item: V })
          ]),
          key: "3"
        } : void 0,
        i.clearable ? {
          name: "actions",
          fn: D(() => [
            P(W, {
              variant: "plain",
              size: "small",
              onClick: r
            }, {
              default: D(() => [
                x(i.$slots, "clear-text", {}, () => [
                  b[2] || (b[2] = oe("Clear"))
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
}), rr = {
  install(n) {
    n.component("BSmartSelect", ir);
  }
}, ur = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, ""), [l] = se(e, "expanded", c, !1), o = Y(() => {
      var a;
      return t.value ? (a = e.items) == null ? void 0 : a.filter((r) => r.toLowerCase().includes(t.value.toLowerCase())) : e.items;
    });
    function u() {
      l.value = !0;
    }
    function d(a) {
      t.value = a;
    }
    return (a, r) => {
      const m = O("BInput"), p = O("BSelectContainer");
      return f(), R(p, {
        modelValue: B(l),
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
        label: D(() => [
          P(m, {
            modelValue: B(t),
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
        items: D(() => [
          (f(!0), v(Q, null, le(o.value, (h, y) => (f(), R(Ve, {
            "aria-selected": B(t) == h,
            key: y,
            class: A({
              "font-bold": B(t) == h
            }),
            onClick: (w) => d(h),
            onKeyup: me((w) => d(h), ["space"])
          }, {
            default: D(() => [
              x(a.$slots, "item", {
                item: h,
                index: y
              }, () => [
                oe(F(h), 1)
              ])
            ]),
            _: 2
          }, 1032, ["aria-selected", "class", "onClick", "onKeyup"]))), 128))
        ]),
        _: 3
      }, 8, ["modelValue", "absolute", "label-value", "disabled", "is-error", "error-message", "info-message", "required", "max-height", "min-width"]);
    };
  }
}), dr = {
  install(n) {
    n.component("BAutoComplete", ur);
  }
}, cr = /* @__PURE__ */ Z({
  __name: "Items",
  props: {
    items: {}
  },
  setup(n) {
    const s = n, e = Y(() => {
      var l, o;
      const c = ((l = s.items) == null ? void 0 : l.filter((u) => !u.bottom)) || [], t = ((o = s.items) == null ? void 0 : o.filter((u) => u.bottom)) || [];
      return [c, t];
    });
    return (c, t) => {
      const l = O("BDivider"), o = O("BCard");
      return f(), R(o, { class: "custom-card" }, {
        default: D(() => [
          (f(!0), v(Q, null, le(e.value, (u, d) => (f(), v(Q, null, [
            x(c.$slots, "default", { items: u }, void 0, !0),
            d == 0 && u.length > 1 ? (f(), R(l, { key: 0 })) : T("", !0)
          ], 64))), 256))
        ]),
        _: 3
      });
    };
  }
}), bt = /* @__PURE__ */ G(cr, [["__scopeId", "data-v-a60ed13f"]]), fr = { class: "flex items-center gap-xs" }, pr = { class: "label" }, mr = /* @__PURE__ */ Z({
  __name: "Item",
  props: {
    modelValue: { default: void 0 },
    selected: { type: Boolean, default: !1 },
    item: {},
    getObject: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "update:selected"],
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, ""), [l] = se(e, "selected", c, !1);
    function o(r) {
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
      const p = O("BIcon"), h = O("Item", !0);
      return f(), v("div", {
        class: "relative",
        tabindex: "0",
        onBlur: d
      }, [
        g("div", {
          class: A(["item", {
            selected: r.item.value === a(B(t)) || B(l),
            disabled: r.item.disabled
          }]),
          onClick: m[0] || (m[0] = (y) => o(r.item)),
          onKeydown: m[1] || (m[1] = me((y) => o(r.item), ["enter"]))
        }, [
          g("div", fr, [
            r.item.icon ? (f(), R(p, {
              key: 0,
              name: r.item.icon,
              class: "icon"
            }, null, 8, ["name"])) : T("", !0),
            g("p", pr, F(r.item.label), 1)
          ]),
          r.item.items && r.item.items.length ? (f(), R(p, {
            key: 0,
            name: "chevron_right",
            class: "icon icon-small"
          })) : T("", !0)
        ], 34),
        r.item.items && r.item.items.length && r.item.expanded ? (f(), R(bt, {
          key: 0,
          class: "sub-items",
          items: r.item.items
        }, {
          default: D(({ items: y }) => [
            (f(!0), v(Q, null, le(y, (w) => (f(), R(h, {
              modelValue: B(t),
              "onUpdate:modelValue": [
                m[2] || (m[2] = (i) => ne(t) ? t.value = i : null),
                o
              ],
              selected: w.selected,
              "onUpdate:selected": [(i) => w.selected = i, u],
              item: w,
              "get-object": r.getObject
            }, null, 8, ["modelValue", "selected", "onUpdate:selected", "item", "get-object"]))), 256))
          ]),
          _: 1
        }, 8, ["items"])) : T("", !0)
      ], 32);
    };
  }
}), vr = /* @__PURE__ */ G(mr, [["__scopeId", "data-v-c9e862c1"]]), gr = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, ""), [l] = se(e, "expanded", c, !1), o = S(""), u = tt(), d = Y(() => {
      var b;
      if (e.items)
        return (b = r(e.items, t.value)) == null ? void 0 : b.label;
    }), a = Y(() => {
      if (e.items) {
        if (!o.value)
          return e.items;
      } else return [];
      return m(e.items, o.value);
    });
    ge(() => {
      w();
    });
    function r(b, W) {
      for (const V of b) {
        if (V.value === i(W))
          return V;
        if (V.items) {
          const E = r(V.items, W);
          if (E)
            return E;
        }
      }
    }
    function m(b, W) {
      const V = [];
      for (const E of b) {
        let z = [];
        E.items && E.items.length && (z = m(E.items, W)), (E.label.toLowerCase().includes(W.toLowerCase()) || z.length) && (z.length && (E.items = z), V.push(E));
      }
      return V;
    }
    function p(b, W) {
      let V = !1;
      for (const E of b)
        E.items && E.items.length ? E.selected = p(E.items, W) : E.selected = E.value == i(W), E.selected && (V = !0);
      return V;
    }
    function h(b) {
      t.value = b, l.value = !1, w(), p(e.items, b);
    }
    function y() {
      l.value = !0, o.value = "";
    }
    function w() {
      setTimeout(() => {
        !l.value && !u.default && e.searchable && (o.value = d.value || "");
      });
    }
    function i(b) {
      return de(b) ? b.value : b;
    }
    return (b, W) => {
      const V = O("BInput"), E = O("BExpandableContainer");
      return f(), R(E, {
        modelValue: B(l),
        "onUpdate:modelValue": [
          W[2] || (W[2] = (z) => ne(l) ? l.value = z : null),
          w
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
        label: D(() => [
          x(b.$slots, "default", {}, () => [
            e.searchable ? (f(), R(V, {
              key: 0,
              modelValue: o.value,
              "onUpdate:modelValue": W[0] || (W[0] = (z) => o.value = z),
              disabled: b.disabled,
              "is-error": b.isError,
              icon: "unfold_more",
              "append-icon": "",
              onFocus: y
            }, null, 8, ["modelValue", "disabled", "is-error"])) : T("", !0)
          ])
        ]),
        card: D(() => [
          P(bt, { items: a.value }, {
            default: D(({ items: z }) => [
              (f(!0), v(Q, null, le(z, (N) => (f(), R(vr, {
                modelValue: B(t),
                "onUpdate:modelValue": [
                  W[1] || (W[1] = (U) => ne(t) ? t.value = U : null),
                  h
                ],
                selected: N.selected,
                "onUpdate:selected": (U) => N.selected = U,
                item: N,
                "get-object": b.getObject
              }, null, 8, ["modelValue", "selected", "onUpdate:selected", "item", "get-object"]))), 256))
            ]),
            _: 1
          }, 8, ["items"])
        ]),
        default: D(() => [
          oe(F(d.value) + " ", 1)
        ]),
        _: 3
      }, 8, ["modelValue", "absolute", "label-value", "disabled", "is-error", "error-message", "info-message", "required", "max-height", "min-width"]);
    };
  }
}), hr = {
  install(n) {
    n.component("BDropdown", gr);
  }
}, br = { class: "b-breadcrumb" }, yr = ["onClick"], Cr = ["onClick"], Br = /* @__PURE__ */ Z({
  __name: "BBreadcrumb",
  props: {
    modelValue: { default: void 0 },
    items: { default: void 0 },
    labelKey: { default: "label" },
    valueKey: { default: "value" },
    getObject: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, void 0), l = S([]), o = Y(() => {
      var w;
      if (!((w = e.items) != null && w.length))
        return [];
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
      if (l.value[h] = !l.value[h], !l.value[h])
        return;
      const w = p.target.getBoundingClientRect(), i = window.innerHeight;
      await je();
      const b = document.querySelector(`.more-options[index="${h}"]`);
      if (!b)
        return;
      b.style.left = `${w.left}px`, w.bottom + b.offsetHeight > i ? b.style.bottom = `${i - w.top}px` : b.style.top = `${w.bottom}px`;
      const W = (V) => {
        const E = Math.abs(b.offsetHeight - b.scrollHeight) > 3, z = V.type == "wheel", N = b.contains(V.target);
        (E ? z && !N : z || !N) && (l.value[h] = !1, document.removeEventListener("click", W), document.removeEventListener("wheel", W));
      };
      setTimeout(() => {
        document.addEventListener("click", W), document.addEventListener("wheel", W);
      }, 200);
    }
    return (p, h) => {
      const y = O("BIcon"), w = O("b-card");
      return f(), v("div", br, [
        (f(!0), v(Q, null, le(o.value, (i, b) => (f(), v(Q, { key: i }, [
          B(de)(i) && i.icon == "more_horiz" ? (f(), v("div", {
            key: 0,
            onClick: (W) => m(W, b)
          }, [
            P(y, {
              name: "more_horiz",
              class: "cursor-pointer"
            }),
            (f(), R(De, { to: "body" }, [
              P(ve, { name: "fade" }, {
                default: D(() => [
                  l.value[b] ? (f(), R(w, {
                    key: 0,
                    class: "more-options",
                    index: b
                  }, {
                    default: D(() => [
                      (f(!0), v(Q, null, le(i.items, (W) => (f(), R(Ve, {
                        key: W,
                        onClick: (V) => u(W)
                      }, {
                        default: D(() => [
                          oe(F(d(W)), 1)
                        ]),
                        _: 2
                      }, 1032, ["onClick"]))), 128))
                    ]),
                    _: 2
                  }, 1032, ["index"])) : T("", !0)
                ]),
                _: 2
              }, 1024)
            ]))
          ], 8, yr)) : (f(), v("h5", {
            key: 1,
            class: A(["item", { active: r(i) }]),
            onClick: (W) => u(i)
          }, F(d(i)), 11, Cr)),
          b < o.value.length - 1 ? (f(), R(y, {
            key: 2,
            name: "chevron_right"
          })) : T("", !0)
        ], 64))), 128))
      ]);
    };
  }
}), wr = /* @__PURE__ */ G(Br, [["__scopeId", "data-v-e35e9a8e"]]), kr = {
  install(n) {
    n.component("BBreadcrumb", wr);
  }
}, Vr = ["src", "alt"], $r = /* @__PURE__ */ Z({
  __name: "BAvatar",
  props: {
    name: {},
    src: {},
    alt: {},
    size: { default: "medium" }
  },
  setup(n) {
    const s = n, e = Y(() => {
      if (!s.name)
        return "";
      const c = s.name.trim().split(" ");
      return c.length > 1 ? (c[0][0] + c[c.length - 1][0]).toUpperCase() : s.name.slice(0, 2).toUpperCase();
    });
    return (c, t) => (f(), v("div", {
      class: A(["b-avatar", c.size])
    }, [
      c.src ? (f(), v("img", {
        key: 0,
        src: c.src,
        alt: c.alt || c.name
      }, null, 8, Vr)) : T("", !0),
      g("span", {
        class: A({ "opacity-0": c.src })
      }, F(e.value), 3)
    ], 2));
  }
}), Mr = /* @__PURE__ */ G($r, [["__scopeId", "data-v-ca655f46"]]), xr = {
  install(n) {
    n.component("BAvatar", Mr);
  }
}, Ir = { class: "b-navbar" }, Ar = { class: "flex items-center gap-base" }, Sr = { class: "flex items-center gap-base text-lg leading-lg font-light text-primary-foreground-high" }, Dr = { class: "flex items-center gap-base" }, Er = /* @__PURE__ */ Z({
  __name: "BNavbar",
  props: {
    modelValue: { default: void 0 },
    title: { default: "" },
    items: {},
    profile: {}
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, void 0), l = S(!1), o = S(!1), u = Y(() => {
      var a, r;
      return document.readyState === "complete" || document.readyState === "interactive" ? Number((((r = (a = document.body) == null ? void 0 : a.computedStyleMap().get("--spacing-xxs")) == null ? void 0 : r.toString()) || "4px").replace("px", "")) : 4;
    });
    async function d(a) {
      if (l.value = !l.value, !l.value)
        return;
      const m = a.target.getBoundingClientRect(), p = window.innerHeight, h = window.innerWidth;
      await je();
      const y = document.querySelector(".notifications");
      if (!y)
        return;
      y.style.right = `${h - m.right}px`, m.bottom + y.offsetHeight > p ? y.style.bottom = `${p - m.top - u.value}px` : y.style.top = `${m.bottom + u.value}px`, document.body.appendChild(y);
      const w = (i) => {
        const b = Math.abs(y.offsetHeight - y.scrollHeight) > 3, W = i.type == "wheel", V = y.contains(i.target);
        (b ? W && !V : W || !V) && (l.value = !1, document.removeEventListener("click", w), document.removeEventListener("wheel", w));
      };
      setTimeout(() => {
        document.addEventListener("click", w), document.addEventListener("wheel", w);
      }, 200);
    }
    return (a, r) => {
      const m = O("BDropdown"), p = O("BIcon"), h = O("BCard"), y = O("BAvatar");
      return f(), v("div", Ir, [
        g("div", Ar, [
          g("div", Sr, [
            x(a.$slots, "logo", {}, () => [
              r[2] || (r[2] = Ue('<svg xmlns="http://www.w3.org/2000/svg" width="41" height="40" viewBox="0 0 41 40" fill="none" data-v-e4839a54><path d="M40.5 20C40.5 8.95431 31.5457 0 20.5 0C9.4543 0 0.5 8.95431 0.5 20C0.5 31.0457 9.4543 40 20.5 40C31.5457 40 40.5 31.0457 40.5 20Z" fill="url(#paint0_linear_2159_846)" data-v-e4839a54></path><path d="M38.1604 20.0001C38.1604 10.2455 30.2528 2.33789 20.4982 2.33789C10.7436 2.33789 2.83594 10.2455 2.83594 20.0001C2.83594 29.7547 10.7436 37.6624 20.4982 37.6624C30.2528 37.6624 38.1604 29.7547 38.1604 20.0001Z" stroke="#FAFAFA" stroke-width="2.40312" stroke-miterlimit="10" data-v-e4839a54></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15.7876 20.902C14.5933 20.621 13.7248 19.9 13.4321 19.578C13.4632 18.9264 13.5596 18.2779 13.7211 17.645C14.195 15.7975 15.2189 14.1677 16.6794 12.9329C17.7002 12.0698 18.867 11.4478 20.0525 11.132C21.2271 10.8195 22.397 10.8101 23.4349 11.1056C24.19 11.3202 24.8504 11.6857 25.3957 12.1911C25.969 12.723 26.3885 13.3839 26.6402 14.1568C27.3332 16.2811 26.5672 18.7911 24.6421 20.7086C23.4473 21.8967 21.9278 22.7458 20.2467 23.1626C19.3424 23.3865 18.4024 23.4814 17.4547 23.4425C17.1338 23.4302 16.8062 23.4034 16.4837 23.3603C16.0632 22.5175 15.8461 21.3699 15.7876 20.902ZM15.7876 20.902C15.6835 20.0032 15.7114 19.0882 15.9352 18.2188C16.291 16.8332 17.0585 15.6109 18.1539 14.6856C18.9183 14.0402 19.7775 13.5768 20.6398 13.3481C21.4167 13.1413 22.1671 13.1289 22.8087 13.3124C23.3868 13.4756 24.1434 13.88 24.4666 14.8722C24.6686 15.4911 24.6499 16.2018 24.4122 16.928C24.1605 17.6916 23.6835 18.4396 23.0294 19.0897C22.1298 19.987 20.977 20.6277 19.6983 20.945C19.0037 21.1161 18.2797 21.1891 17.5479 21.1596C16.9575 21.1363 16.3874 21.0576 15.7876 20.902Z" fill="url(#paint1_angular_2159_846)" data-v-e4839a54></path><path d="M21.6728 29.3941C21.9944 29.4284 22.3315 29.4455 22.6796 29.4455V29.4408C25.1018 29.4408 28.0399 28.5839 29.9603 26.1283C30.3487 25.6307 30.2617 24.9107 29.7645 24.5219C29.2674 24.1331 28.5495 24.2202 28.1595 24.7178C27.4106 25.6742 26.3945 26.3663 25.1422 26.7706C23.7625 27.217 22.5211 27.1781 21.9042 27.1143C21.1585 27.0381 20.4515 26.8562 19.8021 26.5716C19.19 26.3041 18.6244 25.9464 18.1225 25.5063C17.4476 24.9146 16.8919 24.1848 16.4834 23.3589C15.9235 23.2992 14.5917 23.0367 13.752 22.5469C13.7846 22.6759 13.8218 22.8019 13.8607 22.9295C14.3812 24.6199 15.3367 26.1082 16.6201 27.2309C17.299 27.825 18.0635 28.3102 18.8901 28.671C19.757 29.0504 20.6923 29.2931 21.6728 29.3941Z" fill="white" data-v-e4839a54></path><path d="M13.4321 19.5783C13.0794 19.2859 12.7236 18.9406 12.416 18.5472C12.0275 18.0496 11.3081 17.9625 10.811 18.3513C10.3138 18.74 10.2268 19.4601 10.6152 19.9577C11.636 21.264 12.9939 22.1302 13.7522 22.5486C13.6351 22.1973 13.4321 21.1239 13.4321 19.5783Z" fill="url(#paint2_linear_2159_846)" data-v-e4839a54></path><path d="M13.4321 19.5781C13.7248 19.9001 14.5933 20.6211 15.7876 20.9021C15.8461 21.37 16.0632 22.5176 16.4837 23.3604C15.9237 23.3007 14.592 23.0383 13.7522 22.5484C13.6351 22.1971 13.4321 21.1237 13.4321 19.5781Z" fill="white" data-v-e4839a54></path><defs data-v-e4839a54><linearGradient id="paint0_linear_2159_846" x1="34.6407" y1="5.85756" x2="6.35756" y2="34.1424" gradientUnits="userSpaceOnUse" data-v-e4839a54><stop stop-color="#97D991" data-v-e4839a54></stop><stop offset="0.11" stop-color="#92D691" data-v-e4839a54></stop><stop offset="0.22" stop-color="#86D091" data-v-e4839a54></stop><stop offset="0.33" stop-color="#74C691" data-v-e4839a54></stop><stop offset="0.42" stop-color="#6DC192" data-v-e4839a54></stop><stop offset="0.55" stop-color="#5CB597" data-v-e4839a54></stop><stop offset="0.66" stop-color="#47A79E" data-v-e4839a54></stop><stop offset="0.74" stop-color="#3B9C98" data-v-e4839a54></stop><stop offset="0.89" stop-color="#1E7F88" data-v-e4839a54></stop><stop offset="1" stop-color="#02657A" data-v-e4839a54></stop></linearGradient><radialGradient id="paint1_angular_2159_846" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(20.1617 17.1708) rotate(139.686) scale(8.34625 8.94344)" data-v-e4839a54><stop stop-color="white" data-v-e4839a54></stop><stop offset="1" stop-color="#DDDDDD" data-v-e4839a54></stop></radialGradient><linearGradient id="paint2_linear_2159_846" x1="10.8995" y1="18.5312" x2="13.7097" y2="21.3414" gradientUnits="userSpaceOnUse" data-v-e4839a54><stop stop-color="white" data-v-e4839a54></stop><stop offset="1" stop-color="#D9D9D9" data-v-e4839a54></stop></linearGradient></defs></svg>', 1)),
              x(a.$slots, "title", {}, () => [
                oe(F(a.title), 1)
              ], !0)
            ], !0)
          ]),
          r[3] || (r[3] = g("div", { class: "border-r-xxs border-r-neutral-default min-h-xl" }, null, -1)),
          x(a.$slots, "default", {}, () => [
            P(m, {
              modelValue: B(t),
              "onUpdate:modelValue": r[0] || (r[0] = (w) => ne(t) ? t.value = w : null),
              expanded: o.value,
              "onUpdate:expanded": r[1] || (r[1] = (w) => o.value = w),
              items: a.items,
              "get-object": ""
            }, null, 8, ["modelValue", "expanded", "items"])
          ], !0)
        ]),
        g("div", Dr, [
          x(a.$slots, "actions", {}, () => {
            var w, i;
            return [
              g("div", null, [
                P(p, {
                  class: "notification-icon",
                  name: "notifications",
                  onClick: d
                }),
                (f(), R(De, { to: "body" }, [
                  P(ve, { name: "fade" }, {
                    default: D(() => [
                      l.value ? (f(), R(h, {
                        key: 0,
                        class: "notifications"
                      }, {
                        default: D(() => [
                          x(a.$slots, "notifications", {}, void 0, !0)
                        ]),
                        _: 3
                      })) : T("", !0)
                    ]),
                    _: 3
                  })
                ]))
              ]),
              P(y, {
                name: (w = a.profile) == null ? void 0 : w.name,
                src: (i = a.profile) == null ? void 0 : i.src
              }, null, 8, ["name", "src"])
            ];
          }, !0)
        ])
      ]);
    };
  }
}), Hr = /* @__PURE__ */ G(Er, [["__scopeId", "data-v-e4839a54"]]), Tr = {
  install(n) {
    n.component("BNavbar", Hr);
  }
}, Lr = /* @__PURE__ */ Z({
  __name: "BSidebar",
  props: {
    modelValue: { type: Boolean, default: !1 },
    width: { default: "fit-content" },
    noOutsideClose: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    const e = n, c = s;
    let t = S(e.modelValue);
    const l = S();
    ae(() => e.modelValue, (u) => {
      t.value = u;
    });
    function o() {
      e.noOutsideClose || (t.value = !1, c("update:modelValue", !1));
    }
    return (u, d) => (f(), R(De, { to: "body" }, [
      P(ft, {
        modelValue: B(t),
        "onUpdate:modelValue": d[0] || (d[0] = (a) => ne(t) ? t.value = a : t = a),
        onClick: o
      }, {
        default: D(() => [
          P(ve, { name: "slide-in" }, {
            default: D(() => [
              B(t) ? (f(), v("div", {
                key: 0,
                ref_key: "sidebar",
                ref: l,
                class: "sidebar",
                style: ie({ width: u.width })
              }, [
                x(u.$slots, "default", {}, void 0, !0)
              ], 4)) : T("", !0)
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["modelValue"])
    ]));
  }
}), Pr = /* @__PURE__ */ G(Lr, [["__scopeId", "data-v-5dc82bd0"]]), zr = {
  install(n) {
    n.component("BSidebar", Pr);
  }
}, Or = {
  key: 0,
  class: "items-container"
}, Wr = /* @__PURE__ */ Z({
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
  setup(n, { emit: s }) {
    const e = n, c = s, [t] = se(e, "modelValue", c, ""), l = Y(() => {
      let r = e.parentPath;
      return e.item.path && (!r.endsWith("/") && !e.item.path.startsWith("/") ? r += "/" : r.endsWith("/") && e.item.path.startsWith("/") && (r = r.slice(0, -1)), r += e.item.path), r;
    }), o = Y(() => e.item.value == d(t.value) || e.selected);
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
      return typeof O("router-link") != "string" ? "router-link" : typeof O("nuxt-link") != "string" ? "nuxt-link" : e.item.items && e.item.items.length ? "div" : "a";
    }
    return (r, m) => {
      const p = O("BIcon"), h = O("Item", !0);
      return f(), R(Le(a()), {
        key: r.item.value,
        class: A(["item", { selected: o.value }]),
        to: l.value,
        href: a() == "a" ? l.value : void 0
      }, {
        default: D(() => [
          P(vt, {
            class: A(["menu-item", { expanded: r.item.expanded, bold: r.bold }]),
            label: r.item.label,
            icon: r.item.icon,
            selected: o.value,
            disabled: r.item.disabled,
            onClick: m[0] || (m[0] = (y) => u(r.item))
          }, {
            default: D(() => [
              r.item.items && r.item.items.length ? (f(), R(p, {
                key: 0,
                name: "keyboard_arrow_down",
                class: A([{ "rotate-180": r.item.expanded }, "transition-transform"])
              }, null, 8, ["class"])) : T("", !0)
            ]),
            _: 1
          }, 8, ["class", "label", "icon", "selected", "disabled"]),
          P(ve, { name: "expand" }, {
            default: D(() => [
              r.item.items && r.item.items.length && r.item.expanded ? (f(), v("div", Or, [
                (f(!0), v(Q, null, le(r.item.items, (y) => (f(), R(h, {
                  modelValue: B(t),
                  "onUpdate:modelValue": m[1] || (m[1] = (w) => ne(t) ? t.value = w : null),
                  selected: r.item.selected,
                  "onUpdate:selected": m[2] || (m[2] = (w) => r.item.selected = w),
                  key: y.value,
                  item: y,
                  "get-object": r.getObject,
                  "parent-path": l.value,
                  bold: ""
                }, null, 8, ["modelValue", "selected", "item", "get-object", "parent-path"]))), 128))
              ])) : T("", !0)
            ]),
            _: 1
          })
        ]),
        _: 1
      }, 8, ["class", "to", "href"]);
    };
  }
}), Ur = /* @__PURE__ */ G(Wr, [["__scopeId", "data-v-8535f9fb"]]), jr = { class: "b-side-menu" }, Rr = /* @__PURE__ */ Z({
  __name: "BSideMenu",
  props: {
    modelValue: { default: void 0 },
    items: {},
    parentPath: { default: "" },
    getObject: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(n, { emit: s }) {
    ke((r) => ({
      b90e116e: l.value
    }));
    const e = n, c = s, [t] = se(e, "modelValue", c, ""), l = Y(() => {
      var r;
      if (document.readyState === "complete" || document.readyState === "interactive") {
        const m = (r = document.querySelector(".b-navbar")) == null ? void 0 : r.clientHeight;
        return m ? `calc(100vh - ${m}px)` : "100vh";
      }
      return "100vh";
    });
    ge(() => {
      const r = o(e.items, e.parentPath).find((m) => ut(m.path));
      r && d(r.value);
    });
    function o(r, m = "") {
      var h;
      const p = [];
      for (const y of r) {
        const w = m ? `${m}/${y.path}` : y.path;
        (h = y.items) != null && h.length ? p.push(...o(y.items, w)) : p.push({ path: w || "", value: y.value });
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
    return (r, m) => (f(), v("div", jr, [
      (f(!0), v(Q, null, le(r.items, (p) => (f(), R(Ur, {
        modelValue: B(t),
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
}), Fr = /* @__PURE__ */ G(Rr, [["__scopeId", "data-v-1c7f1f09"]]), _r = {
  install(n) {
    n.component("BSideMenu", Fr);
  }
}, Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BActionCard: zi,
  BAlert: Kl,
  BAutoComplete: dr,
  BAvatar: xr,
  BBreadcrumb: kr,
  BButton: Ot,
  BCard: Jl,
  BCardIcon: Ei,
  BCheckbox: pl,
  BCollapse: Sn,
  BColorPicker: gs,
  BConfirm: Fn,
  BContentScreen: Xs,
  BCrop: xi,
  BDate: pn,
  BDateComparator: Kn,
  BDateComparatorFilter: as,
  BDateFilter: kn,
  BDatePicker: er,
  BDialog: ea,
  BDivider: sr,
  BDropdown: hr,
  BExpandableContainer: ss,
  BFilter: wa,
  BGroup: wl,
  BHistory: ei,
  BIcon: Rl,
  BInput: Ua,
  BMenu: qa,
  BMetricCard: Gi,
  BMultiSelect: jl,
  BNavbar: Tr,
  BPagination: yi,
  BProfile: uo,
  BProgressBar: As,
  BRadio: yl,
  BRadioButton: Ml,
  BRangeSlider: ks,
  BRoundButton: Qt,
  BRoundMenu: Tn,
  BSelect: zl,
  BSelectContainer: Sl,
  BSideMenu: _r,
  BSidebar: zr,
  BSlider: Bs,
  BSmartSelect: rr,
  BSpinner: Yt,
  BStepOption: Ri,
  BStepper: Bo,
  BTab: So,
  BTable: Jo,
  BTag: hn,
  BTagInput: Us,
  BTagSelect: fi,
  BToast: qn,
  BToggle: nl,
  BTooltip: xn
}, Symbol.toStringTag, { value: "Module" })), Kr = {
  install(n) {
    const s = document.createElement("link");
    s.rel = "stylesheet", s.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200", document.head.appendChild(s);
    for (const t in Ye)
      n.use(Ye[t]);
    const e = (t) => new Promise((l) => {
      ce.emit("open-confirm", t);
      const o = () => {
        ce.off("confirm", o), ce.off("cancel", u), l(!0);
      }, u = () => {
        ce.off("confirm", o), ce.off("cancel", u), l(!1);
      };
      ce.on("confirm", o), ce.on("cancel", u);
    });
    n.config.globalProperties.$confirm = e, n.provide("confirm", e);
    const c = (t) => {
      const l = Date.now();
      return ce.emit("open-toast", { ...t, id: l }), t.timeout && setTimeout(() => {
        ce.emit("close-toast", l);
      }, t.timeout), l;
    };
    n.config.globalProperties.$toast = c, n.provide("toast", c);
  }
};
export {
  Kr as default,
  Zr as useClickOutside,
  se as useOptionalModel
};
