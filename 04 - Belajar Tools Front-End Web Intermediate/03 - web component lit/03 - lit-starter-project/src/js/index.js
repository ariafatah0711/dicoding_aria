import './components/my-element';

const myElement = document.querySelector('my-element');
const addAttrButton = document.querySelector('button#add-attribute');
const removeAttrButton = document.querySelector('button#remove-attribute');

addAttrButton.addEventListener('click', () => {
  myElement.setAttribute('name', 'ariafatah');
});

removeAttrButton.addEventListener('click', () => {
  myElement.removeAttribute('name');
});
