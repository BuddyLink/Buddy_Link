import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useEffect } from "react";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
const mapBoxToken = import.meta.env.VITE_MAPBOX_API_KEY;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Routing = ({ start, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!start || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start.latitude, start.longitude),
        L.latLng(destination.latitude, destination.longitude),
      ],
      router: new L.Routing.mapbox(mapBoxToken),
      lineOptions: {
        styles: [{ color: "blue", weight: 4 }],
      },
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      show: false,
    }).addTo(map);

    routingControl.on("routingerror", (err) => {
      console.error("Routing error:", err);
    });
    return () => {
      map.removeControl(routingControl);
    };
  }, [start, destination, map]);
  return null;
};

const Map = ({ start, destination }) => {
  const position = [32.5278, -92.7147];

  return (
    <div className="w-full lg:h-[500px] h-[250px] rounded-xl mt-4 relative z-0">
      <MapContainer
        center={position}
        zoom={17}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {start && (
          <Marker position={[start.latitude, start.longitude]}>
            <Popup>{start.name}</Popup>
          </Marker>
        )}
        {destination && (
          <Marker position={[destination.latitude, destination.longitude]}>
            <Popup>{destination.name}</Popup>
          </Marker>
        )}
        {start && destination && (
          <Routing start={start} destination={destination} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
