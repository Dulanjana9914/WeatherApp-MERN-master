import React from 'react';
import './Current.css';

function Current({current,city}) {
  return (
    <div className='current'>
        <b>Current Weather in {city}</b>
    <div className='currentBody'>
      <img src={current.condition.icon} alt='weather icon' />
      <span><b>{current.condition.text}</b></span>
      <br></br><br></br>
      <span>Temperature: {current.temp_c}°C  </span><br></br>
      <span>Feels Like: {current.feelslike_c}°C  </span><br></br>
      <span>Wind Speed: {current.wind_kph}kph</span>
    </div>
    </div>
  )
}

export default Current