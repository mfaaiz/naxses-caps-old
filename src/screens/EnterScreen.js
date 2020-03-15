import React from 'react';
import { 
    StyleSheet,
    View,
    Image,AsyncStorage
  } from 'react-native';
import { Background, Button } from '../components';
import commonStyles from '../common/styles';

export default class EnterScreen extends React.Component {
  constructor(props){
    super(props)
  }

  //on press "Enter As Rider"
  onRiderPress = async () => {
    this.props.navigation.navigate('Login');
  }

  //on press "Enter As Driver"
  onDriverPress = async () => {
    await AsyncStorage.setItem('driver', 'true');
    this.props.navigation.navigate('Intro');
  }
  
  render() {
    return (
      <Background>
        <View style={styles.logo}>
          <Image source={require('../../assets/images/logo.png')} />
        </View>
        <View style={styles.footer}>
          {/* <Button 
            style={commonStyles.buttonBlue} 
            textStyle={commonStyles.buttonText} 
            btnClick={()=>{this.onDriverPress()}}
          >Enter As Driver</Button> */}
          <Button 
            style={commonStyles.buttonYellow}  
            textStyle={commonStyles.buttonText}
            btnClick={()=>{this.onRiderPress()}}
          >Proceed To Login</Button>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
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
});