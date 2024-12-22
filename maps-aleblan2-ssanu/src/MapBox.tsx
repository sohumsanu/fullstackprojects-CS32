import Map, { Layer, MapLayerMouseEvent, Source } from "react-map-gl";
import { geoLayer, overlayData } from "./overlays";
import { useEffect, useState } from 'react'
import { API_KEY } from "./private/api"

interface LatLong {
  lat: number;
  long: number;
}

function MapBox() {
    const ProvidenceLatLong: LatLong = { lat: 41.824, long: -71.4128 };
    const initialZoom = 10;

    function onMapClick(e: MapLayerMouseEvent) {
        console.log(e.lngLat.lat);
        console.log(e.lngLat.lng);
        console.log(e.features)
    }

    const [viewState, setViewState] = useState({
        longitude: ProvidenceLatLong.long,
        latitude: ProvidenceLatLong.lat,
        zoom: initialZoom,
    });

    const [overlay, setOverlay] = useState<GeoJSON.FeatureCollection | undefined>(
        undefined
    );

    useEffect(() => {
        setOverlay(overlayData());
    }, []);
    return (
        <Map
            mapboxAccessToken={API_KEY}
            {...viewState}
            onMove={(ev) => setViewState(ev.viewState)}
            style={{ width: window.innerWidth, height: window.innerHeight }}
            mapStyle={"mapbox://styles/mapbox/streets-v12"}
            onClick={(ev: MapLayerMouseEvent) => onMapClick(ev)}
        >
            <Source id="geo_data" type="geojson" data={overlay}>
            <Layer {...geoLayer} />
            </Source>
        </Map>
    )
}

export default MapBox