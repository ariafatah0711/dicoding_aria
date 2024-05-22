npm install lit --save-exact


contoh penggunaan
```
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

```
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

```
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
```

```
import { nothing } from 'lit';
 
this.imagePath = 'img/users/user-01';
html`<img src="/images/${this.imagePath ?? nothing}/${this.imageFile ?? nothing}">`;
```

