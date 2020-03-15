const SET_VEHICLE_TYPE = "SET_VEHICLE_TYPE";
const SET_ORIGIN_AND_DESTINATION = "SET_ORIGIN_AND_DESTINATION";
const SET_ORIGIN_COORDINATES = "SET_ORIGIN_COORDINATES";
const SET_CURRENT_RIDE_DATA = "SET_CURRENT_RIDE_DATA";
function setVehicleType(vehicleType){
    return {
        type: SET_VEHICLE_TYPE,
        vehicleType: vehicleType
    }
}

function setOriginCordinates(pickupCordinates){
    return {
        type: SET_ORIGIN_COORDINATES,
        pickupCordinates : pickupCordinates
    }
}

function setOriginAndDestination(origin , originCoord , dest , destCoord){
    return {
        type: SET_ORIGIN_AND_DESTINATION,
        origin,
        pickupCordinates: originCoord,
        dropOffCordinates: destCoord,
        destination: dest
    }
}

function setCurrentRideData(rideData){
    return {
        type: SET_CURRENT_RIDE_DATA,
        rideData : rideData
    }
}

module.exports = {
    SET_VEHICLE_TYPE,
    SET_ORIGIN_AND_DESTINATION,
    SET_CURRENT_RIDE_DATA,
    setVehicleType,
    setOriginAndDestination,
    setOriginCordinates,
    setCurrentRideData
}