



document.addEventListener('DOMContentLoaded', () => {
    // 
    // constants
    // 
    const imageSelect = document.getElementById('backgroundType-select');
    const textboxSelect = document.getElementById('textbox-select');
    const nameText = document.getElementById('name-text');
    const canvas = document.getElementById('preview-canvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn')

    // 
    // Functions
    // 
    // Function to load and draw the selected image
    function drawText(text) {
        // draw text to canvas
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "rgb(0, 0, 0)";
        ctx.fillText(text, 10, 10);
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
                drawText(nameText.value);                               // for name text
            })
            .catch(error => {
                console.error('Error loading images:', error);
            });
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
        loadImages(imageSelect.value, textboxSelect.value);
    }

    // 
    // main
    // 
    // Load the first image by default
    loadImages(imageSelect.value, textboxSelect.value);

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
    // start download when download button is clicked
    downloadBtn.addEventListener('click', () => {
        downloadImage();
    });
});