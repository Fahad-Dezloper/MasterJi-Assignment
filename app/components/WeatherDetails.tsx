/* eslint-disable @next/next/no-img-element */
import React from 'react'

const WeatherDetails = (weather) => {
    // console.log("hi i am weather here", weather);
    const kelvinToCelsius = (kelvin: number) => {
        return Math.round(kelvin - 273.15);
    };

    function formatTimestampToTime(unixTimestamp: number) {
        const date = new Date(unixTimestamp * 1000); 

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        
        const period = hours >= 12 ? 'P.M.' : 'A.M.';
        hours = hours % 12 || 12; 

        return `${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${period}`;
    }
    
    return (
        <>
            <div className='flex flex-col items-center'>
                <h1 className='text-xl font-semibold'>{weather.data.name}, {weather.data.sys.country}</h1>
                <h3 className='text-gray-400 text-base'>{weather.data.weather[0].description}</h3>
            </div>

            <div className='w-full flex justify-center'>
                <img src={`http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@4x.png`} alt="weather image" className='w-16 h-16' />
            </div>
            <div className='grid grid-cols-2 gap-4 w-fit mx-auto'>
                <div className='flex flex-col justify-center items-center rounded-md bg-white shadow-md p-4'>
                    <h1 className='text-lg font-bold'>{kelvinToCelsius(weather.data.main.temp)}°C</h1>
                    <p className="text-gray-400 text-sm text-center">Current <br /> Temperature</p>
                </div>
                <div className='flex flex-col justify-center items-center rounded-md bg-white shadow-md p-4'>
                    <h1 className='text-lg font-bold'>{kelvinToCelsius(weather.data.main.feels_like)}°C</h1>
                    <p className="text-gray-400 text-sm text-center">Feels Like</p>
                </div>
                <div className='flex flex-col justify-center items-center rounded-md bg-white shadow-md p-4'>
                    <h1 className='text-lg font-bold'>{weather.data.main.humidity}%</h1>
                    <p className="text-gray-400 text-sm text-center">Humidity</p>
                </div>
                <div className='flex flex-col justify-center items-center rounded-md bg-white shadow-md p-4'>
                    <h1 className='text-lg font-bold'>{weather.data.wind.speed} m/s</h1>
                    <p className="text-gray-400 text-sm text-center">Wind Speed</p>
                </div>
            </div>

            <div className='flex flex-col justify-center w-fit mx-auto mt-4'>
                <div>
                    <h1><span className='font-semibold'>Sunrise:</span> {formatTimestampToTime(weather.data.sys.sunrise)}</h1>
                </div>
                <div>
                    <h1><span className='font-semibold'>Sunset:</span> {formatTimestampToTime(weather.data.sys.sunset)}</h1>
                </div>
            </div>
        </>
    )
}

export default WeatherDetails