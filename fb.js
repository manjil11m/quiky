document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Dark Mode Toggle ---
    const darkModeBtn = document.getElementById('toggleDarkMode');
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeBtn.querySelector('i');
        if(document.body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
        }
    });

    // --- 2. Verified Badge Toggle ---
    const verifiedBtn = document.getElementById('toggleVerified');
    let badgesVisible = true;
    verifiedBtn.addEventListener('click', () => {
        badgesVisible = !badgesVisible;
        const badges = document.querySelectorAll('.verified-badge');
        badges.forEach(badge => {
            badge.style.display = badgesVisible ? 'inline-block' : 'none';
        });
    });

    // --- 3. Synchronize Text Elements (like username) ---
    // If you edit a span with 'sync-username', it updates everywhere
    const syncUsernames = document.querySelectorAll('.sync-username');
    syncUsernames.forEach(element => {
        element.addEventListener('input', (e) => {
            const newText = e.target.innerText;
            // Prevent recursive looping by updating only OTHER elements
            syncUsernames.forEach(target => {
                if (target !== element) {
                    target.innerText = newText;
                }
            });
        });
    });

    // Prevent enter key from creating new lines in single-line editable text
    document.querySelectorAll('[contenteditable="true"]').forEach(el => {
        el.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                el.blur();
            }
        });
    });

    // --- 4. Image Upload & Sync Logic ---
    const imageUploader = document.getElementById('imageUploader');
    let currentImageTarget = null; // Stores the element that was clicked

    // Attach click listeners to all elements marked as editable-img
    document.querySelectorAll('.editable-img').forEach(imgElement => {
        imgElement.addEventListener('click', (e) => {
            currentImageTarget = e.currentTarget; 
            imageUploader.click(); // Trigger the hidden file input
        });
    });

    // Handle the file selection
    imageUploader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Read the uploaded file as a Data URL to display it
        const reader = new FileReader();
        reader.onload = function(event) {
            const imageUrl = event.target.result;

            if (currentImageTarget.classList.contains('sync-pfp')) {
                // If it's a profile pic, update all profile pics globally
                document.querySelectorAll('.sync-pfp').forEach(el => {
                    applyImage(el, imageUrl);
                });
            } 
            else if (currentImageTarget.classList.contains('sync-cover')) {
                // If it's a cover photo, update all cover photos globally
                document.querySelectorAll('.sync-cover').forEach(el => {
                    applyImage(el, imageUrl);
                });
            } 
            else {
                // Otherwise, just update the single clicked element (like a post picture)
                applyImage(currentImageTarget, imageUrl);
            }
            
            // Reset uploader value so same file can be selected again if needed
            imageUploader.value = ""; 
        };
        reader.readAsDataURL(file);
    });

    // Helper function to apply image depending on HTML tag
    function applyImage(element, url) {
        if (element.tagName.toLowerCase() === 'img') {
            element.src = url;
            // Remove the default background placeholder styling when real image is set
            element.style.background = 'none'; 
        } else {
            // For divs (like grid items or reels bg)
            element.style.backgroundImage = `url(${url})`;
            element.style.backgroundColor = 'transparent';
        }
    }
});