let countSound = document.querySelector(".now-playing");
let soundName = document.querySelector(".sound-name");
let singerName = document.querySelector(".singer-name");
let currentTime = document.querySelector(".current-time");
let soundSlider = document.querySelector(".sound-slider");
let totalDuration = document.querySelector(".total-duration");
let volumeSlider = document.querySelector(".volume-slider");
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");
let playBtn = document.querySelector(".play-track i");
let repeatBtn = document.querySelector(".repeat");
let randomButton = document.querySelector(".random-button");
let musicDetails = document.querySelector(".music-details");
let openDetails = document.querySelector(".open");
// let closeDetails = document.querySelector(".close");
let audio = document.createElement("audio");

let musicIndex = 0;
let updateInterval;

let isRandom = false;
let isPlaying = false;

let soundData = [
  {
    name: "محدش يقولي يااخويا",
    artist: "Essam Sasa",
    music: "sounds/محدش يقولي.mp3",
  },
  {
    name: "لو",
    artist: "Mohamed Saeed",
    music: "sounds/لو.mp3",
  },
  {
    name: "ضحكتها يلهوي ربابه",
    artist: "Essam Sasa",
    music: "sounds/ضحكتها.mp3",
  },
  {
    name: "اهلا اصحابي الواطين",
    artist: "Ahmed Moza",
    music: "sounds/اهلا اصحابي الواطين.mp3",
  },
  {
    name: "طب بوم طخ طخ",
    artist: "Essam Sasa",
    music: "sounds/طب بوم طخ طخ.mp3",
  },
  {
    name: "هل تعلم ان المصلحه",
    artist: "Essam Sasa",
    music: "sounds/هل تعلم ان المصلحه.mp3",
  },
];
let timeDesc;
let minute;
let second;
for (let i = 0; i < soundData.length; i++) {
  let aud = new Audio(soundData[i].music);
  let content = document.createElement("div");
  aud.load();
  content.className = "content";
  setTimeout(() => {
    minute = Math.floor(aud.duration / 60);
    second = Math.floor(aud.duration - minute * 60);

    if (minute < 10) {
      minute = "0" + minute;
    }
    if (second < 10) {
      second = "0" + second;
    }

    content.innerHTML = `
    <p class="desc">${minute}:${second}</p>
    <p>${soundData[i].name}</p>`;
    timeDesc = musicDetails.querySelectorAll(".desc");
  }, 500);
  musicDetails.appendChild(content);
}
let allDiv = musicDetails.querySelectorAll(".content");

allDiv.forEach((content, idx) => {
  content.addEventListener("click", (e) => {
    allDiv.forEach((div) => {
      div.classList.remove("active");
    });
    isPlaying = false;
    e.currentTarget.classList.add("active");
    musicIndex = idx;
    loadTrack(musicIndex);

    playPause();
  });
});

loadTrack(musicIndex);

function loadTrack(musicIndex) {
  clearInterval(updateInterval);
  reset();
  audio.src = soundData[musicIndex].music;
  soundName.innerHTML = soundData[musicIndex].name;
  singerName.innerHTML = soundData[musicIndex].artist;
  countSound.innerHTML = `Playing ${musicIndex + 1} Of ${soundData.length}`;
  audio.load();
  volumeSlider.onchange = function () {
    audio.volume = volumeSlider.value / 100;
  };
  playBtn.className = "fa-solid fa-circle-play";
  updateInterval = setInterval(update, 1000);
  audio.addEventListener("ended", nextTrack);
  randomBackground();
  allDiv.forEach((e) => e.classList.remove("active"));
  allDiv[musicIndex].classList.add("active");
  // console.log(audio.src);
}

function nextTrack() {
  if (musicIndex < soundData.length - 1 && isRandom == false) {
    musicIndex++;
  } else if (musicIndex < soundData.length - 1 && isRandom == true) {
    let randomIndex = Math.floor(Math.random() * soundData.length);
    musicIndex = randomIndex;
  } else {
    musicIndex = 0;
  }
  loadTrack(musicIndex);
  playMusic();
}

