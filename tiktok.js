document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Text Synchronization ---
    const syncClasses = ['sync-brandname', 'sync-username'];

    syncClasses.forEach(className => {
        const elements = document.querySelectorAll(`.${className}`);
        
        elements.forEach(el => {
            el.addEventListener('input', (e) => {
                const newValue = e.target.innerText;
                // Update all OTHER elements with the same class
                elements.forEach(otherEl => {
                    if (otherEl !== e.target) {
                        otherEl.innerText = newValue;
                    }
                });
            });
        });
    });

    // --- 2. Image Uploads ---
    const pfpInput = document.getElementById('pfpInput');
    const postInput = document.getElementById('postInput');
    let currentUploadTarget = null;

    // Profile Picture Clicks
    const pfpElements = document.querySelectorAll('.sync-pfp');
    pfpElements.forEach(el => {
        el.addEventListener('click', () => {
            pfpInput.click();
        });
    });

    pfpInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const imgUrl = event.target.result;
                // Sync to all profile picture spots
                pfpElements.forEach(el => {
                    el.style.backgroundImage = `url(${imgUrl})`;
                });
            };
            reader.readAsDataURL(file);
        }
    });

    // Post/Grid Clicks (Independent per click, or background for feed)
    const postElements = document.querySelectorAll('.uploadable-post');
    postElements.forEach(el => {
        el.addEventListener('click', (e) => {
            // Prevent triggering if clicking editable text inside the box
            if(e.target.hasAttribute('contenteditable')) return; 
            
            currentUploadTarget = el;
            postInput.click();
        });
    });

    postInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && currentUploadTarget) {
            const reader = new FileReader();
            reader.onload = (event) => {
                currentUploadTarget.style.backgroundImage = `url(${event.target.result})`;
            };
            reader.readAsDataURL(file);
        }
        // Reset input so the same file can be selected again if needed
        postInput.value = ''; 
    });


    // --- 3. Toggles ---
    
    // Dark Mode Toggle
    const toggleDarkMode = document.getElementById('toggleDarkMode');
    toggleDarkMode.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
    });

    // Verified Badge Toggle
    const toggleVerified = document.getElementById('toggleVerified');
    const badges = document.querySelectorAll('.badge-sync');
    toggleVerified.addEventListener('change', (e) => {
        badges.forEach(badge => {
            badge.style.display = e.target.checked ? 'inline-block' : 'none';
        });
    });

});