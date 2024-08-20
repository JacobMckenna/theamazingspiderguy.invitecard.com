
// **
// ** links to images are stored here
// **
let backgroundImages = {    // from background image name to image src link
    "Spider-Man": "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/spiderman_background.jpg",
    "Gwen": "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/gwen_background.jpg",
    "Miles": "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/miles_background.jpg"
}

let textboxImages = {   // from textbox image name to image src link
    "Basic": "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/invite_textbox.png"
}
let textboxPositions = {    // from textbox image name to xy positions for the important text
    "Basic": {
        "name-text": {
            "x": 10,
            "y": 20
        },
        "contact-text": {
            "x": 10,
            "y": 40
        },
        "where-text": {
            "x": 10,
            "y": 60
        },
        "when-text": {
            "x": 10,
            "y": 80
        }
    }
}




document.addEventListener('DOMContentLoaded', () => {
    // 
    // constants
    // 
    const imageSelect = document.getElementById('backgroundType-select');
    const textboxSelect = document.getElementById('textbox-select');

    const nameText = document.getElementById('name-text');
    const contactText = document.getElementById('contact-text');
    const whereText = document.getElementById('where-text');
    const whenText = document.getElementById('when-text');

    const canvas = document.getElementById('preview-canvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn')

    // 
    // Functions
    // 
    // Function to load and draw the selected image
    function drawText(text, x, y) {
        // draw text to canvas
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "rgb(0, 0, 0)";
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

                ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);  // background image
                ctx.drawImage(textboxImage, 0, 0, canvas.width, canvas.height); // textbox image
                drawText(nameText.value, 
                    textboxPositions[textboxSelect.value]["name-text"]["x"], 
                    textboxPositions[textboxSelect.value]["name-text"]["y"]);       // for name text
                drawText(contactText.value, 
                    textboxPositions[textboxSelect.value]["contact-text"]["x"], 
                    textboxPositions[textboxSelect.value]["contact-text"]["y"]);       // for contact text
                drawText(whereText.value, 
                    textboxPositions[textboxSelect.value]["where-text"]["x"], 
                    textboxPositions[textboxSelect.value]["where-text"]["y"]);         // for where text
                drawText(getWhenString(whenText.value), 
                    textboxPositions[textboxSelect.value]["when-text"]["x"], 
                    textboxPositions[textboxSelect.value]["when-text"]["y"]);      // for when text
            })
            .catch(error => {
                console.error('Error loading images:', error);
            });
    }
    function getWhenString(value) {
        // if value is less than 0, use empty string
        if (value.length <= 0) {
            return "None"
        } // all else use toDateString
        return new Date(value).toDateString();  // format eg: Tue Aug 20 2024
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
        let a = document.createElement('a');
        // Set the link to the image so that when clicked, the image begins downloading
        a.href = dataURL
        // Specify the image filename
        a.download = 'canvas-download.jpeg';
        // Click on the link to set off download
        a.click();
    }
    function updateCanvas() {
        loadImages(backgroundImages[imageSelect.value], textboxImages[textboxSelect.value]);
    }

    // 
    // main
    // 
    // Load the first image by default
    updateCanvas()

    // 
    // event listeners
    // 
    // Change image when a new option is selected
    // imageSelect.addEventListener('change', (event) => {
    //     updateCanvas();
    // });
    imageSelect.addEventListener('change', updateCanvas);
    textboxSelect.addEventListener('change', updateCanvas);
    nameText.addEventListener('input', updateCanvas);
    contactText.addEventListener('input', updateCanvas);
    whereText.addEventListener('input', updateCanvas);
    whenText.addEventListener('input', updateCanvas);
    // start download when download button is clicked
    downloadBtn.addEventListener('click', () => {
        downloadImage();
    });
});