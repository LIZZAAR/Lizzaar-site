document.addEventListener('DOMContentLoaded', () => {
    const photoLocations = [
        {
            title: 'Homestudio',
            src: 'photos/Homestudio2.jpeg',
            alt: 'Lizzaar homestudio',
            lat: 50.9302,
            lng: 3.1226,
        },
        {
            title: 'Homestudio sfeer',
            src: 'photos/homestudio3.jpeg',
            alt: 'Lizzaar homestudio sfeer',
            lat: 50.9314,
            lng: 3.1285,
        },
        {
            title: 'Recording',
            src: 'photos/record.jpeg',
            alt: 'Lizzaar opname moment',
            lat: 51.0314,
            lng: 3.7067,
        },
        {
            title: 'Repetitiekot',
            src: 'photos/repetitiekot.jpeg',
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
                    <img src="${location.src}" alt="${location.alt}" loading="lazy" />
                </div>
            `;

            L.marker([location.lat, location.lng]).addTo(map).bindPopup(popupHtml);
        });
    }

    const audioPlayer = document.getElementById('audioPlayer');
    const trackButtons = document.querySelectorAll('.track');
    const nowPlayingText = document.getElementById('nowPlaying');

    trackButtons.forEach(button => {
        button.addEventListener('click', () => {
            const trackSrc = button.getAttribute('data-src');
            const trackTitle = button.innerText;

            // 1. Update de bron van de speler
            audioPlayer.src = trackSrc;
            
            // 2. Update de tekst onder de speler
            nowPlayingText.innerText = "Nu aan het spelen: " + trackTitle;

            // 3. Start de muziek
            audioPlayer.play();

            // 4. Visuele feedback: highlight de actieve knop
            trackButtons.forEach(btn => btn.style.background = "#222"); // Reset alle knoppen
            button.style.background = "#c81a1a"; // Maak de gekozen knop rood
        });
    });

    // Automatisch het jaartal in de footer updaten
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.innerText = new Date().getFullYear();
    }
});