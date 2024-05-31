document.getElementById('outfit').addEventListener('change', function(event) {
    const preview = document.getElementById('outfitPreview');
    preview.innerHTML = '';
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const images = [
        'https://img.freepik.com/premium-photo/premium-jewellery-background-unleash-your-inner-glamour-generative-ai_753390-967.jpg?w=826',
        'https://en.idei.club/uploads/posts/2023-06/thumbs/1686410763_en-idei-club-p-jewellery-background-dizain-44.jpg',
        'https://babajewellery.co.in/wp-content/uploads/2016/11/Jewellery-Shops-in-india-1.jpg',
        
    ];

    const colors = [
      'rgba(255, 228, 225, 0.623)',
        ' rgba(156, 189, 211, 0.723',
        'rgba(156, 189, 211, 0.723'
    ];

    const body = document.body;
    const container = document.querySelector('.container');
    let currentIndex = 0;

    function changeBackground() {
        currentIndex = (currentIndex + 1) % images.length;
        body.style.backgroundImage = `url('${images[currentIndex]}')`;
        container.style.backgroundColor = colors[currentIndex];
    }

    setInterval(changeBackground, 5000);
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("customizationForm");
    const modal = document.getElementById("submissionModal");
    const closeButton = document.querySelector(".close-button");



    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                modal.style.display = "block";
            }
        })
        .catch(error => console.error('Error:', error));
    });

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        modal.style.display = "block";
    });

    closeButton.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});