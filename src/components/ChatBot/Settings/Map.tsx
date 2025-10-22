import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const Map = () => {
  const [active, setActive] = useState("bp");

  const buttons = [
    { id: "bp", label: "BP Stations" },
    { id: "events", label: "Events" },
    { id: "jobs", label: "Jobs" },
  ];

  return (
    <div className="p-6 flex flex-col gap-2 h-screen">
      <h2 className="text-2xl font-bold text-gray-800">Berlin Map</h2>
      <p className="text-gray-600">
        Explore the city and discover key locations.
      </p>
      <div className="flex gap-2 mt-4">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => setActive(btn.id)}
            className={`flex-1 px-2 py-1 font-semibold cursor-pointer ${
              active === btn.id
                ? "bg-emerald-500 border-2 border-emerald-400 hover:bg-emerald-400 text-white"
                : "border-2 border-emerald-400 bg-gray-50 hover:bg-white text-gray-700"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="w-full flex-1 border-2 border-emerald-500">
        <MapContainer
          center={[52.52, 13.405]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[52.52, 13.405]}>
            <Popup>Berlin</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
