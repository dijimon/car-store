import React from 'react';
import s from './styles.css';

import {numberWithCommas} from '@/utils/helpers';

const ChangePackBtn = ({pack, isActive, setTrim}) => {
    const isActiveClass = isActive ? 'active' : '';

    const _handleClick = () => {
        setTrim();
    }

    return (
        <div className={s.btn} isActive={isActiveClass} onClick={_handleClick}>
            <span>{pack.name}</span>
            <p>{numberWithCommas(pack.price)} kr.</p>
        </div>
    );
};

export default ChangePackBtn;
