document.addEventListener("DOMContentLoaded", () => {
    // 1. Synchronize Editable Text across screens
    const editableTexts = document.querySelectorAll('.editable-text');
    
    editableTexts.forEach(el => {
        el.addEventListener('input', (e) => {
            const syncKey = e.target.getAttribute('data-sync');
            const newValue = e.target.innerText;
            
            if (syncKey) {
                // Update all other elements with the same sync key
                document.querySelectorAll(`.editable-text[data-sync="${syncKey}"]`).forEach(targetEl => {
                    if (targetEl !== e.target) {
                        targetEl.innerText = newValue;
                    }
                });
            }
        });
    });

    // 2. Image Upload and Synchronization
    const imageUploader = document.getElementById('imageUploader');
    let currentClickedElement = null; // Track exactly which element was clicked

    // Listen for clicks on image placeholders
    document.querySelectorAll('.editable-image').forEach(imgEl => {
        imgEl.addEventListener('click', (e) => {
            // Prevent triggering if clicking text inside the image area
            if(e.target.isContentEditable) return; 

            currentClickedElement = imgEl;
            imageUploader.click(); // Open file dialog
        });
    });

    // Handle file selection
    imageUploader.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file && currentClickedElement) {
            const reader = new FileReader();
            reader.onload = function(event) {
                const imgDataUrl = event.target.result;
                
                // A) Apply the image directly to the exact element the user clicked
                currentClickedElement.style.backgroundImage = `url(${imgDataUrl})`;
                currentClickedElement.style.backgroundColor = 'transparent';
                
                // B) Sync to other elements (like syncing a Profile Pic to the nav bar)
                const syncKey = currentClickedElement.getAttribute('data-sync');
                if (syncKey) {
                    document.querySelectorAll(`.editable-image[data-sync="${syncKey}"]`).forEach(targetEl => {
                        targetEl.style.backgroundImage = `url(${imgDataUrl})`;
                        targetEl.style.backgroundColor = 'transparent';
                    });
                }
                
                // Reset tracker
                currentClickedElement = null;
            }
            reader.readAsDataURL(file);
        }
        // Reset file input so the same image can be selected again if needed
        e.target.value = '';
    });

    // 3. Toggles (Dark Mode & Verified Badge)
    const darkModeToggle = document.getElementById('darkModeToggle');
    const verifiedToggle = document.getElementById('verifiedToggle');

    darkModeToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    });

    verifiedToggle.addEventListener('change', (e) => {
        const badges = document.querySelectorAll('.verified-badge');
        badges.forEach(badge => {
            if (e.target.checked) {
                badge.classList.remove('hidden');
            } else {
                badge.classList.add('hidden');
            }
        });
    });
});