// **
// ** links to images are stored here
// **
let backgroundImages = {
	// from background image name to image src link
	"Spider-Man":
		"https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/spiderman_background.jpg",
	Gwen: "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/gwen_background.jpg",
	Miles: "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/miles_background.jpg",
};

let textboxImages = {
	// from textbox image name to image src link
	Basic: "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/basic_textbox.png",
	Compact:
		"https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/compact_textbox.png",
};


IMG_WIDTH = 800
IMG_HEIGHT = 1200
let textboxPositions = {
	// from textbox image name to xy positions for the important text

	// uses pixel value location from image and converts that to a faction of the image size
	// this is so that the text location will remain the same...
	// (similar ot a percentage)
	// across all potential sizes
	Basic: {
		"name-text": {
			x: 400/IMG_WIDTH,
			y: 300/IMG_HEIGHT,
		},
		"contact-text": {
			x: 203/IMG_WIDTH,
			y: 1049/IMG_HEIGHT,
		},
		"where-text": {
			x: 203/IMG_WIDTH,
			y: 982/IMG_HEIGHT,
		},
		"when-text": {
			x: 203/IMG_WIDTH,
			y: 907/IMG_HEIGHT,
		},
	},
	Compact: {
		"name-text": {
			x: 404/IMG_WIDTH,
			y: 868/IMG_HEIGHT,
		},
		"contact-text": {
			x: 291/IMG_WIDTH,
			y: 1079/IMG_HEIGHT,
		},
		"where-text": {
			x: 320/IMG_WIDTH,
			y: 911/IMG_HEIGHT,
		},
		"when-text": {
			x: 287/IMG_WIDTH,
			y: 993/IMG_HEIGHT,
		},
	},
};

