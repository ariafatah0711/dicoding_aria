class FooterApp extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
    <div class="title">
        <h1>Copyright &copy;2024 - Gurih Nusantara</h1>
    </div>
    <div class="footer-content">

    </div>
    `;
    this.tabIndex = 0;
  }
}

customElements.define("footer-app", FooterApp);
