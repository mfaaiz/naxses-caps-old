import React from 'react';
import { Text, View, Image, Platform } from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from '../common/theme';

//make a compontent
const SideMenuHeader = ({headerStyle}) =>{

   return (
        <View style={[styles.viewStyle,headerStyle]}>
            <View style={styles.userImageView}>
                 <Image 
                    source={Platform.OS=='ios'?require('../../assets/images/demoProfile.jpg'):require('../../assets/images/profilePic.jpg')}
                    style={styles.imageStyle}
                />
            </View>   
            <View style={styles.headerTextStyle}>
                <Text style={styles.ProfileNameStyle}>JHONE DEY</Text>
            </View>
            <View style={styles.iconViewStyle}>
                <Icon 
                    name='mail-read'
                    type='octicon'
                    color={colors.WHITE}
                    size={16}
                />
                <Text style={styles.emailStyle}>jhone@gmail.com</Text>
            </View>
        </View>
   );

};

const styles = {
    viewStyle:{
        backgroundColor:colors.BLUE.dark,
        justifyContent:'center',
        alignItems:'center',
        height:180,
        paddingTop:20,
        shadowColor:colors.BLACK,
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.2,
        elevation:2,
        position:'relative',
        flexDirection:'column'
    },
    textStyle:{
        fontSize:20,
        color:colors.WHITE
    },
    headerTextStyle:{
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 10
    },
    iconStyle:{
       
    },
    userImageView: {
        width: 84,
        height: 84,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: colors.WHITE,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    ProfileNameStyle:{
        fontWeight: 'bold', 
        color: colors.WHITE, 
        fontSize: 18
    },
    iconViewStyle:{
        justifyContent: 'center', 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 4
    },
    emailStyle:{
        color: colors.WHITE, 
        fontSize: 13,
        marginLeft: 4
    },
    imageStyle:{
        width: 80, 
        height:80
    }
}
//make the component available to other parts of the app
export default SideMenuHeader;