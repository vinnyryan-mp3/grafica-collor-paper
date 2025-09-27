const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.indicators');

let index = 0;
let visibleCards = getVisibleCards();
const totalCards = document.querySelectorAll('.card').length;
let cardWidth = document.querySelector('.card').offsetWidth + 20;
let totalPages = Math.ceil(totalCards / visibleCards);

function getVisibleCards() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

// Recalcular ao redimensionar
window.addEventListener("resize", () => {
  visibleCards = getVisibleCards();
  cardWidth = document.querySelector('.card').offsetWidth + 20;
  totalPages = Math.ceil(totalCards / visibleCards);
  index = 0;
  updateCarousel();
});

// Criar indicadores
function createIndicators() {
  indicatorsContainer.innerHTML = "";
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      index = i * visibleCards;
      updateCarousel();
    });
    indicatorsContainer.appendChild(dot);
  }
}
createIndicators();

const dots = () => indicatorsContainer.querySelectorAll('button');

function updateCarousel() {
  carousel.style.transform = `translateX(${-cardWidth * index}px)`;

  dots().forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === Math.floor(index / visibleCards)) {
      dot.classList.add('active');
    }
  });
}

function nextSlide() {
  if (index < totalCards - visibleCards) {
    index += visibleCards;
  } else {
    index = 0;
  }
  updateCarousel();
}

function prevSlide() {
  if (index > 0) {
    index -= visibleCards;
  } else {
    index = (totalPages - 1) * visibleCards;
  }
  updateCarousel();
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Autoplay
let autoPlayInterval = setInterval(nextSlide, 3000);

carousel.parentElement.addEventListener('mouseenter', () => {
  clearInterval(autoPlayInterval);
});

carousel.parentElement.addEventListener('mouseleave', () => {
  autoPlayInterval = setInterval(nextSlide, 3000);
});
