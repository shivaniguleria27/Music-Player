let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgresBar = document.getElementById("myProgresBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
let songs = [
  { songName: "legicon", filePath: "songs/1.mp3", coverPath: "1.jpg" },
  { songName: "licon", filePath: "songs/2.mp3", coverPath: "2.jpg" },
  { songName: "gicon", filePath: "songs/3.mp3", coverPath: "3.jpg" },
  { songName: "lecon", filePath: "songs/4.mp3", coverPath: "4.jpg" },
  { songName: "legico", filePath: "songs/5.mp3", coverPath: "5.jpg" },
  { songName: "legi", filePath: "songs/6.mp3", coverPath: "6.jpg" },
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause");
    masterPlay.classList.add("fa-play");
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener("timeupdate", () => {
  const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgresBar.value = progress;
});

myProgresBar.addEventListener("change", () => {
  audioElement.currentTime = (myProgresBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.classList.add("fa-play");
    element.classList.remove("fa-pause");
  });
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id) - 1;
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    e.target.classList.remove("fa-play");
    e.target.classList.add("fa-pause");
    masterPlay.classList.remove("fa-play");
    masterPlay.classList.add("fa-pause");
  });
});

document.getElementById("next").addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  audioElement.src = songs[songIndex].filePath;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterPlay.classList.remove("fa-play");
  masterPlay.classList.add("fa-pause");
});
