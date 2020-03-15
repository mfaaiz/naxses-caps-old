import React from 'react';
import { 
    StyleSheet,
    View,
    Alert,
    Image,
    Dimensions,
    TouchableOpacity,
    Text,
    StatusBar,
    TouchableWithoutFeedback, 
  } from 'react-native';

import { connect } from 'react-redux';
import {
    SET_VEHICLE_TYPE,
    SET_ORIGIN_AND_DESTINATION,
    setVehicleType,
    setOriginAndDestination
} from '../actions';

import { MapComponent, VehicleTypeComponent } from '../components';
import { Icon, Button, Header } from 'react-native-elements';
import { colors } from '../common/theme';
var { height, width } = Dimensions.get('window');
import store from '../config/store';

export default class MapScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.9922,
            longitudeDelta: 0.9421,
        },
        whereText: "Where From ?",
        dropText: "Drop Where ?",
        vehicleTypes: [
            {name: "STATE" , id:1, description: "\npassengers: 4 \nluggage: 2 \nhand luggage: 1"},
            {name: "SALOON" , id:2, description: "\npassengers:4 \nluggage:2 \n hand luggage: 1"},
            {name: "MPV" , id:3, description:"\npassengers: 5\nluggage: 3\n hand luggage: 2"},
            {name: "MPV PLUS", id:4 , description:"\npassengers: 6\nluggage: 6\n hand luggage: 4"}
        ]
    }
  }

  onVehicleTypeTouchPress = (data)=>{
    Alert.alert(
        'This vehicle type can:\n',
        `${data.description}\n\n Continue with the selection ?`,
        [
          {
            text: 'Cancel',
            onPress: () => {this.props.dispatch(setVehicleType({type: SET_VEHICLE_TYPE, vehicleType: null})); },
            style: 'cancel',
          },
          {
            text: 'OK', onPress: () => {this.props.dispatch(setVehicleType(data)); }
          },
        ],
        {cancelable: false},
      );
    // alert();
  }

  renderVehicleTypes(){
    return this.state.vehicleTypes.map((vehicleType) =>
    <VehicleTypeComponent key={vehicleType.id} name={vehicleType.name} vehicleTypeData={vehicleType} onTouchPress={this.onVehicleTypeTouchPress}/>
    ); 
  }


  async componentWillMount() {
    let searchObj = await this.props.navigation.getParam('searchObj') ? this.props.navigation.getParam('searchObj') : null;
    //   console.log(searchObj.searchData)
      if(searchObj) {
          console.log(searchObj.searchDetails.formatted_address)
          if(searchObj.searchFrom == 'where') {
            if(searchObj.searchDetails && searchObj.searchDetails.geometry){
                this.setState({
                    region: {
                      latitude: searchObj.searchDetails.geometry.location.lat,
                      longitude: searchObj.searchDetails.geometry.location.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    },
                    whereText: searchObj.whereText,
                    whereCoordinates: `${searchObj.searchDetails.geometry.location.lat},${searchObj.searchDetails.geometry.location.lng}`,
                    // whereTempText: searchObj.searchDetails.formatted_address,
                    dropText: searchObj.dropText,
                    dropTextCoordinates: searchObj.dropTextCoordinates
                  })
                }
          }
          else {
            if(searchObj.searchDetails && searchObj.searchDetails.geometry){
                this.setState({
                    region: {
                      latitude: searchObj.searchDetails.geometry.location.lat,
                      longitude: searchObj.searchDetails.geometry.location.lng,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    },
                    whereText: searchObj.whereText,
                    dropTextCoordinates: `${searchObj.searchDetails.geometry.location.lat},${searchObj.searchDetails.geometry.location.lng}`,
                    // whereTempText: searchObj.searchDetails.formatted_address,
                    dropText: searchObj.dropText,
                    whereCoordinates: searchObj.whereCoordinates
                  })
                }
          }
      }
      
  }

  //go to confirm booking page
  onPressBook() {
    if(!store.getState().vehicleType){
        alert("Please select Vehicle Category To Proceed");
    }else if(this.state.whereText == "Where From ?"){
        alert("Pickup Point is required for the booking to proceed");
    }else if(this.state.dropText == "Drop Where ?"){
        alert("Drop Off Point is required for the booking to proceed");
    }
    else{
        this.props.dispatch(setOriginAndDestination(this.state.whereText , this.state.whereCoordinates,this.state.dropText , this.state.dropTextCoordinates));
        this.props.navigation.navigate('FareDetails');
    }  
  }
  
  render() {
    return (
      <View style={styles.mainViewStyle}>
        <Header 
            backgroundColor={colors.GREY.default}
            leftComponent={{icon:'md-menu', type:'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
            centerComponent={<Text style={styles.headerTitleStyle}>Grab Me Cab</Text>}
            rightComponent={{icon:'ios-notifications', type:'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.navigate('Notifications');} }}
            outerContainerStyles={styles.headerStyle}
            innerContainerStyles={styles.inrContStyle}
        />

        <View style={styles.myViewStyle}>
            <View style={styles.coverViewStyle}>
                <View style={styles.viewStyle1}/>
                <View style={styles.viewStyle2}/>
                <View style={styles.viewStyle3}/>
            </View>
            <View style={styles.iconsViewStyle}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Search',{from:"where",
                whereText:this.state.whereText,
                whereCoordinates: this.state.whereCoordinates,
                dropTextCoordinates: this.state.dropTextCoordinates,
                dropText:this.state.dropText
                });}} style={styles.contentStyle}>
                    <View style={styles.textIconStyle}>
                        <Text numberOfLines={1} style={styles.textStyle}>{this.state.whereText}</Text>
                        <Icon
                            name='gps-fixed'
                            color={colors.WHITE}
                            size={25}
                            containerStyle={{flex:1}}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Search',{from:"drop",
                whereText:this.state.whereText,
                whereCoordinates: this.state.whereCoordinates,
                dropTextCoordinates: this.state.dropTextCoordinates,
                dropText:this.state.dropText
                });}} style={styles.searchClickStyle}>
                    <View style={styles.textIconStyle}>
                        <Text numberOfLines={1} style={styles.textStyle}>{this.state.dropText}</Text>
                        <Icon
                            name='search'
                            type='feather'
                            color={colors.WHITE}
                            size={25}
                            containerStyle={{flex:1}}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </View> 
        <View style={styles.mapcontainer}>
            <MapComponent mapStyle={styles.map} mapRegion={this.state.region} markerCord={this.state.region} />
        </View>
        <View style={styles.compViewStyle}>
            <Text style={styles.pickCabStyle}>Pick Your Cab</Text>
            <View style={styles.adjustViewStyle}>
                {this.renderVehicleTypes()}
            </View>
            <View style={{flex: 1.3}}>
                <Button
                    title="Book Now"
                    loading={false}
                    loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                    titleStyle={{color: colors.WHITE, fontFamily: 'Roboto-Bold', fontSize: 20,}}
                    onPress={()=>{this.onPressBook()}}
                    buttonStyle={{width: width, backgroundColor: colors.GREY.btnPrimary,elevation: 0}}
                    containerStyle={{flex: 1, backgroundColor: colors.GREY.btnPrimary}}
                />
            </View>
        </View>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//     vehicleTypeProp: state.vehicleType
