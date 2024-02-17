import axios from 'axios';


  axios.defaults.headers.common['x-api-key'] =
    'live_3WqxKBPPm7Nhb7bH6v5KJekaENAwu83GPEJU9IDPWyNtMxR4uV3pJr6uxDYogigc';

export const fetchBreeds = async () => {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    console.error('Błąd podczas pobierania ras:', error);
  }
};

export const fetchCatByBreed = async breedId => {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    return response.data[0];
  } catch (error) {
    console.error('Błąd podczas pobierania informacji o kocie:', error);
  }
};