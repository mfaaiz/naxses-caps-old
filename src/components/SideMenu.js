import React from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import SideMenuHeader from './SideMenuHeader';

import { NavigationActions } from 'react-navigation';
import { colors } from '../common/theme';

var { height } = Dimensions.get('window');

export default class SideMenu extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            heightIphoneSix : false,
            sideMenuList: [
                {key: 1, name: 'Book Your Ride', navigationName: 'Map', icon: 'home', type: 'font-awesome', child: 'firstChild'},
                {key: 2, name: 'Profile Settings', navigationName: 'Profile', icon: 'ios-person-add', type: 'ionicon', child: 'secondChild'},
                {key: 3, name: 'My Rides', navigationName: 'My Rides', icon: 'car-sports', type: 'material-community', child: 'thirdChild'},
                {key: 4, name: 'Notifications', navigationName: 'Notification', icon: 'bell', type: 'material-community', child: 'fourthChild'},
                {key: 5, name: 'Payment', icon: 'wallet', type: 'material-community', child: 'fifthChild'},
                {key: 6, name: 'Cuppons', icon: 'gift', type: 'font-awesome', child: 'sixthChild'},
                {key: 7, name: 'English', icon: 'sign-language', type: 'font-awesome', child: 'seventhChild'},
                {key: 8, name: 'Support and FAQ', icon: 'headset', type: 'material-community', child: 'eightthChild'},
                {key: 9, name: 'About Us', icon: 'info', type: 'entypo', child: 'ninethChild'},
                {key: 10, name: 'Sign Out', icon: 'sign-out', type: 'font-awesome', child: 'lastChild'}
            ],
            driver: ''
        }
          
        this._bootstrapAsync();
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const driver = await AsyncStorage.getItem('driver');
        this.setState({driver})
    };
    componentDidMount(){
        this.heightReponsive();
    }

    //check for device height(specially iPhone 6)
    heightReponsive(){
        if(height <= 667){
            this.setState({heightIphoneSix :true})
        }
    }

    //navigation to screens from side menu
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    //sign out and clear all async storage
    async signOut() {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('driver');
        const navigateAction = NavigationActions.navigate({
            routeName: 'Auth'
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render(){
        return(
            <View style={styles.mainViewStyle}>
                <SideMenuHeader headerStyle={styles.myHeader}></SideMenuHeader> 
                
                <View style={styles.compViewStyle}>
                    <View style={[styles.vertialLine,{height: (this.state.heightIphoneSix == false &&  height <= 895 && height >=668) ? '88%' : height/2 }]}></View>
                    <FlatList
                        data={this.state.sideMenuList}     
                        keyExtractor={(item,index) => index.toString()}   
                        style={{ marginTop: 20}}   
                        bounces = {false}
                        renderItem={({item, index}) => 
                            <TouchableOpacity 
                            onPress={
                                (index==9)? ()=>this.signOut() : (index==0 && this.state.driver) ? this.navigateToScreen('DriverTripAccept') :
                                this.navigateToScreen(item.navigationName) 
                                } 
                            style={
                                [styles.menuItemView, 
                                {marginTop:  (index == this.state.sideMenuList.length - 1)  ? height/12 : 0}
                                ]
                            }>
                                <View style={styles.viewIcon}>
                                    <Icon
                                        name={item.icon}
                                        type={item.type}
                                        color={colors.WHITE}
                                        size={16}
                                        containerStyle={styles.iconStyle}
                                    />
                                </View>
                                <Text style={styles.menuName}>{item.name}</Text>
                            </TouchableOpacity>
                    } />
                </View>
                <View style={{opacity: 0.6}}>
                    <Image 
                        source={require('../../assets/images/logo.png')} 
                        style={{width: '100%'}}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    myHeader:{
        marginTop:0,   
    },
    vertialLine: {
        width: 1,
        backgroundColor: colors.GREY.btnPrimary,
        position: 'absolute',
        left: 22,
        top: 24
    },
    menuItemView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 18,
        flex: 1,
        paddingLeft: 10, 
        paddingRight: 10,
    },
    viewIcon: {
        width: 24,
        height: 24,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.GREY.btnPrimary,
        left: 1
    },
    menuName: {
        color: colors.WHITE, 
        fontWeight: 'bold',
        marginLeft: 8,
        width:"100%"
    },
    mainViewStyle:{
        backgroundColor: colors.BLUE.dark, 
        height: '100%'
    },
    compViewStyle:{
        position: 'relative', 
        flex: 3
    },
    iconStyle:{ 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})