function prevTrack() {
  musicIndex--;
  if (musicIndex < 0) {
    musicIndex = soundData.length - 1;
  }
  loadTrack(musicIndex);
  playMusic();
}
nextBtn.onclick = nextTrack;

prevBtn.onclick = prevTrack;

playBtn.onclick = playPause;

function playPause() {
  isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
  audio.play();
  isPlaying = true;
  playBtn.className = "fa-solid fa-circle-pause";
}

function pauseMusic() {
  audio.pause();
  isPlaying = false;
  playBtn.className = "fa-solid fa-circle-play";
}

let position = 0;
function update() {
  position = audio.currentTime * (100 / audio.duration);
  soundSlider.value = position;
  if (!isNaN(audio.duration)) {
    let durationMinute = Math.floor(audio.duration / 60);
    let durationSecond = Math.floor(audio.duration - durationMinute * 60);
    let currentMinute = Math.floor(audio.currentTime / 60);
    let currentSecond = Math.floor(audio.currentTime - currentMinute * 60);

    if (currentSecond < 10) {
      currentSecond = "0" + currentSecond;
    }
    if (currentMinute < 10) {
      currentMinute = "0" + currentMinute;
    }
    if (durationMinute < 10) {
      durationMinute = "0" + durationMinute;
    }
    if (durationSecond < 10) {
      durationSecond = "0" + durationSecond;
    }

    totalDuration.innerHTML = `${durationMinute}:${durationSecond}`;
    currentTime.innerHTML = `${currentMinute}:${currentSecond}`;
  }
}

function gotTo() {
  let newPosition = audio.duration * (soundSlider.value / 100);
  audio.currentTime = newPosition;
}

soundSlider.onchange = gotTo;

function reset() {
  totalDuration.innerHTML = "00:00";
  currentTime.innerHTML = "00:00";
  soundSlider.value = 0;
}

function randomBackground() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];

  let a = "#";

  function random(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.floor(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let colorOne = random(a);
  let colorTwo = random(a);

  let gradient = `linear-gradient(to right , ${colorOne},${colorTwo})`;

  document.body.style.background = gradient;
  document.documentElement.style.setProperty("--main-color", gradient);
}

repeatBtn.onclick = repeat;

function repeat() {
  loadTrack(musicIndex);
  playMusic();
}

randomButton.onclick = randomMusic;
function randomMusic() {
  if (isRandom == true) {
    playRandom();
  } else {
    pauseRandom();
  }
}

function playRandom() {
  isRandom = false;
  randomButton.classList.remove("active");
}

function pauseRandom() {
  isRandom = true;
  randomButton.classList.add("active");
}
openDetails.innerHTML = ` 
<i class="fa-solid fa-bars open"></i>
`;

let click = true;
openDetails.onclick = function () {
  musicDetails.classList.toggle("active");
  if (click) {
    openDetails.innerHTML = `  
    <i class="fa-solid fa-xmark open close"></i>
    `;
    click = false;
  } else {
    openDetails.innerHTML = ` 
    <i class="fa-solid fa-bars open"></i>
    `;
    click = true;
  }
};
// closeDetails.onclick = function () {
//   musicDetails.classList.remove("active");
// };

document.addEventListener("keypress", (e) => {
  if (e.key == " ") {
    playPause();
  }
});

// // add btn

// let addBtn = document.querySelector(".add");
// let addDiv = document.querySelector(".add-details");
// let closeDiv = document.querySelector(".close-add");
// let musicPath = document.querySelector("form .music-path");
// let artistName = document.querySelector("form .artist-name");
// let addMusic = document.querySelector(".add-music");

// let musicName = document.querySelector(".musicName");
// addBtn.onclick = function () {
//   addDiv.classList.add("active");
//   closeDiv.classList.add("active");
// };

// closeDiv.onclick = function () {
//   closeDiv.classList.remove("active");
//   addDiv.classList.remove("active");
// };
