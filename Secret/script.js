// script.js
const displayPhoto = document.getElementById('display-photo');
const generateBtn = document.getElementById('generate-btn');
const categoryBtns = document.querySelectorAll('.category-btn');

let currentCategory = 'Dogs'; // lets start with a cute dog pic :3

function setActiveButton(category) {
  // make all buttons not active
  categoryBtns.forEach(btn => {
    btn.classList.remove('active');
  });
  // make the one we just clicked active
  const activeButton = document.querySelector(`.category-btn[data-category="${category}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }
}

function generateNewPhoto() {
  // get the list of photos for the current category from our data.js file
  const photoList = photoData[currentCategory];

  if (!photoList || photoList.length === 0) {
    console.log(`omg there are no photos in the "${currentCategory}" category 😭`);
    displayPhoto.alt = `No photos found in '${currentCategory}' category!`;
    displayPhoto.src = ""; // clear the image if the list is empty
    return;
  }
  
  // pick a random photo from that list
  const randomIndex = Math.floor(Math.random() * photoList.length);
  const randomPhotoName = photoList[randomIndex];

  // ✨ IMPORTANT ✨: this creates the correct path like "Dogs/photos/image_1.jpg"
  displayPhoto.src = `${currentCategory}/photos/${randomPhotoName}`;
  displayPhoto.alt = `A cute photo from the ${currentCategory} category`;
}

// when we click a category button...
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // update the current category based on the button's data attribute
    currentCategory = btn.dataset.category;
    setActiveButton(currentCategory);
    console.log(`vibe check: switched to ${currentCategory} category`);
    generateNewPhoto(); // get a new pic from the new category right away!
  });
});

// when we click the big generate button...
generateBtn.addEventListener('click', generateNewPhoto);


// --- what happens when the page first loads ---
// set the first button as active
setActiveButton(currentCategory);
// and show a cute dog pic to start!
generateNewPhoto();