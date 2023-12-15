class ImageFigure extends HTMLElement {
  constructor() {
    super();
    console.log("constructed!");
  }

  connectedCallback() {
    this.src = this.getAttribute("src") || null;
    this.alt = this.getAttribute("alt") || null;
    this.caption = this.getAttribute("caption") || null;
    this.render(); // =>
  }

  render() {
    this.innerHTML = `
            <figure>
            <img src="${this.src}" alt="${this.alt}">
            <figcaption>${this.caption}</figcaption>
            </figure>
        `;
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return [`caption`, `src`, `alt`];
  }
}

customElements.define("image-figure", ImageFigure);

// // ubah nilai
const element = document.querySelector("image-figure");
element.setAttribute("caption", "aria fatah anom");
