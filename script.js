const container = document.getElementById('container');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let currentIndex = 0;
const totalScreens = 5; // Total de telas

function updateScreens() {
    container.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

prev.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateScreens();
    }
});

next.addEventListener('click', () => {
    if (currentIndex < totalScreens - 1) {
        currentIndex++;
        updateScreens();
    }
});
