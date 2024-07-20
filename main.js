const range = document.querySelector("#rangeContent");
const range_span = document.querySelector("#range_span");
const next = document.querySelector("#next");
const back = document.querySelector("#back");
const pause = document.querySelector("#pause");
const play = document.querySelector("#play");
const random = document.querySelector("#random");
const repeat = document.querySelector("#repeat");
const audio = document.querySelector("#audio");
const currentTime = document.querySelector("#currentTime");
const TotalTime = document.querySelector("#TotalTime");
const content = document.querySelector(".content");

let isDragging = false;
let intervalId;

btn_span.addEventListener("mousedown", (e) => {
  isDragging = true;
  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

const onMouseMove = (e) => {
  if (!isDragging) return;
  const rect = range.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let rectWidth = rect.width - 10;
  if (offsetX < 0) offsetX = 0;
  if (offsetX > rectWidth) offsetX = rectWidth;
  btn_span.style.left = `${offsetX}px`;
  range_span.style.width = `${offsetX}px`;
  audio.currentTime = (offsetX / rectWidth) * audio.duration;
  currentTime.textContent = this.formatTime(audio.currentTime);
  btn_span.style.backgroundColor = "#8dff00";
  range_span.style.backgroundColor = "#8dff00";
};

const onMouseUp = () => {
  isDragging = false;
  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
};

range.addEventListener("click", (e) => {
  isDragging = true;
  const rect = range.getBoundingClientRect();
  let offsetX = e.clientX - rect.left;
  let rectWidth = rect.width - 10;
  if (offsetX < 0) offsetX = 0;
  if (offsetX > rectWidth) offsetX = rectWidth;
  btn_span.style.left = `${offsetX}px`;
  range_span.style.width = `${offsetX}px`;
  audio.currentTime = (offsetX / rectWidth) * audio.duration;
});

function seekUpdate() {
  let remainingTime = 0;
  intervalId = setInterval(() => {
    if (!audio.paused) {
      currentTime.textContent = formatTime(audio.currentTime);
      let val = (
        (audio.currentTime / audio.duration) *
        range.getBoundingClientRect().width
      ).toString();
      btn_span.style.left = `${val}px`;
      range_span.style.width = `${val}px`;
      remainingTime = audio.currentTime - audio.duration;
      TotalTime.innerText = formatTotalTime(remainingTime);
    }
  }, 1000);
}

function updatedRange() {
  if (!audio.paused) {
    audio.currentTime = ((audio.duration || 0) * range_span.style.width) / 100;
  }
}

function padZero(num) {
  return num < 10 ? `0${num}` : num.toString();
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return `${this.padZero(minutes)}:${this.padZero(seconds)}`;
}

function formatTotalTime(time) {
  time *= -1;
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time - minutes * 60);
  return `-${this.padZero(minutes)}:${this.padZero(seconds)}`;
}

play.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    play.style.display = "none";
    pause.style.display = "block";
    seekUpdate();
  }
});

pause.addEventListener("click", () => {
  if (!audio.paused) {
    audio.pause();
    play.style.display = "block";
    pause.style.display = "none";
  }
});

audio.addEventListener("ended", () => {
  play.style.display = "block";
  pause.style.display = "none";
});

repeat.addEventListener("click", () => {
  if (!audio.loop) {
    audio.loop = true;
    repeat.style.color = "#8dff00";
  } else {
    audio.loop = false;
    repeat.style.color = "#ffffff";
  }
});

// For mobile

btn_span.addEventListener("touchstart", (e) => {
  isDragging = true;
  document.addEventListener("touchmove", onTouchMove);
  document.addEventListener("touchend", onTouchEnd);
});

const onTouchMove = (e) => {
  if (!isDragging) return;
  const rect = range.getBoundingClientRect();
  let offsetX = e.touches[0].clientX - rect.left;
  let rectWidth = rect.width - 10;
  if (offsetX < 0) offsetX = 0;
  if (offsetX > rectWidth) offsetX = rectWidth;
  btn_span.style.left = `${offsetX}px`;
  range_span.style.width = `${offsetX}px`;
  audio.currentTime = (offsetX / rectWidth) * audio.duration;
  currentTime.textContent = this.formatTime(audio.currentTime);
  btn_span.style.backgroundColor = "#8dff00";
  range_span.style.backgroundColor = "#8dff00";
};

const onTouchEnd = () => {
  isDragging = false;
  document.removeEventListener("touchmove", onTouchMove);
  document.removeEventListener("touchend", onTouchEnd);
};
