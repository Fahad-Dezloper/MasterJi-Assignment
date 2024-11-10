"use client"
import NewsDetails from '@/app/components/NewsDetails'
import TopBar from '@/app/components/TopBar'
import WeatherDetails from '@/app/components/WeatherDetails'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from "@/components/ui/switch"
import axios from 'axios'
import { Grid, List, Loader2 } from 'lucide-react'
import React, { useState } from 'react'

const Page = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [greedy, setGreedy] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 6;
  
  async function getWeather () {
    const api = "fdb7d984a95a30b9f889ba90fa6d2fe4";
    
    try {
      setLoading(true);
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.toLowerCase()}&appid=${api}`);
      const data = response.data;
      setWeather(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <div className='px-4 sm:px-8 md:px-12 pb-6 pt-4 flex flex-col gap-6 h-screen'>
      <TopBar />
      <div className='flex flex-col md:flex-row gap-7 h-full'>
        <div className='w-full md:w-1/3 h-full pt-3 pb-6 px-4 bg-white rounded-md flex flex-col gap-4'>
          <h1 className='text-lg sm:text-xl font-semibold'>How&apos;s the weather today?</h1>
          <div className='flex flex-col sm:flex-row gap-2'>
            <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder='Enter your city name' className='flex-grow' />
            <Button onClick={getWeather} disabled={loading} className='mt-2 sm:mt-0'>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Getting
                  </>
                ) : (
                  "Get Weather"
                )}
            </Button>
          </div>
          {weather && (
          <div className='w-full h-full shadow-md flex flex-col gap-4 justify-center py-4 rounded-md'>
              <WeatherDetails data={weather} />
          </div>
          )}
        </div>
        <div className='w-full md:w-2/3 h-full py-3 px-4 bg-white rounded-md flex flex-col gap-4'>
          <div className='flex flex-col sm:flex-row justify-between gap-3'>
            <h1 className='text-lg sm:text-xl font-semibold'>What&apos;s happening around the world?</h1>
            <div className='flex items-center gap-3'>
              <div className='flex items-center gap-2'>
              <List className='w-4 h-4'/>
              List View
              </div>
              <Switch checked={greedy} onCheckedChange={() => setGreedy(!greedy)}/>
              <div className='flex items-center gap-2'>
              <Grid className='w-4 h-4' />
              Grid View
              </div>
              </div>
          </div>
          <div className='max-h-[60vh] overflow-y-auto'>
            <div className={`grid ${greedy ? 'grid-cols-2' : 'grid-cols-1'} gap-6 w-full`}>
              <NewsDetails currentPage={currentPage} articlesPerPage={articlesPerPage}/>
            </div>
          </div>
          <div className='flex justify-between px-2 sm:px-5'>
            <Button variant="outline" onClick={handlePreviousPage} disabled={currentPage === 0}>
                Previous
            </Button>
            <Button onClick={handleNextPage}>
                Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page