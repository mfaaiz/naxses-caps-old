
import Util from '../util';

module.exports = class BaseApi {
  constructor(){
    this.METHODS = {
      POST:"POST",
      GET:"GET",
      DELETE:"DELETE",
      PUT:"PUT"
    }

    this.isMock = false;
    this.mobileAccessToken = "123456" // TODO: LATER GET IT FROM APP SERVER
    this.companyId = "7" // TODO: LATER GET IT FROM APP SERVER
    
    if(this.isMock){
      this.baseUrl = "http://192.168.8.106:5055";
    }else{
      this.baseUrl = "http://62.31.58.23:3300";
    }

    this.notificationServerBaseUrl = "http://62.31.58.23:5000/services/";

    this.baseApiUrl = `${this.baseUrl}/api/` // TODO: LATER GET IT FROM APP SERVER
    this.baseServicesUrl = `${this.baseUrl}/services/`;
  }

  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }

  async makeCall(_requestData={method:null,postData:null,additionalUrl:null , isNotificationCall:false, isServiceCall:false}){

    let requestData = Util.jsonCopy(_requestData);
    if(!requestData.additionalUrl){
      throw new Error("makeCall >> Additional Url unspecified");
    }

    let headers = {
      Accept: 'application/json',
    'Content-Type': 'application/json',
    'Bearer-Token': this.mobileAccessToken,
    'companyId' : this.companyId
    }

    if(!requestData.method){
      requestData.method = "GET";
    }

    let reqObj = {
      method:requestData.method,
      headers: headers,
    }

    if(!!requestData.postData){
      reqObj.body = JSON.stringify(requestData.postData)
    }

    // console.log("payload sending", reqObj);
    let _url = !!_requestData.isServiceCall ? this.baseServicesUrl : this.baseApiUrl;
    _url = !!_requestData.isNotificationCall ? this.notificationServerBaseUrl : _url;

    return fetch(`${_url}${requestData.additionalUrl}`,reqObj)
    .then(response => {
      let jsonResp = response.json();
      console.log("Api response: ", jsonResp);
      return Promise.resolve(jsonResp);
    }).catch(
      err => {
        return Promise.resolve({
          status:false,
          message:err.message
        });
      }
    );
  }

  getSmsUrlAndPort(){
    return {
      url:`http://192.168.1.13:3966/WebService1.asmx`,
      port:"COM8"
    }
  }
}