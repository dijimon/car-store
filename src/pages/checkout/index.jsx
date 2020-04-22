import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import s from './styles.css';

import {checkoutCar} from '@redux/actions';

//Components
import Spinner from "@components/Spinner/index";

const Checkout = (props) => {

    useEffect(() => {
        props.checkoutCar(props.selectedCar);
    }, []);

    return (
        <div className={s.checkoutContainer}>
            {props.loading ? (
                <Spinner />
            ) : (
                props.checked ? <div className={s.status1} /> : <div className={s.status2} />
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        selectedCar: state.current.selectedCar,
        checked: state.current.selectedCar.checked,
        loading: state.app.loading,
    };
};

const mapDispatchToProps = {
    checkoutCar: checkoutCar
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
