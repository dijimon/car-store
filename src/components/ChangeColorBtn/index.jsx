import React from 'react';
import s from './styles.css';

import {numberWithCommas} from '@/utils/helpers';

const ChangeColorBtn = ({color, isActive, setColor}) => {
    const isActiveClass = isActive ? 'active' : '';

    const _handleClick = () => {
        setColor();
    };

    return (
        <div className={s.btn} isActive={isActiveClass} onClick={_handleClick}>
            <img src={color.iconUrl} alt={color.name} />
            <span>{color.name}</span>
            <p>{numberWithCommas(color.price) == 0 ? 'Standard' : '+' + numberWithCommas(color.price) + ' kr.'}</p>
        </div>
    );
};

export default ChangeColorBtn;
