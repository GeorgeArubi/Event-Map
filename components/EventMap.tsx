import React from 'react';
import DeckGL from "@deck.gl/react/typed";
import { LineLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

// Viewport settings
const INITIAL_VIEW_STATE = {
  latitude: 38.889248,
  longitude: -77.0368707,
  zoom: 12.5,
  bearing: 0,
  pitch: 0,
  altitude: 1.5,
  maxZoom: 20,
  minZoom: 0,
  maxPitch: 60,
  minPitch: 0,
};

// Data to be used by the LineLayer
const data = [
  { sourcePosition: [9.082, 8.6753], targetPosition: [9.082, 8.6753] },
];

const EventMap = () => {
  const layers = [new LineLayer({ id: "line-layer", data })];
  return (
    <div className="box-content w-3/4 z-10">
      <div className="relative z-10 pb-8 h-full sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 ">
            <DeckGL
              initialViewState={INITIAL_VIEW_STATE}
              controller={true}
              layers={layers}
            >
                <Map
                  mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                  mapStyle="mapbox://styles/mapbox/light-v9"
                />
            </DeckGL>
        </div>
      </div>
    </div>
  )
}

export default EventMap;