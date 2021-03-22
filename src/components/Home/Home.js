import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Vehicle from '../../Vehicle/Vehicle';
import Vehicles from '../../fakedata/vehicles.json'
import './Home.css'

const Home = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() =>{

        setVehicles(Vehicles);
    }, [])
    

    return (
        <div className="container">
            {
                vehicles.map(vehicle =><Vehicle vehicle={vehicle}></Vehicle>)
            }
        </div>
    );
};

export default Home;