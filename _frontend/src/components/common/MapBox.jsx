/* eslint-disable react/prop-types */
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Button from "./Button";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { useState } from "react";

const MapBox = ({ latitude, longitude,className   }) => {
  const [locked, setLocked] = useState(true);

  return (
    <div className={`mb-1 relative ${className}`}>
      <Button
        onClick={() => setLocked(!locked)}
        className="w-10 h-10 absolute top-3 text-dark bg-light border rounded-full p-2 z-1002 right-3"
      >
        {locked ? (
          <FaLock className="m-auto" />
        ) : (
          <FaLockOpen className="m-auto" />
        )}
      </Button>
      <div
        className={`h-full w-full z-1000 absolute ${!locked && "hidden"}`}
      ></div>
      <MapContainer
        center={[latitude, longitude]}
        zoom={16}
        className={`border  h-full w-full`}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitude, longitude]} />
      </MapContainer>
    </div>
  );
};

export default MapBox;
