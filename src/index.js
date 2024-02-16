// import axios from "axios";

// axios.defaults.headers.common["x-api-key"] = "live_XAq27iNex6cclMdmKz5SxY5xMqDkBV0phNZLRfz4efEBAxdGHL5XqFvXQF1ML7CE";

// const fetchBreedSelect = document.querySelector(".breed-select");

// fetchBreedSelect.addEventListener("select", () => {
//     fetchBreeds()
//     .then((breed) => renderBreeds(breed))
//     .catch((error) => console.log(error))
// });

// function fetchBreeds() {
//     return fetch("https://api.thecatapi.com/v1/breeds")
//     .then(
//       (response) => {
//         if (!response.ok) {
//           throw new Error(response.status);
//         }
//         return response.json();
//       }
//     );
//   };



import { fetchBreeds, fetchCatByBreed } from './cat-api';
// import SlimSelect from 'slim-select';

// new SlimSelect({
//   select: '#select'
// });

const breedSelect = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');

try {
  loader.classList.remove('hidden');
  fetchBreeds().then(data => renderSelect(data));
} catch (error) {
  console.log(error);
}

function renderSelect(breeds) {
  const markup = breeds
    .map(({ id, name }) => {
      return `<option value="${id}">${name}</option>`;
    })
    .join('');
  breedSelect.insertAdjacentHTML('beforeend', markup);
  loader.classList.add('hidden');
}

breedSelect.addEventListener('change', e => {
  loader.classList.remove('hidden');
  fetchCatByBreed(e.target.value).then(data => renderCat(data[0]));
});

function renderCat(catData) {
  const { url } = catData;
  const { description, name, temperament } = catData.breeds[0];
  catInfo.insertAdjacentHTML(
    'beforeend',
    `<div>
        <h2>${name}</h2>
        <img src="${url}" alt="${name}" />
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
    </div>`
  );
  loader.classList.add('hidden');
}