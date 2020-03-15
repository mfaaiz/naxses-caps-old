import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  View,Text
} from 'react-native';
import {booking} from '../communicator';

import { connect } from 'react-redux';
import store from '../config/store';
import {
 setCurrentRideData
} from '../actions';

export class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    
     //this.props.navigation.navigate('CustomerVerify');
    //await AsyncStorage.setItem('userToken','123123');
    const userToken = await AsyncStorage.getItem('userToken');
    const driver = await AsyncStorage.getItem('driver');
    const currentRide = await AsyncStorage.getItem("current_ride");
     let currentRideDetails = await booking.getRideDetails(currentRide);
     console.log("current ride" , currentRide);
    if(currentRideDetails.rideDetails.ride_status!="completed" || currentRideDetails.rideDetails.ride_status!="cancelled"){
      this.props.navigation.navigate("RideDetails");
    }

    else if(currentRide){
      this.props.navigation.navigate("BookingQuoteScreen");
    }else{
      this.props.navigation.navigate(userToken ? driver ? 'DriverRoot' : 'Root' : 'Auth');
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.IndicatorStyle}>
        <ActivityIndicator />
      </View>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
  IndicatorStyle:{
    flex:1, 
    justifyContent:"center"
  }
})