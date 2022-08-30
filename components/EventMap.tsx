import React, { useState } from 'react';
import DeckGL from "@deck.gl/react/typed";
import { IconLayer } from "@deck.gl/layers/typed";
import { Map } from "react-map-gl";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const EventMap = (props: any, data: any) => {
  const [viewState, setViewState] = useState<any>({
      latitude: 40.05753979678667,
      longitude: -76.44497274763935,
      zoom: 5.1,
  })
  
  // Data to be used by the IconLayer
  const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

  data = props.categories;
  //console.log(data)
  
  const layer = new IconLayer({
    id: 'icon-layer',
    data,
    pickable: true,
    // iconAtlas and iconMapping are required
    // getIcon: return a string
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    getIcon: _d => 'marker',
    sizeScale: 9,
    getPosition: d => d.place.location.coordinates,
    getSize: _d => 5,
    getColor: d => [Math.sqrt(d.exits), 140, 0]
  });

  //console.log(viewState)

  return (
    <div className="box-content w-2/3 z-10">
      <div className="relative z-10 pb-8 h-full sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
        <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-20 ">
            <DeckGL
              viewState={viewState}
              onViewStateChange={e => setViewState(e.viewState)}
              controller={true}
              layers={[layer]}
              getTooltip={({object}) => object && `${object.place.name}\n`}
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