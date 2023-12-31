import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useEstablishment } from "@/hooks/useEstablishment";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { establishments, getAllEstablishments } = useEstablishment();
  const [center, setCenter] = useState({ lat: 48.8566, lng: 2.3522 });
  const [zoom, setZoom] = useState(12);

  const [mapOptions, setMapOptions] = useState({
    zoomControl: true,
    gestureHandling: 'greedy',
    disableDoubleClickZoom: false,
    maxZoom: 18,
    minZoom: 3,
    clickableIcons: false,
    zoom: zoom,
    center: center,
  });

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyDZdFaDB4L72ma6LOOTxK93KvMPlhS2bj8',
  });

  useEffect(() => {
    getAllEstablishments();
  }, []);

  useEffect(() => {
    Promise.all(
      (establishments || []).map(async (establishment) => {
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(establishment.street)}&key=AIzaSyDZdFaDB4L72ma6LOOTxK93KvMPlhS2bj8`
          );
          const data = await response.json();
          console.log('Données de géocodage pour', establishment.street, data);

          if (data.results && data.results.length > 0) {
            const location = data.results[0].geometry.location;
            console.log(`Position pour ${establishment.id}: `, location);

            return {
              id: establishment.id,
              name: establishment.name,
              street: establishment.street,
              position: { lat: location.lat, lng: location.lng },
              photo: 'images/immeubles-parisiens-paris-zigzag.jpg',
              //photo: establishment.photoEstablishment,
              city: establishment.city,
              zipCode: establishment.zipCode,
            };
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données de géocodage :', error);
        }
        return {};
      })
    ).then((markers) => {
      console.log('Markers :', markers);
      setMarkers(markers.filter(marker => Object.keys(marker).length !== 0));
    });
  }, [establishments]);

  const [markers, setMarkers] = useState([]);

  const onLoad = (map) => {
    setMap(map);
  };

  const onMapClick = () => {
    if (selectedMarker) {
      setSelectedMarker(null);
      setMapOptions({
        ...mapOptions,
        center: center,
        zoom: zoom,
      });
    }
  };

  const onMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setMapOptions({
      ...mapOptions,
      center: marker.position,
      zoom: 15,
    });
  };

  return (
    <div style={{ height: '300px', position: 'relative' }}>
      {loadError && <div>Erreur lors du chargement de la carte Google Maps</div>}
      {!isLoaded && !loadError && <div>Chargement en cours...</div>}
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '150%', position: 'center' }}
          onLoad={onLoad}
          onClick={onMapClick}
          options={mapOptions}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.id}
              position={marker.position}
              onClick={() => onMarkerClick(marker)}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.position}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div style={{ color: 'black', backgroundColor: 'white', padding: '5px', borderRadius: '5px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '200px' }}>
                <a href={`/provider/establishment/${selectedMarker.id}`}>
                  <p style={{ margin: '0', fontSize: '16px', fontWeight: 'bold' }}>{selectedMarker.name}</p>
                <img src={selectedMarker.photo} alt="image1" style={{ maxWidth: '100%', height: 'auto', borderRadius: '5px 5px 0 0' }} /></a>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ margin: '0', color: '#666', fontSize: '12px', marginRight: '5px', fontWeight: 'bold'}}>Adresse:</p>
                  <p>{selectedMarker.street} - {selectedMarker.city}, {selectedMarker.zipCode}</p>
                </div>              
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default MapComponent;
