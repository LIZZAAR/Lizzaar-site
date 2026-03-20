document.addEventListener('DOMContentLoaded', () => {
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