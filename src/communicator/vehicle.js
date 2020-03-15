const BaseApi = require('./base_api_helper');

export default class Vehicle extends BaseApi {
  constructor() {
    super();
    this.URLS = {
      GET_VEHICLE_TYPES: `vehicles/type`,
    }
  }

  async getVehicleTypes() {
    let vehicleTypesResp = {
      status: false,
      message: '',
      vehicleTypes: []
    };

    let resp = await this.makeCall({
      additionalUrl: this.URLS.GET_VEHICLE_TYPES
    });

    if(resp.status){
      vehicleTypesResp.status = true;
      vehicleTypesResp.vehicleTypes = resp.vehicle_types;
    }else{
      vehicleTypesResp.message = !!vehicleTypesResp.message ? vehicleTypesResp.message : 'ERROR IN GETTING VEHICLE TYPES';
    }

    return vehicleTypesResp;

  }

  async verifyNumber(verificationData = {}) {
    let signUpStatus = {
      status: false,
      message: ''
    }

    if (!verificationData.mobile || !verificationData.code) {
      signUpStatus.message = `mobile or verification code is missing`;
      return signUpStatus;
    }

    let resp = await this.makeCall({
      method: "POST",
      postData: {
        "verification_code": verificationData.code,
        "contact_no": verificationData.mobile
      },
      additionalUrl: this.URLS.VERIFY_MOBILE_NO
    });

    signUpStatus.status = resp.status;
    signUpStatus.message = !!resp.status ? `SUCCESSFUL` : `Invalid Code`;

    return signUpStatus;
  }

  async signUp(customerData) {
    let signUpStatus = {
      status: false,
      message: ''
    }

    let resp = await this.makeCall({
      method: "POST",
      postData: {
        email: customerData.email,
        password: customerData.password,
        firstname: customerData.fname,
        lastname: customerData.lname,
        contact_no: customerData.mobile
      },
      additionalUrl: this.URLS.SIGN_UP
    });

    signUpStatus.status = resp.status;
    signUpStatus.message = !!resp.status ? `A verification code has been sent to ${customerData.mobile}` : `error`;

    return signUpStatus;
  }

  async signIn(customerData) {
    let signInStatus = {
      status: false,
      message: ''
    }

    let resp = await this.makeCall({
      method: "POST",
      postData: {
        email: customerData.email,
        password: customerData.password,
      },
      additionalUrl: this.URLS.SIGN_IN
    });

    signInStatus.status = resp.status;
    if (resp.status) {
      signInStatus.customerData = {
        id: resp.customer.id,
        email: resp.customer.email
      }
    }
    signInStatus.message = !!resp.status ? `successfully logged in ${customerData.email}` : `${resp.message}`;

    return signInStatus;
  }
}