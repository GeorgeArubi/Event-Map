import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import radarCategories from '../miscellaneous/radar_places.json'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchBox = ({getData}: any) => {
  let publishableKey = process.env.NEXT_PUBLIC_RADAR_KEY
  const [category, setCategory] = useState('');
  const [slugs, setSlugs] = useState<any>([]);
  const [userEvent, setUserEvent] = useState<any>([]);

  const handleChange = (e: any, value: any) => {
    e.preventDefault();
    setCategory(value);
  }

  // If the search box is empty do nothing, otherwise set the slug state to its corresponding category
  const handleClick = async () => {
    const index = radarCategories.map(object => object.name).indexOf(category);
    if (!radarCategories[index]) {
      return null
    } else {
      setSlugs(radarCategories[index].slugs);
    }
    
  }

  // Fetch event data from Radar API and return error if there are no events
  const getUserEvent = useCallback( async () => {
    const response = await axios.get(`https://api.radar.io/v1/events?placeCategories=${slugs}`,
        { headers: {'Authorization': `${publishableKey}`} }
      )
      const res = response.data.events
      setUserEvent(res)

      if (res.length == 0) {
        toast.error('No events for selected category!', {
          position: "bottom-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored"
        });
      } 
  }, [slugs, publishableKey])

  // Call user event function after user has selected a category
  useEffect(() => {
    if (slugs.length > 0) {
      getUserEvent()
    }
  }, [slugs, getUserEvent])

  // Send event data to map component
  useEffect(() => {
    if (userEvent.length > 0) {
      getData(userEvent);
    }
  }, [userEvent, getData])

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
              label="Search Category"
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