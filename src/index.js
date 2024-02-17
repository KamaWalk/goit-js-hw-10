
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const breedSelect = document.querySelector('.breed-select');
const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const errorParagraph = document.querySelector('.error');
let slimSelect;

const showLoader = show => {
  loader.style.display = show ? 'block' : 'none';
};

const showError = show => {
  errorParagraph.style.display = show ? 'block' : 'none';
};

const updateCatInfo = (catData) => {
  catInfoDiv.innerHTML = 
  `<div class="cat_div">
    <img class="cat_img" src="${catData.url}" alt="Cat image">
    <div class="cat_information">
    <p class="cat_name"><span>Name:</span> ${catData.breeds[0].name}</p>
    <p class="cat_description"><span>Description:</span> ${catData.breeds[0].description}</p>
    <p class="cat_temperament"><span>Temperament:</span> ${catData.breeds[0].temperament}</p>
    </div>
    </div>
  `;
};

const displayCatInfo = async breedId => {
  showLoader(true);
  showError(false);
  try {
    const catData = await fetchCatByBreed(breedId);
    updateCatInfo(catData);
  } catch (error) {
    console.error(error);
    showError(true);
  } finally {
    showLoader(false);
  }
};

const updateBreedOptions = async () => {
  showLoader(true);
  showError(false);
  try {
    const breeds = await fetchBreeds();
    slimSelect.setData(breeds.map(breed => ({ text: breed.name, value: breed.id })));
  } catch (error) {
    console.error(error);
    showError(true);
  } finally {
    showLoader(false);
  }
};

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;
  displayCatInfo(selectedBreedId);
});

window.onload = () => {
  slimSelect = new SlimSelect({
    select: breedSelect
  });
  updateBreedOptions();
};