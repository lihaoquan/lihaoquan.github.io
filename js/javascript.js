document.addEventListener('DOMContentLoaded', () => {
    const cardTypeSelect = document.querySelector('select');
    const imageInput = document.querySelector('input[type="file"]');
    const previewImage = document.getElementById('preview-image');
    const imageDisplay = document.querySelector('.image-display');
    const lumberPointInput = document.querySelector('input[type="number"]');
    const cardHeaderInput = document.querySelector('input[placeholder="Card Header"]');
    const cardTitleInput = document.querySelector('input[placeholder="Card Title"]');
    const cardDescriptionInput = document.querySelector('textarea[placeholder="Card Description"]');

    const cardTemplates = [
        'tree-template',
        'structure-template',
        'action-template',
        'action-free',
        'yokai-good',
        'yokai-bad',
        'event-natural-disaster',
        'event-good',
        'event-bad'
    ];

    cardTypeSelect.addEventListener('change', updateCardTemplate);
    imageInput.addEventListener('change', displayImage);
    lumberPointInput.addEventListener('input', updateOverlay);
    cardHeaderInput.addEventListener('input', updateTextOverlays);
    cardTitleInput.addEventListener('input', updateTextOverlays);
    cardDescriptionInput.addEventListener('input', updateTextOverlays);

    updateCardTemplate();

    function updateCardTemplate() {
        const cardType = parseInt(cardTypeSelect.value) - 1;
        imageDisplay.className = 'image-display';

        if (cardType >= 0 && cardType < cardTemplates.length) {
            imageDisplay.classList.add(cardTemplates[cardType]);
        }
    }

    function displayImage(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;

            img.onload = function () {
                const targetWidth = 310;
                const targetHeight = 310;
                const cropWidth = 310;
                const cropHeight = 310;

                const resizeCanvas = document.createElement('canvas');
                resizeCanvas.width = targetWidth;
                resizeCanvas.height = targetHeight;
                const resizeCtx = resizeCanvas.getContext('2d');

                resizeCtx.drawImage(img, 0, 0, targetWidth, targetHeight);

                const cropCanvas = document.createElement('canvas');
                cropCanvas.width = cropWidth;
                cropCanvas.height = cropHeight;
                const cropCtx = cropCanvas.getContext('2d');

                const offsetX = (targetWidth - cropWidth) / 2;
                const offsetY = (targetHeight - cropHeight) / 2;

                cropCtx.drawImage(resizeCanvas, offsetX, offsetY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

                previewImage.src = cropCanvas.toDataURL();
            };
        };
        reader.readAsDataURL(file);
    }

    function updateOverlay() {
        const overlay = document.querySelector('.lumber-overlay');
        let lumberPoints = parseInt(lumberPointInput.value);
    
        if (isNaN(lumberPoints)) {
            lumberPoints = 0;
        }
    
        const formattedText = String(lumberPoints).split('').join('\n');
    
        if (!overlay) {
            const overlayDiv = document.createElement('div');
            overlayDiv.className = 'lumber-overlay';
            overlayDiv.textContent = formattedText;
            overlayDiv.style.backgroundColor = lumberPoints > 0 ? '#CCD44B' : '#F1585A';
            imageDisplay.appendChild(overlayDiv);
        } else {
            overlay.textContent = formattedText;
            overlay.style.backgroundColor = lumberPoints > 0 ? '#CCD44B' : '#F1585A';
        }
    }

    function updateTextOverlays() {
        updateTextOverlay(cardHeaderInput.value, 'header-overlay');
        updateTextOverlay(cardTitleInput.value, 'title-overlay');
        updateTextOverlay(cardDescriptionInput.value, 'description-overlay');
    }

    function updateTextOverlay(text, className) {
        let overlay = document.querySelector(`.${className}`);
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = className;
            imageDisplay.appendChild(overlay);
        }
        
        overlay.textContent = text;
    }
});