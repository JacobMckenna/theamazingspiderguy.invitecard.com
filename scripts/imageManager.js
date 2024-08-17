



document.addEventListener('DOMContentLoaded', () => {
    const imageSelect = document.getElementById('backgroundType-select');
    const canvas = document.getElementById('preview-canvas');
    const ctx = canvas.getContext('2d');
    const downloadBtn = document.getElementById('downloadBtn')

    // Function to load and draw the selected image
    function loadImage(imageSrc) {
        const img = new Image();
        img.src = imageSrc;
        // anonymous must be set otherwise the file will appear 'tainted' and will not download
        // thanks to https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
        img.crossOrigin = "anonymous"

        img.onload = () => {
            // Clear the canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw the new image
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            // draw text to canvas
            ctx.font = "bold 20px Arial";
            ctx.fillStyle = "rgb(0, 0, 0)";
            ctx.fillText("Spiderman!", 10, 10);
        };
    }
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

    // Load the first image by default
    loadImage(imageSelect.value);

    // Change image when a new option is selected
    imageSelect.addEventListener('change', (event) => {
        loadImage(event.target.value);
    });
    // start download when download button is clicked
    downloadBtn.addEventListener('click', () => {
        downloadImage();
    });
});