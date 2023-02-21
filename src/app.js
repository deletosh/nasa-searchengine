//# 1. Bring in all DOM elements (#search-box & #images)
const searchBoxEl = document.querySelector('#search-box');
const imageResults = document.querySelector('#images');

// async/await [syntax]
// const allImages = await fetch(`https://images-api.nasa.gov/search?q=${event.target.value}`);
//
// console.log(allImages);
// console.log('hello');

async function getNASAImages(userInput) {
    const response = await fetch(`https://images-api.nasa.gov/search?q=${userInput}`);
    const data = await response.json()

    return data.collection.items;
}

//# 2a. listen for the "Enter" key press on the #search-box
function displayImage(image) {
    const div = document.createElement('div');

    div.classList.add('p-6', 'bg-amber-300', 'rounded-lg')
    div.innerHTML = `
     <img src="${image.links[0].href}">
      <p class="font-bold text-lg">${image.data[0].title}</p>
    <p class="text-xs">${image.data[0].description}</p>
    `
    imageResults.appendChild(div);

    //DOM Tree <<<
}

searchBoxEl.addEventListener('keypress', async (event) => {
    //# 2b.  listen the "Enter" on the keyboard

    if (event.key === 'Enter') {
        //# 3. When a user hits enter on their keyboard, send an API request to NASA to get all images
        const allNasaImages = await getNASAImages(event.target.value);

        const imagesToShow = allNasaImages.slice(0, 8);
        imagesToShow.forEach(image => displayImage(image));

    }

});
