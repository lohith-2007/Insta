document.getElementById('downloadForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission
    
    const urlInput = document.getElementById('url').value; // Get the URL from input
    const resultDiv = document.getElementById('result'); // Reference to result div
    resultDiv.innerHTML = '<p class="text-center"><i class="bi bi-hourglass-split"></i> Processing, please wait...</p>'; // Loading message
    resultDiv.classList.remove('error'); // Remove any error class
    
    fetch('/download', { // Send request to backend endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: urlInput })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Display success with download link
            resultDiv.innerHTML = `
                <p class="text-center"><i class="bi bi-check-circle"></i> Video ready!</p>
                <a href="${data.downloadLink}" class="btn btn-success btn-lg w-100 mt-2" download>Download Video</a>
            `;
        } else {
            // Display error
            resultDiv.innerHTML = `<p class="text-center error"><i class="bi bi-exclamation-triangle"></i> Error: ${data.error}</p>`;
            resultDiv.classList.add('error');
        }
    })
    .catch(error => {
        // Handle network or other errors
        resultDiv.innerHTML = `<p class="text-center error"><i class="bi bi-exclamation-triangle"></i> Error: ${error.message}</p>`;
        resultDiv.classList.add('error');
    });
});
