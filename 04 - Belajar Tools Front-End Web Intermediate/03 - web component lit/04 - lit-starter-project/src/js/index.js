import './components/my-element';

const myElement = document.querySelector('my-element');
const changeNameBtn = document.querySelector('button#change-name');
const changeAgeBtn = document.querySelector('button#change-age');

changeNameBtn.addEventListener('click', () => {
  console.log('===== Ubah Nama =====');
  myElement.name = 'Dicoding fe';
});

changeAgeBtn.addEventListener('click', () => {
  console.log('===== Ubah Umur =====');
  myElement.age = 5;
});
