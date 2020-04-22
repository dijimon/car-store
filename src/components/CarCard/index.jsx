import React from 'react';
import s from './styles.css';
import {NavLink} from 'react-router-dom';

import {numberWithCommas} from '@/utils/helpers';

const CarCard = ({car, selectCar}) => {
    const carModelURL = `/cars/model/${car.code}`;

    return (
        <NavLink to={carModelURL} className={s.card} onClick={selectCar}>
            <img src={car.imageUrl} alt="car" />
            <div className={s.cardBody}>
                <h5>{car.name}</h5>
                <p>{numberWithCommas(car.priceFrom)} Kr.</p>
            </div>
        </NavLink>
    );
};

export default CarCard;
