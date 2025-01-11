import { LitElement, html } from 'lit';

class MyElement extends LitElement {
  static properties = {
    name: {
      type: String,
      reflect: true,

      converter: {
        fromAttribute(value, type) {
          console.log('fromAttribute');
          if (value) {
            return type(value).toLowerCase();
          }
          return value;
        },
        toAttribute(value) {
          console.log('toAttribute');
          return String(value).toUpperCase();
        },
      },
    },
  };

  render() {
    let templates;
    if (this.name) {
      templates = html`
        <p>Selamat datang, ${this.name}</p>
        <p>
          <button @click=${this._logout}>Keluar</button>
        </p>
      `;
    } else {
      templates = html`
        <p>Silakan masuk terlebih dulu:</p>
        <p>
          <button @click=${this._login}>Masuk</button>
        </p>
      `;
    }

    return templates;
  }

  _login() {
    // const nama = prompt();
    // this.name = nama;
    this.name = 'ariafatah';
  }

  _logout() {
    this.name = null;
  }
}

customElements.define('my-element', MyElement);
