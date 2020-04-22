import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {fetchCars} from "@redux/actions";
import {selectCar} from "@redux/actions";
//import Styles from './styles.css';

//Components
import CarCard from '@components/CarCard';

const CarsList = (props) => {

    useEffect(() => {
        if(!props.fetchedCars.length) {
            props.fetchCars();
        }
    }, []);

    const _selectCar = (car) => {
        props.selectCar(car);
    };

    if(props.fetchedCars.length > 0) {
        return props.fetchedCars.map(car => <CarCard car={car} selectCar={_selectCar.bind(null, car)} key={car.code} />);
    } else {
        return <div>No data.</div>;
    }
};

const mapStateToProps = state => {
    return {
        fetchedCars: state.cars.fetchedCars,
        loading: state.app.loading,
    };
};

const mapDispatchToProps = {
    fetchCars: fetchCars,
    selectCar: selectCar
};

export default connect(mapStateToProps, mapDispatchToProps)(CarsList);
