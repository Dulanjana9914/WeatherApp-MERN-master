import {React,useState} from 'react'
import { Accordion } from '@mui/material';
import { AccordionDetails } from '@mui/material';
import { AccordionSummary } from '@mui/material';
import { Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import './Forecast.css';


function Forecast({city,forecast}) {
    const[expanded,setExpanded]=useState(false);

    const handleExpand=(panel)=>(event, isExpanded)=>{
        setExpanded(isExpanded?panel:false);
    }
  return (
<div>
       Weather Forecast for {city}
<div className='forecast'>
{forecast?.forecastday.slice(1,4).map((dayData) => (
  <div key={dayData.date} className="forecast-item">
    <img src={dayData.day.condition.icon} alt='weather icon' />
    <p>Date :{dayData.date}</p>
    <p><b>{dayData.day.condition.text}</b></p>
    <p>{dayData.day.daily_chance_of_rain}% chance of rain possible</p>
    <p>Max Temperature: {dayData.day.maxtemp_c}°C</p>
    <p>Min Temperature: {dayData.day.mintemp_c}°C</p>
    <p>Wind Speed: {dayData.day.maxwind_kph} kph</p>
  </div>
))}
</div>
  <div>
    <Accordion expanded={expanded==='panel1'} 
    onChange={handleExpand('panel1')}>
        <AccordionSummary expandIcon={<ExpandMore/>}
        aria-controls="panel1bh-content" 
        id="panel1bh-header">
        <Typography sx={{width:'30%',marginLeft:'80%' ,height:'10vh',fontSize:'2.3rem', paddingTop:'8px',color:'green',alignContent:'flex-end' }}>
            <b>View More...</b>
        </Typography>
        </AccordionSummary>
       
        <AccordionDetails>       
         {forecast?.forecastday.slice(4,7).map((dayData) => (
            <div key={dayData.date} className="forecast-item">
             <img src={dayData.day.condition.icon} alt='weather icon' />
             <p>Date :{dayData.date}</p>
             <p><b>{dayData.day.condition.text}</b></p>
             <p>{dayData.day.daily_chance_of_rain}% chance of rain possible</p>
             <p>Max Temperature: {dayData.day.maxtemp_c}°C</p>
             <p>Min Temperature: {dayData.day.mintemp_c}°C</p>
             <p>Wind Speed: {dayData.day.maxwind_kph} kph</p>
          </div>
         ))}  
        </AccordionDetails>
    </Accordion>
  </div>
    </div>
  )
}

export default Forecast