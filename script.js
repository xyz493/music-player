const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

const tracks = [
    {
        title: 'Track 1',
        artist: 'Artist 1',
        src: 'assets/track1.mp3'
    },
    {
        title: 'Track 2',
        artist: 'Artist 2',
        src: 'assets/track2.mp3'
    },
    {
        title: 'Track 3',
        artist: 'Artist 3',
        src: 'assets/track3.mp3'
    }
];

let currentTrackIndex = 0;

function loadTrack(index) {
    const track = tracks[index];
    audio.src = track.src;
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
}

function playPauseTrack() {
    if (audio.paused) {
        audio.play();
        playPauseBtn.textContent = '⏸️';
    } else {
        audio.pause();
        playPauseBtn.textContent = '▶️';
    }
}

function prevTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.textContent = '⏸️';
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play();
    playPauseBtn.textContent = '⏸️';
}

function updateProgress() {
    const currentTime = audio.currentTime;
    const duration = audio.duration;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    let currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    let durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);

    if (currentSeconds < 10) currentSeconds = `0${currentSeconds}`;
    if (durationSeconds < 10) durationSeconds = `0${durationSeconds}`;

    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextTrack);

playPauseBtn.addEventListener('click', playPauseTrack);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

loadTrack(currentTrackIndex);
