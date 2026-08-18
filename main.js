document.addEventListener('DOMContentLoaded', () => {
    const photoLocations = [
        {
            title: 'Homestudio',
            src: 'photos/lizzaar-logo-dialect-metal.png',
            alt: 'Lizzaar homestudio',
            lat: 50.9302,
            lng: 3.1226,
        },
        {
            title: 'Homestudio sfeer',
            src: 'photos/lizzaar-portrait-bliksem.png',
            alt: 'Lizzaar homestudio sfeer',
            lat: 50.9314,
            lng: 3.1285,
        },
        {
            title: 'Recording',
            src: 'photos/lizzaar-drone-shoot-bos.jpg',
            alt: 'Lizzaar opname moment',
            lat: 51.0314,
            lng: 3.7067,
        },
        {
            title: 'Repetitiekot',
            src: 'photos/lizzaar-fb-banner-drone.jpeg',
            alt: 'Lizzaar repetitiekot',
            lat: 50.8607,
            lng: 4.3517,
        },
    ];

    const mapContainer = document.getElementById('photo-map');
    if (mapContainer && window.L) {
        const map = L.map('photo-map').setView([50.94, 3.4], 8);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; OpenStreetMap contributors',
        }).addTo(map);

        photoLocations.forEach(location => {
            const popupHtml = `
                <div class="map-popup">
                    <strong>${location.title}</strong>
                    <img src="${location.src}" alt="${location.alt}" loading="lazy" onerror="this.src='assets/lizzaar-logo-transparant.png'; this.onerror=null;" />
                </div>
            `;

            L.marker([location.lat, location.lng]).addTo(map).bindPopup(popupHtml);
        });
    }

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