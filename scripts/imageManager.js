



document.addEventListener('DOMContentLoaded', () => {
    // 
    // constants
    // 
    const imageSelect = document.getElementById('backgroundType-select');
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
            console.log(nameText.value)
            // draw text to canvas
            drawText(nameText.value)
        };
    }
    function updateText(text) {
        // redraw image
        loadImage(imageSelect.value)

        // wait for load then draw text
        setTimeout(() => {
            drawText(text)
        }, 100); // Delay to ensure image is loaded
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

    // 
    // main
    // 
    // Load the first image by default
    loadImage(imageSelect.value);

    // 
    // event listeners
    // 
    // Change image when a new option is selected
    imageSelect.addEventListener('change', (event) => {
        loadImage(event.target.value);
    });
    nameText.addEventListener('change', (event) => {
        updateText(event.target.value);
    });
    // start download when download button is clicked
    downloadBtn.addEventListener('click', () => {
        downloadImage();
    });
});