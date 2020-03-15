import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  StatusBar,
  Image
  // Icon,
  // Input
} from 'react-native';
import { Icon, Button, Header, Input } from 'react-native-elements'

import { colors } from '../common/theme';
import Modal from "react-native-modal";
let { height, width } = Dimensions.get('window');

export default class VehicleTypeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vehicleTypeData:this.props.vehicleTypeData
        };
    }

  _onTouchPress =async ()=>{
    //  alert(JSON.stringify(this.state.vehicleTypeData)); 
    const onTouchPress = this.props.onTouchPress;
    await onTouchPress(this.state.vehicleTypeData);
  }

  render() {
    // const { style, children, btnClick, buttonStyle } = this.props;

    return (
        <TouchableOpacity style={styles.textViewStyle} onPress = {this._onTouchPress}>
            <View style={styles.imageStyle}>
                <Image source={require('../../assets/images/taxi--dd.png')} style={styles.imageStyle1} />
            </View>
            <View style={styles.textViewStyle}>
                <Text style={styles.text1}>{this.props.name}</Text>
                {/* <Text style={styles.text2}>15 Min</Text> */}
            </View>
        </TouchableOpacity>
    );
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