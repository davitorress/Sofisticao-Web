let currentImage = 1;
const carouselImages = document.querySelector(".carousel-images");

for (let i = 1; i <= carouselImages.childElementCount; i++) {
	let progressContainer = document.querySelector(".progress-bar-container").cloneNode(true);
	progressContainer.firstElementChild.id = "progress-bar-" + i;
	progressContainer.style.display = "block";
	document.querySelector(".carousel-progress").appendChild(progressContainer);
}

let progressBar = document.getElementById("progress-bar-" + currentImage);
progressBar.style.width = "0%";

const nextImage = () => {
	progressBar.style.width = "0%";
	currentImage++;
	if (currentImage > carouselImages.childElementCount) {
		currentImage = 1;
	}
	progressBar = document.getElementById("progress-bar-" + currentImage);
	progressBar.style.width = "0%";

	carouselImages.style.transform = "translateX(-" + (currentImage - 1) * 100 + "%)";

	let progress = 0;
	const progressInterval = setInterval(() => {
		progress += 1;
		progressBar.style.width = progress + "%";
		if (progress >= 100) {
			clearInterval(progressInterval);
		}
	}, 25);
};

setInterval(nextImage, 3000);
