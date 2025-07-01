import React, { useEffect, useRef, useState } from "react";
import L, { Map } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen";
import axiosInstance from "@services/instance";

interface LocationData {
  name: string;
  subtitle: string;
  address: string;
  location: string;
}

const LocationMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<Map | null>(null);
  const [startLocation, setStartLocation] = useState("");
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axiosInstance.get("/api/location");
        setLocationData(response.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch location data");
      }
    };
    fetchLocationData();
  }, []);

  useEffect(() => {
    if (!mapRef.current || !locationData) return;

    // Parse location string (expected format: "lat,lng")
    const [lat, lng] = locationData.location.split(",").map(coord => parseFloat(coord.trim()));
    if (isNaN(lat) || isNaN(lng)) {
      console.error("Invalid location coordinates");
      return;
    }

    // Initialize Leaflet map
    const map = L.map(mapRef.current, {
      center: [lat, lng],
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true,
      boxZoom: true,
      fullscreenControl: true,
    } as any);
    mapInstanceRef.current = map;

    // Try Stamen Terrain tiles first
    const stamenTiles = L.tileLayer(
      "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> — Map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }
    );

    // Fallback to OpenStreetMap tiles if Stamen fails
    const osmTiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    });

    // Attempt to add Stamen tiles, fallback to OSM on error
    stamenTiles.addTo(map).on("tileerror", () => {
      console.log("Stamen tiles failed, switching to OSM");
      map.removeLayer(stamenTiles);
      osmTiles.addTo(map);
    });

    // Fix marker icon paths
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    // Custom marker icon
    const customIcon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // Main location marker with styled popup
    L.marker([lat, lng], { icon: customIcon })
      .addTo(map)
      .bindPopup(
        `
        <div style="font-family: 'Nanum Myeongjo', serif; color: #5b3423; background: #ffeedc; padding: 10px; border-radius: 5px; text-align: center; max-width: 200px;">
          <img src="/images/hotel-shambala-logo.png" alt="${locationData.name} Logo" style="height: 40px; margin: 0 auto 5px;" />
          <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: bold;">${locationData.name}</h3>
          <p style="margin: 0; font-size: 14px;">${locationData.address}</p>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" style="color: #019cec; text-decoration: none; font-size: 14px; display: block; margin-top: 5px;">
            Get Directions
          </a>
        </div>
        `
      )
      .openPopup();

    // Australian Embassy marker
    L.marker([27.7368, 85.3305], { icon: customIcon })
      .addTo(map)
      .bindPopup(
        `
        <div style="font-family: 'Nanum Myeongjo', serif; color: #5b3423; background: #ffeedc; padding: 10px; border-radius: 5px; max-width: 200px;">
          <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: bold;">Australian Embassy</h3>
          <p style="margin: 0; font-size: 14px;">Bansbari, Kathmandu, Nepal</p>
        </div>
        `
      );

    // US Embassy marker
    L.marker([27.7360, 85.3310], { icon: customIcon })
      .addTo(map)
      .bindPopup(
        `
        <div style="font-family: 'Nanum Myeongjo', serif; color: #5b3423; background: #ffeedc; padding: 10px; border-radius: 5px; max-width: 200px;">
          <h3 style="margin: 0 0 5px; font-size: 16px; font-weight: bold;">US Embassy</h3>
          <p style="margin: 0; font-size: 14px;">Maharajgunj, Kathmandu, Nepal</p>
        </div>
        `
      );

    // Scale control
    L.control.scale({ metric: true, imperial: false }).addTo(map);

    // Custom map style
    const style = document.createElement("style");
    style.innerHTML = `
      .leaflet-container {
        background: #ffeedc !important;
      }
      .leaflet-popup-content-wrapper {
        background: #ffeedc !important;
        color: #5b3423 !important;
      }
      .leaflet-popup-tip {
        background: #ffeedc !important;
      }
      .leaflet-control-zoom a, .leaflet-control-fullscreen a {
        background: #ffeedc !important;
        color: #5b3423 !important;
      }
    `;
    document.head.appendChild(style);

    // Force map redraw
    setTimeout(() => {
      map.invalidateSize();
    }, 100);

    // Cleanup on unmount
    return () => {
      map.remove();
      document.head.removeChild(style);
    };
  }, [locationData]);

  const handleDirections = (e: React.FormEvent) => {
    e.preventDefault();
    if (startLocation && locationData) {
      const [lat, lng] = locationData.location.split(",").map(coord => parseFloat(coord.trim()));
      if (!isNaN(lat) && !isNaN(lng)) {
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            startLocation
          )}&destination=${lat},${lng}`,
          "_blank"
        );
      }
    }
  };

  return (
    <div className="bg-[#ffeedc] py-20 px-20 md:px-32">
      <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-20">
        <div className="flex-1/2 max-w-[300px]">
          <h1 className="font-nanum text-[52px] md:text-[60px] text-[#5b3423]">
            Our Location
          </h1>
        </div>
        <div className="flex-1">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : locationData ? (
            <>
              <h2 className="font-nanum text-xl font-bold text-[#5b3423] mb-2">{locationData.name}</h2>
              <p className="text-[#5b3423] mb-2">{locationData.subtitle}</p>
              <p className="text-[#5b3423]">{locationData.address}</p>
            </>
          ) : (
            <p className="text-[#5b3423]">Loading location data...</p>
          )}
        </div>
      </div>

      {/* Directions Form */}
      <div className="container mx-auto px-4 text-center mt-8">
        <form onSubmit={handleDirections} className="flex justify-center gap-4">
          <input
            type="text"
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="Enter starting location (e.g., Tribhuvan Airport)"
            className="font-nanum text-[#5b3423] bg-white p-2 border border-[#5b3423] rounded-md focus:border-[#019cec] focus:ring-2 focus:ring-[#019cec]/20 w-full max-w-md"
          />
          <button
            type="submit"
            className="font-nanum px-4 py-2 text-[#5b3423] border-[#5b3423] border rounded-md hover:bg-[#5b3423] hover:text-white"
          >
            Get Directions
          </button>
        </form>
      </div>

      {/* Leaflet Map with Stamen Tiles */}
      <div className="mt-8 w-full h-[400px] rounded-lg overflow-hidden">
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default LocationMap;
