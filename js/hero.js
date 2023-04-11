let currentImage = 1;
let progressBar = document.getElementById("progress-bar-" + currentImage);
progressBar.style.width = "0%";

const nextImage = () => {
	progressBar.style.width = "0%";
	currentImage++;
	if (currentImage > 3) {
		currentImage = 1;
	}
	progressBar = document.getElementById("progress-bar-" + currentImage);
	progressBar.style.width = "0%";

	const carouselImages = document.querySelector(".carousel-images");
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
