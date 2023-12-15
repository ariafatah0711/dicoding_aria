class ImageFigure extends HTMLElement {
  constructor() {
    super();
    console.log("constructed!");
  }

  connectedCallback() {
    console.log("connected!");

    this.src = this.getAttribute("src") || null;
    this.alt = this.getAttribute("alt") || null;
    this.caption = this.getAttribute("caption") || null;

    this.innerHTML = `
      <figure>
        <img src="${this.src}" alt="${this.alt}">
        <figcaption>${this.caption}</figcaption>
      </figure>
    `;
  }

  disconnectedCallback() {
    console.log("disconnected!");
  }

  adoptedCallback() {
    console.log("adopted!");
  }

  attributeChangedCallback(name, oldvalue, newValue) {
    console.log(`Attribut: ${name} Changed!`);
  }

  // digunakan untuk mengamati perubahan nilai attribute caption
  /* kita bisa menetapkan lebih dari satu atribut yang diamati.
       dengan memisahkan nama atribut menggunakan koma. Contoh: */

  //   return [`caption`, `title`, `src`. ...]
  static get observedAttributes() {
    return [`caption`];
  }
}

customElements.define("image-figure", ImageFigure);

// ubah nilai
const element = document.querySelector("image-figure");
element.setAttribute("caption", "aria fatah anom");
// tidak keubah meskipun di element itu telah berganti attributnya
// namun jika kita telah mengimplementasi kan function attributChangedCallback
// itu akan berhasil
