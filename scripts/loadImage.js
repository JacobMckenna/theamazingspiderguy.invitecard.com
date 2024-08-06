let img = new Image();

img.onload = function() {
    // draws the image to the canvas when the image loads

    // thanks to https://devncoffee.com/add-text-to-image-in-javascript/
    // learned to add text to canvas

    // create canvas
    let canvas = document.createElement("canvas");
    ctx = canvas.getContext("2d");

    // draw image onto canvas
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    // draw text to canvas
    ctx.font = "bold 48px Arial";
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText("Spiderman!", 30, 220);

    // add canvas to document
    document.body.appendChild(canvas);

};



// image src file
// must have http src file and not from computer
// this is because local computer file is blocked by CORS policy and crossOrigin does not support that
img.src = "https://raw.githubusercontent.com/JacobMckenna/theamazingspiderguy.invitecard.com/main/images/spiderman_background.jpg";
// anonymous must be set otherwise the file will appear 'tainted' and will not download
// thanks to https://stackoverflow.com/questions/22710627/tainted-canvases-may-not-be-exported
img.crossOrigin = "anonymous"