"use strict"
import './css/styles.css';
import { fetchPhotos } from './api-pixabay.js';
import createGalleryCards from './templates/gallery-card.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { onScroll, onToTopBtn } from './scroll';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


// const fetchPhotos = (query, page) => {
//     const key = '34813667-33d2158b793f196ed7f761dbf';

//     const BASE_URL = 'https://pixabay.com/api/'

//     return axios.get(`${BASE_URL}?key=${key}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`).then(res => res.data)
// }

const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.btn-load-more')
}

let page = 1;
let searchQuery = '';

const hideLoadMoreBtn = () => {
    refs.loadMoreBtn.classList.add('is-hidden');
}

const showLoadMoreBtn = () => {
    refs.loadMoreBtn.classList.remove('is-hidden');
}

const renderImagesList = (evt) => {
    evt.preventDefault();
    hideLoadMoreBtn();
    
    page = 1;

    refs.gallery.innerHTML = '';

    searchQuery = evt.target.searchQuery.value.trim();

    if (!searchQuery) {
        Notify.info('Fill the form for searching');
        return;
    }
    

    fetchPhotos(searchQuery, page).then(res => {        

        if (!res.hits[0]) {            
             Notify.failure('Sorry, there are no images matching your search query. Please try again.');
            return;
        }

        refs.gallery.insertAdjacentHTML('beforeend', createGalleryCards(res.hits));
        Notify.success(`Hooray! We found ${res.totalHits} images.`)
        
        const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionPosition: 'bottom', captionDelay: 300 })

        if (res.hits.length < 40) {
            return;
        }        
        
        showLoadMoreBtn()       
    })
}

const addMoreImages = () => {
    page += 1;

    fetchPhotos(searchQuery, page).then(res => {        
        
        refs.gallery.insertAdjacentHTML('beforeend', createGalleryCards(res.hits));

        const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionPosition: 'bottom', captionDelay: 250 })

        if (res.totalHits === refs.gallery.childElementCount) {
            hideLoadMoreBtn();
            Notify.info('We`re sorry, but you`ve reached the end of search results.')
            return;
        }

        showLoadMoreBtn();
       Notify.success(`Hooray! We found ${totalHits} images.`);
})
}


refs.form.addEventListener('submit', renderImagesList);

refs.loadMoreBtn.addEventListener('click', addMoreImages);

onScroll();
onToTopBtn();
