import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import SearchBox from '../components/SearchBox';
import EventMap from '../components/EventMap';
import logo_blue from '../assets/logo_blue.png'
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home: NextPage = () => {
  const [mapData, setMapData] = useState<any>([]);

  const getData = (data: any) => {
    setMapData(data)
  }

  return (
    <>
      <Head>
        <title>Radar Event Map</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen flex items-center p-24">
        <div className="box-content bg-white h-full w-full p-8 overflow-hidden rounded-3xl">
          <div className="flex flex-row max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-2/3 lg:pb-28 xl:pb-32">
              <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-4 xl:mt-20">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-bold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="mr-3">
                      <Image src={logo_blue} width={35} height={43} alt="Radar Logo"/>
                    </span>
                    <span className="block xl:inline text-transparent bg-clip-text bg-gradient-to-r from-[#007aff] to-cyan-400 text-6xl font-bold z-10">
                      Radar Event Map</span>
                  </h1>
                  <p className="mb-5 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <SearchBox getData={getData}/>
                </div>
              </div>
            </div>
            <EventMap categories={mapData}/>
          </div>
        </div>
      </main>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default Home;
