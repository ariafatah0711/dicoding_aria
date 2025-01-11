- nonaktifkan shadow root
```javascript
import { LitElement, html } from 'lit';
 
class MyElement extends LitElement {
  createRenderRoot() {
    return this;
  }
 
  render() {
    return html` 
      <h1>Hello, World!</h1> 
    `;
  }
}
 
customElements.define('my-element', MyElement);
```

- slot
```javascript
import { LitElement, html } from 'lit';
 
class MyElement extends LitElement {
  render() {
    return html`
      <div>
        <slot name="one"></slot>
        <slot name="two"></slot>
        <slot></slot>
      </div>
    `;
  }
}
 
customElements.define('my-element', MyElement);
```

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <my-element>
      <p slot="two">Elemen ini akan diletakkan pada slot bernama two</p>
    </my-element>
 
    <hr>
 
    <my-element>
      <p slot="one">Elemen ini akan diletakkan pada slot bernama one</p>
      <p slot="nope">Elemen ini tidak akan di-render karena tidak ada slot bernama nope</p>
      <p>Elemen ini akan dimunculkan pada slot default (elemen slot tak bernama)</p>
    </my-element>

    <script src="src/index.js"></script>
  </body>
</html>
```

- menangkap slot
```javascript
import { LitElement, html } from 'lit';
 
class MyElement extends LitElement {
  render() {
    return html`
      <div>
        <slot></slot>
      </div>
 
      <button @click=${this._getSlottedChildren}>Get Element</button>
    `;
  }
 
  _getSlottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    console.log(slot);
  }
}
 
customElements.define('my-element', MyElement);
```

- mengambil children slot
```html
    <my-element>
      <h1>Dicoding</h1>
    </my-element>
```

```javascript
  _getSlottedChildren() {
    const slot = this.shadowRoot.querySelector('slot');
    console.log(slot.assignedElements());
  }
```

- style css
```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <my-element></my-element>
    <my-element class="blue"></my-element>

    <script src="src/index.js"></script>
  </body>
</html>
```

```javascript
/* selector host */
class MyElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      background-color: lightgray;
      padding: 8px;
    }
 
    :host(.blue) {
      background-color: aqua;
    }
  `;
 
  render() {
    return html` Hello, World! `;
  }
}
```

```html
<!DOCTYPE html>
<html lang="en">
  <body>
    <my-element>
      <div>
        <a href="https://www.dicoding.com/">Dicoding Indonesia</a>
      </div>
      <p slot="one">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta, similique.</p>
    </my-element>

    <script src="src/index.js"></script>
  </body>
</html>
```

```javascript
class MyElement extends LitElement {
  static styles = css`
    ::slotted(*) {
      font-family: 'Roboto', sans-serif;
    }
 
    ::slotted(div) {
      text-align: center;
    }
 
    div ::slotted(*) {
      color: red;
    }
  `;
 
  render() {
    return html`
      <slot></slot>
      <div>
        <slot name="one"></slot>
      </div>
    `;
  }
}
```

