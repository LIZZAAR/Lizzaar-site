document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audioPlayer');
    const audioFallback = document.getElementById('audioFallback');
    const trackButtons = document.querySelectorAll('.track');
    const nowPlayingText = document.getElementById('nowPlaying');

    if (audioPlayer) {
        audioPlayer.addEventListener('error', () => {
            audioPlayer.style.display = 'none';
            if (audioFallback) {
                audioFallback.hidden = false;
                audioFallback.textContent = 'Audio is momenteel niet beschikbaar.';
            }
        });
    }

    document.querySelectorAll('video').forEach(video => {
        video.addEventListener('error', () => {
            const fallback = video.nextElementSibling;
            if (fallback && fallback.classList.contains('media-fallback')) {
                fallback.hidden = false;
                fallback.textContent = 'Deze video is momenteel niet beschikbaar.';
                video.style.display = 'none';
            }
        });
    });

    trackButtons.forEach(button => {
        button.addEventListener('click', () => {
            const trackSrc = button.getAttribute('data-src');
            const trackTitle = button.innerText;
            const cacheBustedSrc = `${trackSrc}${trackSrc.includes('?') ? '&' : '?'}v=${Date.now()}`;

            if (audioPlayer) {
                audioPlayer.style.display = 'block';
                audioPlayer.src = cacheBustedSrc;
                audioPlayer.load();
            }

            nowPlayingText.innerText = "Nu aan het spelen: " + trackTitle;

            if (audioPlayer) {
                audioPlayer.play().catch(() => {
                    console.warn('Autoplay werd geblokkeerd door de browser.');
                });
            }

            trackButtons.forEach(btn => btn.style.background = "#222");
            button.style.background = "#c81a1a";
        });
    });

    // Automatisch het jaartal in de footer updaten
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});