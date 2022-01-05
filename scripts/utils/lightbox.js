const lightboxBg = document.getElementsByClassName("lightbox_bg")[0];
const articlePic = document.getElementsByClassName("media-section")[0];
let currentTarget = [];
const previousArrow = document.getElementsByClassName("lightbox-previous")[0];
const nextArrow = document.getElementsByClassName("lightbox-next")[0];
const lightboxName = document.getElementsByClassName("lightbox-name")[0];
const imageHold = document.getElementsByClassName("image-hold")[0];
const videoHold = document.getElementsByClassName("video-hold")[0];
const closeCross = document.getElementsByClassName("lightbox-close")[0];
const headerHidden = document.getElementById("header");
const mainHidden = document.getElementById("main");

function checkArrow() {
    nextArrow.style.display = currentTarget.nextSibling === null ? "none" : "";
    previousArrow.style.display = currentTarget.previousSibling === null ? "none" : "";
}

function pic() {                        
    if (currentTarget.firstChild.tagName == "VIDEO") {
        videoHold.style.display = "block";
        imageHold.style.display = "none";
        videoHold.src = currentTarget.children[0].src;
        videoHold.title = currentTarget.children[1].innerText;
        lightboxName.innerText = currentTarget.children[1].innerText;
    } else {
        imageHold.style.display = "";
        videoHold.style.display = "none";
        imageHold.src = currentTarget.children[0].src;
        imageHold.alt = currentTarget.children[0].alt;
        lightboxName.innerText = currentTarget.children[0].alt;
    }
    checkArrow();
}

function displayLightbox() {
    lightboxBg.style.display = "block";
    headerHidden.setAttribute("aria-hidden", "true");
    mainHidden.setAttribute("aria-hidden", "true");
    lightboxBg.setAttribute("aria-hidden", "false");
    

}
function closeLightbox() {
    lightboxBg.style.display = "none";
    headerHidden.setAttribute("aria-hidden", "false");
    mainHidden.setAttribute("aria-hidden", "false");
    lightboxBg.setAttribute("aria-hidden", "true");
}

function runLightbox(event) {
    currentTarget = event.target.parentElement;
    displayLightbox();
    pic();
}
function previousPic() {
    currentTarget = currentTarget.previousSibling;
    pic();
}
function nextPic() {
    currentTarget = currentTarget.nextSibling;
    pic();
}

function keyListener(event) {
    if (event.code == "ArrowLeft") {
        if (currentTarget.previousSibling !== null) {
            event.preventDefault();
            previousPic();
        }
    }
    if (event.code == "ArrowRight") {
        if (currentTarget.nextSibling !== null) {
            event.preventDefault();
            nextPic();
        }
    }
    if (event.code == "Escape") {
        event.preventDefault();
        closeLightbox();
    }
}

function articlePicture() {
    for (let i = 0; i < articlePic.children.length; i++) {
        articlePic.children[i].children[0].addEventListener(
            "keypress",
            runLightbox
        );
        articlePic.children[i].children[0].addEventListener(
            "click",
            runLightbox
        );
    }
}

closeCross.addEventListener("click", closeLightbox);
previousArrow.addEventListener("click", previousPic);
nextArrow.addEventListener("click", nextPic);
window.addEventListener("keydown", keyListener, true);
