
import { createStore } from "redux";
import {SET_VEHICLE_TYPE, SET_ORIGIN_AND_DESTINATION,SET_CURRENT_RIDE_DATA} from '../actions';
import reducerFunc from '../reducers';

const initialState = {
    vehicleType:null,
    bookingMade: false,
    origin:null,
    pickupCordinates: null,
    destination:null,
    dropOffCordinates: null,
    fare:null,
    rideData:{
        driver:{},
        rideDetails:{}
    }
}

function initializer(state = initialState , action){
    switch (action.type){
        case SET_VEHICLE_TYPE:
            return reducerFunc.setVehicleType(state , action);
        case SET_ORIGIN_AND_DESTINATION:
            return reducerFunc.setPickupAndDropOffPoints(state , action);
        case SET_CURRENT_RIDE_DATA:
            return reducerFunc.setCurrentRideData(state , action);        
        default:
            return state;
    }
}

export default createStore(initializer);