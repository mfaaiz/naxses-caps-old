import React from 'react';
import { StyleSheet,
    View,
    Text,
    FlatList,
    StatusBar,
    TouchableWithoutFeedback,
    Platform
} from 'react-native';
import {Divider,Button, Header} from 'react-native-elements';
import StarRating from 'react-native-star-rating';
import { colors } from '../common/theme';

export default class DriverTripComplete extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            starCount: 3.5,
            title: 'John Dasgupta',
            
        }
    }

    //rating
    onStarRatingPress(rating) {
        this.setState({
          starCount: rating
        });
    }
      

    render(){
        return(
            <View style={styles.mainViewStyle}>
                <Header 
                    backgroundColor={colors.GREY.default}
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.WHITE, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                    centerComponent={<Text style={styles.headerTitleStyle}>On Trip</Text>}
                    outerContainerStyles={styles.headerStyle}
                    innerContainerStyles={styles.headerInnerStyle}
                />
                <View style={styles.dateViewStyle}>
                        <Text style={styles.dateViewTextStyle}>3rd sept 2018, 2:46pm</Text>
                </View>

                <View style={styles.rateViewStyle}>
                    <Text style={styles.rateViewTextStyle}>$199</Text>
                </View>

                <View style={styles.addressViewStyle}>
                    <FlatList
                        data={[
                            {key: 'South Bankimpally, Madhyamgram Kolkata, West Bengal 700129', type: 'pickup'},
                            {key: 'South Bankimpally, Madhyamgram Kolkata, West Bengal 700129 ', type: 'drop'}
                        ]}
                        renderItem={({item}) => 
                            <View style={styles.pickUpStyle}>
                            {item.type == "pickup" ? 
                                <View style={styles.greenDot}></View>
                                :<View style={styles.redDot}></View>
                            }
                                <Text style={styles.addressViewTextStyle}>{item.key}</Text>
                            </View>
                        }
                    />
                </View>
                <View style={styles.tripMainView}>
                    <View style={styles.tripSummaryStyle}>
                        
                        <Divider style={[styles.divider, styles.summaryStyle]} />
                        <Text style={styles.summaryText}>  TRIP SUMMARY  </Text>
                        <Divider style={[styles.divider,styles.dividerStyle]} />
                    </View>
                    <View style={styles.ratingViewStyle}>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            starSize={40}
                            fullStar={'ios-star'}
                            halfStar={'ios-star-half'}
                            emptyStar={'ios-star-outline'}
                            iconSet={'Ionicons'}
                            fullStarColor={colors.BLUE.light}
                            emptyStarColor={colors.BLUE.light}
                            halfStarColor={colors.BLUE.light}
                            rating={this.state.starCount}
                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                            buttonStyle={{padding:20}}
                            containerStyle={styles.contStyle}
                        />
                    </View>
                </View>
                <View style={styles.confBtnStyle}>
                <Button 
                    title='DONE'
                    titleStyle={{fontFamily: 'Roboto-Bold',}}
                    onPress={() => {
                        this.props.navigation.navigate('DriverTripAccept')
                    }}
                    buttonStyle={styles.myButtonStyle}
                    />
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    headerStyle: { 
        backgroundColor: colors.GREY.default, 
        borderBottomWidth: 0 
    },
    headerInnerStyle: {
        marginLeft:10,
        marginRight: 10
    },
    headerTitleStyle: { 
        color: colors.WHITE,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    dateViewStyle: {        
        justifyContent:"center", 
        flex:1,
        marginTop: 20
    },
    dateViewTextStyle: {
        fontFamily: 'Roboto-Regular',
        color: colors.GREY.btnPrimary, 
        fontSize: 26,
        textAlign:"center"
    },
    rateViewStyle: {
        alignItems: 'center',
        flex:3
    },
    rateViewTextStyle: {
        fontSize: 60,
        color: colors.BLACK,
        fontFamily: 'Roboto-Bold',
        fontWeight: 'bold',
        textAlign:"center"
    },
    addressViewStyle: {
        flex:4,
        flexDirection: 'row',
        paddingTop: 22,
        paddingLeft: 10,
        paddingRight: 10
    },
    addressViewTextStyle: {
        color: colors.GREY.secondary,
        fontSize: 19,
        fontFamily: 'Roboto-Regular',
        marginLeft:15, 
        marginRight:15,
        marginTop: 15, 
        lineHeight: 24
    },
    greenDot: {
        backgroundColor: colors.GREEN.default,
        width: 12,
        height: 12,
        borderRadius: 50
    },
    redDot: {
        backgroundColor: colors.RED,
        width: 12,
        height: 12,
        borderRadius: 50
    },
    divider:{
        backgroundColor: colors.BLACK, 
        width:'20%',
        height: 1,
        top:'3.7%'
    },
    summaryText: {
        color: colors.GREY.btnPrimary,
        fontSize: 22,
        textAlign:"center",
        fontFamily: 'Roboto-Regular',
    },
    mainViewStyle:{
        flex: 1, 
        backgroundColor: colors.WHITE, 
        flexDirection: 'column', 
        marginTop: StatusBar.currentHeight
    },
    pickUpStyle:{
        flexDirection: 'row', 
        alignItems: 'center'
    },
    tripMainView:{
        flex:3,
        flexDirection:"column", 
        justifyContent:"center"
    },
    ratingViewStyle:{
        flex:2,
        flexDirection:"row", 
        justifyContent:"center"
    },
    tripSummaryStyle:{
        flex:1, 
        flexDirection:"row", 
        justifyContent:'center'
    },
    confBtnStyle:{
        flex:5, 
        justifyContent:"flex-end",
        marginBottom:'5%', 
        alignItems: 'center'
    },
    myButtonStyle:{
        backgroundColor: colors.GREEN.default,
        width: 300,
        padding: 10,
        borderColor: colors.TRANSPARENT,
        borderWidth: 0,
        borderRadius: 10
    },
    contStyle:{
        marginTop: 0, 
        paddingBottom: Platform.OS=='android'?5:0
    },summaryStyle:{
        justifyContent:"flex-end" 
    },
    dividerStyle:{
        justifyContent:"flex-start" 
    }
});