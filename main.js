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
});

// Functie voor de muziekspeler
function playSong(songSrc, songTitle) {
    const audioPlayer = document.getElementById('audioPlayer');
    const nowPlaying = document.getElementById('nowPlaying');

    // Zet de bron van de audiospeler
    audioPlayer.src = songSrc;
    
    // Laad en speel de audio
    audioPlayer.load();
    audioPlayer.play();

    // Update de 'Nu speelt' tekst
    nowPlaying.textContent = 'Nu speelt: ' + songTitle;
}