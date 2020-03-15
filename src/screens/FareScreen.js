import React from 'react';
import store from '../config/store';
import { 
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    Modal,
    Platform,
    StatusBar,
    TouchableWithoutFeedback
  } from 'react-native';
import { Icon, Button, Header } from 'react-native-elements';
import Polyline from '@mapbox/polyline';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { colors } from '../common/theme';

import {booking} from '../communicator'

var { width, height } = Dimensions.get('window');

export default class FareScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        pickup:{
            text: store.getState().origin,
            coordinates: {
                text: store.getState().pickupCordinates,
                lat: parseFloat(store.getState().pickupCordinates.split(",")[0]),
                long: parseFloat(store.getState().pickupCordinates.split(",")[1]),
            }
        },
        dropOff:{
            text: store.getState().destination,
            coordinates: {
                text: store.getState().dropOffCordinates,
                lat: parseFloat(store.getState().dropOffCordinates.split(",")[0]),
                long: parseFloat(store.getState().dropOffCordinates.split(",")[1]),
            }
        },
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.9922,
            longitudeDelta: 0.9421,
        },
        coords: [],
        fare: 0.00,
        distance: 0.00,
        modalVisible: false,
    }
  }

  async componentDidMount() {
    const {pickupCordinates , dropOffCordinates} = store.getState();
    let fareAndDistanceDetails = await booking.getFareAndTimeForRide();
    // alert(`${JSON.stringify(store.getState())}`);  
    this.getDirections(pickupCordinates, dropOffCordinates , fareAndDistanceDetails);
  }

