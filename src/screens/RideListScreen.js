import React from 'react';
import { RideList } from '../components';
import { 
    StyleSheet,
    View,
    Text,
    StatusBar,
    TouchableWithoutFeedback
  } from 'react-native';
import { Header } from 'react-native-elements';
import { colors } from '../common/theme';

export default class RideListPage extends React.Component {
    constructor(props){
        super(props);
    }

//go to ride details page
  goDetails(){
    this.props.navigation.push('RideDetails');
  }

  render() {
    return (
        <View style={styles.mainView}>
            <Header 
                backgroundColor={colors.GREY.default}
                leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                centerComponent={<Text style={styles.headerTitleStyle}>My Rides</Text>}
                rightComponent={{icon:'ios-notifications', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.navigate('Notifications');} }}
                outerContainerStyles={styles.headerStyle}
                innerContainerStyles={{marginLeft:10, marginRight: 10}}
            />
            <RideList onPressButton={() => {this.goDetails()}}></RideList>
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
    containerView:{ flex:1 },
    textContainer:{textAlign:"center"},
    mainView:{ 
        flex:1, 
        backgroundColor: colors.WHITE, 
        marginTop: StatusBar.currentHeight 
    } 
});
