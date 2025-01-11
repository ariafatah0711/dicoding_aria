import { LitElement, html, css } from 'lit';

class MyElement extends LitElement {
  static properties = {
    minPasswordLength: {
      type: Number,
    },
    freeze: {
      type: Boolean,
    },
    withPlaceholder: {
      type: Boolean,
    },
  };

  static styles = css`
    form > div {
      margin-block-end: 8px;
    }

    label,
    input {
      display: block;
    }
  `;

  constructor() {
    super();
    this.minPasswordLength = 8;
  }

  render() {
    return html`
      <form>
        <div>
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            ?readonly=${this.freeze}
            placeholder=${this.withPlaceholder ? 'Masukan email' : nothing}
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            ?readonly=${this.freeze}
            minlength=${this.minPasswordLength}
            placeholder=${this.withPlaceholder ? 'Masukan password' : nothing}
          />
        </div>

        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    `;
  }
}

customElements.define('my-element', MyElement);
