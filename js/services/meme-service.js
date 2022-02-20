'use strict'

var gImageCounter = 1;
var gImages;

var gMeme = {
    selectedImgId: -1,
    selectedLineIdx: 0,

    lines: [{
        text: 'CSS all day',
        size: 46,
        lineWidth: 1,
        align: 'center',
        color: 'black',
        font: 'Arial',
        strokeColor: 'black',
        location: { x: 370, y: 150 },
        isDrag: false,
    }]
}

createImages()

function isMemeClicked(clickedPos) {
    const { location } = gMeme.lines[gMeme.selectedLineIdx];
    const distance = Math.sqrt((location.x - clickedPos.x) ** 2 + (location.y - clickedPos.y) ** 2);
    return distance <= gMeme.lines[gMeme.selectedLineIdx].size;
}

function setMemeDrag(isDrag) {
    gMeme.isDrag = isDrag
}

function moveMeme(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].location.x += dx
    gMeme.lines[gMeme.selectedLineIdx].location.y += dy
}

function getNewLine() {

    gMeme.lines.push({
        text: 'no Grid Layout for you',
        size: 46,
        lineWidth: 1,
        align: 'center',
        color: 'black',
        font: 'Arial',
        strokeColor: 'black',
        location: { x: 400, y: 400 },
        isDrag: false
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1;
}

// function removeLine(removeLine) {

//     if (!gMeme.selectedLineIdx) return
//     gMeme.lines.splice(gMeme.length - 1, 1);
//     gMeme.selectedLineIdx--;
//     // var removeElement = document.querySelector('.meme-line-1');
//     if (removeElement) removeElement.remove();
// }

function setLineText(textInput) {
    gMeme.lines[gMeme.selectedLineIdx].text = textInput;
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
}

function setFontColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].color = val;
}

function setStrokeColor(val) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = val;
}

function setFont(val) {
    gMeme.lines[gMeme.selectedLineIdx].font = val;
}

function setFontSizeInc() {
    gMeme.lines[gMeme.selectedLineIdx].size++;
}

function setFontSizeDec() {
    gMeme.lines[gMeme.selectedLineIdx].size--;
}

function setLocation(pos) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    gMeme.lines[gMeme.selectedLineIdx].align = pos;
    renderMeme(gMeme.selectedImgId);
}

function createImages() {
    var images = [];

    for (let i = 0; i < 18; i++) {
        images.push(createImage())
    }
    gImages = images;
}

function createImage() {
    return {
        id: makeId(),
        url: `img/${gImageCounter++}.jpg`
    }
}

function createMyUploadImg(img) {
    var ID = makeId()
    gImages.push({
        id: ID,
        url: img
    });
    gMeme.selectedImgId = ID;
}

function getImages() {
    return gImages;
}

function getMeme() {
    return gMeme;
}

