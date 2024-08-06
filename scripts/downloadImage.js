function downloadImage() {
    // downloads canvas image from download button
 
    // thanks to https://enjeck.com/blog/download-canvas-image/
    // learned how to build a download button for a canvas

    // Grab the canvas element
    let canvas = document.querySelector("canvas");

    /* Create a PNG image of the pixels drawn on the canvas using the toDataURL method. 
    PNG is the preferred format since it is supported by all browsers
    */
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