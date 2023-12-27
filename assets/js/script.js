/** 
Author: Build Rise Shine with Nyros (BRS) 
Created: 2023 
Library  Component: Script file
Description: video controllers logic
(c) Copyright by BRS with Nyros. 
**/

/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");
const volumeBtn = document.getElementById("volume");
const fullScreenBtn = document.querySelector(".toggle_fullscreen");

// play or pause the video
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  video[method](); //video.play() or video.pause() 

}

// update play/pause icon
function updateButton() {
  const icon = this.paused
    ? '<i class="fa-solid fa-play"></i>'
    : '<i class="fa-solid fa-pause"></i>';
  toggle.innerHTML = icon;
}

// skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e) {
  if (e.target.name === "volume") {
    const volume = Number(e.target.value);
    if (volume === 0) {
      volumeBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    }
    if (volume > 0 && volume < 0.5) {
      volumeBtn.innerHTML = '<i class="fa-sharp fa-solid fa-volume-low"></i>';
    }
    if (volume > 0.5) {
      volumeBtn.innerHTML = '<i class="fa-sharp fa-solid fa-volume-high"></i>';
    }
  }
  video[this.name] = this.value;
}

// runs every second and video progress bar updated
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

// when clicked on the video progress bar
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// full screen
function fullScreen() {
  video.webkitRequestFullscreen();
}

//Event Listeners
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

toggle.addEventListener("click", togglePlay);
skipButtons.forEach((button) => button.addEventListener("click", skip));
ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
ranges.forEach((range) =>
  range.addEventListener("mousemove", handleRangeUpdate)
);
fullScreenBtn.addEventListener("click", fullScreen);

//Mouse Events
let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

// Default theme
let chathams_blue = "#1A4B84";

// to change the theme
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}
setTheme(localStorage.getItem("movie-theme") || chathams_blue);
