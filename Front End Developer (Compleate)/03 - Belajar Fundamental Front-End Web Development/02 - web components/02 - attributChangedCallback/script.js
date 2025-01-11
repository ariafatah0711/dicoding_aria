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
  
              <style>
                figure {
                  border: 1px solid black;
                  padding: 10px; width: auto;
                }
              </style>
              `;
    // atau gunakan lewat external css
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    this[name] = newValue;
    this.render();
  }

  // getter static untuk mengamati attribut caption, src, alt
  static get observedAttributes() {
    return [`caption`, `src`, `alt`];
  }
}

customElements.define("image-figure", ImageFigure);

// // ubah nilai
const element = document.querySelector("image-figure");
element.setAttribute("caption", "aria fatah anom");
