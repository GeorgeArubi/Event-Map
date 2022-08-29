import React, { useEffect, useState } from 'react';
import Radar from 'radar-sdk-js';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import radarCategories from '../miscellaneous/radar_places.json'

const SearchBox = () => {
  const [category, setCategory] = useState('');
  const [slugs, setSlugs] = useState<any>([]);
  const [location, setLocation] = useState<any>();
  const [event, setEvent] = useState<any>();

  const handleChange = (e: any, value: any) => {
    e.preventDefault()
    setCategory(value)
  }

  const handleClick = () => {
    const index = radarCategories.map(object => object.name).indexOf(category);
    setSlugs(radarCategories[index].slugs);
    getUserLocation()  
  }
  //console.log(slugs)

  const getUserLocation = () => {
    Radar.getLocation(async function(err: any, result: any) {
      if (!err) {
        // do something with result.location, result.events, result.user
        const currentLocation = await result.location
        setLocation(currentLocation)
      }
    });
    return location;
  }

  const getCategoryEvent = () => {
    Radar.trackOnce({
      latitude: location.latitude,
      longitude: location.longitude,
      accuracy: location.accuracy,
    }, async function(err: any, result: any) {
      if (!err) {
        // do something with result.places
        setEvent(await result.event)
      }
    });
  }
  //getCategoryEvent()
    
  return (
    <div className="z-10">
      <div className="space-y-5">
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          sx={{ width: 350 }}
          options={radarCategories.map((option: any) => option.name)}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Category"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <Autocomplete
          id="free-solo-demo"
          freeSolo
          sx={{ width: 450 }}
          options={["Use Current Location"]}
          renderInput={(params) => <TextField {...params} label="Location" />}
        />
      </div>
      
      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        <div className="rounded-md shadow">
          <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent 
            text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            onClick={handleClick}
          >
            Go
          </button>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <a
            href="https://radar.com/documentation/places/categories"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
          >
            View Categories
          </a>
        </div>
      </div>
    </div>
  )
}

export default SearchBox;