document.addEventListener("DOMContentLoaded", () => {
	//
	// constants
	//
	const imageSelect = document.getElementById("backgroundType-select");
	const textboxSelect = document.getElementById("textbox-select");

	const nameText = document.getElementById("name-text");
	const contactText = document.getElementById("contact-text");
	const whereText = document.getElementById("where-text");
	const whenText = document.getElementById("when-text");

	const canvas = document.getElementById("preview-canvas");
	const ctx = canvas.getContext("2d");
	const downloadBtn = document.getElementById("downloadBtn");

	const previewElement = document.querySelector('#preview');
	const previewContainer = document.querySelector('#previewContainer');
	let isPreviewOpen = false;

	//
	// Functions
	//
	// Function to load and draw the selected image
	function drawText(text, x, y, font, align) {
		// draw text to canvas
		ctx.font = font;
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.textAlign = align;
		ctx.fillText(text, x, y);
	}
	function loadImage(src) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.crossOrigin = "anonymous"; // for CORS issues
			img.src = src;

			img.onload = () => resolve(img);
			img.onerror = reject;
		});
	}
	function loadImages(bgImageSrc, textboxImageSrc) {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
		// learned how to use promise
		Promise.all([loadImage(bgImageSrc), loadImage(textboxImageSrc)])
			.then(([bgImage, textboxImage]) => {
				ctx.clearRect(0, 0, canvas.width, canvas.height);

				ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height); // background image
				ctx.drawImage(textboxImage, 0, 0, canvas.width, canvas.height); // textbox image
				drawText(
					nameText.value,
					Math.floor(textboxPositions[textboxSelect.value]["name-text"]["x"] * canvas.width),
					Math.floor(textboxPositions[textboxSelect.value]["name-text"]["y"] * canvas.height),
					`bold ${Math.floor(40 * (canvas.width/IMG_WIDTH))}px Luckiest Guy`,
					"center"
				); // for name text
				drawText(
					contactText.value,
					Math.floor(textboxPositions[textboxSelect.value]["contact-text"]["x"] * canvas.width),
					Math.floor(textboxPositions[textboxSelect.value]["contact-text"]["y"] * canvas.height),
					`${Math.floor(24 * (canvas.width/IMG_WIDTH))}px Luckiest Guy`,
					"left"
				); // for contact text
				drawText(
					whereText.value,
					Math.floor(textboxPositions[textboxSelect.value]["where-text"]["x"] * canvas.width),
					Math.floor(textboxPositions[textboxSelect.value]["where-text"]["y"] * canvas.height),
					`${Math.floor(24 * (canvas.width/IMG_WIDTH))}px Luckiest Guy`,
					"left"
				); // for where text
				drawText(
					getWhenString(whenText.value),
					Math.floor(textboxPositions[textboxSelect.value]["when-text"]["x"] * canvas.width),
					Math.floor(textboxPositions[textboxSelect.value]["when-text"]["y"] * canvas.height),
					`${Math.floor(24 * (canvas.width/IMG_WIDTH))}px Luckiest Guy`,
					"left"
				); // for when text
			})
			.catch((error) => {
				console.error("Error loading images:", error);
			});
	}
	function getWhenString(value) {
		// if value is less than 0, use empty string
		if (value.length <= 0) {
			return "";
		} // all else use toDateString
		return new Date(value).toDateString(); // format eg: Tue Aug 20 2024
	}
	// function updateText() {
	//     // redraw image
	//     loadImages(imageSelect.value, textboxSelect.value)

	//     // wait for load then draw text
	//     setTimeout(() => {
	//         drawText(nameText.value)
	//     }, 100); // Delay to ensure image is loaded
	// }
	// function to download the canvas
	function downloadImage() {
		// downloads canvas image from download button

		// thanks to https://enjeck.com/blog/download-canvas-image/
		// learned how to build a download button for a canvas

		let dataURL = canvas.toDataURL("image/png");

		// Create a dummy link text
		let a = document.createElement("a");
		// Set the link to the image so that when clicked, the image begins downloading
		a.href = dataURL;
		// Specify the image filename
		a.download =	// Spiderman-invite-card-(birthday name here)
			imageSelect.value + "-invitation-card-" + nameText.value + ".jpeg";

		// Click on the link to set off download
		a.click();
	}
	function updateCanvas() {
		loadImages(
			backgroundImages[imageSelect.value],
			textboxImages[textboxSelect.value]
		);
	}

	function showPreview() {
        const previewElement = document.querySelector('#preview');
        const previewContainer = document.querySelector('#previewContainer');
        const previewCanvas = document.querySelector('#previewCanvas');
        const originalCanvas = previewElement.querySelector('canvas');
        
        // Copy the canvas content to the preview canvas
        const ctx = previewCanvas.getContext('2d');

		newHeight = window.innerHeight - (window.innerHeight * 0.05)
		// aspect ratio 4w x 6h
		// w = h * (2/3)
		newWidth = newHeight * (2/3)
        previewCanvas.width = newWidth;
    	previewCanvas.height = newHeight;
        ctx.drawImage(originalCanvas, 0, 0, newWidth, newHeight);
        
        // Show the preview container
        previewContainer.style.display = 'flex';
    }
	function hidePreview() {
        const previewContainer = document.querySelector('#previewContainer');
        // Hide the preview container
        previewContainer.style.display = 'none';
    }

	//
	// main
	//
	// Load the first image by default
	updateCanvas();

	//
	// event listeners
	//
	// Change image when a new option is selected
	// imageSelect.addEventListener('change', (event) => {
	//     updateCanvas();
	// });
	imageSelect.addEventListener("change", updateCanvas);
	textboxSelect.addEventListener("change", updateCanvas);
	nameText.addEventListener("input", updateCanvas);
	contactText.addEventListener("input", updateCanvas);
	whereText.addEventListener("input", updateCanvas);
	whenText.addEventListener("input", updateCanvas);
	// start download when download button is clicked
	downloadBtn.addEventListener("click", () => {
		// downloadImage();
	});
	// handle canvas preview clicks
	previewElement.addEventListener('click', function() {
		if (isPreviewOpen) {
			hidePreview();
			isPreviewOpen = false;
		} else {
			showPreview();
			isPreviewOpen = true;
		}
	});
	previewContainer.addEventListener('click', function() {
		hidePreview();
		isPreviewOpen = false;
	});
});
