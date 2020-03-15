const BaseApi = require('./base_api_helper');

export default class AddressHelper extends BaseApi {
  constructor() {
    super();
    this.URLS = {
      GET_ADDRESS_BY_KEYWORD: `addresses/keyword/<KEYWORD>`,
      GET_COORDINATES: `maps/address/coordinates/<ADDRESS>`
    }
  }

  async getSuggestions(keyword = "") {
    let addressesResp = {
      status: true,
      addresses: []
    }

    if(!keyword){
        return addressesResp;
    }

    let resp = await this.makeCall({
      method: "GET",
      postData: null,
      additionalUrl: this.URLS.GET_ADDRESS_BY_KEYWORD.replace(/<KEYWORD>/g , keyword.toString().toUpperCase())
    });

    addressesResp.status = resp.status;
    addressesResp.message = !!resp.status ? `SUCCESSFUL` : (!!resp.message ? resp.message : "Error In Getting Address. Contact Support.");

    addressesResp.addresses = resp.address;
    // alert(addressesResp.addresses.length);
    return addressesResp;
  }

  async getCoordinatesForAddress(address){
    let resp = {
      status: false,
      longitude:'',
      latitude:'',
      message: ''
    }

    let apiResp = await this.makeCall({
      method: "GET",
      isServiceCall: true,
      postData: null,
      additionalUrl: this.URLS.GET_COORDINATES.replace(/<ADDRESS>/g , address)
    });

    resp.status = apiResp.status;
    resp.message = apiResp.status ? "SUCCESSFUL" : "ERROR OCCURED";
    resp.longitude = apiResp.current_location_long;
    resp.latitude = apiResp.current_location_lat;

    return resp;
  }
}