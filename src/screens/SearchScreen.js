import React, { Component } from 'react';
import {SearchBar} from 'react-native-elements';
// import * as Location from 'expo-location';
// import {Permissions} from 'expo';
import { Icon, Platform, StatusBar,StyleSheet,Text, TouchableOpacity, View , FlatList} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { colors } from '../common/theme';
import {addressHelper} from '../communicator';

export default class SearchScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            query:'',
            suggestions:[],
            location:null,
        }
    }

    // _getLocationAsync = async () => {
    //     let { status } = await Permissions.askAsync(Permissions.LOCATION);
    //     if (status !== 'granted') {
    //         alert('Permission to access location was denied');
    //         return;
    //     };
    
    //     let location = await Location.getCurrentPositionAsync({});
    //     this.setState({ location });
    //     alert(JSON.stringify(this.state.location));
    //   };

    updateSearch = async (query) => {
        this.setState({ query });
      };

    componentDidUpdate = async (prevProps , prevState , snapShot)=>{
        if(prevState.query != this.state.query && this.state.query.length >=4){
            let suggestionResp = await addressHelper.getSuggestions(this.state.query);
            // alert(JSON.stringify(suggestionResp));
            if(!suggestionResp.status){
                alert(suggestionResp.message);
            //     this.setState({ query });
            }else{
                this.setState({suggestions: suggestionResp.addresses});
                // alert(this.state.suggestions.length);
            }
        }
    }  

    componentWillMount() {
        let from = this.props.navigation.getParam('from');
        let whereText = this.props.navigation.getParam('whereText');
        let dropText = this.props.navigation.getParam('dropText');
        let whereCoordinates = this.props.navigation.getParam('whereCoordinates');
        let dropTextCoordinates = this.props.navigation.getParam('dropTextCoordinates');
        this.setState({
            from: from,
            whereText: whereText,
            dropText: dropText,
            whereCoordinates: whereCoordinates,
            dropTextCoordinates: dropTextCoordinates
        })
    }

    goMap(data,details,from) {
        if(from=="where") {
            let searchObj = {
                searchData: data, 
                searchDetails: details, 
                searchFrom: from,
                whereText: details.formatted_address,
                dropText: this.state.dropText,
                dropTextCoordinates: this.state.dropTextCoordinates
            }
            this.props.navigation.replace('Map',{ searchObj: searchObj });           
        }
        else if(from=='drop') {
            let searchObj = {
                searchData: data, 
                searchDetails: details, 
                searchFrom: from,
                whereText: this.state.whereText,
                whereCoordinates: this.state.whereCoordinates,
                dropText: details.formatted_address
            }
            this.props.navigation.replace('Map',{ searchObj: searchObj });
        }
    }

    _onAddressItemPress =async (addrText) => {
        let addressCoordinatesResp = await addressHelper.getCoordinatesForAddress(addrText);
        // alert(JSON.stringify(addressCoordinatesResp));
        this.goMap(null,{
            formatted_address: addrText,
            geometry:{
                location:{
                    lat: addressCoordinatesResp.latitude,
                    lng: addressCoordinatesResp.longitude
                }
            }
        },this.state.from);
        // this.setState({selectedAddress: addrText});
    }

    _renderFlatListItem = ({item}) =>{
        // alert(item.id);
        return(<View style={styles.selectTextContainer}>
            <TouchableOpacity onPress={() => {this._onAddressItemPress(item.address)}}>
                <Text style={styles.selectTextStyle}>
                    {item.address}
                </Text>
            </TouchableOpacity>
        </View>);
    }
    render() {
        const { query, suggestions } = this.state;
    return (
        <View style={styles.containerView}>
            <SearchBar
              placeholder="Type Here..."
              onChangeText={(val)=>{this.updateSearch(val)}}
              value={query}
            />
            {/* <TouchableOpacity onPress={this._getLocationAsync}>
                <View>
                    <Text style={styles.textStyle}>{`Use My Location...`}</Text>
                </View>
            </TouchableOpacity> */}
                <FlatList
                  data={suggestions}
                  keyExtractor={(item, index) => item.id.toString()}
                  renderItem={this._renderFlatListItem} 
                  />
        </View>
    );
    }
}

const styles = StyleSheet.create({
    containerView: { flex: 1, marginTop: StatusBar.currentHeight },
    textIconStyle:{
        flex: 1, 
        justifyContent: 'center', 
        alignItems:'center', 
        flexDirection: 'row'
       },
       textStyle:{
        // flex:9, 
        fontFamily: 'Roboto-Regular', 
        fontSize: 18, 
        fontWeight: '900', 
        color: colors.GREY.background,
        padding:4
       },
       selectTextStyle:{
        fontFamily: 'Roboto-Regular', 
        fontSize: 12, 
        fontWeight: '900', 
        color: colors.YELLOW.cab,
        textAlign:'auto',
       },
       selectTextContainer:{
        padding:10,
        borderColor: colors.GREY.pale,
        borderWidth:0.5
       },
    textContainer: { textAlign: "center" },
  });
