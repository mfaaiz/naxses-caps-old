import React from 'react';
import {View, Text, Dimensions, ScrollView, KeyboardAvoidingView, Image, TouchableWithoutFeedback, LayoutAnimation, Platform} from 'react-native';
import Background from './Background';
import { Icon, Button, Header, Input } from 'react-native-elements'
import { colors } from '../common/theme';

var {  height } = Dimensions.get('window');

export default class Registration extends React.Component {
    
     constructor(props){
        super(props);
        this.state={
          fname:'',
          lname:'',
          email:'',
          mobile:'',
          password:'',
          confPassword:'',

          fnameValid: true,
          lnameValid: true,
          mobileValid: true,
          emailValid: true,
          passwordValid: true,
          cnfPwdValid: true,
          pwdErrorMsg: ''
        } 
      }

    // first name validation
    validateFirstName() {
        const { fname } = this.state
        const fnameValid = fname.length > 0
        LayoutAnimation.easeInEaseOut()
        this.setState({ fnameValid :true})
        fnameValid || this.fnameInput.shake();
        return fnameValid
    }

    // last name validation
    validateLastname() {
        const { lname } = this.state
        const lnameValid = lname.length > 0
        LayoutAnimation.easeInEaseOut()
        this.setState({ lnameValid :true })
        lnameValid || this.lnameInput.shake();
        return lnameValid
    }

    // mobile number validation
    validateMobile() {
        const { mobile } = this.state
        const mobileValid = (mobile.length == 12)
        LayoutAnimation.easeInEaseOut()
        this.setState({ mobileValid:true })
        mobileValid || this.mobileInput.shake();
        return true
    }

    // email validation
    validateEmail() {
        const { email } = this.state
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailValid = re.test(email)
        LayoutAnimation.easeInEaseOut()
        this.setState({ emailValid:true})
        emailValid || this.emailInput.shake()
        return emailValid
    }

    // password validation
    validatePassword() {
        //const { complexity } = this.props
        const complexity = 'any';
        const { password } = this.state
        const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/
        const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
        if(complexity == 'any') {
            var passwordValid = password.length >=1;
            this.setState({pwdErrorMsg: "Password can't be blank"})
        }
        else if(complexity == 'alphanumeric') {
            var passwordValid = regx1.test(password);
            this.setState({pwdErrorMsg: 'Password must consists of at least 1 alphanumeric characters and 8-15 length'});
        }
        else if (complexity == 'complex') {
            var passwordValid = regx2.test(password);
            this.setState({pwdErrorMsg: 'Password must be atleast 1 small-case letter, 1 Capital letter, 1 digit, 1 special character and 6-10 length'})
        }
        LayoutAnimation.easeInEaseOut()
        this.setState({ passwordValid:true })
        passwordValid || this.passwordInput.shake()
        return passwordValid
    } 

    // confirm password validation
    validateConfPassword() {
        const { password, confPassword } = this.state;
        const cnfPwdValid = (password == confPassword);
        LayoutAnimation.easeInEaseOut()
        this.setState({ cnfPwdValid :true })
        cnfPwdValid || this.cnfPwdInput.shake();
        return cnfPwdValid
    }

    //register button press for validation
    onPressRegister(){
        const { onPressRegister } = this.props;
        LayoutAnimation.easeInEaseOut();
        const fnameValid = this.validateFirstName();
        const lnameValid = this.validateLastname();
        const mobileValid = this.validateMobile();
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();
        const cnfPwdValid = this.validateConfPassword();
        
       if (fnameValid && lnameValid && mobileValid && emailValid && passwordValid && cnfPwdValid ) {
           //register function of smart component
            onPressRegister( this.state.fname, this.state.lname, this.state.mobile, this.state.email, this.state.password);
            // this.setState({fname:'', lname:'', mobile:'', email: '', password: '', confPassword: ''})
        }
    }

    render(){
        const { onPressBack }=this.props
        return(
            <Background>
                <Header 
                    backgroundColor={colors.TRANSPARENT}
                    leftComponent={{icon:'ios-arrow-back', type:'ionicon', color:colors.WHITE, size: 35, component: TouchableWithoutFeedback,onPress: onPressBack }}
                    outerContainerStyles={styles.headerContainerStyle}
                    innerContainerStyles={styles.headerInnerContainer}
                />
                <ScrollView style={styles.scrollViewStyle}>
                    <View style={styles.logo}>
                        <Image source={require('../../assets/images/logo.png')} />
                    </View>
                    <KeyboardAvoidingView behavior={Platform.OS=='ios'?"padding":"padding"} style={styles.form}> 
                        <View style={styles.containerStyle}>
                            <Text style={styles.headerStyle}>Registration</Text>

                            <View style={styles.textInputContainerStyle}> 
                                <Icon
                                    name='user'
                                    type='font-awesome'
                                    color={colors.WHITE}
                                    size={30}
                                    containerStyle={styles.iconContainer}
                                />
                                <Input
                                    ref={input => (this.fnameInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'First Name'}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.state.fname}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({fname: text})}}
                                    errorMessage={this.state.fnameValid ? null : 'Please enter your first name'}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateFirstName(); this.lnameInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>  

