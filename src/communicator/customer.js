const BaseApi = require('./base_api_helper');

export default class Customer extends BaseApi {
  constructor() {
    super();
    this.URLS = {
      SIGN_UP: 'customer/signup',
      VERIFY_MOBILE_NO: 'customer/confirmation',
      SIGN_IN : `customer/signin`,
      UPDATE_INFO: `customer?email=<EMAIL>`,
      NOTIFY_VERIFICATION_CODE: `notifications/sms`
    }
  }

  async verifyNumber(verificationData = {}) {
    let signUpStatus = {
      status: false,
      message: '' 
    }

    if (!verificationData.mobile || !verificationData.code){
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

    if(signUpStatus.status){
      let notifResp = await this.makeCall({
        method:"POST",
        isNotificationCall : true,
        postData:{
          "sms_url": this.getSmsUrlAndPort().url,
          "phone":customerData.mobile,
          "sms_text":`Your verification code is ${resp.customers.verification_code}...`,
          "port":this.getSmsUrlAndPort().port
        }
      });

      console.log("notifResp" , notifResp);
      //fallback mechanism in case sms failed. delete the customer.
    }

    signUpStatus.message = !!resp.status ? `A verification code has been sent to ${customerData.mobile}` : `error`;

    return signUpStatus;
  }

  async getRandomPassword(email){
    let passwordStatus = {
      status: false,
      message: ""
    }

    let resp = await this.makeCall({
      method: "PUT",
      postData:{
        password:"123456",
      },
      additionalUrl: this.URLS.UPDATE_INFO.replace(`<EMAIL>`,email)
    });

    passwordStatus.status = resp.status;
    if(resp.status==true){
      passwordStatus.message = "A new password has been sent via SMS over your number. Please use it to login";
    }else{
      passwordStatus.message = "Something went wrong, please try again shortly."
    }

    let notifResp = await this.makeCall({
      method:"POST",
      isNotificationCall : true,
      postData:{
        "sms_url": this.getSmsUrlAndPort().url,
        "phone":resp.customers.contact_no,
        "sms_text":`Your new password is ${"123456"}`,
        "port":this.getSmsUrlAndPort().port
      }
    });

    return passwordStatus
  }

  async signIn(customerData){
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
    if(resp.status){
      signInStatus.customerData = {
        id: resp.customer.id,
        email: resp.customer.email
      }
    }
    signInStatus.message = !!resp.status ? `successfully logged in ${customerData.email}` : `${!!resp.message ? resp.message : resp.error_code}`;

    return signInStatus;
  }
}