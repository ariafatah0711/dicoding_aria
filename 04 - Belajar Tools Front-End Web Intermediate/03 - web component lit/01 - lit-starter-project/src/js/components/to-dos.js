import { LitElement, html, css } from 'lit';

class ToDos extends LitElement {
  static properties = {
    ordered: {
      type: Boolean,
      Reflect: true,
    },
    todos: {
      type: Array,
      Reflect: true,
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
    return html` ${this.ordered ? this._templateOrderedList() : this._templateUnorderedList()} `;
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
        <span class="todo-title"> ${todo.title} </span>
        <button @click=${() => this._completeTodo(todo)}>
          ${todo.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
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
