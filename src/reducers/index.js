import {
    SET_VEHICLE_TYPE,
    SET_ORIGIN_AND_DESTINATION
} from "../actions";


function setVehicleType(state , action){
    return Object.assign({}, state, {
        vehicleType: action.vehicleType
    });
}

function setPickupAndDropOffPoints(state , action){
    return Object.assign({}, state, {
        origin: action.origin,
        destination: action.destination,
        pickupCordinates: action.pickupCordinates,
        dropOffCordinates: action.dropOffCordinates
    });
}

function setCurrentRideData(state, action){
    return Object.assign({}, state, {
        rideData: action.rideData
    });
}

export default {
    setVehicleType,
    setPickupAndDropOffPoints,
    setCurrentRideData
}