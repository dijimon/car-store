import {FETCH_CAR_DATA, SET_CAR_TRIM, SET_CAR_COLOR, CAR_SUCCESS_CHECKED, CAR_FAIL_CHECKED} from "@redux/types";

const initialState = {
    selectedCar: {}
};

// Pure Functions
export const selectedCarReducer = (state = initialState, action) => {
    switch (action.type) {
    case FETCH_CAR_DATA:
        return {...state, selectedCar: action.payload};
    case SET_CAR_TRIM:
        return {...state, selectedCar: {...state.selectedCar, selectedTrimName: action.payload.name, selectedTrimPrice: action.payload.price}};
    case SET_CAR_COLOR:
        return {...state, selectedCar: {...state.selectedCar, selectedColor: action.payload}};
    case CAR_SUCCESS_CHECKED:
        return {...state, selectedCar: {...state.selectedCar, checked: true}};
    case CAR_FAIL_CHECKED:
        return {...state, selectedCar: {...state.selectedCar, checked: false}};
    default:
        return state;
    }
};
