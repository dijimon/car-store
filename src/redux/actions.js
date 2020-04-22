import {
    FETCH_CARS,
    SHOW_LOADER,
    HIDE_LOADER,
    SHOW_ALERT,
    HIDE_ALERT,
    SELECT_CAR,
    FETCH_CAR_DATA,
    SET_CAR_TRIM,
    SET_CAR_COLOR,
    CAR_SUCCESS_CHECKED,
    CAR_FAIL_CHECKED
} from "@redux/types";

export function showLoader() {
    return {
        type: SHOW_LOADER
    };
}

export function hideLoader() {
    return {
        type: HIDE_LOADER
    };
}

export function hideAlert() {
    return {
        type: HIDE_ALERT
    };
}


export function showAlert(text) {
    return dispatch => {
        dispatch({
            type: SHOW_ALERT,
            payload: text
        });

        setTimeout(() => {
            dispatch(hideAlert());
        }, 3000);
    };
}

export function fetchCars() {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await fetch('https://reacttestprojectapi.azurewebsites.net/cars/models', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '320e638a-4e70-4408-9f37-0fcef96c8574',
                }
            });
            const json = await response.json();
            dispatch({ type: FETCH_CARS, payload: json });
            dispatch(hideLoader());
        } catch (e) {
            dispatch(showAlert('Some error occured!'));
            dispatch(hideLoader());
        }
    };
}

export function fetchCarData(id) {
    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await fetch(`https://reacttestprojectapi.azurewebsites.net/cars/model/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '320e638a-4e70-4408-9f37-0fcef96c8574',
                }
            });
            const json = await response.json();
            dispatch({ type: FETCH_CAR_DATA, payload: json });
            dispatch(hideLoader());
        } catch (e) {
            dispatch(showAlert('Some error occured!'));
            dispatch(hideLoader());
        }
    };
}

export function setSelectedCarTrim(trim) {
    return dispatch => {
        dispatch({
            type: SET_CAR_TRIM,
            payload: trim
        });
    };
}


export function setSelectedCarColor(color) {
    return dispatch => {
        dispatch({
            type: SET_CAR_COLOR,
            payload: color
        });
    };
}

export function selectCar(car) {
    return dispatch => {
        dispatch({
            type: SELECT_CAR,
            payload: car
        });
    };
}


export function checkoutCar(car) {
    const carObject = {
        modelName: car.name,
        trimName: car.selectedTrimName ? car.selectedTrimName : car.trims[0]['name'],
        colorName: car.selectedColor ? car.selectedColor.name : car.trims[0]['colors'][0]['name']
    };

    return async dispatch => {
        try {
            dispatch(showLoader());
            const response = await fetch(`https://reacttestprojectapi.azurewebsites.net/cars/lead`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': '320e638a-4e70-4408-9f37-0fcef96c8574',
                },
                body: JSON.stringify(carObject),
            });

            if(response.ok) {
                dispatch({ type: CAR_SUCCESS_CHECKED});
            } else {
                dispatch({ type: CAR_FAIL_CHECKED});
            }

            dispatch(hideLoader());
        } catch (e) {
            dispatch({ type: CAR_FAIL_CHECKED});
            dispatch(showAlert('Some error occured!'));
            dispatch(hideLoader());
        }
    };
}
