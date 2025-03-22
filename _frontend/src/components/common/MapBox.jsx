/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ChangeCenter({ center }) {
  const map = useMap();
  map.setView(center);
  return null;
}

export default function MapBox() {
  const [center, setCenter] = useState([51.505, -0.09]);

  const generateRandomLocation = () => {
    const lat = Math.random() * 180 - 90;
    const lng = Math.random() * 360 - 180;
    setCenter([lat, lng]);
  };

  useEffect(() => {
    generateRandomLocation();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <button
          onClick={generateRandomLocation}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Generate Random Location
        </button>
      </div>

      <div className="h-[400px] w-full rounded-lg shadow-lg">
        <MapContainer
          center={center}
          zoom={13}
          className="h-full w-full rounded-lg"
        >
          <ChangeCenter center={center} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={center}>
            <Popup>
              Random Location <br />
              Latitude: {center[0].toFixed(4)}, Longitude:{" "}
              {center[1].toFixed(4)}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
