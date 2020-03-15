import React from 'react';
import { 
    StyleSheet,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    Platform,
    Modal,
    TouchableWithoutFeedback,
    StatusBar,
    Linking
  } from 'react-native';
import { Icon, Button, Header } from 'react-native-elements';
import Polyline from '@mapbox/polyline';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating';
import RadioForm from 'react-native-simple-radio-button';
import { colors } from '../common/theme';

var { width, height } = Dimensions.get('window');

export default class BookedCabScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.9922,
            longitudeDelta: 0.9421,
        },
        starCount: 5,
        modalVisible: false,
        alertModalVisible: false,
        coords: [],
        radio_props : [
            {label: 'Unable to Contact Driver', value: 0 },
            {label: 'Cab is not moving in my direction', value: 1 },
            {label: 'My reason is not listed', value: 2 },
            {label: 'Driver Denied duty', value: 3 },
            {label: 'Cab is taking long time', value: 4 }
        ],
        value: 0
    }
  }

  componentDidMount() {
    this.getDirections("28.6037624,77.20350870", "28.6139391,77.2090212")
  }

//star rating
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }

// find your origin and destination point coordinates and pass it to our method.
// I am using Kolkata -> Haldia for this example
  async getDirections(startLoc, destinationLoc) {
    try {
        let resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${ startLoc }&destination=${ destinationLoc }&key=AIzaSyD8rFXA6KM_9OCzNcErc4d9Vsr1KeTPIxk`)
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
//cancel button press
    onPressCancel() {
        this.setState({ modalVisible: true });
    }

//cancel modal ok button press
    onCancelConfirm() {
        this.setState({ modalVisible: false },()=>{
            setTimeout(() => {
                this.setState({ alertModalVisible: true })
            }, 500);
        })  
    }

//call driver button press
onPressCall(phoneNumber){
    Linking.canOpenURL(phoneNumber).then(supported => {
        if (!supported) {
            console.log('Can\'t handle Phone Number: ' + phoneNumber);
        } else {
            return Linking.openURL(phoneNumber);
        }
    }).catch(err => console.error('An error occurred', err));
}

//caacel modal design
  cancelModal() {
      return (
        <Modal
            animationType="none"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
            this.setState({modalVisible:false})
        }}>
        <View style={styles.cancelModalContainer}>
          <View style={styles.cancelModalInnerContainer}>

            <View style={styles.cancelContainer}>
                <View style={styles.cancelReasonContainer}>
                    <Text style={styles.cancelReasonText}>What's Cancel Reason</Text>
                </View>
                
                <View style={styles.radioContainer}>
                    <RadioForm
                        radio_props={this.state.radio_props}
                        initial={0}
                        animation={false}
                        buttonColor={colors.GREY.secondary}
                        selectedButtonColor={colors.GREY.secondary}
                        buttonSize={10}
                        buttonOuterSize={20}
                        style={styles.radioContainerStyle}
                        labelStyle={styles.radioText}
                        radioStyle={styles.radioStyle}
                        onPress={(value) => {this.setState({value:value})}}
                    />
                </View>
                <View style={styles.cancelModalButtosContainer}>
                        <Button
                            title="Don't Cancel"
                            titleStyle={styles.signInTextStyle}
                            onPress={()=>{this.setState({modalVisible:false})}}
                            buttonStyle={styles.cancelModalButttonStyle}
                            containerStyle={styles.cancelModalButtonContainerStyle}
                        />

                    <View style={styles.buttonSeparataor} />

                    <Button
                        title="OK"
                        titleStyle={styles.signInTextStyle}
                        onPress={()=>{this.onCancelConfirm()}}
                        buttonStyle={styles.cancelModalButttonStyle}
                        containerStyle={styles.cancelModalButtonContainerStyle}
                    />
                </View>

            </View>
                

          </View>
        </View>

      </Modal>
      )
  }

//ride cancel confirm modal design
  alertModal() {
      return(
        <Modal
            animationType="none"
            transparent={true}
            visible={this.state.alertModalVisible}
            onRequestClose={() => {
            this.setState({alertModalVisible:false})
        }}>
        <View style={styles.alertModalContainer}>
          <View style={styles.alertModalInnerContainer}>

            <View style={styles.alertContainer}>
            
                <Text style={styles.rideCancelText}>Ride Cancel</Text>

                <View style={styles.horizontalLLine}/>
                
                <View style={styles.msgContainer}>
                    <Text style={styles.cancelMsgText}>Your ride with GT9878999 has been cancelled successfully</Text>
                </View>
                <View style={styles.okButtonContainer}>
                    <Button
                        title="OK"
                        titleStyle={styles.signInTextStyle}
                        onPress={()=>{this.setState({alertModalVisible: false},()=>{this.props.navigation.popToTop()})}}
                        buttonStyle={styles.okButtonStyle}
                        containerStyle={styles.okButtonContainerStyle}
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
      <View style={styles.mainContainer}>

        <Header 
            backgroundColor={colors.GREY.default}
            leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
            centerComponent={<Text style={styles.headerTitleStyle}>Booked Cab</Text>}
            rightComponent={{icon:'ios-notifications', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.navigate('Notifications');} }}
            outerContainerStyles={styles.headerStyle}
            innerContainerStyles={styles.headerInner}
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
                        <Text numberOfLines={1} style={styles.whereText}>Rajaji Marg Area, Teen Murti Marg Area, New Delhi, Delhi 110011, India</Text>
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
                        <Text numberOfLines={1} style={styles.whereText}>New Delhi, Delhi, India</Text>
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
                    latitude:28.6037624, 
                    longitude:77.20350870, 
                    latitudeDelta: 0.0092,
                    longitudeDelta: 0.0321
                }}
            >
                <Marker
                    coordinate={{latitude: 28.6037624, longitude: 77.20350870}}
                    title={'marker_title_1'}
                    description={'marker_description_1'}
                />

                <Marker
                    coordinate={{latitude: 28.6139391, longitude: 77.2090212}}
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
            <View style={styles.otpContainer}>
                <Text style={styles.cabText}>You Selected - <Text style={styles.cabBoldText}>Prime Cab</Text></Text>
                <Text style={styles.otpText}>OTP : 5643</Text>
            </View>
            <View style={styles.cabDetailsContainer}>
                <View style={styles.cabDetails}>
                
                    <View style={styles.cabName}>
                        <Text style={styles.cabNameText}>SWIFT DESIRE WHITE</Text>
                    </View>

                    <View style={styles.cabPhoto}>
                        <Image source={require('../../assets/images/swiftDesire.png')} resizeMode={'contain'} style={styles.cabImage} />
                    </View>

                    <View style={styles.cabNumber}>
                        <Text style={styles.cabNumberText}>WB 15D 2245</Text>
                    </View>
                    
                </View>
                <View style={styles.verticalDesign}>
                    <View style={styles.triangle}/>
                    <View style={styles.verticalLine}/>
                </View>
                <View style={styles.driverDetails}>
                    <View style={styles.driverPhotoContainer}>
                        <Image source={Platform.OS=='ios'?require('../../assets/images/demoProfile.jpg'):require('../../assets/images/profilePic.jpg')} style={styles.driverPhoto} />
                    </View>
                    <View style={styles.driverNameContainer}>
                        <Text style={styles.driverNameText}>Kiran Rai</Text>
                    </View>
                    <View style={styles.ratingContainer}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={height/42}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            emptyStar={'ios-star-outline'}
                            iconSet={'Ionicons'}
                            fullStarColor={colors.YELLOW.primary}
                            emptyStarColor={colors.YELLOW.primary}
                            halfStarColor={colors.YELLOW.primary}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            containerStyle={styles.ratingContainerStyle}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Cancel Ride"
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.buttonTitleText}
                        onPress={()=>{this.onPressCancel()}}
                        buttonStyle={styles.cancelButtonStyle}
                        containerStyle={styles.cancelButtonContainerStyle}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Call Driver"
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.buttonTitleText}
                        onPress={()=>{this.onPressCall('tel:123456789')}}
                        buttonStyle={styles.callButtonStyle}
                        containerStyle={styles.callButtonContainerStyle}
                    />
                </View>
            </View>
        </View>
        {
            this.cancelModal()
        }
        {
            this.alertModal()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    mainContainer: { flex:1, backgroundColor: colors.WHITE, marginTop: StatusBar.currentHeight },
    headerStyle: { 
        backgroundColor: colors.GREY.default, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: { 
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    headerInner: {
        marginLeft:10, 
        marginRight: 10
    },
    topContainer: { flex: 1.5, flexDirection: 'row',borderTopWidth:0, alignItems: 'center', backgroundColor: colors.GREY.default, paddingEnd: 20 },
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
    bottomContainer: {flex: 2.5, alignItems: 'center'},
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    otpContainer: {flex:0.8, backgroundColor:colors.YELLOW.secondary, width: width, flexDirection: 'row', justifyContent:'space-between' },
    cabText: { paddingLeft: 10, alignSelf: 'center', color: colors.BLACK, fontFamily: 'Roboto-Regular'},
    cabBoldText: {fontFamily:'Roboto-Bold'},
    otpText: { paddingRight: 10,alignSelf: 'center', color: colors.BLACK, fontFamily: 'Roboto-Bold'},
    cabDetailsContainer: {flex:2.5, backgroundColor:colors.WHITE, flexDirection: 'row',position:'relative',zIndex:1},
    cabDetails: {flex:19},
    cabName: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent:'center' },
    cabNameText: { color: colors.GREY.btnPrimary, fontFamily: 'Roboto-Bold',fontSize: 15 },
    cabPhoto: {flex:1, alignItems: 'center', justifyContent:'center'},
    cabImage: { width: 150, height: height/22 },
    cabNumber: {flex:1, alignItems: 'center', justifyContent: 'center'},
    cabNumberText: { color: colors.GREY.iconSecondary, fontFamily: 'Roboto-Bold', fontSize: 15 },
    verticalDesign: {flex:2, height:50, width: 1, alignItems: 'center'},
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

        marginTop: -1,
        overflow:'visible'
    },
    verticalLine: {height: height/18,width: 0.5, backgroundColor:colors.BLACK, alignItems: 'center',marginTop: 10},
    driverDetails: {flex:19, alignItems: 'center', justifyContent:'center'},
    driverPhotoContainer: { flex: 5.4, justifyContent: 'flex-end', alignItems: 'center' },
    driverPhoto: {borderRadius: height/20/2, width: height/20, height: height/20},
    driverNameContainer: { flex: 2.2, alignItems: 'center', justifyContent:'center' },
    driverNameText: { color: colors.GREY.btnPrimary, fontFamily: 'Roboto-Bold', fontSize: 14 },
    ratingContainer: { flex: 2.4, alignItems: 'center', justifyContent:'center' },
    ratingContainerStyle: {marginTop: 2, paddingBottom: Platform.OS=='android'?5:0},
    buttonsContainer: {flex:1.5, flexDirection:'row'},
    buttonContainer: {flex:1},
    buttonTitleText: {color:colors.WHITE, fontFamily: 'Roboto-Bold', fontSize: 18, alignSelf:'flex-end'},
    cancelButtonStyle: { backgroundColor: colors.GREY.secondary, elevation: 0 },
    cancelButtonContainerStyle: { flex: 1, backgroundColor: colors.GREY.secondary },
    callButtonStyle: { backgroundColor: colors.GREY.btnPrimary, elevation: 0 },
    callButtonContainerStyle: { flex: 1, backgroundColor: colors.GREY.btnPrimary },

    //alert modal
    alertModalContainer: {flex:1, justifyContent:'center', backgroundColor: colors.GREY.background},
    alertModalInnerContainer: {height:200, width:(width*0.85), backgroundColor:colors.WHITE, alignItems:'center', alignSelf:'center', borderRadius:7},
    alertContainer: {flex:2, justifyContent:'space-between', width: (width-100) },
    rideCancelText: { flex:1,top:15, color:colors.BLACK, fontFamily: 'Roboto-Bold', fontSize:20, alignSelf: 'center'},
    horizontalLLine: {width:(width-110), height:0.5, backgroundColor:colors.BLACK, alignSelf: 'center',},
    msgContainer: {flex:2.5,alignItems:'center',justifyContent:'center'},
    cancelMsgText: { color:colors.BLACK, fontFamily: 'Roboto-Regular', fontSize:15, alignSelf: 'center', textAlign: 'center'},
    okButtonContainer:  {flex:1,width:(width*0.85),flexDirection:'row',backgroundColor:colors.GREY.iconSecondary, alignSelf:'center'},
    okButtonStyle: {flexDirection:'row',backgroundColor:colors.GREY.iconSecondary, alignItems: 'center', justifyContent:'center'},
    okButtonContainerStyle: {flex:1,width:(width*0.85),backgroundColor:colors.GREY.iconSecondary,},

    //cancel modal
    cancelModalContainer: {flex:1, justifyContent:'center', backgroundColor: colors.GREY.background},
    cancelModalInnerContainer: {height:400, width:width*0.85, padding:0, backgroundColor:colors.WHITE, alignItems:'center', alignSelf:'center', borderRadius:7},
    cancelContainer: {flex:1, justifyContent:'space-between', width: (width*0.85) },
    cancelReasonContainer: {flex: 1},
    cancelReasonText: { top:10, color:colors.BLACK, fontFamily: 'Roboto-Bold', fontSize:20, alignSelf: 'center'},
    radioContainer: {flex: 8,alignItems:'center'},
    radioText: { fontSize: 16, fontFamily: 'Roboto-Medium', color: colors.DARK, },
    radioContainerStyle: {paddingTop: 30,marginLeft:10},
    radioStyle: {paddingBottom:25},
    cancelModalButtosContainer: {flex: 1,flexDirection:'row',backgroundColor:colors.GREY.iconSecondary, alignItems: 'center', justifyContent:'center'},
    buttonSeparataor: {height: height/35,width: 0.5, backgroundColor:colors.WHITE, alignItems: 'center',marginTop: 3},
    cancelModalButttonStyle: {backgroundColor:colors.GREY.iconSecondary, borderRadius: 0},
    cancelModalButtonContainerStyle: {flex:1,width:(width*2)/2,backgroundColor: colors.GREY.iconSecondary,alignSelf:'center',margin:0},
    signInTextStyle:{
        fontFamily:'Roboto-Bold', 
        fontWeight: "700", 
        color: colors.WHITE
    },
});