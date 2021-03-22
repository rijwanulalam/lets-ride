import React from 'react';
import { useHistory } from 'react-router';
import './Vehicle.css'

const Vehicle = (props) => {
    const {vehicle, vehicleImg} = props.vehicle;
    const history = useHistory()
    const handleButton = (vehicle) => {
        history.push(`/destination/${vehicle}`);
    }
    return (
        <div className="single-vehicle" onClick={() => handleButton(vehicle)}>
            <img src={vehicleImg} alt={vehicle} />
            <p>{vehicle}</p>
        </div>
    );
};

export default Vehicle;