import React from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    StatusBar
  } from 'react-native';
  var { width } = Dimensions.get('window');
import { MapComponent } from '../components';
import {Button, Header} from 'react-native-elements';
import { colors } from '../common/theme';
export default class DriverCompleteTrip extends React.Component {
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
                innerContainerStyles={styles.innerStyle}
            />
            
            <View style={styles.segment1}>
                <Text style={styles.textContainer}>South Bankimpally, Madhyamgram, Kolkata, West Bengal 7000129</Text>
            </View>
            <View style={styles.segment2}>
                <MapComponent mapStyle={styles.map} mapRegion={this.state.region} markerCord={this.state.region} />
            </View>
            <View style={styles.buttonViewStyle}>        
                <Button 
                    title='COMPLETE TRIP'
                    onPress={() => {
                        this.props.navigation.navigate('DriverFare')
                    }}
                    titleStyle={styles.titleViewStyle}
                    buttonStyle={styles.buttonStyleView}
                /> 
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
        paddingBottom:5,
        marginTop: StatusBar.currentHeight
    },
    textContainer:{
        textAlign:"center",
        fontSize:16.2,
        color:colors.BLUE.default.dark,
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
        justifyContent: 'center',
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
        flex:10,
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
        overflow:'hidden',
        position:'relative'
},
segment3:{
        flex:2,
        borderRadius:10,
        marginLeft:5,
        marginRight:5,
        marginTop:5,
        marginBottom:5,
        paddingTop:3,
        paddingBottom:3,
        paddingRight:8,
        paddingLeft:8,
        alignItems: 'center',

},
    map: {
        flex: 1,
        borderRadius:10,
        ...StyleSheet.absoluteFillObject,
    },
    buttonViewStyle:{
        flex:1,
        justifyContent:'flex-end',
        bottom:18,
        position:"absolute",
        alignSelf:'center'
    },
    innerStyle:{
        marginLeft:10, 
        marginRight: 10
    },
    buttonStyleView:{
        backgroundColor: colors.RED,
        width: width-40,
        alignItems:'flex-end',
        padding: 8,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        borderRadius: 5,
        elevation:0,
    },
    titleViewStyle:{
        fontFamily:'Roboto-Bold'
    }
});