import './components/title-app';
import './components/to-dos';

const todoContainer = document.querySelector('#todo-container');
const todos = [
  {
    title: 'Belajar CSS Preprocessor dengan Sass',
    completed: true,
  },
  {
    title: 'Belajar CSS Framework dengan Bootstrap',
    completed: true,
  },
  {
    title: 'Belajar Lit Dasar',
    completed: false,
  },
  {
    title: 'Belajar HTTP Client dengan Axios',
    completed: false,
  },
  {
    title: 'Belajar Lit Lanjutan',
    completed: false,
  },
  {
    title: 'Belajar Firebase untuk Aplikasi Web',
    completed: false,
  },
];

todoContainer.setAttribute('todos', JSON.stringify(todos));
