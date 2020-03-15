import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    AsyncStorage,                   
    Image
  } from 'react-native';
import { LoginComponent, Background, ForgotPassModal } from '../components';

import { customer } from '../communicator';

export default class LoginScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            emailValid:true,
            passwordValid:true,
            driver: '',
            showForgotModal:false,
            emailerror:null
        }
        
        // this._bootstrapAsync();
    }

    async componentDidUpdate(){
        let isUserTokenSet = await AsyncStorage.getItem('userToken');
        let isUserIdSet = await AsyncStorage.getItem('userId');
        let currentRideId = await AsyncStorage.getItem("current_ride");

        if(currentRideId){
            this.props.navigation.navigate('BookingQuoteScreen');
        }
        if(isUserIdSet && isUserTokenSet){
            this.props.navigation.navigate('Root');
        }
    }

    closeModal(){ 
        this.setState({ showForgotModal: false })
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const driver = await AsyncStorage.getItem('driver');
        this.setState({driver})
    };

    //go to register page
    onPressRegister() {
        this.props.navigation.navigate('Reg');
    }

    //forgot password press
    forgotPassPress() {
        this.setState({showForgotModal:true})
    }
    
    async onPressForgotPass(email) {
        this.setState({showForgotModal:false},()=>{
            setTimeout(async () => {
                let customerResp = await customer.getRandomPassword(email);
                alert(customerResp.message);        
            }, 600);
        });
    }

    //on press login after all validation
    async onPressLogin(email, password){

        let signInResp = await customer.signIn({
            email,
            password
        })

        if(signInResp.status){
            await AsyncStorage.setItem('userToken', signInResp.customerData.email);
            await AsyncStorage.setItem('userId', parseInt(signInResp.customerData.id).toString());
            await AsyncStorage.setItem('userPassword', signInResp.customerData.password);
            this.setState({navigateToRoot: true});
            this.props.navigation.navigate('Root');
        }else{
            alert(signInResp.message);
        }
    }

  render() {
    return (
        <Background>
            <View style={styles.logo}>
                <Image source={require('../../assets/images/logo.png')} />
            </View>
            <View style={styles.logInCompStyl}/>
            <View style={styles.containerView}>
              <LoginComponent
                complexity={'any'}
                onPressRegister={()=>{this.onPressRegister()}} 
                onPressLogin={(email, password)=>{this.onPressLogin(email, password)}} 
                onPressForgotPassword={()=>{this.forgotPassPress()}}
              />
            </View>

            <ForgotPassModal
                modalvisable={this.state.showForgotModal}
                requestmodalclose={()=>{this.closeModal()}}

                inputEmail={this.state.email}
                emailerrorMsg={this.state.emailerror}
                onChangeTextInput={(value)=>{this.setState({emailerror:null,email:value})}}
                
                onPressForgotPass={(email)=>this.onPressForgotPass(email)} 
            />

        </Background>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
    containerView: {
        flex: 1, 
        justifyContent:'center', 
        alignItems:'center',
        padding:30
    },
    logo:{
        flex:1,
        position:'absolute',
        top:80,
        width:'100%',
        justifyContent:"flex-end",
        alignItems:'center'      
    },
    logInCompStyl:{
        height: 100
    }
});