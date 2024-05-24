import { LitElement, html } from 'lit';

class MyElement extends LitElement {
  static properties = {
    name: {
      type: String,
      hasChanged(newVal, oldVal) {
        console.log('name: hasChanged');
        return newVal !== oldVal;
      },
    },
    age: {
      type: Number,
      hasChanged(newVal, oldVal) {
        console.log('age: hasChanged');
        return newVal !== oldVal;
      },
    },
  };

  constructor() {
    console.log('constructor');
    super();

    this.name = 'ariafatah';
    this.age = 17;
  }

  // pra update
  requestUpdate(name, oldVal, newVal) {
    console.log('requestUpdate');
    super.requestUpdate(name, oldVal, newVal);
  }

  // updating
  performUpdate() {
    console.log('performUpdate');
    return super.performUpdate();
  }

  shouldUpdate(_changedProperties) {
    console.log('shouldUpdate');
    console.log(_changedProperties);
    return super.shouldUpdate(_changedProperties);
  }

  willUpdate(_changedProperties) {
    console.log('willUpdate');
    super.willUpdate(_changedProperties);
  }
  update(changedProperties) {
    console.log('update');
    super.update(changedProperties);
  }

  render() {
    console.log('render');
    return html`
      <p>Selamat datang!</p>
      <p>${this.name}, ${this.age}</p>
    `;
  }

  // Post Update
  firstUpdated(_changedProperties) {
    console.log('firstUpdated');
    super.firstUpdated(_changedProperties);
  }
  updated(_changedProperties) {
    console.log('updated');
    super.updated(_changedProperties);
  }
}

customElements.define('my-element', MyElement);
