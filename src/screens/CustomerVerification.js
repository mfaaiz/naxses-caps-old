import React, { Component } from 'react';
import {View, 
    Text, 
    Dimensions, 
    ScrollView,
    TextInput,
    StatusBar,
    KeyboardAvoidingView, 
    Image, 
    TouchableWithoutFeedback, 
    LayoutAnimation, 
    Platform, 
    TouchableOpacity} 
from 'react-native';
import Background from '../components/Background' ;
import {colors} from '../common/theme';
import { Icon, Button, Header, Input } from 'react-native-elements';

var { height } = Dimensions.get('window');

export default class CustomerVerification extends Component{
    constructor(props){
        super(props);
        this.state={
            timer: 1,
            counter:0,
            ButtonStateHolder : false,
            image: null,
        }
    }

    componentDidMount() {
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
      }
    
    componentWillUnmount() {
        clearInterval(this.state.timer);
      }

    unsetTimer(){
        clearInterval(this.state.timer);
        this.state.ButtonStateHolder = true
    }
    
    tick =() => {
        this.setState({
          counter: this.state.counter + 1,
        });
        if(this.state.counter>=30) //30 sec
        {
            this.unsetTimer();  
        }
      }

    render(){
        const { onPressBack }=this.props;
        //let { image } = this.state;
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
                        <Image source={require('../../assets/images/logo.png')}/>
                    </View>
                    <TextInput  
                      placeholder="Enter Your Verification Code"  
                      underlineColorAndroid='transparent'  
                      style={styles.TextInputStyle} 
                      keyboardType={'numeric'} 
                    />
                <View style={styles.buttonContainer}>
                    <Button
                    disabled={this.state.ButtonStateHolder}
                    onPress={()=>{this.onPressRegister()}}
                    title="Resend Code"
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.registerButton}
                    />
                </View>
                
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={styles.text} >
                         {this.state.counter} 
                    </Text>
                </View> 
                </ScrollView>
            </Background>

        );
    }
}

const styles={
    inputContainer: {
        flex:1, 
        width:'90%',
        alignItems: 'flex-end',
        elevation: 20,
        justifyContent: 'flex-end',
        shadowColor: colors.BLACK, 
        shadowRadius: 10, 
        shadowOpacity: 0.6, 
        shadowOffset: {width: 0, height: 4}
    },
    text:{
        color:colors.WHITE,
        fontSize:20,
        marginTop:15,
        marginLeft:200,
        height:32,
    },
    headerContainerStyle: { 
        backgroundColor: colors.TRANSPARENT, 
        borderBottomWidth: 0,
        marginTop: StatusBar.currentHeight
    },
    headerInnerContainer: {
        marginLeft:10, 
        marginRight: 10
    },
    registerButton: {
        backgroundColor: colors.SKY,
        width: 180,
        height: 50,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        marginTop:30,
        borderRadius:15,
        alignItems:'center', 
    },
    buttonContainer: { 
        flexDirection:'row',
        justifyContent:'center',
        borderRadius:40,
        width:200,
        marginLeft:100,
    },
    buttonTitle: { 
        fontSize:20 
    },
    
    TextInputStyle: {  
        //justifyContent:'center',
        backgroundColor: colors.WHITE,
        marginTop: 50,
        marginLeft:70,
        textAlign: 'center',  
        height: 40,
        width:250,  
        borderRadius: 10,  
        borderWidth: 2,  
        borderColor: '#050505',  
        marginBottom: 10  
    } ,
    logo:{
        width:'100%',
        justifyContent:"flex-start",
        marginTop: 80,
        alignItems:'center', 
    },
    scrollViewStyle:{
        height: height
    }
}