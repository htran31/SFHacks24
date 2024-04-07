let videoStream;
let videoElement = document.getElementById('videoFeed');
let canvas = document.createElement('canvas');
let context = canvas.getContext('2d');

async function turnOnCamera() {
    try {
        videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = videoStream;
        videoElement.style.display = 'block';
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Could not access the camera. Please make sure it is enabled and try again.');
    }
}

function turnOffCamera() {
    if (videoStream) {
        const tracks = videoStream.getTracks();
        tracks.forEach(track => track.stop());
        videoStream = null;
        videoElement.style.display = 'none';
    }
}

function capturePicture() {
    if (!videoStream) {
        alert('Please turn on the camera first.');
        return;
    }

    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/jpeg');
    displayImage(imageData);


xhr.open("POST", "/sendVariable", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.send(JSON.stringify({ base64Output: imageData }));
console.log("i am in xhr sending data")
}

function displayImage(imageData) {
    const imagePreview = document.getElementById('imagePreview');
    const img = new Image();
    img.src = imageData;
    img.style.maxWidth = '50%';
    img.style.maxHeight = '300px'; // Limit the height for display
    imagePreview.innerHTML = ''; // Clear previous content
    imagePreview.appendChild(img);

    const base64Output = document.createElement('p');
    base64Output.textContent = 'Base64 String: ' + imageData;
    imagePreview.appendChild(base64Output);
}

