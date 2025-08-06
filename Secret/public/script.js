// script.js
const displayPhoto = document.getElementById('display-photo');
const generateBtn = document.getElementById('generate-btn');
const categoryBtns = document.querySelectorAll('.category-btn');

let currentCategory = 'dogs'; // let's start with dogs :3

function setActiveButton(category) {
  // remove 'active' from all buttons
  categoryBtns.forEach(btn => {
    btn.classList.remove('active');
  });
  // add 'active' to the one we just clicked
  const activeButton = document.querySelector(`.category-btn[data-category="${category}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

function generateNewPhoto() {
  // get the list of photos for the current category
  const photoList = photoData[currentCategory];

  if (!photoList || photoList.length === 0) {
    console.log(`omg there are no photos in the "${currentCategory}" category 😭`);
    displayPhoto.alt = `No photos found in '${currentCategory}' category!`;
    displayPhoto.src = ""; // clear the image
    return;
  }
  
  // pick a random photo from that list
  const randomIndex = Math.floor(Math.random() * photoList.length);
  const randomPhotoName = photoList[randomIndex];

  // set the image source with the correct folder path!
  displayPhoto.src = `photos/${currentCategory}/${randomPhotoName}`;
  displayPhoto.alt = `A cute photo from the ${currentCategory} category`;
}

// when we click a category button...
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    currentCategory = btn.dataset.category;
    setActiveButton(currentCategory);
    console.log(`vibe check: switched to ${currentCategory} category`);
    generateNewPhoto(); // generate a new pic from the new category right away!
  });
});

// when we click the big generate button...
generateBtn.addEventListener('click', generateNewPhoto);

// --- initial page load ---
// set the first button as active and load a pic to start
setActiveButton(currentCategory);
generateNewPhoto();