import React from 'react';
import { StyleSheet,View,} from 'react-native';
import { DiverReg } from '../components';

export default class DriverRegistrationPage extends React.Component {
    constructor(props){
        super(props);
    }

  //register button click after all validation
  async clickRegister(fname, lname, mobile, email, password, image) {
    // do something with those parameters
    this.props.navigation.navigate('Login')
  }

  render() {
    return (
        <View style={styles.containerView}>
            <DiverReg complexity={'any'} 
            onPressRegister={(fname, lname, mobile, email, password, image)=>this.clickRegister(fname, lname, mobile, email, password, image)} 
            onPressBack={()=>{this.props.navigation.goBack()}}>
            </DiverReg>
        </View>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
    containerView:{ flex:1 },
    textContainer:{textAlign:"center"},
   
});