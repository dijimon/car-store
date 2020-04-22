import React from 'react';
import { useHistory } from "react-router-dom";
import s from './styles.css';

const ArrowBtn = (props) => {
    let history = useHistory();
    if(props.handlerClick) {
        return <button className={props.left ? s.leftArrow : s.rightArrow} onClick={() => props.handlerClick()} />;
    } else {
        return <button className={props.left ? s.leftArrow : s.rightArrow} onClick={() => history.goBack()} />;
    }
};

export default ArrowBtn;
