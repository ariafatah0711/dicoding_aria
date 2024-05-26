import { html, LitElement } from 'lit';
import { msg, str, updateWhenLocaleChanges } from '@lit/localize';

class MyElement extends LitElement {
  static properties = {
    name: {},
  };

  constructor() {
    super();
    updateWhenLocaleChanges(this);

    this.name = 'John Doe';
  }

  render() {
    return html`
      <h1>${msg(str`Welcome, ${this.name}!`)}</h1>
      <p>${msg(`I hope you are in good condition`)}</p>
      <p>
        ${msg(html` Please visit
          <a href="https://www.dicoding.com/" target="_blank">this site</a> to be professional
          programmer`)}
      </p>
    `;
  }
}

customElements.define('my-element', MyElement);
