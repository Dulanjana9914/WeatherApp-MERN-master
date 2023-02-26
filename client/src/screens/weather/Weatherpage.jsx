import React, { useState, useEffect } from 'react';
import Current from './Current';
import Forecast from './Forecast';
import './weather.css';

const API_KEY = 'addd2d8a25254e2088e63624232602'; 
const autoCompleteURL= `https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=`;
const weatherURL= (city)=>
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7`;

function Weatherpage() {
    
    const [city, setCity] = useState('');
    const [selected, setSelected] = useState(false);
    const [suggestedCities, setSuggestedCities] = useState([]);
    const [current, setCurrent] = useState();
    const [forecast, setForecast] = useState();
    const [location, setLocation] = useState('');
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    
    const handleClick= async (selectedCity) => {
        setCity(selectedCity);
        setSelected(true);
        setSuggestedCities([]);

        const res = await fetch(weatherURL(selectedCity));
        const data = await res.json();
        setCurrent(data.current);
        setForecast(data.forecast);
        setLocation(data.location.name);
    } 

    const handleSearchClick =async () => {
    const geocoderUrl = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=690adb47c2f5464cb174e55a78bb99c3`;
    fetch(geocoderUrl)
      .then((response) => response.json())
      .then((data) => {
        const city = data.results[0].components.city;
        setCity(city);
      });
  };

    const handleLatChange = (e) => {
    setLat(e.target.value);
  };

  const handleLngChange = (e) => {
    setLng(e.target.value);
  };

    useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch(autoCompleteURL + city);
            const data = await response.json();
            const citySuggestions = data.map((currData) => `${currData.name},${currData.region},${currData.country}`);
            setSuggestedCities(citySuggestions);
        };
        if(!selected&& city.length > 2){
         fetchCities();}
        else{
         setSuggestedCities([]);
         setSelected(false);
    }

    },[city]);


  return (
    <div className='page'>
        <div className='page-header'>
           <b>Weather App</b> 
        </div>
     <div className='app_body'>
      <input type='text' 
        placeholder='Enter City Name' 
        className='cityText'
        value={city} 
        onChange={(e) => setCity(e.target.value)}
      /> 
      {suggestedCities.length > 0 &&(
        <div className='suggestionWrapper'>
         {suggestedCities.map((currCity) => (
            <div className='suggestion'
             onClick={()=>handleClick(currCity)}
        >
        {currCity}
        </div>
        ))}
        </div> 
      )}
      <br></br>
      <div style={{display:'flex'}}>
      <label htmlFor="latitude">Latitude: &nbsp; &nbsp; </label>
      <input
       style={{marginRight:'10px', marginLeft:'10px',borderRadius:'8px'}}
        type="text"
        id="latitude"
        value={lat}
        onChange={handleLatChange}
       
      /> &nbsp; &nbsp; &nbsp;
      
      <label htmlFor="longitude">Longitude:&nbsp; &nbsp;</label>
      <input
      style={{marginRight:'10px', marginLeft:'10px',borderRadius:'8px'}}
        type="text"
        id="longitude"
        value={lng}
        onChange={handleLngChange}
      />
      &nbsp; &nbsp;&nbsp; &nbsp;
      <button style={{backgroundColor:'green',color:'white',
       minwidth:'10%',maxwidth:'140px',height:'35px',borderRadius:'8px', padding:'5px 10px', fontSize:'15',
       fontWeight:'bold',border:'none',margin:'4px 2px',cursor:'pointer',marginRight:'10px', marginLeft:'10'}} 
       onClick={handleSearchClick}>Search</button>
      <br />
    </div>

        {current && <Current current={current} city={location}/>}
        {forecast && <Forecast forecast={forecast} city={location} />}
      </div>
    </div>
  );
}

export default Weatherpage;