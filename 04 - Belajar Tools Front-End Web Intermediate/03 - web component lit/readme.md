npm install lit --save-exact


contoh penggunaan
```javascript
import { LitElement, html, css } from 'lit';

class MyElement extends LitElement {
  static styles = css`
    p {
      color: green;
    }
  `;
 
  render() {
    return html`
      <p>Saya adalah paragraf berwarna hijau!</p>
    `;
  }
}

customElements.define('my-element', MyElement);
```

```javascript
import { LitElement, html, css } from 'lit';
 
class ToDos extends LitElement {
  static properties = {
    ordered: {
      type: Boolean,
      reflect: true,
    },
 
    todos: {
      type: Array,
      reflect: true,
    },
  };
 
  static styles = css`
    li[completed] {
      text-decoration: line-through;
      color: gray;
    }
    
    li .todo-title {
      margin-inline-end: 4px;
    }
  `;
 
  constructor() {
    super();
    this.ordered = false;
  }
 
  render() {
    return html`
      ${this.ordered ? this._templateOrderedList() : this._templateUnorderedList()}
    `;
  }
 
  _templateOrderedList() {
    return html`
      <ol>
        ${this.todos.map((item) => this._templateListItem(item))}
      </ol>
    `;
  }
 
  _templateUnorderedList() {
    return html`
      <ul>
        ${this.todos.map((item) => this._templateListItem(item))}
      </ul>
    `;
  }
 
  _templateListItem(todo) {
    return html`
      <li ?completed=${todo.completed}>
        <span class="todo-title">
          ${todo.title}
        </span>
        <button @click=${() => this._completeTodo(todo)}>
          ${todo.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai' }
        </button>
      </li>
    `;
  }
 
  _completeTodo(todo) {
    todo.completed = !todo.completed;
    this.requestUpdate();
  }
}
 
customElements.define('to-dos', ToDos);
```

```javascript
class MyElement extends LitElement {
  static properties = {
    myProperty: {
      attribute: true,
    },

    myProperty: {
      type: String,
    },

    type: String,
    myProperty: {
      converter: {
        fromAttribute(value, type) {
          return type(value);
        },
        toAttribute(value, type) {
          return type(value);
        },
      },
    },

    myProperty: {
      type: String,
      reflect: true,
    },

    myProperty: {
      type: String,
      hasChanged(newVal, oldVal) {
        return newVal?.toLowerCase() !== oldVal?.toLowerCase();
      }

      myProperty: {
        type: String,
        noAccessor: true,
      },

      _myProperty: {
        type: String,
        state: true,
      },
    };
  }
}
```

```javascript
import { nothing } from 'lit';
 
this.imagePath = 'img/users/user-01';
html`<img src="/images/${this.imagePath ?? nothing}/${this.imageFile ?? nothing}">`;
```

```javascript
class MyElement extends LitElement { 
  constructor() {
    super();
    this.foo = 'foo';
    this.bar = 'bar';
  }
}

class MyElement extends LitElement {
  connectedCallback() {
    super.connectedCallback()
    window.addEventListener('keydown', () => { /* ... */ }); 
  }
}

class MyElement extends LitElement {
  connectedCallback() { /* ... */ }
 
  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('keydown', () => { /* ... */ });
  }
}
```

```javascript
<element @nama_event=${this._eventHandler} /> 

  static properties = {
    color: {
      attribut: false,
    },
  };

  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <p>
        <input type="color" @input=${(event) => (this.color = event.target.value)} />
      </p>
      <button @click=${this._aplyInputColor}>Terapkan</button>
      <button @click=${this._changeBackgroundClick}>Warna Acak</button>
    `;
  }

  _aplyInputColor() {
    document.body.style.backgroundColor = this.color;
  }

  _changeBackgroundClick() {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    document.body.style.backgroundColor = `#${randomColor}`;
  }
```

```javascript
tatic properties = {
    users: { type: Array },
  };
 
  constructor() {
    super();
    this.users = [
      {
        name: 'Nur Rizki Adi Prasetyo',
        expertise: 'Front-End Web',
      },
      {
        name: 'Dimas Maulana Dwi Saputra',
        expertise: 'Back-End (NodeJS)',
      },
      {
        name: 'Fikri Helmi Setiawan',
        expertise: 'Cloud Computing',
      },
    ];
  }

   ${this.users.map(({name, expertise}) => {
            return html`
              <tr>
                <td>${name}</td>
                <td>${expertise}</td>
              </tr>
            `;
          })}
```
