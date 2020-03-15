import React from 'react';
import { StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableWithoutFeedback,
    ImageBackground,
    ScrollView,
    Dimensions,
    Platform
 } from 'react-native';
 import Polyline from '@mapbox/polyline';
 import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
 import { Header, Rating, Avatar } from 'react-native-elements';
 import Dash from 'react-native-dash';
import { colors } from '../common/theme';
import store from '../config/store';

 var { width } = Dimensions.get('window');


export default class RideDetails extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            coords: [],
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
        }
        this.getDirections("22.1884979,88.061018", "22.0082,87.9784")
    }

    // find your origin and destination point coordinates and pass it to our method.
    // I am using Kolkata -> Haldia for this example
    async getDirections(startLoc, destinationLoc) {
        try {
            let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyCnNpBvuLff0IChT_ODL2Dn3vERyw3I6lw`)
            let respJson = await resp.json();
            let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
                return  {
                    latitude : point[0],
                    longitude : point[1]
                }
            })
            this.setState({coords: coords})
            return coords
        }
        catch(error) {
            alert(error)
            return error
        }
    }

    //go back
    goBack(){
        this.props.navigation.goBack();
    }

    render(){
        return(            
            <View style={styles.mainView}>
                <Header 
                    backgroundColor={colors.GREY.default}
                    leftComponent={{icon:'ios-arrow-back', type:'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.goBack()} }}
                    centerComponent={<Text style={styles.headerTitleStyle}>My Rides Details</Text>}
                    rightComponent={{icon:'ios-notifications', type:'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.navigate('Notifications');} }}
                    outerContainerStyles={styles.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                />  
                <ScrollView>
                    <View style={styles.mapView}>
                        <View style={styles.mapcontainer}>
                            <MapView style={styles.map} 
                                provider={PROVIDER_GOOGLE}
                                initialRegion={{
                                latitude:22.1884979, 
                                longitude:88.061018, 
                                latitudeDelta: 0.5022,
                                longitudeDelta: 0.1821
                                }}
                            >
                                <Marker
                                    coordinate={{latitude: 22.1884979, longitude: 88.061018}}
                                    title={'marker_title_1'}
                                    description={'marker_description_1'}
                                />

                                <Marker
                                    coordinate={{latitude: 22.0082, longitude: 87.9784}}
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
                    </View>      
                    <View style={styles.rideDesc}>
                    <Text>{JSON.stringify(store.getState().rideData)}</Text>
                        <View style={styles.userDesc}>
                            <Avatar
                                size="small"
                                rounded
                                 source={Platform.OS=='ios'?require('../../assets/images/demoProfile.jpg'):require('../../assets/images/profilePic.jpg')}
                                activeOpacity={0.7}
                            />                 
                            <View style={styles.userView}>
                                <Text style={styles.personStyle}>KIRAN RAI</Text>
                                <View style={styles.personTextView}>
                                    <Text style={styles.ratingText}>You rated</Text>
                                    <Rating
                                        showRating
                                        type="star"
                                        fractions={3}
                                        startingValue={5}
                                        readonly
                                        imageSize={15}
                                        onFinishRating={this.ratingCompleted}
                                        style={{ paddingVertical: 10 }}
                                        showRating={false}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[styles.userDesc,styles.avatarView]}>
                            <Avatar
                                size="small"
                                rounded
                                source={require('../../assets/images/microBlackCar.png')}
                                activeOpacity={0.7}
                                avatarStyle={{backgroundColor: colors.WHITE}}
                            />
                            <View style={styles.userView}>
                                <Text style={styles.carNoStyle}>Micro . CRN 2179124562</Text>
                            </View>
                        </View>
                        <View style={styles.userDesc}>
                            <Avatar
                                size="small"
                                rounded
                                source={require('../../assets/images/fareMetar.png')}
                                activeOpacity={0.7}
                                avatarStyle={{backgroundColor: colors.WHITE}}
                            />
                            <View style={styles.userView}>
                                <Text style={styles.textStyle}>$212</Text>
                            </View>
                        </View>
                    </View> 
                    <View style={styles.locationView}>
                        <View style={styles.location}>
                            <View>
                                <Text style={styles.timeStyle}>06:59 PM</Text>
                            </View>
                            <View style={styles.address}>
                                <View style={styles.redDot} />
                                <Text style={styles.adressStyle}>Utsabbangan Ceremony House, Badu Rd</Text>
                            </View>
                        </View>
                        <View style={styles.location}>
                            <View>
                                <Text style={styles.timeStyle}>06:59 PM</Text>
                            </View>
                            <View style={styles.address}>
                                <View style={styles.greenDot} />
                                <Text style={styles.adressStyle}>Utsabbangan Ceremony House, Badu Rd</Text>
                            </View>
                        </View>
                    </View>  
                    <View style={styles.billView}>
                        <View style={styles.billView}>
                            <Text style={styles.billTitle}>Bill Details</Text>
                        </View>
                        <View style={styles.billOptions}>
                            <View style={styles.billItem}>
                                <Text style={styles.billName}>Your Trip</Text>
                                <Text style={styles.billAmount}>$212.09</Text>
                            </View>
                            <View style={styles.billItem}>
                                <Text style={styles.billName}>Rounded Off</Text>
                                <Text style={styles.billAmount}>- $0.09</Text>
                            </View>
                            <View style={styles.billItem}>
                                <View>
                                    <Text style={[styles.billName, styles.billText]}>Total Bill</Text>
                                    <Text style={styles.taxColor}>Includes all Taxes</Text>
                                </View>
                                <Text style={styles.billAmount}>$212</Text>
                            </View>
                        </View>
                        <View style={styles.paybleAmtView}>
                            <Text style={styles.billTitle}>Total Payable</Text>
                            <Text style={styles.billAmount}>$212</Text>
                        </View>
                    </View>
                    <View>
                        <View style={styles.iosView}>
                            {
                            Platform.OS=='ios' ?
                                <ImageBackground source={require('../../assets/images/dash.png')}
                                    style={styles.backgroundImage}
                                    resizeMode= {Platform.OS=='ios'?'repeat':'stretch'}>
                                </ImageBackground>
                                :
                                <Dash style={styles.dashView}/>
                            }
                        </View>

                        <View style={styles.paymentTextView}>
                            <Text style={styles.billTitle}>Payment</Text>
                        </View>
                        <View style={styles.billOptions}>
                            <View style={styles.billItem}>
                                <Text style={styles.billName}>Cash</Text>
                                <Text style={styles.billAmount}>$212</Text>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: { 
        backgroundColor: colors.GREY.default, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: { 
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    containerView:{ 
        flex:1 
    },
    textContainer:{
        textAlign:"center"
    },
    mapView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,
        marginBottom: 15
    },
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
          ]
    },
    rideDesc: {
        flexDirection: 'column'
    },
    userDesc: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    userView: {
        flexDirection: 'column',
        paddingLeft: 28,
    },
    locationView: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        marginVertical: 14
    },
    location: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: 6
    },
    greenDot: {
        backgroundColor: colors.GREEN.default,
        width: 10,
        height: 10,
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginTop: 5
    },
    redDot: {
        backgroundColor: colors.RED,
        width: 10,
        height: 10,
        borderRadius: 50,
        alignSelf: 'flex-start',
        marginTop: 5
    },
    address: {
        flexDirection: 'row', 
        flexGrow: 1, 
        justifyContent: 'flex-start', 
        alignItems: 'flex-start', 
        width: 0, 
        marginLeft: 6
    },
    billView: {
        marginVertical: 5
    },
    billTitle: {
        fontSize: 20,
        color: colors.GREY.default,
        fontFamily: 'Roboto-Bold'
    },
    billOptions: {
        marginHorizontal: 10,
        marginVertical: 15
    },
    billItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginVertical: 15
    },
    billName: {
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
        color: colors.GREY.default
    },
    billAmount: {
        fontSize: 16,
        fontFamily: 'Roboto-Medium',
        color: colors.GREY.default
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: 2,
    },
    carNoStyle:{
        fontSize: 18, 
        fontWeight: 'bold', 
        fontFamily: 'Roboto-Bold'
    },
    textStyle:{
        fontSize: 18, 
        fontWeight: 'bold', 
        fontFamily: 'Roboto-Bold'
    },
    mainView:{ 
        flex:1, 
        backgroundColor: colors.WHITE, 
        marginTop: StatusBar.currentHeight 
    },
    personStyle:{
        fontSize: 18, 
        fontWeight: 'bold', 
        color: colors.BLACK, 
        fontFamily: 'Roboto-Bold'
    },
    personTextView:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    ratingText:{
        fontSize: 16, 
        color: colors.GREY.iconSecondary, 
        marginRight: 8, 
        fontFamily: 'Roboto-Regular'
    },
    avatarView:{
        marginVertical: 15
    },
    timeStyle:{
        fontFamily: 'Roboto-Regular', 
        fontSize: 16, 
        marginTop: 1
    },
    adressStyle:{
        marginLeft: 6, 
        fontSize: 15, 
        lineHeight: 20
    },
    billView:{
        paddingHorizontal: 14
    },
    billText:{
        fontFamily: 'Roboto-Bold'
    },
    taxColor:{
        color: colors.GREY.default
    },
    paybleAmtView:{
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingHorizontal: 10
    },
    iosView:{
        paddingVertical: 10
    },
    dashView:{
        width:width, height:1
    },
    paymentTextView:{
        paddingHorizontal: 10
    }
});