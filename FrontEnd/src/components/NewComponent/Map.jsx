import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Setting the Mapbox access token
mapboxgl.accessToken = "pk.eyJ1IjoiYWtpbm9sYTIzMDMiLCJhIjoiY20xeHQ0amRlMHl3djJqcXczNjBscGhuaSJ9.bpDGfAjBj93osdFVWZz6Rw";

const Map = ({ pickupCoords, destinationCoords }) => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const pickupMarkerRef = useRef(null);
    const destinationMarkerRef = useRef(null);
    const [webGLSupported, setWebGLSupported] = useState(true);

    useEffect(() => {
        // Check for WebGL support
        if (!mapboxgl.supported()) {
            setWebGLSupported(false);
            return;
        }

        // Initialize the map only once
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11', // Stylesheet location
                center: pickupCoords, // Center map on pickup coordinates
                zoom: 12, // Initial zoom level
            });

            // Add markers for pickup and destination
            pickupMarkerRef.current = new mapboxgl.Marker()
                .setLngLat(pickupCoords)
                .setPopup(new mapboxgl.Popup().setText('Pickup Location')) // Optional popup
                .addTo(map.current);

            destinationMarkerRef.current = new mapboxgl.Marker({ color: 'red' }) // Change marker color for destination
                .setLngLat(destinationCoords)
                .setPopup(new mapboxgl.Popup().setText('Destination Location')) // Optional popup
                .addTo(map.current);
        } else {
            // Update markers when the coordinates change
            pickupMarkerRef.current.setLngLat(pickupCoords);
            destinationMarkerRef.current.setLngLat(destinationCoords);

            // Optionally adjust map bounds to fit the new markers
            const bounds = new mapboxgl.LngLatBounds();
            bounds.extend(pickupCoords);
            bounds.extend(destinationCoords);
            map.current.fitBounds(bounds, { padding: 20 });
        }

        // Cleanup on component unmount
        return () => map.current.remove();
    }, [pickupCoords, destinationCoords]);

    if (!webGLSupported) {
        return <div>Your browser does not support WebGL. Please use a different browser.</div>;
    }

    return (
        <div>
            <div ref={mapContainer} className="h-96 w-full"></div> {/* Map container */}
        </div>
    );
};

export default Map;