                            <View style={styles.textInputContainerStyle}>
                                <Icon
                                    name='user'
                                    type='font-awesome'
                                    color={colors.WHITE}
                                    size={30}
                                    containerStyle={styles.iconContainer}
                                />
                                <Input
                                    ref={input => (this.lnameInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Last Name'}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.state.lname}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({lname: text})}}
                                    errorMessage={this.state.lnameValid ? null : 'Please enter your last name'}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateLastname(); this.emailInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>

                            <View style={styles.textInputContainerStyle}>
                                <Icon
                                    name='envelope-o'
                                    type='font-awesome'
                                    color={colors.WHITE}
                                    size={23}
                                    containerStyle={styles.iconContainer}
                                />
                                <Input
                                    ref={input => (this.emailInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Email'}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.state.email}
                                    keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({email: text})}}
                                    errorMessage={this.state.emailValid ? null : 'Please enter a valid email address'}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateEmail(); this.mobileInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>
                            <View style={styles.textInputContainerStyle}>
                                <Icon
                                    name='mobile-phone'
                                    type='font-awesome'
                                    color={colors.WHITE}
                                    size={40}
                                    containerStyle={styles.iconContainer}
                                />
                                <Input
                                    ref={input => (this.mobileInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Mobile'}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.state.mobile}
                                    keyboardType={'number-pad'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({mobile: text})}}
                                    errorMessage={this.state.mobileValid ? null : 'Please enter a valid mobile number'}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateMobile(); this.passwordInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>

                            <View style={styles.textInputContainerStyle}>
                                <Icon
                                    name='lock'
                                    type='font-awesome'
                                    color={colors.WHITE}
                                    size={30}
                                    containerStyle={styles.iconContainer}
                                />
                                <Input
                                    ref={input => (this.passwordInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Password'}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.state.password}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({password: text})}}
                                    errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                                    secureTextEntry
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validatePassword(); this.cnfPwdInput.focus()}}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>

                            <View style={styles.textInputContainerStyle}>
                                <Icon
                                    name='lock'
                                    type='font-awesome'
                                    color={colors.WHITE}
                                    size={30}
                                    containerStyle={styles.iconContainer}
                                />
                                <Input
                                    ref={input => (this.cnfPwdInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={'Confirm Password'}
                                    placeholderTextColor={colors.WHITE}
                                    value={this.state.confPassword}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({confPassword: text})}}
                                    errorMessage={this.state.cnfPwdValid ? null : 'Password does not match'}
                                    secureTextEntry
                                    blurOnSubmit={true}
                                    onSubmitEditing={() => { this.validateConfPassword() }}
                                    errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={()=>{this.onPressRegister()}}
                                    title="Register Now"
                                    titleStyle={styles.buttonTitle}
                                    buttonStyle={styles.registerButton}
                                />
                            </View>
                            <View style={styles.gapView}/>
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </Background>
        ); 
    }
};

const styles={
    headerContainerStyle: { 
        backgroundColor: colors.TRANSPARENT, 
        borderBottomWidth: 0 
    },
    headerInnerContainer: {
        marginLeft:10, 
        marginRight: 10
    },
    inputContainerStyle: {
        borderBottomWidth:1,
        borderBottomColor: colors.WHITE
    },
    textInputStyle:{
        marginLeft:10,
    },
    iconContainer: {
        paddingTop:8
    },
    gapView: {
        height:40,
        width:'100%'
    },
    buttonContainer: { 
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:40
    },
    registerButton: {
        backgroundColor: colors.SKY,
        width: 180,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        borderRadius:15,
    },
    buttonTitle: { 
        fontSize:20 
    },
    inputTextStyle: {
        color:colors.WHITE,
        fontSize:16,
        marginLeft:0,
        height:32
    },
    errorMessageStyle: { 
        fontSize: 15, 
        fontWeight:'bold',
        marginLeft:0 
    },
    containerStyle:{
        flexDirection:'column',
        marginTop:20
    },
    form: {
        flex: 1,
    },
    logo:{
        width:'100%',
        justifyContent:"flex-start",
        marginTop: 80,
        alignItems:'center', 
    },
    scrollViewStyle:{
        height: height
    },
    textInputContainerStyle:{
        flexDirection:'row', 
        alignItems: "center",  
        marginLeft:20,
        marginRight:20,
        padding: 15,

    },
    headerStyle:{
        fontSize:20,
        color:colors.WHITE,
        textAlign:'center',
        flexDirection:'row',
        marginTop:0
    },
}