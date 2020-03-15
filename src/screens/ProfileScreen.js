import React from 'react';
import { 
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
    StatusBar,
    AsyncStorage,
    TouchableWithoutFeedback
  } from 'react-native';
import { Icon, Header } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { colors } from '../common/theme';

var { width, height } = Dimensions.get('window');

export default class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        title: 'John Dasgupta'
    }
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
  
    render() {
        return (
        <View style={styles.mainView}>
            <Header 
                backgroundColor={colors.GREY.default}
                leftComponent={{icon:'md-menu', type:'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                centerComponent={<Text style={styles.headerTitleStyle}>My Profile</Text>}
                rightComponent={{icon:'ios-notifications', type:'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.navigate('Notifications');} }}
                outerContainerStyles={styles.headerStyle}
                innerContainerStyles={{marginLeft:10, marginRight: 10}}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle}>

                <View style={styles.scrollViewStyle}>
                    <Text style={styles.profStyle}>Profile Details</Text>
                    <Icon
                        name='page-edit'
                        type='foundation'
                        color={colors.GREY.btnPrimary}
                        containerStyle={{ right: 20 }}
                    />
                </View>

                <View style={styles.viewStyle}>
                    <View style={styles.imageParentView}>
                        <View style={styles.imageViewStyle}>
                            <Image source={Platform.OS=='ios'?require('../../assets/images/demoProfile.jpg'):require('../../assets/images/profilePic.jpg')} style={{borderRadius: 130/2, width: 130, height: 130}} />
                        </View>
                    </View>
                    <Text style={styles.textPropStyle}>{this.state.title.toUpperCase()}</Text>
                </View>

                <View style={styles.newViewStyle}>
                    <View style={styles.myViewStyle}>
                        <View style={styles.iconViewStyle}>
                            <Icon
                                name='envelope-letter'
                                type='simple-line-icon'
                                color={colors.GREY.btnPrimary}
                                size={30}
                            />
                            <Text style={styles.emailStyle}>Email</Text>
                        </View>
                        <View style={styles.flexView1}>
                            <Text style={styles.emailAdressStyle}>john@gmail.com</Text>
                        </View>
                    </View>
                    <View style={styles.myViewStyle}>
                        <View style={styles.iconViewStyle}>
                            <Icon
                                name='globe'
                                type='simple-line-icon'
                                color={colors.GREY.btnPrimary}
                            />
                            <Text style={styles.text1}>Location</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.text2}>New Town, Kolkata, West Bengal, IN</Text>
                        </View>
                    </View>
                    <View style={styles.myViewStyle}>
                        <View style={styles.iconViewStyle}>
                            <Icon
                                name='phone-call'
                                type='feather'
                                color={colors.GREY.btnPrimary}
                            />
                            <Text style={styles.text1}>Mobile Number</Text>
                        </View>
                        <View style={styles.flexView2}>
                            <Text style={styles.text2}>+91 9878767676</Text>
                        </View>
                    </View>
                    <View style={styles.myViewStyle}>
                        <View style={styles.iconViewStyle}>
                            <Icon
                                name='globe'
                                type='simple-line-icon'
                                color={colors.GREY.btnPrimary}
                            />
                            <Text style={styles.emailStyle}>Preferred Language</Text>
                        </View>
                        <View style={{flex:1}}>
                            <Text style={styles.text2}>English</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.flexView3}>
                    <TouchableOpacity style={styles.textIconStyle}>
                        <Text style={styles.emailStyle}>Change Password</Text>
                        <Icon
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={colors.GREY.iconPrimary}
                            size={35}
                            containerStyle={{ right: 20 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.textIconStyle2}>
                        <Text style={styles.emailStyle}>Delete Account</Text>
                        <Icon
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={colors.GREY.iconPrimary}
                            size={35}
                            containerStyle={{ right: 20 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.signOut()}} style={styles.textIconStyle2}>
                        <Text style={styles.emailStyle}>Sign Out</Text>
                        <Icon
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={colors.GREY.iconPrimary}
                            size={35}
                            containerStyle={{ right: 20 }}
                        />
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
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
    logo:{
      flex:1,
      position:'absolute',
      top:110,
      width:'100%',
      justifyContent:"flex-end",
      alignItems:'center'      
    },
    footer:{
      flex:1,
      position:'absolute',
      bottom:0,
      height:150,
      width:'100%',
      flexDirection:'row',
      justifyContent: 'space-around',
      alignItems:'center'
    },
    scrollStyle:{
         flex: 1,
         height: height, 
         backgroundColor:colors.WHITE
        },
    scrollViewStyle:{
        width: width, 
        height: 50, 
        marginTop: 30, 
        backgroundColor: colors.GREY.primary, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    profStyle:{
        fontSize: 18, 
        left: 20, 
        fontWeight:'bold',
        color:colors.GREY.btnPrimary, 
        fontFamily:'Roboto-Bold'
    },
    viewStyle:{ 
        justifyContent:'center',
        alignItems:'center', 
        marginTop: 13 
    },
    imageParentView:{ 
        borderRadius: 150/2, 
        width: 150, 
        height: 150, 
        backgroundColor: colors.GREY.secondary, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    imageViewStyle:{ 
        borderRadius: 140/2, 
        width: 140, 
        height: 140,
        backgroundColor: colors.WHITE, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textPropStyle:{
        fontSize: 21, 
        fontWeight:'bold',
        color: colors.GREY.iconSecondary, 
        fontFamily:'Roboto-Bold', 
        top: 8
    },
    newViewStyle:{
        flex: 1, 
        height: 300, 
        marginTop: 40
    },
    myViewStyle:{
        flex: 1,
        left: 20, 
        marginRight: 40, 
        borderBottomColor: colors.GREY.btnSecondary, 
        borderBottomWidth: 1
    },
    iconViewStyle:{
        flex: 2, 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    emailStyle:{
        fontSize: 17, 
        left: 10, 
        color: colors.GREY.btnPrimary, 
        fontFamily:'Roboto-Bold'
    },
    emailAdressStyle:{
        fontSize: 15, 
        color: colors.GREY.secondary, 
        fontFamily:'Roboto-Regular'
    },
    mainIconView:{
        flex: 1, 
        left: 20, 
        marginRight: 40, 
        borderBottomColor: colors.GREY.iconSecondary,
         borderBottomWidth: 1
        },
    text1:{
         fontSize: 17, 
         left: 10, 
         color:colors.GREY.btnPrimary, 
         fontFamily:'Roboto-Bold'
        },
    text2:{
        fontSize: 15, 
        left: 10, 
        color:colors.GREY.secondary, 
        fontFamily:'Roboto-Regular'
    },
    textIconStyle:{
        width: width, 
        height: 50, 
        backgroundColor: colors.GREY.primary, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    textIconStyle2:{
        width: width, 
        height: 50, 
        marginTop:10,
        backgroundColor: colors.GREY.primary, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between'
    },
    mainView:{ 
        flex:1, 
        backgroundColor: colors.WHITE, 
        marginTop: StatusBar.currentHeight 
    },
    flexView1:{
        flex:1
    },
    flexView2:{
        flex:1
    },
    flexView3:{
        marginTop: 54
    }
});