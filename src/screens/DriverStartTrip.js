import React from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar
  } from 'react-native';
import { MapComponent } from '../components';
import {Button, Header} from 'react-native-elements';
import { colors } from '../common/theme';

var { width, height } = Dimensions.get('window');

export default class DriverStartTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.9922,
                longitudeDelta: 0.9421,
            },
        }
    }

  
  render() {
    return (
        <View style={styles.containerView}>
            <Header 
                backgroundColor={colors.GREY.default}
                leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                centerComponent={<Text style={styles.headerTitleStyle}>On Trip</Text>}
                outerContainerStyles={styles.headerStyle}
                innerContainerStyles={styles.innerContStyle}
            />

            <View style={styles.segment1}>
                <Text style={styles.textContainer}>3 No. Sreenagar, Madhyamgram, Kolkata, West Bengal 7000129</Text>
            </View>

            <View style={styles.segment2}>
                <MapComponent mapStyle={styles.map} mapRegion={this.state.region} markerCord={this.state.region} />
            </View>

            <View style ={styles.segment3}>
                <View style={styles.segment3Style}>
                    <View style={styles.segView}>
                        <Image source={require('../../assets/images/alarm-clock.png')} resizeMode={'contain'} style={{ width:38, height: height/15 }} />
                    </View>
                    <View style={styles.riderTextStyle}>
                        <Text style={styles.riderText}>WAIT FOR RIDER</Text>
                        <Text style={styles.riderTextSubheading}>Rider has been notifed</Text>
                    </View>
                </View>

                <View style={styles.newViewStyle}/>
                
                <View style={styles.fixContenStyle}>
                    <Button 
                        title='START TRIP'
                        onPress={() => {
                            this.props.navigation.navigate('DriverTripComplete')
                        }}
                        titleStyle={{fontFamily:'Roboto-Bold'}}
                        buttonStyle={styles.myButtonStyle}
                    />
                </View>
            
            </View>
        </View>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
    containerView:{ 
        flex:1,
        backgroundColor:colors.GREY.btnSecondary,
        marginTop: StatusBar.currentHeight
    },
    textContainer:{
        textAlign:"center",
        fontSize:16.2,
        color:colors.BLUE.dark,
        fontFamily:'Roboto-Medium',
        lineHeight:22
    },
    headerStyle: { 
        backgroundColor: colors.GREY.default, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: { 
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    segment1:{
        width: '97.4%',
        flex:1,
        justifyContent:'center',
        borderRadius:10,
        backgroundColor: colors.WHITE,
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        paddingTop:12,
        paddingBottom:12,
        paddingRight:8,
        paddingLeft:8
    },
    segment2:{
        flex:7.5,
        width: '97.4%',
        alignSelf: 'center',
        borderRadius:10,
        backgroundColor: colors.WHITE,
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        paddingTop:12,
        paddingBottom:12,
        paddingRight:8,
        paddingLeft:8,
        justifyContent: 'center',
        alignItems: 'center',
        overflow:'hidden'
},
    riderText:{alignSelf:"flex-start",fontSize:16.2,color:colors.BLUE.dark,fontFamily:'Roboto-Medium'},
    riderTextSubheading:{alignSelf:"flex-start",fontSize:14,color:colors.BLUE.sky,fontFamily:'Roboto-Medium'},
    segment3:{
        flex:2.5,
        borderRadius:10,
        backgroundColor: colors.WHITE,
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        marginBottom:5,
        paddingTop:12,
        paddingBottom:3,
        paddingRight:8,
        paddingLeft:8,
        alignItems: 'center'
    },
    map: {
        flex: 1,
        borderRadius:10,
        ...StyleSheet.absoluteFillObject,
    },
    innerContainerStyles:{
        marginLeft:10, 
        marginRight: 10
    },
    segment3Style:{
        flex:0.6,
        flexDirection:'row',
        alignItems:'center'
    },
    segView:{
        flex:3,
        alignItems:'flex-end'
    },
    riderTextStyle:{
        flex:7,
        paddingLeft:15
    },
    newViewStyle:{
        width:'100%',
        height:1,
        backgroundColor:colors.GREY.secondary
    },
    fixContenStyle:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    myButtonStyle:{
        backgroundColor: colors.GREEN.default,
        width: width-40,
        padding: 8,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        borderRadius: 5,
        elevation:0,
        marginTop:4
    }
});