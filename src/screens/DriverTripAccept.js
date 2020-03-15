import React from 'react';
import { Text, View, StyleSheet, Dimensions, FlatList, Modal, TouchableHighlight, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Button, Header } from 'react-native-elements';
import Polyline from '@mapbox/polyline';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { colors } from '../common/theme';

var { width, height } = Dimensions.get('window');

export default class DriverTripAccept extends React.Component{

    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }

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
                {label: 'Cab is not coming on expected time', value: 4 }
            ],
            value: 0,
            tasklist: [
                {
                    date: 'Fri, Aug 24, 06.47 PM', 
                    pickUpLocationData:
                        {
                            latitude: 22.1884979,
                            longitude: 88.061018,
                            name: 'Utsabbagan Ceremony House...',
                        },
                    dropLocationData: {
                        latitude: 22.0082,
                        longitude: 87.9784,
                        name: 'Utsabbagan Ceremony House...', 
                    }
                },
                {
                    date: 'Fri, Aug 25, 06.47 PM', 
                    pickUpLocationData:
                        {
                            latitude: 22.1884979,
                            longitude: 88.061018,
                            name: 'Utsabbagan Ceremony House...',
                        },
                    dropLocationData: {
                        latitude: 22.0082,
                        longitude: 87.9784,
                        name: 'Utsabbagan Ceremony House...', 
                    }
                },
                {
                    date: 'Fri, Aug 26, 06.47 PM', 
                    pickUpLocationData:
                        {
                            latitude: 22.1884979,
                            longitude: 88.061018,
                            name: 'Utsabbagan Ceremony House...',
                        },
                    dropLocationData: {
                        latitude: 22.0082,
                        longitude: 87.9784,
                        name: 'Utsabbagan Ceremony House...', 
                    }
                },
            ]
        }

        this.getDirections("22.1884979,88.061018", "22.0082,87.9784")
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
            await this.setState({coords: coords})
            return coords
        }
        catch(error) {
            alert(error)
            return error
        }
    }

    render(){
        return(
            <View style={styles.mainViewStyle}>
                <Header 
                    backgroundColor={colors.GREY.default}
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                    centerComponent={<Text style={styles.headerTitleStyle}>Task List</Text>}
                    outerContainerStyles={styles.headerStyle}
                    innerContainerStyles={styles.headerInnerStyle}
                />
                <FlatList
                    data={this.state.tasklist}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item, index}) => 
                    <View style={styles.listItemView}>
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
                                    coordinate={{latitude: item.pickUpLocationData.latitude, longitude: item.pickUpLocationData.longitude}}
                                    title={'marker_title_1'}
                                    description={'marker_description_1'}                            
                                />

                                <Marker
                                    coordinate={{latitude: item.dropLocationData.latitude, longitude: item.dropLocationData.longitude}}
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
                
                        <View style={styles.mapDetails}>
                            <View style={styles.dateView}>
                                <Text style={styles.listDate}>{item.date}</Text>
                            </View>
                            <View style={styles.addressViewStyle}>                            
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <View style={styles.greenDot}></View>
                                    <Text style={styles.addressViewTextStyle}>{item.pickUpLocationData.name}</Text>
                                </View>
                                <View style={styles.fixAdressStyle}>
                                    <View style={styles.redDot}></View>
                                    <Text style={styles.addressViewTextStyle}>{item.dropLocationData.name}</Text>
                                </View>
                            </View>

                            <View style={styles.detailsBtnView}>
                                <View style={{flex: 1}}>
                                    <Button 
                                        onPress={() => {
                                            this.setModalVisible(true);
                                        }}
                                        title='Ignore'
                                        titleStyle={styles.titleStyles}
                                        buttonStyle={styles.myButtonStyle}
                                        containerStyle={{
                                            flex: 1,
                                            alignSelf: 'flex-end',
                                            paddingRight: 14
                                        }}
                                    />
                                </View>
                                <View style={styles.viewFlex1}>
                                    <Button 
                                        title='Accept'
                                        titleStyle={styles.titleStyles}
                                        onPress={() => {
                                            this.props.navigation.navigate('DriverTripStart')
                                        }}
                                        buttonStyle={{
                                            backgroundColor: colors.GREEN.light,
                                            width: height/6,
                                            padding: 2,
                                            borderColor: colors.TRANSPARENT,
                                            borderWidth: 0,
                                            borderRadius: 5,
                                        }}
                                        containerStyle={{
                                            flex: 1,
                                            alignSelf: 'flex-start',
                                            paddingLeft: 14
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                }
                />
                
                <View style={styles.modalPage}>
                    <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                        <View style={styles.modalMain}>
                            <View style={styles.modalContainer}>
                                <View style={styles.modalHeading}>
                                    <Text style={styles.alertStyle}>Alert</Text>
                                </View>
                                <View style={styles.modalBody}>
                                    <Text style={{fontSize: 16}}>Do you want to ignore this job?</Text>
                                </View>
                                <View style={styles.modalFooter}>
                                    <TouchableHighlight
                                        style={[styles.btnStyle,styles.clickText]}
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)
                                        }}>
                                        <Text style={styles.cancelTextStyle}>Cancel</Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight
                                        style={styles.btnStyle}
                                        onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible)                            
                                        }}>
                                        <Text style={styles.okStyle}>OK</Text>
                                    </TouchableHighlight>
                                </View>                  
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
            
        )
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
    mapcontainer: {
        flex: 1.5,
        width: width,
        borderWidth:7,
        borderColor:colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapDetails:{
        backgroundColor: colors.WHITE,
        flex: 1,
        flexDirection: 'column',
    },
    map: {
        flex: 1,
        ...StyleSheet.absoluteFillObject,
        overflow: 'hidden'
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
    signInTextStyle:{
        fontFamily:'Roboto-Bold', 
        fontWeight: "700", 
        color: colors.WHITE
    },
    listItemView: {
        flex: 1,
        width: '100%',
        height: 350,
        marginBottom: 10,
        flexDirection: 'column',
    },
    dateView: {
        flex: 1.1
    },
    listDate: {
        fontSize: 20, 
        fontWeight: 'bold', 
        paddingLeft: 10,
        color: colors.GREY.default,
        flex: 1
    },
    addressViewStyle: {
        flex: 2,
        paddingLeft: 10
    },
    addressViewTextStyle: {
        color: colors.GREY.secondary,
        fontSize: 15,
        marginLeft:15, 
        lineHeight: 24
    },
    greenDot: {
        backgroundColor: colors.GREEN.default,
        width: 10,
        height: 10,
        borderRadius: 50
    },
    redDot: {
        backgroundColor: colors.RED,
        width: 10,
        height: 10,
        borderRadius: 50
    },
    detailsBtnView: {
        flex: 2,
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: width,
        marginTop: 10,
        marginBottom: 10
    },

    modalPage: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    modalMain: {
        flex: 1,
        backgroundColor: colors.GREY.background,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContainer: {
        width: '80%',
        backgroundColor: colors.WHITE,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        flex: 1,
        maxHeight: 180
    },
    modalHeading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalBody: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalFooter: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        borderTopColor: colors.GREY.iconPrimary,
        borderTopWidth: 1,
        width: '100%',
    },
    btnStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainViewStyle:{
        flex: 1, 
        marginTop: StatusBar.currentHeight
    },
    fixAdressStyle:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    myButtonStyle:{
        backgroundColor: colors.RED,
        width: height/6,
        padding: 2,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        borderRadius: 5,                                    
    },
    alertStyle:{
        fontWeight: 'bold', 
        fontSize: 18,
        width:'100%',
        textAlign:'center'
    },
    cancelTextStyle:{
        color: colors.BLUE.secondary, 
        fontSize: 18, 
        fontWeight: 'bold',
        width:"100%",
        textAlign:'center'
    },
    okStyle:{
        color: colors.BLUE.secondary, 
        fontSize: 18, 
        fontWeight: 'bold'
    },
    viewFlex1:{
        flex: 1
    },
    clickText: { 
        borderRightColor: colors.GREY.iconPrimary, 
        borderRightWidth: 1
    },
    titleStyles:{
        width:"100%",
        alignSelf: 'center'
    }
});