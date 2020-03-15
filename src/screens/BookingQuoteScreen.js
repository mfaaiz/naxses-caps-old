import React, { Component } from 'react';
import { StatusBar,StyleSheet,Text, TouchableOpacity, View , BackHandler, Button} from 'react-native';
import { colors } from '../common/theme';
import {booking} from '../communicator'

export default class BookingQuoteScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            message: `We have received your booking request. You will be shortly notified with your driver details.\nThankyou.`
        }
    }  

    onExitPress(){
        BackHandler.exitApp();
    }

    async onCancelRidePress(){
        let resp = await booking.cancelRide();
        if(resp.status == true){
            alert("Your ride has been cancelled.")
        }else{
            alert("unable to cancel the ride at the moment. Please contact at support to cancel the ride.")
        }
    }

    render() {
    return (
        <View style={{width:'100%',height:'100%',flexDirection: 'row',alignItems: 'center'}}>
            <View style={{width:"100%"}}>
                <Text style={styles.textContainer}>{this.state.message}</Text>
                <View style={{marginTop:40 ,width:'100%', flexDirection: 'row', justifyContent: "space-around" , minHeight:'20%'}}>
                    <View style={{width:"40%"}}>
                        <Button title={"Got It"} onPress={this.onExitPress}/>
                    </View>
                    <View style={{width:"40%"}}>
                        <Button title={"Cancel Ride"} onPress ={this.onCancelRidePress}/>
                    </View>
                </View>
            </View>
            
        </View>
    );
    }
}

const styles = StyleSheet.create({
    containerView: { flex: 1, marginTop: StatusBar.currentHeight },
    textContainer: { 
        textAlign: "center", width:'100%', color:colors.YELLOW.cab,
        fontSize: 30,
        fontFamily: "Roboto"
    },
  });
