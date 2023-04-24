let currentCategory = 1;
const categoryCarousel = document.querySelector(".cat-carousel .carousel-cards");
const categoryPrev = document.querySelector(".cat-carousel .control-prev");
const categoryNext = document.querySelector(".cat-carousel .control-next");

categoryPrev.addEventListener("click", () => {
	currentCategory--;
	if (currentCategory < 1) {
		currentCategory = categoryCarousel.childElementCount;
	}
	if (currentCategory === 1) {
		categoryCarousel.style.transform = "translateX(10%)";
	} else {
		let percentage = (currentCategory - 1) * 100;
		categoryCarousel.style.transform = "translateX(-" + (percentage - 10) + "%)";
	}
});

categoryNext.addEventListener("click", () => {
	currentCategory++;
	if (currentCategory > categoryCarousel.childElementCount) {
		currentCategory = 1;
	}
	if (currentCategory !== 1) {
		let percentage = (currentCategory - 1) * 100;
		categoryCarousel.style.transform = "translateX(-" + (percentage - 10) + "%)";
	} else {
		categoryCarousel.style.transform = "translateX(10%)";
	}
});
