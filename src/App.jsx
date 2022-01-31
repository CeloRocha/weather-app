import { useState, useEffect } from 'react'
import './App.css'
import { useWeather } from './hooks/useWeather.js'
import logoImg from './assets/images/weather.svg'
import thermometerImg from './assets/images/thermo.svg'
import humidityImg from './assets/images/humidity.svg'
import searchImg from './assets/images/search-icon.png'
import githubImg from './assets/images/githubIcon.png'
import Day from './components/day/Day'

function App() {

  const [location, setLocation] = useState('');
  const { city, status, temperature, sky, forecast, getWeather } = useWeather();
  
  useEffect(()=> {
    getWeather('Pindamonhangaba')
  }, [])

  async function handleSearch(event){
    event.preventDefault()
    getWeather(location)
  }

  const days = forecast?.map((day) => {
    return(
        <Day
          key={day.dt}
          day={day.dt}
          description={day.weather[0].description}
          icon={day.weather[0].icon}
          temperature={day.main.temp}
        />
    )
  })

  return (
    <div className="App">
      <header>
        <div className='logo'>
          <img src={logoImg} alt='Logo' />
          <h1 className='title'>Weather Site</h1>
        </div>
        <form onSubmit={handleSearch}>
          <input 
            type="text"
            placeholder='Pindamonhangaba, SP, BR'
            onChange={event => setLocation(event.target.value)}
            value={location}
          />
          <button>
            <img src={searchImg} alt='Pesquisar' />
          </button>
        </form>
      </header>

      { temperature && !status.searching
        ?
        <div className='info-section'>
          { !status.searched && <h2>Cidade não encontrada</h2>}
          <h2 className='city'>{city}</h2>
          <div className='info'>
            <img src={`http://openweathermap.org/img/wn/${sky.icon}@2x.png`} alt='Sky State Icon' />
            <h3>{sky.description}</h3>
          </div>
          <div className='info'>
            <img src={thermometerImg} alt='Termômetro' />
            <h3>{temperature.temp} ºC</h3>
          </div>
          <div className='info'>
            <img src={humidityImg} alt='Termômetro' />
            <h3>{temperature.humidity}% </h3>
          </div>
          <div className='info'>
            <img src={thermometerImg} alt='Termômetro' />
            <h3>Min: {temperature.temp_min} ºC</h3>

          </div>
          <div className='info'>
            <img src={thermometerImg} alt='Termômetro' />
            <h3>Max: {temperature.temp_max} ºC</h3>
          </div>
        </div>
        :
        <h1 className='loading'>Carregando</h1>
      }
      { forecast && !status.searching &&
        <div className='forecast-section'>
          {days}
        </div>
      }
      <footer>
        <a href='https://github.com/CeloRocha' target='_blank'>
          <img src={githubImg} alt='GitHub Logo' />
          <h3>Marcelo Rocha</h3>
        </a>
      </footer>
    </div>
  )
}

export default App
