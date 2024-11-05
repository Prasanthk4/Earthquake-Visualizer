import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, LayersControl } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

const { BaseLayer } = LayersControl;

function Map({ filters, onEarthquakeClick }) {
  const [earthquakes, setEarthquakes] = useState([]);

  useEffect(() => {
    const fetchEarthquakes = async () => {
      try {
        const startTime = filters.startDate ? new Date(filters.startDate).toISOString() : '';
        const endTime = filters.endDate ? new Date(filters.endDate).toISOString() : '';
        
        let url = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson';
        if (startTime) url += `&starttime=${startTime}`;
        if (endTime) url += `&endtime=${endTime}`;
        if (filters.minMagnitude) url += `&minmagnitude=${filters.minMagnitude}`;
        if (filters.maxMagnitude) url += `&maxmagnitude=${filters.maxMagnitude}`;
        
        const response = await axios.get(url);
        const filteredData = response.data.features.filter(eq => {
          if (filters.region && filters.region !== 'all') {
            // Add region filtering logic here
            return true; // Placeholder
          }
          return true;
        });
        
        setEarthquakes(filteredData);
      } catch (error) {
        console.error('Error fetching earthquake data:', error);
      }
    };

    fetchEarthquakes();
    const interval = setInterval(fetchEarthquakes, 300000);

    return () => clearInterval(interval);
  }, [filters]);

  const getMarkerColor = (magnitude) => {
    if (magnitude < 2) return '#4ade80';
    if (magnitude < 4) return '#facc15';
    if (magnitude < 6) return '#f97316';
    return '#ef4444';
  };

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="h-full w-full"
      style={{ background: '#1a1a1a' }}
    >
      <LayersControl position="topright">
        <BaseLayer checked name="Dark">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="map-tiles dark"
          />
        </BaseLayer>
        <BaseLayer name="Satellite">
          <TileLayer
            attribution='&copy; Esri'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        </BaseLayer>
        <BaseLayer name="Terrain">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          />
        </BaseLayer>
      </LayersControl>

      <MarkerClusterGroup>
        {earthquakes.map((eq) => (
          <CircleMarker
            key={eq.id}
            center={[
              eq.geometry.coordinates[1],
              eq.geometry.coordinates[0]
            ]}
            radius={Math.max(eq.properties.mag * 3, 5)}
            fillColor={getMarkerColor(eq.properties.mag)}
            color={getMarkerColor(eq.properties.mag)}
            weight={1}
            opacity={0.8}
            fillOpacity={0.6}
            eventHandlers={{
              click: () => onEarthquakeClick(eq)
            }}
          >
            <Popup className="earthquake-popup">
              <div className="text-dark-100">
                <h3 className="font-bold">Magnitude: {eq.properties.mag}</h3>
                <p>Location: {eq.properties.place}</p>
                <p>Time: {new Date(eq.properties.time).toLocaleString()}</p>
                <p>Depth: {eq.geometry.coordinates[2]} km</p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default Map;