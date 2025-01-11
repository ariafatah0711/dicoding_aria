class ImageFigure extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.src = this.getAttribute("src") || null;
    this.alt = this.getAttribute("alt") || null;
    this.caption = this.getAttribute("caption") || null;
    this.render();
  }

  render() {
    // shadowRoot => saat kita mengubah style yang ada pada element shadow kita harus mengubahnya menggunakan shadowRoot.innerHTML
    this.shadowRoot.innerHTML = `
        <style>
            figure {
                border: thin #c0c0c0 solid;
                display: flex;
                flex-flow: column;
                padding: 5px;
                max-width: 220px;
                margin: auto;
            }

            figure > img {
                max-width: 220px;
            }

            figure > figcaption {
                background-color: #222;
                color: #fff;
                font: italic smaller sans-serif;
                padding: 3px;
                text-align: center;
            }
        </style>

        <figure>
            <img src="${this.src}" alt="${this.alt}">
            <figcaption>${this.caption}</figcaption>
        </figure>
    `;
  }

  attributeChangeCallback(name, oldValue, newValue) {
    this[name] = newValue;
    this.render();
  }

  static get observedAttributes() {
    return ["caption"];
  }
}

customElements.define("image-figure", ImageFigure);
