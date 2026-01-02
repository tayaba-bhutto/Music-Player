const songs = [
    {
        title: "Lovely Day",
        artist: "Instrumental",
        src: "lovely-day.mp3.mp3"
    },
    {
        title: "Lovely Flowers",
        artist: "Instrumental",
        src: "lovely-flowers.mp3.mp3"
    },
    {
        title: "Lovely Piano",
        artist: "Instrumental",
        src: "lovely-piano.mp3.mp3"
    },
    {
        title: "Piano & Strings",
        artist: "Instrumental",
        src: "lovely-piano-and-strings.mp3.mp3"
    },
    {
        title: "Purrfect Lovely Day",
        artist: "Instrumental",
        src: "purrfect-lovely-day.mp3.mp3"
    }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const playlist = document.getElementById("playlist");

let songIndex = 0;
let isPlaying = false;

/* Load Song... */
function loadSong(index) {
    const song = songs[index];
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
}

/* Play / Pause ...*/
function togglePlay() {
    if (isPlaying) {
        audio.pause();
        isPlaying = false;
    } else {
        audio.play();
        isPlaying = true;
    }
}

/* Next ...*/
function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songIndex);
    audio.play();
    isPlaying = true;
}

/* Previous ...*/
function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songIndex);
    audio.play();
    isPlaying = true;
}

/* Update Progress ...*/
audio.addEventListener("timeupdate", () => {
    const { currentTime, duration } = audio;
    const percent = (currentTime / duration) * 100;
    progress.style.width = percent + "%";

    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
});

/* Set Progress ...*/
function setProgress(e) {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
}

/* Volume ...*/
function setVolume(value) {
    audio.volume = value;
}

/* Autoplay ...*/
audio.addEventListener("ended", nextSong);

/* Playlist ...*/
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = () => {
        songIndex = index;
        loadSong(songIndex);
        audio.play();
        isPlaying = true;
    };
    playlist.appendChild(li);
});

/* Format Time ...*/
function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

/* Init ...*/
loadSong(songIndex);
