import React, {useState, useEffect} from 'react';
import {useParams, NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import s from './styles.css';

import {numberWithCommas} from '@/utils/helpers';

import {fetchCarData} from '@redux/actions';
import {setSelectedCarTrim} from '@redux/actions';
import {setSelectedCarColor} from '@redux/actions';

//Components
import Spinner from '@components/Spinner';
import ArrowBtn from '@components/ArrowBtn';
import ChangePackBtn from '@components/ChangePackBtn';
import ChangeColorBtn from '@components/ChangeColorBtn';

const CarModel = (props) => {
    const [showColorSelector, setShowColorSelector] = useState(false);
    const model = useParams();

    let carImageUrl;
    let colorPrice;
    let colorName;
    let selectedTrimName;
    let selectedTrimPrice;

    let car = props.selectedCar;
    const isDataEmpty = Object.keys(car).length === 0 && car.constructor === Object;

    useEffect(() => {
        if(isDataEmpty) {
            props.fetchCarData(model.id);
        }
    }, []);

    const toggleConfigurator = () => {
        setShowColorSelector(!showColorSelector);
    };

    const setTrim = (trim) => {
        props.setSelectedCarTrim(trim);
    };

    const setColor = (color) => {
        props.setSelectedCarColor(color);
    };

    if(!isDataEmpty) {
        carImageUrl = car.selectedColor ? car.selectedColor.imageUrl : car.trims[0]['colors'][0]['imageUrl'];
        colorName = car.selectedColor ? car.selectedColor.name : car.trims[0]['colors'][0]['name'];
        colorPrice = car.selectedColor ? car.selectedColor.price : car.trims[0]['colors'][0]['price'];
        selectedTrimName = car.selectedTrimName ? car.selectedTrimName : car.trims[0]['name'];
        selectedTrimPrice = car.selectedTrimPrice ? car.selectedTrimPrice : car.trims[0]['price'];
    }

    return (
        <div className={s.carModelContainer}>
            {isDataEmpty && <Spinner />}
            {!isDataEmpty && (
                <>
                    <div className={s.carPicDesc}>
                        <img src={carImageUrl} alt="car" />
                        <div className={s.carDesc}>
                            <h5>{car.name} <span>{selectedTrimName}</span></h5>
                            <p>{colorName}</p>
                        </div>
                        <div className={s.carPrice}>
                            <h5>{numberWithCommas(selectedTrimPrice+colorPrice)} <span>kr.</span></h5>
                        </div>
                    </div>
                    {showColorSelector ? (
                        <div className={s.carConfig}>
                            <div className={s.carConfigContent}>
                                <h5>COLOR SELECTOR</h5>
                                <div className={s.colorsContainer}>
                                    {car.trims.map((item) => {
                                        if(item.name === selectedTrimName) {
                                            return item.colors.map((i, index) => <ChangeColorBtn color={i} isActive={colorName === i.name} key={i.name} setColor={setColor.bind(null, i)} />);
                                        }
                                    }
                                    )}
                                </div>
                            </div>
                            <div className={s.carConfigBottom}>
                                <ArrowBtn left={true} handlerClick={toggleConfigurator} />
                                <div className={s.proceed}>
                                    <NavLink to="/checkout">PROCEED</NavLink>
                                </div>
                                <span style={{width:'60px'}} />
                            </div>
                        </div>
                    ) : (
                        <div className={s.carConfig}>
                            <div className={s.carConfigContent}>
                                <h5>CHOOSE EQUIPMENT LEVEL</h5>
                                {car.trims.map((item, index) => <ChangePackBtn pack={item} isActive={selectedTrimName === item.name} key={item.name} setTrim={setTrim.bind(null, item)} />)}
                            </div>
                            <div className={s.carConfigBottom}>
                                <ArrowBtn left={true} />
                                <ArrowBtn right={true} handlerClick={toggleConfigurator}>Choose color</ArrowBtn>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        selectedCar: state.current.selectedCar,
        loading: state.app.loading,
    };
};

const mapDispatchToProps = {
    fetchCarData: fetchCarData,
    setSelectedCarTrim: setSelectedCarTrim,
    setSelectedCarColor: setSelectedCarColor
};

export default connect(mapStateToProps, mapDispatchToProps)(CarModel);
