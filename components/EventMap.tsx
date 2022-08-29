import React, { useState } from 'react';
import Radar from 'radar-sdk-js';
import DeckGL from "@deck.gl/react/typed";
import { IconLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css';

const EventMap = (data: any) => {
  const [location, setLocation] = useState<any>();
  const [viewState, setViewState] = useState({
      latitude: 38.889248,
      longitude: -77.050636,
      zoom: 12.5,
  })

  const getUserLocation = () => {
    Radar.getLocation(async function(err: any, result: any) {
      if (!err) {
        // do something with result.location, result.events, result.user
        const currentLocation = await result.location
        setLocation(currentLocation)
      }
    });
  }
  getUserLocation();  

// Data to be used by the LineLayer
const ICON_MAPPING = {
  marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
};

  data = [
    {
      name: 'Colma (COLM)', 
      address: '365 D Street, Colma CA 94014', 
      exits: 4214, 
      coordinates: [-122.466233, 37.684638]
    }
  ]

  const layer = new IconLayer({
    id: 'icon-layer',
    data,
    pickable: true,
    // iconAtlas and iconMapping are required
    // getIcon: return a string
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    getIcon: d => 'marker',

    sizeScale: 9,
    getPosition: d => d.coordinates,
    getSize: d => 5,
    getColor: d => [Math.sqrt(d.exits), 140, 0]
  });

  return (
    <div className="box-content w-3/4 z-10">
      <div className="relative z-10 pb-8 h-full sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-20 ">
            <DeckGL
              viewState={viewState}
              controller={true}
              layers={[layer]}
              getTooltip={({object}) => object && `${object.name}\n${object.address}`}
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