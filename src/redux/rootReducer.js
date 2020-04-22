import {combineReducers} from 'redux';
import {carsReducer} from './carsReducer';
import {appReducer} from './appReducer';
import {selectedCarReducer} from './selectedCarReducer';

export const rootReducer = combineReducers({
    cars: carsReducer,
    app: appReducer,
    current: selectedCarReducer
});
