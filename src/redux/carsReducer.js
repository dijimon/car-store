import {FETCH_CARS} from './types';
const initialState = {
    fetchedCars: []
};

// Pure Functions
export const carsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CARS:
            return {...state, fetchedCars: action.payload};
        default:
            return state;
    }
};
