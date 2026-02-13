/* Configuration Section - Edit these values! */
const config = {
    partnerName: "Shanti",
    startDate: "2023-02-14", // Year-Month-Day (Your Anniversary Date)
    photos: [
        "love1.jpeg",
        "love2.jpeg",
        "love3.jpeg",
        "love4.jpeg"
    ],
    messages: [
        "Dear Shanti,",
        "3 saal pehle tum meri life me aayi,",
        "aur tab se har din special ho gaya.",
        "Tumhari smile meri strength hai,",
        "tumhari awaaz mera sukoon hai.",
        "I am lucky to have you in my life.",
        "Happy Valentine’s Day My Love ❤️",
        "— Yours, Sandeep"
    ],
    surpriseText: "You Are My Forever Valentine ❤️",
    // Reuse photos or different ones for surprise
    surprisePhotos: [
        "love1.jpeg",
        "love2.jpeg",
        "love3.jpeg"
    ]
};

/* 1. Proposal Wizard Logic */
function setupProposal() {
    // Main No Button
    const noBtn = document.getElementById('no-btn');
    const yesBtn = document.getElementById('yes-btn');
    // Funny "Sandeep" button
    const funnyNoBtn = document.getElementById('funny-no-btn');

    // Add runaway effect to both "No" buttons
    if (noBtn) {
        noBtn.addEventListener('mouseover', () => moveButton(noBtn));
        noBtn.addEventListener('click', () => moveButton(noBtn));
    }
    if (funnyNoBtn) {
        funnyNoBtn.addEventListener('mouseover', () => moveButton(funnyNoBtn));
        funnyNoBtn.addEventListener('click', () => moveButton(funnyNoBtn));
    }

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            // Try to play music on first interaction
            const audio = document.getElementById("bg-music");
            if (audio) {
                audio.play().catch(e => console.log("Autoplay prevented"));
                const musicBtn = document.getElementById("music-btn");
                if (musicBtn) musicBtn.innerText = "⏸ Pause Music";
            }

            // Trigger Confetti
            triggerConfetti();

            // Go to next step
            nextStep(2);
        });
    }
}

function moveButton(btn) {
    // Get viewport/container dimensions
    // We want it to stay within the screen generally
    const maxWidth = window.innerWidth - 100;
    const maxHeight = window.innerHeight - 100;

    const newX = Math.random() * maxWidth;
    const newY = Math.random() * maxHeight;

    btn.style.position = 'fixed';
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
    btn.style.zIndex = '3500'; // Make sure it floats above everything
}

function nextStep(stepId) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(el => el.classList.add('hidden'));

    // Show target step
    const target = document.getElementById('step-' + stepId);
    if (target) {
        target.classList.remove('hidden');
    }
}

function finishProposal() {
    const proposalContainer = document.getElementById('proposal-container');
    const mainContent = document.getElementById('main-content');

    // Fade out proposal
    proposalContainer.style.transition = 'opacity 1s';
    proposalContainer.style.opacity = '0';

    setTimeout(() => {
        proposalContainer.classList.add('hidden');
        proposalContainer.style.display = 'none'; // Ensure it's gone

        // Show main content
        mainContent.classList.remove('hidden');

        // Refresh Gallery and Timer
        loadGallery();
        updateTimer();

        // Start Typewriter
        setTimeout(typeWriter, 500);

    }, 1000);
}

function triggerConfetti() {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 4000 };

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        if (window.confetti) {
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }
    }, 250);
}


