let img = new Image();

img.onload = function() {
    // draws the image to the canvas when the image loads

    // thanks to https://devncoffee.com/add-text-to-image-in-javascript/
    // helped me learn this function

    // create canvas
    let canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");

    // draw image onto canvas
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    // draw text to canvas
    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText("Spiderman!", 30, 220);

    // (B4) ADD CANVAS TO DOCUMENT
    document.body.appendChild(canvas);
};


// image src file
img.src = "images/spiderman_background.jpg";