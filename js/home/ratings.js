let currentRating = 1;
const ratingCarousel = document.querySelector("#ratings .ratings-list");
const ratingPrev = document.querySelector("#ratings .control-prev");
const ratingNext = document.querySelector("#ratings .control-next");

ratingPrev.addEventListener("click", () => {
	currentRating--;
	if (currentRating < 1) {
		currentRating = ratingCarousel.childElementCount;
	}
	if (currentRating === 1) {
		ratingCarousel.style.transform = "translateX(0%)";
	} else {
		let percentage = (currentRating - 1) * 100;
		ratingCarousel.style.transform = "translateX(-" + percentage + "%)";
	}
});

ratingNext.addEventListener("click", () => {
	currentRating++;
	if (currentRating > ratingCarousel.childElementCount) {
		currentRating = 1;
	}
	if (currentRating !== 1) {
		let percentage = (currentRating - 1) * 100;
		ratingCarousel.style.transform = "translateX(-" + percentage + "%)";
	} else {
		ratingCarousel.style.transform = "translateX(0%)";
	}
});
