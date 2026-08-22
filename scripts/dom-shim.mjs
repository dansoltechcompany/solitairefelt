/** Minimal DOM for engine boot tests — no jsdom dependency. */
class NodeList extends Array {
  item(i) { return this[i] ?? null; }
}

class Style {
  constructor(el) { this._el = el; }
  setProperty(k, v) { this._el.style[k] = v; }
}

class Element {
  constructor(tag) {
    this.tagName = tag.toUpperCase();
    this.nodeName = this.tagName;
    this.nodeType = 1;
    this.childNodes = [];
    this.style = makeStyle();
    this.dataset = {};
    this.attributes = {};
    this.className = "";
    this.classList = makeClassList(this);
    this._html = "";
    this.textContent = "";
    this.parentNode = null;
    this.onclick = null;
    this.oninput = null;
    this.value = "";
    this.type = "";
    this.disabled = false;
    this.readOnly = false;
  }
  focus() {}
  blur() {}
  append(...nodes) {
    nodes.flat().forEach((n) => this.appendChild(n));
  }
  appendChild(n) {
    if (!n) return n;
    if (n.parentNode) n.parentNode.childNodes = n.parentNode.childNodes.filter((c) => c !== n);
    this.childNodes.push(n);
    n.parentNode = this;
    return n;
  }
  remove() {
    if (this.parentNode) {
      this.parentNode.childNodes = this.parentNode.childNodes.filter((c) => c !== this);
      this.parentNode = null;
    }
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k] ?? null; }
  querySelector(sel) {
    const all = this.querySelectorAll(sel);
    return all[0] ?? null;
  }
  querySelectorAll(sel) {
    const out = [];
    const walk = (n) => {
      if (n !== this && n.matches?.(sel)) out.push(n);
      n.childNodes.forEach(walk);
    };
    walk(this);
    return new NodeList(...out);
  }
  matches(sel) {
    if (sel === "textarea") return this.tagName === "TEXTAREA";
    if (sel === "p") return this.tagName === "P";
    if (sel === "button") return this.tagName === "BUTTON";
    if (sel.startsWith(".")) return this.className.split(/\s+/).includes(sel.slice(1));
    return false;
  }
  set innerHTML(html) {
    this._html = html;
    this.childNodes = [];
    const doc = globalThis.document;
    if (!doc) return;
    if (html.includes('class="kb"')) {
      const wrap = doc.createElement("div");
      wrap.className = "word-box";
      const kb = doc.createElement("div");
      kb.className = "kb";
      wrap.appendChild(kb);
      this.appendChild(wrap);
      return;
    }
    if (html.includes("<textarea")) {
      const wrap = doc.createElement("div");
      wrap.className = "type-box";
      wrap.appendChild(doc.createElement("p"));
      wrap.appendChild(doc.createElement("textarea"));
      this.appendChild(wrap);
    }
  }
  get innerHTML() { return this._html || ""; }
  click() { if (this.onclick) this.onclick({ target: this }); }
  addEventListener(type, fn) {
    if (type === "click") this.onclick = fn;
  }
  get elements() {
    return this.childNodes.filter((n) => n.nodeType === 1);
  }
}

class TextNode {
  constructor(text) {
    this.nodeType = 3;
    this.textContent = text;
  }
}

class Canvas extends Element {
  constructor() {
    super("canvas");
    this.width = 800;
    this.height = 600;
  }
  getContext() {
    const noop = () => {};
    return {
      drawImage: noop, fillRect: noop, strokeRect: noop, clearRect: noop,
      beginPath: noop, moveTo: noop, lineTo: noop, arc: noop, closePath: noop,
      stroke: noop, fill: noop, save: noop, restore: noop, translate: noop,
      rotate: noop, scale: noop, setTransform: noop, clip: noop, rect: noop,
      createLinearGradient() { return { addColorStop: noop }; },
      measureText() { return { width: 10 }; },
      fillText: noop, strokeText: noop,
      getImageData() { return { data: new Uint8ClampedArray(4) }; },
      putImageData: noop,
      canvas: this
    };
  }
  toDataURL() { return "data:image/png;base64,"; }
}

function makeStyle() {
  const s = { _map: {} };
  s.setProperty = (k, v) => { s._map[k] = v; s[camel(k)] = v; };
  s.getPropertyValue = (k) => s._map[k] ?? "";
  s.removeProperty = (k) => { delete s._map[k]; delete s[camel(k)]; };
  return s;
}

function camel(k) {
  return k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

function makeClassList(el) {
  return {
    add(...names) {
      const set = new Set(el.className.split(/\s+/).filter(Boolean));
      names.forEach((n) => set.add(n));
      el.className = [...set].join(" ");
    },
    remove(...names) {
      const set = new Set(el.className.split(/\s+/).filter(Boolean));
      names.forEach((n) => set.delete(n));
      el.className = [...set].join(" ");
    },
    toggle(n) { this.contains(n) ? this.remove(n) : this.add(n); },
    contains(n) { return el.className.split(/\s+/).includes(n); }
  };
}

class Document {
  constructor(body) {
    this.body = body;
    this.documentElement = body;
    this._byId = new Map();
  }
  createElement(tag) {
    if (tag === "canvas") return new Canvas();
    if (tag === "input") {
      const el = new Element("input");
      el.value = "";
      el.type = "text";
      return el;
    }
    if (tag === "button") return new Element("button");
    if (tag === "textarea") {
      const el = new Element("textarea");
      el.readOnly = false;
      return el;
    }
    const el = new Element(tag);
    return el;
  }
  getElementById(id) {
    if (!this._byId.has(id)) {
      const el = new Element("div");
      el.id = id;
      this._byId.set(id, el);
      this.body.appendChild(el);
    }
    return this._byId.get(id);
  }
  addEventListener() {}
  createTextNode(t) { return new TextNode(t); }
}

class Storage {
  constructor() { this._d = {}; }
  getItem(k) { return this._d[k] ?? null; }
  setItem(k, v) { this._d[k] = String(v); }
  removeItem(k) { delete this._d[k]; }
}

export function createDom() {
  const body = new Element("body");
  body.dataset.root = ".";
  const document = new Document(body);
  const localStorage = new Storage();
  const location = { pathname: "/index.html", href: "http://localhost/" };
  const window = {
    document,
    localStorage,
    location,
    BA: {
      games: {},
      root: ".",
      mulberry(seed) {
        let s = seed | 0;
        return function () {
          s = (s + 0x6D2B79F5) | 0;
          let t = Math.imul(s ^ (s >>> 15), 1 | s);
          t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
          return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
      },
      todaySeed() {
        const d = new Date();
        return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
      }
    },
    eval(code) { return globalThis.eval(code); },
    setTimeout(fn) { fn(); return 0; },
    clearInterval() {},
    setInterval() { return 0; },
    Math,
    Date,
    JSON,
    Array,
    Object,
    String,
    Number,
    parseInt,
    parseFloat,
    isNaN,
    console,
    HTMLElement: Element,
    Image: class { set src(_v) { if (this.onload) this.onload(); } },
    requestAnimationFrame(fn) { fn(); return 0; },
    addEventListener() {},
    removeEventListener() {}
  };
  window.BA = window.BA;
  return { window, document, localStorage };
}