// find your origin and destination point coordinates and pass it to our method.
// I am using Kolkata -> Haldia for this example
  async getDirections(startLoc, destinationLoc ,fareAndDistanceDetails) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyD8rFXA6KM_9OCzNcErc4d9Vsr1KeTPIxk`)
        let respJson = await resp.json();
        let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
        let coords = points.map((point) => {
            return  {
                latitude : point[0],
                longitude : point[1]
            }
        })
        this.setState({coords: coords, fare: fareAndDistanceDetails.fare , distance: parseFloat(fareAndDistanceDetails.distance).toFixed(2)});
        return coords
    }
    catch(error) {
        alert(error)
        return error
    }
}

// on press Ride later
  onPressCancel() {
    this.props.navigation.goBack();
  }

//on press done button on modal
  async onPressDone() {
    let bookingCreation = await booking.createBookingForRide({fare: this.state.fare});
    this.setState({modalVisible:false},()=>{
        this.props.navigation.navigate('BookingQuoteScreen');
    });
  }

//confirm booking modal
  confirmBookModal() {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
            this.setState({modalVisible:false})
        }}>
        <View style={styles.modalContainer}>

            <View style={styles.modalImageConttainer}>
                <Image source={require('../../assets/images/transfer.png')} style={styles.modalImage} />
            </View>
            <View style={styles.modalInnerContainer}>

                <View style={styles.modalInner}>
                 
                    <View style={styles.fareTextContainer}>
                        <Text style={styles.fareText}>Please See </Text>
                    </View>
                    
                    <View style={styles.horizontalLine}/>

                    <View style={styles.upperContainer}>
                        {/* <View style={styles.fareDetailsContainer}>
                            <View style={styles.fareDetails}>
                                <Text style={styles.fareTitleText}>Base Fare</Text>
                                <Text style={styles.fareTitleText}>Minimum Fare</Text>
                                <Text style={styles.fareTitleText}>Convenience Fees</Text>
                            </View>
                            <View style={styles.verticalLine}/>
                            <View style={styles.farePriceContainer}>
                                <Text style={styles.farePriceText}>$ 90.00</Text>
                                <Text style={styles.farePriceText}>$ 140.00</Text>
                                <Text style={styles.farePriceText}>$ 5.00</Text>
                            </View>
                        </View> */}

                         {/* <View style={styles.line}/> */}
                        
                         {/* <View style={styles.totalPriceContainer}>
                            <View style={styles.totalPrice}>
                                <Text style={styles.totalPriceText}>Total Fare</Text>
                                <Text style={styles.taxText}>(Inclusive all Taxes)</Text>
                            </View>
                            <View style={styles.totalPriceNumberContainer}>
                                <Text style={styles.totalPriceNumber}>$ 235.00</Text>
                            </View>
                         </View> */}

                        <View style={styles.termsContainer}>
                            <Text style={styles.termsText}>Your fare might be increased if toll, route and destination changes or if ride took longer due to traffic or other</Text>
                        </View>

                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            title="Done"
                            titleStyle={styles.signInTextStyle}
                            onPress={()=>{this.onPressDone()}}
                            buttonStyle={styles.doneButtonStyle}
                        />
                    </View>

                </View>

            </View>
        </View>

    </Modal>
    )
}
  
  render() {
    return (
      <View style={styles.container}>
            
            <Header 
                backgroundColor={colors.GREY.default}
                leftComponent={{icon:'md-menu', type:'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                centerComponent={<Text style={styles.headerTitleStyle}>Confirm Booking</Text>}
                rightComponent={{icon:'ios-notifications', type:'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.navigate('Notifications');} }}
                outerContainerStyles={styles.headerStyle}
                innerContainerStyles={styles.headerInnerStyle}
              />

        <View style={styles.topContainer}>
            <View style={styles.topLeftContainer}>
                <View style={styles.circle}/>
                <View style={styles.staightLine}/>
                <View style={styles.square}/>
            </View>
            <View style={styles.topRightContainer}>
                <TouchableOpacity style={styles.whereButton}>
                    <View style={styles.whereContainer}>
                        <Text numberOfLines={1} style={styles.whereText}>{this.state.pickup.text}</Text>
                        <Icon
                            name='gps-fixed'
                            color={colors.WHITE}
                            size={25}
                            containerStyle={styles.iconContainer}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropButton}>
                    <View style={styles.whereContainer}>
                        <Text numberOfLines={1} style={styles.whereText}>{this.state.dropOff.text}</Text>
                        <Icon
                            name='search'
                            type='feather'
                            color={colors.WHITE}
                            size={25}
                            containerStyle={styles.iconContainer}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.mapcontainer}>
            <MapView style={styles.map} 
                provider={PROVIDER_GOOGLE}
                initialRegion={{
                latitude:(this.state.pickup.coordinates.lat + this.state.dropOff.coordinates.lat)/2, 
                longitude:(this.state.pickup.coordinates.long + this.state.pickup.coordinates.long)/2, 
                latitudeDelta: 0.0192,
                longitudeDelta: 0.0421
                }}
            >   
                <Marker
                    coordinate={{latitude: this.state.pickup.coordinates.lat, longitude: this.state.pickup.coordinates.long}}
                    title={'marker_title_1'}
                    description={'marker_description_1'}
                />

                <Marker
                    coordinate={{latitude: this.state.dropOff.coordinates.lat, longitude: this.state.dropOff.coordinates.long}}
                    title={'marker_title_2'}
                    description={'marker_description_2'}
                    pinColor={colors.GREEN.default}
                />

                <MapView.Polyline 
                    coordinates={this.state.coords}
                    strokeWidth={4}
                    strokeColor={colors.BLUE.default}
                />

            </MapView>
        </View>
        <View style={styles.bottomContainer}>
            {/* <View style={styles.offerContainer}>
                <Text style={styles.offerText}>Get your first ride free upto $ 75.00 apply coupon <Text style={styles.offerCodeText}>FIRSTGO</Text></Text>
            </View> */}
            <View style={styles.priceDetailsContainer}>
                <View style={styles.priceDetailsLeft}>
                    <View style={styles.priceDetails}>
                        <View style={styles.totalFareContainer}>
                            <Text style={styles.totalFareText}>Expected Fare</Text>
                        </View>
                        <Icon
                            name='info'
                            color={colors.RED}
                            type='simple-line-icon'
                            size={15}
                            containerStyle={styles.infoIcon}
                        />
                    </View>

                    <View style={styles.iconContainer}>
                        <Text style={styles.priceText}>GBP {this.state.fare}</Text>
                    </View>
                    
                </View>
                <View style={styles.priceDetailsMiddle}>
                    <View style={styles.triangle}/>
                    <View style={styles.lineHorizontal}/>
                </View>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/paytm_logo.jpg')} style={styles.logoImage} />
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.iconContainer}>
                    <Button
                        title="Ride Later"
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.buttonText}
                        onPress={()=>{this.onPressCancel()}}
                        buttonStyle={styles.buttonStyle}
                        containerStyle={styles.buttonContainerStyle}
                    />
                </View>
                <View style={styles.flexView}>
                    <Button
                        title="Confirm Booking"
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.buttonText}
                        onPress={()=>{this.setState({modalVisible: true})}}
                        buttonStyle={styles.confirmButtonStyle}
                        containerStyle={styles.confirmButtonContainerStyle}
                    />
                </View>
            </View>
        </View>
        {
            this.confirmBookModal()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    headerStyle: { 
        backgroundColor: colors.GREY.default, 
        borderBottomWidth: 0 
    },
    headerInnerStyle: {
        marginLeft:10,
        marginRight: 10
    },
    headerTitleStyle: { 
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
     },
    container: {
        flex:1, 
        backgroundColor: colors.WHITE, 
        marginTop: StatusBar.currentHeight
    },
    topContainer: {
        flex: 1.5, 
        flexDirection: 'row',
        borderTopWidth:0, 
        alignItems: 'center', 
        backgroundColor: colors.GREY.default, 
        paddingEnd: 20
    },
    topLeftContainer: { 
        flex: 1.5, 
        alignItems:'center' 
    },
    topRightContainer: {
        flex: 9.5, 
        justifyContent: 'space-between',
    },
    circle: {
        height: 15, 
        width: 15, 
        borderRadius: 15/2, 
        backgroundColor: colors.YELLOW.light
    },
    staightLine:{
        height: height/25, 
        width: 1, 
        backgroundColor: colors.YELLOW.light
    },
    square: {
        height: 17, 
        width: 17, 
        backgroundColor: colors.GREY.iconPrimary
    },
    whereButton: {flex: 1, justifyContent: 'center', borderBottomColor: colors.WHITE, borderBottomWidth: 1},
    whereContainer: {flex: 1, justifyContent: 'center', alignItems:'center', flexDirection: 'row'},
    whereText: { flex:9, fontFamily: 'Roboto-Regular', fontSize: 18, fontWeight: '900', color: colors.WHITE },
    iconContainer:{flex: 1},
    dropButton: {flex: 1, justifyContent: 'center'},
    mapcontainer: {
        flex: 7,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    bottomContainer: {flex: 2.5, alignItems: 'center'},
    offerContainer: {flex:1, backgroundColor:colors.YELLOW.secondary, width: width, justifyContent:'center', borderBottomColor: colors.YELLOW.primary, borderBottomWidth: Platform.OS=='ios'?1:0},
    offerText: {alignSelf: 'center', color: colors.GREY.btnPrimary,fontSize: 13, fontFamily: 'Roboto-Regular'},
    offerCodeText: {fontFamily: 'Roboto-Bold'},
    priceDetailsContainer: {flex:2.3, backgroundColor:colors.WHITE, flexDirection: 'row',position:'relative',zIndex:1},
    priceDetailsLeft: {flex:19},
    priceDetailsMiddle: {flex:2, height:50, width: 1, alignItems: 'center'},
    priceDetails: {flex:1, flexDirection: 'row'},
    totalFareContainer: { flex: 8, flexDirection: 'row', alignItems: 'center', justifyContent:'flex-end' },
    totalFareText: { color: colors.GREY.btnPrimary, fontFamily: 'Roboto-Bold',fontSize: 15 },
    infoIcon: { flex:2, alignItems: 'center',justifyContent: 'center' },
    priceText: { alignSelf: 'center', color: colors.GREY.iconSecondary, fontFamily: 'Roboto-Bold', fontSize: 20 },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: colors.TRANSPARENT,
        borderStyle: 'solid',
        borderLeftWidth: 9,
        borderRightWidth: 9,
        borderBottomWidth: 10,
        borderLeftColor: colors.TRANSPARENT,
        borderRightColor: colors.TRANSPARENT,
        borderBottomColor: colors.YELLOW.secondary,
        transform: [
            {rotate: '180deg'}
        ],
        marginTop: -1,overflow:'visible'
    },
    lineHorizontal: {height: height/18,width: 1, backgroundColor: colors.BLACK, alignItems: 'center',marginTop: 10},
    logoContainer: {flex:19, alignItems: 'center', justifyContent:'center'},
    logoImage: { width: 50, height: 50},
    buttonsContainer: {flex:1.5, flexDirection:'row'},
    buttonText: {color: colors.WHITE, fontFamily: 'Roboto-Bold', fontSize: 18,alignSelf:'flex-end'},
    buttonStyle: { backgroundColor: colors.GREY.secondary,elevation: 0},
    buttonContainerStyle: {flex: 1, backgroundColor: colors.GREY.secondary},
    confirmButtonStyle: { backgroundColor: colors.GREY.btnPrimary,elevation: 0},
    confirmButtonContainerStyle: {flex: 1, backgroundColor: colors.GREY.btnPrimary},

    modalContainer: {flex:1, justifyContent:'center', backgroundColor: colors.GREY.background,overflow:'visible'},
    modalImageConttainer: { alignItems: 'center', justifyContent:'center',overflow:'visible', position: 'relative', zIndex: 4, marginBottom: -40},
    modalImage: { width: 100, height: 100,},
    modalInnerContainer: {
        height:400, width:(width-85), backgroundColor: colors.WHITE, alignItems:'center', alignSelf:'center', borderRadius:7,overflow:'visible'},
    modalInner: {flex:1, justifyContent:'space-between', width: (width-100) ,overflow:'visible',},
    fareTextContainer: { flex: 0.7, borderBottomWidth: 5, borderBottomColor: colors.WHITE },
    fareText: { top:40, color: colors.BLACK, fontFamily: 'Roboto-Bold', fontSize:20, alignSelf: 'center'},
    horizontalLine: {width:width-120, height: 1, marginTop: 3, backgroundColor: colors.GREY.iconSecondary, alignSelf:'center'},
    upperContainer: { flex: 3, alignItems:'center' },
    fareDetailsContainer: {flex:2, flexDirection: 'row', justifyContent: 'space-evenly',alignItems:'center'},
    fareDetails: {flex:1.2, alignItems: 'flex-start', justifyContent:'space-between', paddingLeft: 20, paddingTop: 20},
    fareTitleText: { flex: 1,fontFamily: 'Roboto-Bold', fontSize: 16, fontWeight: '900', color: colors.BLACK },
    verticalLine: {width: 0.8, height: 100, backgroundColor: colors.GREY.iconSecondary, marginLeft: 5},
    farePriceContainer: {flex:1, alignItems: 'flex-end', justifyContent:'space-between', paddingRight: 20,paddingTop: 20},
    farePriceText: { flex: 1,fontFamily: 'Roboto-Regular', fontSize: 16, fontWeight: '900', color: colors.BLACK },
    line: {width:width-120, height: 1, backgroundColor: colors.GREY.iconSecondary, alignSelf:'center'},
    totalPriceContainer: {flex:1, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', paddingRight: 20, paddingLeft: 20},
    totalPrice: {flex:1.5, alignItems: 'flex-start'},
    totalPriceText: { flex: 0.5,paddingTop: 10,fontFamily: 'Roboto-Bold', fontSize: 16, fontWeight: '900', color: colors.BLACK },
    taxText: { flex: 1,marginTop: 0,fontFamily: 'Roboto-Regular', fontSize: 13, fontWeight: '900', color: colors.BLACK },
    totalPriceNumberContainer: {flex:1, alignItems: 'flex-end', justifyContent:'space-between'},
    totalPriceNumber: { flex: 1,paddingTop: 10,fontFamily: 'Roboto-Bold', fontSize: 18, fontWeight: '900', color: colors.BLACK },
    termsContainer: {flex:1, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', paddingLeft: 10},
    termsText: { flex: 1,fontFamily: 'Roboto-Regular', fontSize: 12, fontWeight: '900', color: colors.GREY.btnSecondary },
    buttonContainer: { flex: 0.5, width: ((width-85)), flexDirection:'row', backgroundColor:colors.GREY.iconSecondary, alignItems: 'center', justifyContent:'center', alignSelf:'center' },
    doneButtonStyle: {backgroundColor:colors.GREY.iconSecondary, borderRadius: 0,elevation: 0},
    signInTextStyle:{
        fontFamily:'Roboto-Bold', 
        fontWeight: "700", 
        color: colors.WHITE
    },
    flexView:{
        flex:1
    }
});