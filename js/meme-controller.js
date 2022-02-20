'use strict'

var gElCanvas;
var gCtx;
const MEME = getMeme();
var gStartPos;
const gTouchEvs = ['touchstart', 'touchmove', 'touchend'];

function init() {
    gElCanvas = document.querySelector('.my-canvas');
    gCtx = gElCanvas.getContext('2d');

    addListeners();
    renderImages();
}

function renderMeme(id) {
    if (id === -1) return

    MEME.selectedImgId = id;
    const elImg = document.querySelector(`.image-${MEME.selectedImgId}`);
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height);
    MEME.lines.forEach(line => drawText(line));
}

function drawText(line) {

    gCtx.lineWidth = 1;
    gCtx.textAlign = line.align;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.fillStyle = line.color;
    gCtx.font = `${line.size}px ${line.font}`;
    gCtx.fillText(line.text, line.location.x, line.location.y);
    gCtx.strokeText(line.text, line.location.x, line.location.y);
}

function onInsertText() {
    let textInput = document.querySelector(`.meme-line-0`).value;
    setLineText(textInput);
    drawText(MEME.lines[MEME.selectedLineIdx]);
    renderMeme(MEME.selectedImgId);
}

function onFontColorChange(val) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    setFontColor(val);
    setStrokeColor(val);
    renderMeme(MEME.selectedImgId);
}

function onFontSizeInc() {
    setFontSizeInc();
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    renderMeme(MEME.selectedImgId);
}

function onFontSizeDec() {
    setFontSizeDec();
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    renderMeme(MEME.selectedImgId);
}

function onTextLocation(pos) {
    setLocation(pos);
}

function onFontFamily(val) {
    setFont(val);
    renderMeme(MEME.selectedImgId);
}

function onClearCanvas() {
    let currInput = document.querySelector('.meme-line-0');
    currInput.value = '';
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height);
    MEME.selectedImgId = -1;
}

function addListeners() {
    var elInput = document.querySelector(`.meme-line-${MEME.selectedLineIdx}`);

    gElCanvas.addEventListener('mousemove', onMove);
    gElCanvas.addEventListener('mousedown', onDown);
    gElCanvas.addEventListener('mouseup', onUp);
    gElCanvas.addEventListener('touchmove', onMove);
    gElCanvas.addEventListener('touchstart', onDown);
    gElCanvas.addEventListener('touchend', onUp);
    elInput.addEventListener("keyup", onInsertText);

    window.addEventListener('resize', () => {
        resizeCanvas();
    })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elContainer.offsetWidth;
    gElCanvas.height = elContainer.offsetHeight;
    renderMeme(MEME.selectedImgId);
}

function onDown(ev) {
    const pos = getEvPos(ev);
    if (!isMemeClicked(pos)) return;
    setMemeDrag(true);
    gStartPos = pos;
    document.body.style.cursor = 'grabbing';
}

function onMove(ev) {
    if (MEME.isDrag) {
        const pos = getEvPos(ev);
        const dx = pos.x - gStartPos.x;
        const dy = pos.y - gStartPos.y;
        moveMeme(dx, dy);
        gStartPos = pos;
        renderMeme(MEME.selectedImgId);
    }
}

function onUp() {
    setMemeDrag(false);
    document.body.style.cursor = 'grab';
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }

    return pos;
}

function onSwitchText() {
    MEME.selectedLineIdx === MEME.lines.length - 1 ? MEME.selectedLineIdx = 0 : MEME.selectedLineIdx++;
    let currInput = document.querySelector(`.meme-line-0`);
    currInput.focus();
}

function onAddLine() {
    if (MEME.lines.length >= 2) return;
    getNewLine();
    renderMeme(MEME.selectedImgId);
}

function onDownloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-img.jpg'
}

function onShareCanvas() {
    uploadImg()
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    var reader = new FileReader()

    reader.onload = function (event) {
        console.log('onload');
        var img = new Image();

        img.onload = onImageReady.bind(null, img);
        img.src = event.target.result;
    }
    debugger
    const data = gElCanvas.toDataURL("image/jpeg");
    console.log('after');
    reader.readAsDataURL(ev.target.files[0]);
    createMyUploadImg(ev.target.files[0]);
    addImage(data);

}

function addImage(data) {
    const strHTML =
        `<div class="meme-option">
        <img class="image image-${MEME.selectedImgId}" src="${data}" onclick="onImgClick(${MEME.selectedImgId})">
        </div>`

    const elDiv = document.querySelector('.meme-images');

    elDiv.innerHTML += strHTML;
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}
