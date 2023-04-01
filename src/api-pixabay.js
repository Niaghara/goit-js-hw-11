'use strict';
import axios from 'axios';
// async function fetchPhotos(query, page, per_page) {
//   const params = new URLSearchParams({
//     key: '34813667-33d2158b793f196ed7f761dbf',
//     q: query,
//     page: page,
//     per_page: per_page,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   });

//   try {
//     const response = await axios.get(`https://pixabay.com/api/?${params}`);
   
//     return response.data;
//   } catch (error) {
   
//     throw new Error(error);
//   }
// }

// export default fetchPhotos;
export const fetchPhotos= (query, page) => {
    const key = '29439492-1518c1b443fd85c1e4954e288';

    const BASE_URL = 'https://pixabay.com/api/'

    return axios.get(`${BASE_URL}?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(res => res.data)
}
