import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { fetchKiezData } from "../../../data/options";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

type MarkerType = {
  latitude: number;
  longitude: number;
  title: string;
  company?: string;
  job_url_direct?: string;
};

const buttons = [
  { id: "bp", label: "Integration Hubs", query: "Integration Hub" },
  { id: "event", label: "Events", query: "Tech Event" },
  { id: "job", label: "Jobs", query: "Software Developer" },
];

export const Map = () => {
  const [active, setActive] = useState(buttons[0]);
  const [markers, setMarkers] = useState<MarkerType[]>([]);

  const handleButtonClick = (btn: (typeof buttons)[0]) => {
    setActive(btn);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const topic = active.id !== "bp" ? active.id : undefined;

        const items = await fetchKiezData({
          query: active.query,
          topic: topic,
          scope: "all",
        });

        const markerData: MarkerType[] = items.map((item: any) => ({
          latitude: item.latitude,
          longitude: item.longitude,
          title: item.title,
          company: item.company,
          job_url_direct: item.job_url_direct,
        }));
        setMarkers(markerData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [active]);

  return (
    <div className="p-6 flex flex-col gap-2 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800">Berlin Map</h2>
      <p className="text-gray-600">
        Explore the city and discover key locations.
      </p>
      <div className="flex w-full gap-2 mt-4">
        {buttons.map((btn) => (
          <button
            key={btn.id}
            onClick={() => handleButtonClick(btn)}
            className={`px-2 py-1 font-semibold cursor-pointer text-gray-700 grow ${
              active.id === btn.id
                ? "bg-gray-100 border-2 border-gray-600 hover:bg-gray-300"
                : "bg-white border-2 border-gray-600 hover:bg-gray-50"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="w-full min-h-64 flex-1 border-2 border-gray-400 z-10">
        <MapContainer
          center={[52.52, 13.405]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {markers.map((marker, idx) => (
            <Marker key={idx} position={[marker.latitude, marker.longitude]}>
              <Popup>
                <div className="flex flex-col gap-1">
                  <strong>{marker.title}</strong>
                  {marker.company && <span>{marker.company}</span>}
                  {marker.job_url_direct && (
                    <a
                      href={marker.job_url_direct}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Apply
                    </a>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
