import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import s from './styles.css';

//Components
import CarsList from "@components/CarsList";
import Spinner from "@components/Spinner/index";

const Catalogue = (props) => {

    return (
        <div className={s.catalogue}>
            {props.loading ? (
                <Spinner />
            ) : (
                <>
                    <h4>CHOOSE YOUR NEW CAR</h4>
                    <div className={s.carsListContainer}>
                        <CarsList />
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.app.loading,
    };
};

export default connect(mapStateToProps, null)(Catalogue);
