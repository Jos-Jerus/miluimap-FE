// add_soldier.js
function submitSoldier() {
    // Get form values
    const city = document.getElementById('city').value;
    const address = document.getElementById('address').value;
    const googleMapsLink = document.getElementById('googleMapsLink').value;

    // Perform POST request to '/api/miluimnik/'
    fetch('/api/miluimnik/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            city,
            address,
            google_maps_link: googleMapsLink,
            // Add additional optional parameters with default values if needed
        }),
    })
    .then(response => response.json())
    .then(data => {
        // Handle successful response
        console.log('Soldier added successfully:', data);
        alert('Soldier added successfully!');
        // Redirect back to the main map page or perform any other desired action
    })
    .catch(error => {
        // Handle error
        console.error('Error adding soldier:', error);
        alert('Error adding soldier. Please try again.');
    });
}
