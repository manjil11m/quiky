// Declare count globally so it persists
let count = 0;

function swap() {
  const logo = document.getElementById('logo');
  const p = document.getElementById('p');
  const heading = document.getElementById('heading');

  // Remove any previously added "CREATE" buttons
  const oldButtons = document.querySelectorAll(".create-btn");
  oldButtons.forEach(btn => btn.remove());

  switch (count) {
    case 0:
      logo.src = 'instagram.png';
      heading.textContent = 'Instagram mockup';
      p.textContent = 'profile, post, story.';
      p.insertAdjacentHTML("afterend", "<div class='create-btn'><a href='insta.html'><button id='create'>CREATE</button></a></div>");
      count++;
      break;

    case 1:
      logo.src = 'tiktok.png';
      heading.textContent = 'Tiktok mockup';
      p.textContent = 'profile, post.';
      p.insertAdjacentHTML("afterend", "<div class='create-btn'><a href='tiktok.html'><button id='create'>CREATE</button></a></div>");
      count++;
      break;

    case 2:
      logo.src = 'facebook.png';
      heading.textContent = 'Facebook mockup';
      p.textContent = 'profile, post, story, reel.';
      p.insertAdjacentHTML("afterend", "<div class='create-btn'><a href='fb.html'><button id='create'>CREATE</button></a></div>");
      count++;
      break;

    default:
      logo.src = 'quiky(icon).png';
      heading.textContent = 'Free social media mockups';
      p.textContent = 'Create realistic Instagram, Tiktok, and Facebook mockups. No login, no watermark.';
      // No button added here, old ones already removed
      count = 0;
  }
}

