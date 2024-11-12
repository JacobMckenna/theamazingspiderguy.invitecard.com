// ** links to images are stored here
let backgroundImages = {
    "Spider-Man": "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/spiderman_background.jpg",
    Gwen: "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/gwen_background.jpg",
    Miles: "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/miles_background.jpg",
};

let textboxImages = {
    Basic: "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/basic_textbox.png",
    Compact: "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/compact_textbox.png",
};

const IMG_WIDTH = 800;
const IMG_HEIGHT = 1200;
let textboxPositions = {
    Basic: {
        "name-text": { x: 400 / IMG_WIDTH, y: 300 / IMG_HEIGHT },
        "contact-text": { x: 203 / IMG_WIDTH, y: 1049 / IMG_HEIGHT },
        "where-text": { x: 203 / IMG_WIDTH, y: 982 / IMG_HEIGHT },
        "when-text": { x: 203 / IMG_WIDTH, y: 907 / IMG_HEIGHT },
    },
    Compact: {
        "name-text": { x: 404 / IMG_WIDTH, y: 868 / IMG_HEIGHT },
        "contact-text": { x: 291 / IMG_WIDTH, y: 1079 / IMG_HEIGHT },
        "where-text": { x: 320 / IMG_WIDTH, y: 911 / IMG_HEIGHT },
        "when-text": { x: 287 / IMG_WIDTH, y: 993 / IMG_HEIGHT },
    },
};

document.addEventListener("DOMContentLoaded", () => {
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

    function drawText(text, x, y, fontSize, align) {
        ctx.font = `${fontSize}px 'Luckiest Guy', sans-serif`;
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.textAlign = align;
        ctx.fillText(text, x, y);
    }

    function loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = src;

            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }

    function loadImages(bgImageSrc, textboxImageSrc) {
        Promise.all([loadImage(bgImageSrc), loadImage(textboxImageSrc)])
            .then(([bgImage, textboxImage]) => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height); 
                ctx.drawImage(textboxImage, 0, 0, canvas.width, canvas.height); 

                drawText(
                    nameText.value,
                    Math.floor(textboxPositions[textboxSelect.value]["name-text"]["x"] * canvas.width),
                    Math.floor(textboxPositions[textboxSelect.value]["name-text"]["y"] * canvas.height),
                    Math.floor(40 * (canvas.width / IMG_WIDTH)),
                    "center"
                );
                drawText(
                    contactText.value,
                    Math.floor(textboxPositions[textboxSelect.value]["contact-text"]["x"] * canvas.width),
                    Math.floor(textboxPositions[textboxSelect.value]["contact-text"]["y"] * canvas.height),
                    Math.floor(24 * (canvas.width / IMG_WIDTH)),
                    "left"
                );
                drawText(
                    whereText.value,
                    Math.floor(textboxPositions[textboxSelect.value]["where-text"]["x"] * canvas.width),
                    Math.floor(textboxPositions[textboxSelect.value]["where-text"]["y"] * canvas.height),
                    Math.floor(24 * (canvas.width / IMG_WIDTH)),
                    "left"
                );
                drawText(
                    getWhenString(whenText.value),
                    Math.floor(textboxPositions[textboxSelect.value]["when-text"]["x"] * canvas.width),
                    Math.floor(textboxPositions[textboxSelect.value]["when-text"]["y"] * canvas.height),
                    Math.floor(24 * (canvas.width / IMG_WIDTH)),
                    "left"
                );
            })
            .catch((error) => {
                console.error("Error loading images:", error);
            });
    }

    function getWhenString(value) {
        if (value.length <= 0) {
            return "";
        }
        return new Date(value).toDateString();
    }

    function downloadImage() {
        let dataURL = canvas.toDataURL("image/png");

        let a = document.createElement("a");
        a.href = dataURL;
        a.download = imageSelect.value + "-invitation-card-" + nameText.value + ".jpeg";
        a.click();
    }

    function updateCanvas() {
        loadImages(
            backgroundImages[imageSelect.value],
            textboxImages[textboxSelect.value]
        );
    }

    function showPreview() {
        const previewCanvas = document.querySelector('#previewCanvas');
        const originalCanvas = previewElement.querySelector('canvas');
        const ctx = previewCanvas.getContext('2d');

        const newHeight = window.innerHeight - (window.innerHeight * 0.05);
        const newWidth = newHeight * (2 / 3);
        previewCanvas.width = newWidth;
        previewCanvas.height = newHeight;
        ctx.drawImage(originalCanvas, 0, 0, newWidth, newHeight);

        previewContainer.style.display = 'flex';
    }

    function hidePreview() {
        previewContainer.style.display = 'none';
    }

    updateCanvas();

    imageSelect.addEventListener("change", updateCanvas);
    textboxSelect.addEventListener("change", updateCanvas);
    nameText.addEventListener("input", updateCanvas);
    contactText.addEventListener("input", updateCanvas);
    whereText.addEventListener("input", updateCanvas);
    whenText.addEventListener("input", updateCanvas);

    downloadBtn.addEventListener("click", () => {
        downloadImage();
    });

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
