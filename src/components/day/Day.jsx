import './day.css'
import thermoImg from '../../assets/images/thermo.svg'

export default function Day (props) {
    const date = new Date(props.day * 1000)
    const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
    const actualDay = dias[date.getDay()]
    return(
        <div className='day'>
            <h3>{actualDay}</h3>
            <div className='day-title info'>
            <img src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`} alt='Sky State Icon' />
            <h3>{props.description}</h3>
            </div>
            <div className='day-temperature info'>
                <img src={thermoImg} alt='Temperature' />
                <h3>{props.temperature} ºC</h3>
            </div>
        </div>
    )
}