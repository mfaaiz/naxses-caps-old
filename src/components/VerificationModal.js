import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  // Icon,
  // Input
} from 'react-native';
import { Icon, Button, Header, Input } from 'react-native-elements'

import { colors } from '../common/theme';
import Modal from "react-native-modal";

export default class VerificationModal extends React.Component {

  state = {
    isModalVisible: false,
    verificationCode: '',
    codeVerified: true,
    statusMessage : ""
  };

  onPressVerify(verificationCode){
    if(!this.validateCode()) {
      this.setState({statusMessage:"", codeVerified: false});
      return;
    }
    const { onPressVerify } = this.props;
    onPressVerify(this.state.verificationCode);
  }

  onPressResendLink(){
    //TODO: RESEND THE VERIFICATION CODE
    this.setState({statusMessage:"Verification Message sent !"});
    // const {onPressResendLink} = this.props;
  }

  validateCode(){
    if(!this.state.verificationCode) return false;
    if(!!this.state.verificationCode && this.state.verificationCode.length != 6) return false;
    return true;
  }

  render() {
    const { style, children, btnClick, buttonStyle } = this.props;

    return (
      <View>
        <Modal isVisible={this.props.isModalVisible}>
          <View style={{ flex: 1 }}>
            <View style={{ minHeight:130 ,flex: 0.3, backgroundColor: 'white' }}>
              <Text style={styles.modalHeader}>Please Enter Verification Code!</Text>
              <View style={styles.textInputContainerStyle}>
                <Icon
                  name='user'
                  type='font-awesome'
                  color={colors.WHITE}
                  size={30}
                  containerStyle={styles.iconContainer}
                />
                <Input
                  editable={true}
                  // underlineColorAndroid={colors.TRANSPARENT}
                  placeholder={'Verification Code ...'}
                  value={this.state.verificationCode}
                  keyboardType={'number-pad'}
                  // inputStyle={styles.inputTextStyle}
                  onChangeText={(text) => { this.setState({ verificationCode: text }) }}
                  errorMessage={this.state.codeVerified ? null : 'Invalid Code Entered.'}
                  // secureTextEntry={false}
                  blurOnSubmit={true}
                onSubmitEditing={() => { this.validateCode();}}
                // errorStyle={styles.errorMessageStyle}
                // inputContainerStyle={styles.inputContainerStyle}
                />
              </View>
              <Text style={{...styles.modalHeader, height: !this.state.statusMessage ? 0: '25%'}}>{this.state.statusMessage}</Text>              
              <View style={styles.textInputContainerStyle/*flexDirection: "row" , alignItems: "center", alignContent: "center"}*/}>
                <View style={{ padding:10 , maxWidth: 150 , flex: 0.5}}>
                  <Button
                    title="Verify"
                    onPress = {()=>this.onPressVerify()}
                    color="yellow"
                    // size={15}
                    type="solid"
                  />
                </View>
                <View style={{ maxWidth: 150 , flex: 0.5}}>
                  <Button
                    title="Resend Link"
                    onPress = {()=>this.onPressResendLink()}
                    color="yellow"
                    // size={15}
                    type="clear"
                  />
                </View>
              </View>

            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = {
  modalHeader: {
    textAlign: "center",
    color: "#FFA428",
    fontSize: 15,
    padding: 20
  },
  headerContainerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0
  },
  headerInnerContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.WHITE
  },
  textInputStyle: {
    marginLeft: 10,
  },
  iconContainer: {
    paddingTop: 8
  },
  gapView: {
    height: 40,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 40
  },
  registerButton: {
    backgroundColor: colors.SKY,
    width: 180,
    height: 50,
    borderColor: colors.TRANSPARENT,
    borderWidth: 0,
    marginTop: 30,
    borderRadius: 15,
  },
  buttonTitle: {
    fontSize: 20
  },
  inputTextStyle: {
    color: colors.WHITE,
    fontSize: 16,
    marginLeft: 0,
    height: 32
  },
  errorMessageStyle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 0
  },
  containerStyle: {
    flexDirection: 'column',
    marginTop: 20
  },
  form: {
    flex: 1,
  },
  logo: {
    width: '100%',
    justifyContent: "flex-start",
    marginTop: 80,
    alignItems: 'center',
  },
  // scrollViewStyle:{
  //     height: height
  // },
  textInputContainerStyle: {
    flexDirection: 'row',
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    padding: 15,

  },
  headerStyle: {
    fontSize: 20,
    color: colors.WHITE,
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: 0
  },
}
