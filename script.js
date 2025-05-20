let progress = 50;
let startX = 0;
let active = 0;
let isDragging = false;

const speedWheel = 0.02;
const speedDrag = -0.1;

const $items = document.querySelectorAll(".carousel-item");
const $cursors = document.querySelectorAll(".cursor");

const getZindex = (array, index) =>
  array.map((_, i) => (index === i ? array.length : array.length - Math.abs(index - i)));

const displayItems = (item, index, activeIndex) => {
  const zIndex = getZindex([...$items], activeIndex)[index];
  item.style.setProperty("--zIndex", zIndex);
  item.style.setProperty("--active", (index - activeIndex) / $items.length);
};

const animate = () => {
  progress = Math.max(0, Math.min(progress, 100));
  active = Math.round((progress / 100) * ($items.length - 1));
  $items.forEach((item, index) => displayItems(item, index, active));
};

animate();

$items.forEach((item, i) => {
  item.addEventListener("click", () => {
    progress = (i / ($items.length - 1)) * 100;
    animate();
  });
});

const handleWheel = (e) => {
  progress += e.deltaY * speedWheel;
  animate();
};

const handlePointerMove = (x) => {
  if (!isDragging) return;
  const delta = (x - startX) * speedDrag;
  progress += delta;
  startX = x;
  animate();
};

const handleMouseMove = (e) => {
  $cursors.forEach(($cursor) => {
    $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });
  handlePointerMove(e.clientX);
};

const handleTouchMove = (e) => {
  if (e.touches.length > 0) {
    handlePointerMove(e.touches[0].clientX);
  }
};

const handlePointerDown = (x) => {
  isDragging = true;
  startX = x;
};

const handleMouseDown = (e) => handlePointerDown(e.clientX);
const handleTouchStart = (e) => {
  if (e.touches.length > 0) handlePointerDown(e.touches[0].clientX);
};

const handlePointerUp = () => {
  isDragging = false;
};

document.addEventListener("wheel", handleWheel);
document.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mouseup", handlePointerUp);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("touchstart", handleTouchStart);
document.addEventListener("touchend", handlePointerUp);
document.addEventListener("touchmove", handleTouchMove);

const welcomeScreen = document.getElementById('welcome-screen');
const hatScreen = document.getElementById('hat-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');
const carousel = document.querySelector('.carousel');
const seeResultsScreen = document.getElementById('see-results-screen');

document.getElementById('continue-button').addEventListener('click', () => {
    welcomeScreen.style.display = 'none';
    hatScreen.style.display = 'flex';
    setTimeout(() => {
        hatScreen.classList.add('fade-in');
    }, 10);
});

document.getElementById('sorting-hat').addEventListener('click', () => {
    hatScreen.style.display = 'none';
    hatScreen.classList.remove('fade-in');
    loadingScreen.style.display = 'flex';
    setTimeout(() => {
        loadingScreen.classList.add('fade-in');
    }, 10);
    startLoadingAnimation();
});

function startLoadingAnimation() {
    const loadingText = document.querySelector('.loading-text');
    const texts = [
        "Эмүжингийн далд ухамсартай холбогдож байна...",
        "Нууцаар дурлуулах шившилэг хйиж байна😈💗...",
        "Яагаад үйлчлэхгүй байна???",
        "Уг нь Harry Potter-с бусад бүх хүнд л үйлчлэх ёстой доо🤔...",
        "Арай Harry Potter-ийн ихэр юм биш биз дээ???",
        "Тэгж л таарлаа. Заза House-шийдэлтэндээ орохоос",
        "House-г чинь шийдчихлээ..."
    ];
    let index = 0;
    loadingText.textContent = texts[index];
    const interval = setInterval(() => {
        index++;
        if (index < texts.length) {
            loadingText.textContent = texts[index];
        }
    }, 3000);
    setTimeout(() => {
        clearInterval(interval);
        loadingScreen.style.display = 'none';
        loadingScreen.classList.remove('fade-in');
        showResult();
    }, 21000);
}

function showResult() {
    resultScreen.style.display = 'flex';
    setTimeout(() => {
        resultScreen.classList.add('fade-in');
    }, 10);
}

document.getElementById('proceed-to-carousel').addEventListener('click', () => {
    resultScreen.style.display = 'none';
    resultScreen.classList.remove('fade-in');
    carousel.style.display = 'block';
    setTimeout(() => {
        carousel.classList.add('fade-in');
    }, 10);
});

document.getElementById('see-results-button').addEventListener('click', () => {
    carousel.style.display = 'none';
    carousel.classList.remove('fade-in');
    seeResultsScreen.style.display = 'flex';
    setTimeout(() => {
        seeResultsScreen.classList.add('fade-in');
    }, 10);
});