/* --- VOLLEDIGE, CORRECTE main.js --- */
document.addEventListener('DOMContentLoaded', function () {
    // Jaar in footer
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Menu toggle voor kleine schermen
    const menuToggle = document.getElementById('menuToggle');
    const siteNav = document.getElementById('siteNav');
    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', String(!expanded));
            siteNav.style.display = expanded ? 'none' : 'block';
        });
    }

    // Sluit menu op Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            if (siteNav) siteNav.style.display = 'none';
        }
    });

    // Playlist-knoppen instellen (speelt geselecteerde track)
    const playlistButtons = document.querySelectorAll('#playlist button.track');
    playlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const src = this.dataset.src;
            const title = this.dataset.title || this.textContent.trim();
            if (!src) return;

            // Speel de geselecteerde track
            playSong(src, title);

            // Activeer visuele status voor de geselecteerde knop
            playlistButtons.forEach(b => b.classList.remove('is-active'));
            this.classList.add('is-active');
        });
    });
});

// Functie voor de muziekspeler
function playSong(songSrc, songTitle) {
    const audioPlayer = document.getElementById('audioPlayer');
    const nowPlaying = document.getElementById('nowPlaying');

    if (!audioPlayer || !nowPlaying) return;
    if (!songSrc) return;

    // Zet de bron van de audiospeler
    audioPlayer.src = songSrc;
    
    // Laad en speel de audio
    audioPlayer.load();
    audioPlayer.play().catch(() => {
        // Autoplay kan geblokkeerd worden: de gebruiker kan dan handmatig op play klikken.
    });

    // Update de 'Nu speelt' tekst
    nowPlaying.textContent = 'Nu speelt: ' + songTitle;
}