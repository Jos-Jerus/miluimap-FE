// script.js

document.addEventListener('DOMContentLoaded', () => {
    const map = L.map('map').setView([31.7767, 35.2345], 8); // Initial map center

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Define a custom marker icon
    const customIcon = L.icon({
        iconUrl: 'path/to/your/new-custom-marker.png', // Replace with the path to your new custom marker image
        iconSize: [32, 32], // Adjust the size of your new custom marker
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });

    // Fetch all addresses from the backend API
    fetch('/api/addresses/')
        .then(response => response.json())
        .then(data => {
            const soldierBusinesses = data.map(entry => {
                return {
                    id: entry[0],
                    lat: entry[1],
                    lon: entry[2],
                    city: entry[3],  // Assuming the city is included in the response
                    businessName: "",  // You can fetch business name later when clicking on an icon
                    miluimnikName: "",
                    miluimnikFamily: ""
                };
            });

            // Add markers for soldier businesses using the custom icon
            soldierBusinesses.forEach(business => {
                L.marker([business.lat, business.lon], { icon: customIcon })
                    .addTo(map)
                    .bindPopup(`<b>ID:</b> ${business.id}<br>Coordinates: ${business.lat}, ${business.lon}<br>City: ${business.city}`)
                    .on('click', () => showPopupDetails(business));
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    function showPopupDetails(business) {
        // Fetch additional details when a user clicks on a soldier icon
        fetch(`/api/miluimnik/${business.id}`)
            .then(response => response.json())
            .then(details => {
                // Update the existing business object with fetched details
                business.businessName = details.buisness_name;
                business.miluimnikName = details.miluimnik_name;
                business.miluimnikFamily = details.miluimnik_family;

                // Open a popup with the additional details
                L.popup()
                    .setLatLng([business.lat, business.lon])
                    .setContent(`<b>ID:</b> ${business.id}<br>Coordinates: ${business.lat}, ${business.lon}<br>City: ${business.city}<br>Business Name: ${business.businessName}<br>Miluimnik Name: ${business.miluimnikName}<br>Miluimnik Family: ${business.miluimnikFamily}`)
                    .openOn(map);
            })
            .catch(error => {
                console.error('Error fetching details:', error);
            });
    }
});
