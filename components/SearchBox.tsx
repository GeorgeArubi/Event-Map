import React, { useEffect, useState } from 'react';
import Radar from 'radar-sdk-js';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import radarCategories from '../miscellaneous/radar_places.json'

const SearchBox = () => {
  let publishableKey = process.env.NEXT_PUBLIC_RADAR_KEY
  const [category, setCategory] = useState('');
  const [slugs, setSlugs] = useState<any>([]);
  const [userEvent, setUserEvent] = useState<any>([]);

  const handleChange = (e: any, value: any) => {
    e.preventDefault()
    setCategory(value)
  }

  const handleClick = () => {
    const index = radarCategories.map(object => object.name).indexOf(category);
    setSlugs(radarCategories[index].slugs);  
  }

  const url = `https://api.radar.io/v1/events?placeCategories=${slugs}`;
  useEffect(() => {
    Radar.initialize(publishableKey);
    getUserEvent();
  });

  const getUserEvent = async () => {
    const { data } = await axios.get(`${url}`)
    if(!category) {
      return null
    } else {
      setUserEvent(data)
    }
  }
    
  return (
    <div className="z-10">
      <div className="space-y-5">
        <Autocomplete
          freeSolo
          id="free-solo-2-demo"
          disableClearable
          sx={{ width: 400 }}
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
      </div>
      <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
        <div className="rounded-md shadow">
          <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent 
            text-base font-medium rounded-md text-white bg-[#007aff] hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            onClick={handleClick}
          >
            Go
          </button>
        </div>
        <div className="mt-3 sm:mt-0 sm:ml-3">
          <a
            href="https://radar.com/documentation/places/categories"
            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#007aff] bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
          >
            View Categories
          </a>
        </div>
      </div>
    </div>
  )
}

export default SearchBox;