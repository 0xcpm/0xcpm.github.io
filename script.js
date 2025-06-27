/*document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");

  menuIcon.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});
// Update root html class to set CSS colors
  const toggleDarkMode = () => {
    const root = document.querySelector('html');
    root.classList.toggle('dark');
  }

  // Update local storage value for colorScheme
  const toggleColorScheme = () => {
    const colorScheme = localStorage.getItem('colorScheme');
    if (colorScheme === 'light') localStorage.setItem('colorScheme', 'dark');
    else localStorage.setItem('colorScheme', 'light');
  }

  // Set toggle input handler
  const toggle = document.querySelector('#color-mode-switch input[type="checkbox"]');
  if (toggle) toggle.onclick = () => {
    toggleDarkMode();
    toggleColorScheme();
  }

  // Check for color scheme on init
  const checkColorScheme = () => {
    const colorScheme = localStorage.getItem('colorScheme');
    // Default to light for first view
    if (colorScheme === null || colorScheme === undefined) localStorage.setItem('colorScheme', 'light');
    // If previously saved to dark, toggle switch and update colors
    if (colorScheme === 'dark') {
      toggle.checked = true;
      toggleDarkMode();
    }
  }
  checkColorScheme();
*/

const gallery = document.querySelector('.gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let currentIndex;

const images = Array.from(gallery.querySelectorAll('img'));

function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.style.display = 'block';
}

function closeLightbox() {
    lightbox.style.display = 'none';
}

function showPrev() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    lightboxImg.src = images[currentIndex].src;
}

function showNext() {
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    lightboxImg.src = images[currentIndex].src;
}

images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);

document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'block') {
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
        if (e.key === 'Escape') closeLightbox();
    }
});

  // Close when clicking outside the image
    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            lightboxImage.src = '';
        }
    });

