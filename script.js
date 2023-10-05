const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded= 0;
let totalImages = 0;
let photosArray = [];

// code clean up with lines on highlight
// let isInitialLoad = true;

// UNSPLASH API 

// lines on highlight
// let initialCount = 5;  

let count = 5;
const apiKey = 'W8CxJuNgxkqXSlPH8teZmnsNKW8ZqeY4onkBmLDSDSg';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// lines on highlight
// function updateAPIURLWithNewCount (picCount) {
//     apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
// }

// check if all images were loaded 
function imageLoaded() {
    imagesLoaded++;
    // console.log(imagesLoaded);
    if ( imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        // console.log('ready =', ready);
        count = 30;
        apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}

// helper function to set attributes on dom element
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key,attributes[key]);
    }
}

// create elements for links & photos, add to dom 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);

    // run function for each object in photosArray 
    photosArray.forEach((photo) => {

        // create <a> to link unsplash 
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // create <img> for photo 
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // event listener, check when each is finished loading 
        img.addEventListener('load', imageLoaded);

        // put <img> inside <a>, then put both inside imagecontainer element 
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();

        // lines on highlight
        // if (isInitialLoad) {
        //     updateAPIURLWithNewCount(30);
        //     isInitialLoad = false;
        // }
    } catch (error) {
        // catch error here 
        console.log('not loading api'); 
    }
}


// check to see if scrolling near bottom of page, load more photos 
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


// on load 
getPhotos();