/* 2. Love Timer Logic */
function updateTimer() {
    const startDateDate = new Date(config.startDate);
    const now = new Date();

    const diff = now - startDateDate;

    if (diff < 0) return; // Future date check

    // 1. Calculate Total Days
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

    // 2. Calculate Total Months
    let months = (now.getFullYear() - startDateDate.getFullYear()) * 12;
    months -= startDateDate.getMonth();
    months += now.getMonth();
    if (now.getDate() < startDateDate.getDate()) {
        months--;
    }
    const totalMonths = months;

    // 3. Calculate Years
    let years = now.getFullYear() - startDateDate.getFullYear();
    if (now.getMonth() < startDateDate.getMonth() ||
        (now.getMonth() === startDateDate.getMonth() && now.getDate() < startDateDate.getDate())) {
        years--;
    }

    // 4. Hours, Minutes, Seconds (Live Clock)
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    // Update DOM
    if (document.getElementById("total-years")) document.getElementById("total-years").innerText = years;
    if (document.getElementById("total-months")) document.getElementById("total-months").innerText = totalMonths;
    if (document.getElementById("total-days")) document.getElementById("total-days").innerText = totalDays;

    if (document.getElementById("hours")) document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    if (document.getElementById("minutes")) document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    if (document.getElementById("seconds")) document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

setInterval(updateTimer, 1000);

/* 3. Typewriter Effect */
const typewriterElement = document.getElementById("typewriter");
let msgIndex = 0;
let charIndex = 0;

function typeWriter() {
    if (!typewriterElement) return;
    // Clearing check
    if (typewriterElement.innerHTML.includes("<br>") && msgIndex === 0 && charIndex === 0) {
        typewriterElement.innerHTML = "";
    }

    if (msgIndex < config.messages.length) {
        if (charIndex < config.messages[msgIndex].length) {
            typewriterElement.innerHTML += config.messages[msgIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50); // Typing speed
        } else {
            typewriterElement.innerHTML += "<br>"; // New line after message
            msgIndex++;
            charIndex = 0;
            setTimeout(typeWriter, 500); // Pause between lines
        }
    }
}


/* 4. Photo Gallery & Lightbox */
function loadGallery() {
    const galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    if (config.photos.length > 0) {
        galleryGrid.innerHTML = ''; // Clear static HTML
        config.photos.forEach(photoSrc => {
            const div = document.createElement('div');
            div.className = 'photo-card';
            div.innerHTML = `<img src="${photoSrc}" alt="Memory" onclick="openLightbox(this)">`;
            galleryGrid.appendChild(div);
        });
    }
}

function openLightbox(img) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    lightboxImg.src = img.src;
    lightbox.classList.remove("hidden");
}

function closeLightbox() {
    document.getElementById("lightbox").classList.add("hidden");
}
window.closeLightbox = closeLightbox; // Expose to global scope for HTML onclick
window.openLightbox = openLightbox;


/* 5. Background Music */
const musicBtn = document.getElementById("music-btn");
const audio = document.getElementById("bg-music");
let isPlaying = false;

if (musicBtn && audio) {
    musicBtn.addEventListener("click", () => {
        if (isPlaying) {
            audio.pause();
            musicBtn.innerText = "🎵 Play Music";
        } else {
            audio.play().catch(e => alert("Please interact with the document first or allow autoplay!"));
            musicBtn.innerText = "⏸ Pause Music";
        }
        isPlaying = !isPlaying;
    });
}


/* 6. Surprise Button & Confetti */
const surpriseBtn = document.getElementById("surprise-btn");
if (surpriseBtn) {
    surpriseBtn.addEventListener("click", () => {
        const overlay = document.getElementById("surprise-overlay");
        overlay.classList.remove("hidden");

        // Dynamically load surprise images if available
        const surpriseContainer = document.querySelector('.surprise-images');
        if (surpriseContainer && config.surprisePhotos) {
            const imgs = surpriseContainer.querySelectorAll('img');
            config.surprisePhotos.forEach((src, index) => {
                if (imgs[index]) imgs[index].src = src;
            });
        }
        triggerConfetti();
    });
}

const closeSurpriseBtn = document.getElementById("close-surprise");
if (closeSurpriseBtn) {
    closeSurpriseBtn.addEventListener("click", () => {
        document.getElementById("surprise-overlay").classList.add("hidden");
    });
}


/* 7. Floating Hearts Animation */
function createHeart() {
    const container = document.querySelector(".hearts-container");
    if (!container) return;

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // 3-5s duration
    heart.innerText = "❤️";

    // Random sizes
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = size + "px";

    container.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}

setInterval(createHeart, 400);

// Initialize
setupProposal();

