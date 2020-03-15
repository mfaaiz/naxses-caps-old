import store from '../config/store';
import moment from 'moment';
import {AsyncStorage} from 'react-native'
const BaseApi = require('./base_api_helper');


export default class BookingHelper extends BaseApi {
  constructor() {
    super();
    this.URLS = {
      GET_EXPECTED_FARES: `fare/calculate`,
      GET_COORDINATES: `maps/address/coordinates/<ADDRESS>`,
      CREATE_BOOKING_QUOTE: `ride_details`,
      CANCEL_RIDE: `ride_details/<RIDEID>`,
      GET_CURRENT_BOOKING: `ride_details/<RIDEID>`,
      UPDATE_RIDE: `ride_status/<RIDEID>`
    }
  }

  async getFareAndTimeForRide() {
    const vehicleType = store.getState().vehicleType;  
    const journeyCordinates = {
        origin: store.getState().pickupCordinates,
        destination: store.getState().dropOffCordinates
    }  
    let fareResp = {
      status: true,
      fare: 0.0,
      distanceInMiles: 0
    }

    let addresses = [];

    addresses.push({
        customAddress: false,
        longitude:journeyCordinates.origin.split(",")[1].trim(),
        latitude:journeyCordinates.origin.split(",")[0].trim(),
        addressText: store.getState().origin
    });

    addresses.push({
        customAddress: false,
        longitude:journeyCordinates.destination.split(",")[1].trim(),
        latitude:journeyCordinates.destination.split(",")[0].trim(),
        addressText: store.getState().destination
    });

    let postData = {
        vehicle_type: vehicleType.id.toString(),
        addresses: addresses
      };

      console.log("postData>>>>" , postData);
    let resp = await this.makeCall({
      method: "POST",
      postData:postData,
      isServiceCall: true,
      additionalUrl: this.URLS.GET_EXPECTED_FARES
    });

    fareResp.status = !!resp.fare;
    fareResp.message = !!resp.status ? `SUCCESSFUL` : (!!resp.message ? resp.message : "Error In Getting Expected Fares. Contact Support.");
    fareResp.distanceInMiles = resp.distance;
    fareResp.fare = resp.fare;
    // alert(JSON.stringify(fareResp));
    return fareResp;
  }

  async getCoordinatesForAddress(address){
    let resp = {
      status: false,
      longitude:'',
      latitude:'',
      message: ''
    }

    let apiResp = await this.makeCall({
      method: "GET",
      isServiceCall: true,
      postData: null,
      additionalUrl: this.URLS.GET_COORDINATES.replace(/<ADDRESS>/g , address)
    });

    resp.status = apiResp.status;
    resp.message = apiResp.status ? "SUCCESSFUL" : "ERROR OCCURED";
    resp.longitude = apiResp.current_location_long;
    resp.latitude = apiResp.current_location_lat;

    return resp;
  }

  async createBookingForRide(bookingData){

    let bookingResponse = {
      status: false,
      message: "",
      id:null
    }

    let postData = {
      pickup_time: moment().toISOString(),
      pickup_cordinates_longitude:store.getState().pickupCordinates.split(",")[1],
      pickup_cordinates_latitude:(store.getState().pickupCordinates.split(",")[0]),
      customer: await AsyncStorage.getItem("userId"),
      fare:bookingData.fare,
      driver:"-1", // always hardcoded
      dropoff_cordinates_longitude:store.getState().dropOffCordinates.split(",")[1],
      dropoff_cordinates_latitude:store.getState().dropOffCordinates.split(",")[0],
      vehicle_type: store.getState().vehicleType.id
    }

    let serverResp = await this.makeCall({
      method: "POST",
      postData:postData,
      // isServiceCall: true,
      additionalUrl: this.URLS.CREATE_BOOKING_QUOTE
    });

    console.log("booking create response" , serverResp);

    if(serverResp.status && serverResp.ride_details){
      bookingResponse.status = true;
      bookingResponse.id = serverResp.ride_details.id;
      bookingResponse.message = `We have received your booking request.
      You will be shortly notified with your driver details.
      Thankyou.`;
      await AsyncStorage.setItem("current_ride",bookingResponse.id.toString());
    }else{
      bookingResponse.status = false;
      bookingResponse.message = "Something went wrong. Please contact at +12-122-122-122 for assistance. Appologies."
    }

    return bookingResponse;
  }

  async cancelRide(){
    let resp = {
      status: false,
      message: ""
    };

    const postData = {
      ride_status: "cancelled",
      is_by_customer: true
    }

    let rideId = await AsyncStorage.getItem("current_ride");
    let serverResp = await this.makeCall({
      method: "PUT",
      postData:postData,
      // isServiceCall: true,
      additionalUrl: this.URLS.CANCEL_RIDE
    });

    resp.status = true;
    resp.message = "Ride has been successfully cancelled."
  }

  async getRideDetails(bookingId){
    let resp = {
      status: false,
      driver:'',
      rideDetails:'',
    }

    let apiResp = await this.makeCall({
      method: "GET",
      postData: null,
      additionalUrl: this.URLS.GET_CURRENT_BOOKING.replace(/<RIDEID>/g , bookingId)
    });

    console.log("apiResp" , apiResp);
      resp.status = true;
      const rideDetails =  apiResp.ride_details || {};
      const riderDetails = !!rideDetails.rider ? apiResp.ride_details.rider: {};
      resp.driver = rideDetails;
      resp.rideDetails = riderDetails  

      return resp;
    }
}