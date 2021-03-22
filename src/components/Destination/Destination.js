import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import './Destination.css';
import Vehicles from '../../fakedata/vehicles.json';
import { useParams } from 'react-router';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PeopleIcon from '@material-ui/icons/People';
import Map from '../Map/Map';


const Destination = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(Vehicles);
    }, [])
    // from
    const [from, setFrom] = useState('');
    // destination
    const [destination, setDestination] = useState('');
    
    const handleBlur = (e) => {
        if(e.target.name === 'from'){
            if(e.target.name !== ''){
                setFrom(e.target.value);
                console.log(from)
            }
        }
        if(e.target.name === 'destination'){
            if(e.target.name !== ''){
                setDestination(e.target.value);
            }
        }
    }
    // get vehicle url
    const { transport } = useParams();
    return (
        <div className="set-location">
            {from && destination ? <div className="input-container">
                <div className="input-final">
                    <p><MyLocationIcon /> {from}  </p>
                    <p><LocationOnIcon /> {destination}</p>
                </div>
                {
                    vehicles.map(vehicle=> (vehicle.vehicle === transport) ? <div className="available-vehicles"> <img src={vehicle.vehicleImg} /><p>{vehicle.vehicle}</p>
                    <p><PeopleIcon /> {vehicle.capacity}</p>
                    <p>{vehicle.price}</p>
                    </div> : <br />)
                }
            </div> : <div className="input-container">
            
            <input name="from" type="text" placeholder="From Where?" onBlur={handleBlur}/>
            <br/>
            <br/>
            <input name="destination" type="text" placeholder="Destination" onBlur={handleBlur}/>
            <br/>
            <br/>
            <Button variant="contained" color="primary">
               <LocationSearchingIcon/> Search
            </Button>
            </div>
            }
            
            <div className='map-container'>
                <Map></Map>
            </div>
        </div>
    );
};

export default Destination;