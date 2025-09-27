// === SCROLL REVEAL ===
function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 100;

    if (elementTop < windowHeight - elementVisible) {
      el.classList.add("active");
    } else {
      el.classList.remove("active"); // opcional: pode comentar se não quiser sumir
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// === FORM ENVIO VIA WHATSAPP ===
document.getElementById("form-contato").addEventListener("submit", function(e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let mensagem = document.getElementById("mensagem").value;

  // Número fictício São Paulo (exemplo)
  let telefone = "5511912345678";

  let texto = `Olá, meu nome é ${nome}.%0AEmail: ${email}%0A%0A${mensagem}`;
  let url = `https://wa.me/${telefone}?text=${texto}`;

  window.open(url, "_blank");
});

const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.indicators');

let index = 0;
const visibleCards = 3; // sempre mostra 3
const totalCards = document.querySelectorAll('.card').length;
const cardWidth = document.querySelector('.card').offsetWidth + 20;
const totalPages = Math.ceil(totalCards / visibleCards);

// Criar indicadores dinamicamente
for (let i = 0; i < totalPages; i++) {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => {
    index = i * visibleCards;
    updateCarousel();
  });
  indicatorsContainer.appendChild(dot);
}
const dots = indicatorsContainer.querySelectorAll('button');

// Atualiza posição do carrossel e indicadores
function updateCarousel() {
  carousel.style.transform = `translateX(${-cardWidth * index}px)`;

  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === Math.floor(index / visibleCards)) {
      dot.classList.add('active');
    }
  });
}

// Avançar
function nextSlide() {
  if (index < totalCards - visibleCards) {
    index += visibleCards;
  } else {
    index = 0;
  }
  updateCarousel();
}

// Voltar
function prevSlide() {
  if (index > 0) {
    index -= visibleCards;
  } else {
    index = (totalPages - 1) * visibleCards;
  }
  updateCarousel();
}

// Botões
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Autoplay
let autoPlayInterval = setInterval(nextSlide, 3000);

// Pausar no hover
carousel.parentElement.addEventListener('mouseenter', () => {
  clearInterval(autoPlayInterval);
});

carousel.parentElement.addEventListener('mouseleave', () => {
  autoPlayInterval = setInterval(nextSlide, 3000);
});
