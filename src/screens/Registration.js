import React from 'react';
import { Registration, VerificationModal } from '../components';
import {
  StyleSheet,
  View,
  StatusBar
} from 'react-native';

import { customer } from '../communicator';

export default class RegistrationPage extends React.Component {

  state = {
    isModalVisible: false,
    mobileNo:''
  };

  constructor(props) {
    super(props);
  }

  hideModal = () => {
    this.setState({isModalVisible : false});
  }

  //register button click after all validation
  async clickRegister(fname, lname, mobile, email, password) {
    // do something with those parameters
    let signupResp = await customer.signUp({
      fname,
      lname,
      email,
      mobile,
      password
    });

    // alert(signupResp.message);
    if (!!signupResp.status) {
      this.setState({isModalVisible: true , mobileNo: mobile})
      // this.props.navigation.navigate('Login')
    }else{
      alert(`Unable to register. ${signupResp.message}`);
      this.setState({isModalVisible: false , mobileNo:''})
    }
  }

  verifyCode= async (verificationCode) => {
    let verificationResp = await customer.verifyNumber({
      mobile: this.state.mobileNo,
      code: verificationCode
    });

    if(!!verificationResp.status){
      this.hideModal();
      alert(`${this.state.mobileNo}|${verificationCode} successfully verified. You can now login.`);
    }else{
      alert("Verification Failed.");
    }
  }

  onPressResendLink = async () => {
    //TODO: RESEND VERIFICATION LINK API CALL
  }

  onBackButtonPress = async () => {
    if(!!this.state.isModalVisible){
      this.setState({isModalVisible: false});
    }
  }

  render() {
    return (
      <View style={styles.containerView}>
        <VerificationModal isModalVisible = {this.state.isModalVisible} onPressVerify = {this.verifyCode}/>
        <Registration complexity={'complex'} onPressRegister={(fname, lname, mobile, email, password) => this.clickRegister(fname, lname, mobile, email, password)} onPress={() => { this.clickRegister() }} onPressBack={() => { this.props.navigation.goBack() }}></Registration>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerView: { flex: 1, marginTop: StatusBar.currentHeight },
  textContainer: { textAlign: "center" },
});