// });

// export default connect(mapStateToProps)(MapScreen);
   
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
    mapcontainer: {
        flex: 6,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
    },
    inrContStyle:{
        marginLeft:10, 
        marginRight: 10
    },
    mainViewStyle:{ 
        flex:1, 
        backgroundColor: colors.WHITE, 
        marginTop: StatusBar.currentHeight 
    },
    myViewStyle:{ 
        flex: 1.5, 
        flexDirection: 'row',
        borderTopWidth:0, 
        alignItems: 'center', 
        backgroundColor: colors.GREY.default, 
        paddingEnd: 20 
    },
    coverViewStyle:{ 
        flex: 1.5, 
        alignItems:'center' 
    },
    viewStyle1:{
        height: 15, 
        width: 15, 
        borderRadius: 15/2, 
        backgroundColor: colors.YELLOW.light
    },
    viewStyle2:{
        height: height/25, 
        width: 1, 
        backgroundColor: colors.YELLOW.light
    },
    viewStyle3:{
        height: 17, 
        width: 17, 
        backgroundColor: colors.GREY.iconPrimary
    },
    iconsViewStyle:{
        flex: 9.5, 
        justifyContent: 'space-between'
    },
    contentStyle:{
         flex: 1, 
         justifyContent: 'center', 
         borderBottomColor: colors.WHITE, 
         borderBottomWidth: 1
        },
    textIconStyle:{
         flex: 1, 
         justifyContent: 'center', 
         alignItems:'center', 
         flexDirection: 'row'
        },
    textStyle:{
         flex:9, 
         fontFamily: 'Roboto-Regular', 
         fontSize: 18, 
         fontWeight: '900', 
         color: colors.WHITE
        },
    searchClickStyle:{
         flex: 1, 
         justifyContent: 'center'
        },
    compViewStyle:{
        flex: 3.5, 
        alignItems: 'center'
    },
    pickCabStyle:{ 
        flex: 0.6, 
        fontFamily: 'Roboto-Bold', 
        fontSize: 17, 
        fontWeight: '900', 
        color: colors.BLACK
    },
    sampleTextStyle:{ 
        flex: 0.5, 
        fontFamily: 'Roboto-Regular', 
        fontSize: 14, 
        fontWeight: '700', 
        color: colors.BLACK
    },
    adjustViewStyle:{
        flex: 2.4, 
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },
    imageViewStyle:{
        flex: 2.7, 
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },
    imageStyle:{
        height: height/14, 
        width: height/14, 
        borderRadius: height/14/2,
        borderWidth:3, 
        borderColor:colors.YELLOW.secondary, 
        backgroundColor: colors.WHITE, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    textViewStyle:{
        flex: 1, 
        alignItems: 'center'
    },
    text1:{ 
        fontFamily: 'Roboto-Bold', 
        fontSize: 16, 
        fontWeight: '900', 
        color: colors.BLACK
    },
    text2:{ 
        fontFamily: 'Roboto-Regular', 
        fontSize: 13, 
        fontWeight: '900', 
        color: colors.BLACK
    },
    imagePosition:{
        height: height/14, 
        width: height/14, 
        borderRadius: height/14/2,
        borderWidth:3, 
        borderColor:colors.YELLOW.secondary, 
        backgroundColor: colors.YELLOW.secondary, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    imageStyleView:{
        height: height/14, 
        width: height/14, 
        borderRadius: height/14/2, 
        borderWidth:3, 
        borderColor:colors.YELLOW.secondary, 
        backgroundColor: colors.WHITE, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    imageStyle1:{
        height: height/18, 
        width: height/18
    },
    imageStyle2:{
        height: height/19,
        width: height/19
    }
    
});