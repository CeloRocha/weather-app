import { useState } from 'react'

export const useWeather = () => {

    const [ city, setCity] = useState('')
    const [temperature, setTemperature] = useState()
    const [ status, setStatus ] = useState({ searching: false, searched: true})
    const [ sky, setSky ] = useState({})
    const [ forecast, setForecast ] = useState()

    const getWeather = async function (city) {
        const citySearch = processString(city)
        setStatus({ searching: true, searched: true})
        const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=de725c7adc8c0c968e808807a543f352&units=metric`)
        try {
            if(res.ok){
                const data = await res.json()
                setCity(`${data.name} - ${data.sys.country}`)
                setTemperature(data.main)
                setSky({description: data.weather[0].description, icon: data.weather[0].icon})
            }else{
                if(res.status === 404){
                    setStatus({ searching: false, searched: false})
                    throw new Error('City Not Found')
                }
            }
            
        } catch (error) {
            console.log(error.message)
            return
        }
        const forecastRes = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${citySearch}&appid=de725c7adc8c0c968e808807a543f352&units=metric`)
        const forecastAllData = await forecastRes?.json()
        const forecastData = forecastAllData.list
        const forecastArray = []
        for(let i=0; i < forecastData.length; i+=8){
            let day = forecastData[i]
            forecastArray.push(day)
        }
        setForecast(forecastArray)
        setStatus({ searching: false, searched: true})
    }

    function processString(input){
        const trimInput = input.trim()
        let splitString = trimInput.split(',')
        const splitedProcessedString = splitString.map((word, index) => {
            if(index === 0){
                return word.trim().replace(/\s+/g, '+')
            }else{
                return word.trim()
            }
        })
        return splitedProcessedString.join(',')
    }


    // str = str.replace(/\s+/g, '');

    return { city, status, temperature, sky, forecast, getWeather }
}