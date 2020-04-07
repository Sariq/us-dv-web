import { observable, action, computed} from "mobx";
import ConfigStore from "./configStore"
import AuthStore from "./AuthStore"
import { act } from "react-dom/test-utils";

const apis = {
    applyApplication(data) {
        console.log(data);
        return fetch(ConfigStore.configData.domain + 'api/users/applyApplication', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + AuthStore.authData.user.token
            },
            body: JSON.stringify({
              "applicationObj": {
                  "userName":AuthStore.authData.user.userName,
                  "applicationData":data
                }
            }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson){
              console.log(responseJson)
              AuthStore.setUserDataLocal(responseJson);

              //AuthStore.setUserDataLocal(responseJson);
              //AuthStore.login();
            }else{
             
            }        
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    register (data){
        return fetch(ConfigStore.configData.domain + 'api/users/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "user": data
            }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.user){
              console.log(responseJson)
              AuthStore.setUserDataLocal(responseJson);
              //AuthStore.login();
            }else{
             
            }        
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
    }
}
class applicationData{
    applicantInfo={};
    spouseInfo={};
    childrenInfo=[];
    addressContact={};
};
class registrationStore {
    @observable registrationData={
        personalDetails:{},
        paymentData:{}
    };
    @observable isLoadingApplicationData= true;
    @observable errors = {};
    @observable applicationData= new applicationData();
    @observable registerInProgress=false;
    @observable isFormInValid = true;
    @observable spouseInfoActiveTab = 0;
    @observable activeObj = null;

    

    personalDetailsFields = ["firstName","lastName","email","phone","country","day","month","year"];
    applicantInfoFields = ["firstName","lastName","middleName","cityOfBirth","country","gender","day","month","year","nationality","maritalStatus","childrenNumber","education"];
    childrenInfoFields = ["firstName","lastName","middleName","cityOfBirth","country","gender","day","month","year"];
    spouseInfoFields = ["firstName","lastName","middleName","cityOfBirth","country","gender","day","month","year","nationality","maritalStatus","childrenNumber","education"];//["firstName","lastName","middleName","cityOfBirth","country","gender","day","month","year","passportNumber"];
    addressContactFields = ["email","additionalEmail","cityOfBirth","cityOfBirth","street","houseNumber","postalCode","poBox","phone"];
    @action registerUser() {
        this.registerInProgress = true;
        return apis.register(this.registrationData.personalDetails).then((data)=>{
            return data;
        }).finally(()=>this.registerInProgress = false);
    }
    @action sendApplication () {
        this.registerInProgress = true;
        return apis.applyApplication(this.applicationData).then((data)=>{
            return data;
        }).finally(()=>this.registerInProgress = false);
    };
    @action handleApplicantDataChange(attr, value) {
        this.applicationData.applicantInfo[attr] = value;
    }
    @action handleDataChange(attr, value, obj, index) {
      console.log("handleDataChange")

      if(index !== undefined){
        this.applicationData[obj][index][attr] = value;
      }else{
        this.applicationData[obj][attr] = value;
      }
        this.errors[attr] = !value;
      // for (let field of this[obj+"Fields"]) {
      //   if(!this.applicationData[obj][field] || this.errors[field]){
      //     this.isFormInValid = true;
      //     break;
      //   }else{
      //     this.isFormInValid = false;
      //   }
      // }
    }
    @action handleRegisterDataChange(attr, value, obj) {
      this.registrationData[obj][attr] = value;
      this.errors[attr] = !value;
      console.log(obj)
      // for (let field of this[obj+"Fields"]) {
      //   if(!this.registrationData[obj][field] || this.errors[field]){
      //     this.isFormInValid = true;`
      //     break;
      //   }else{
      //     this.isFormInValid = false;
      //   }
      // }
  }

    
    @action initApplicationData(){
        if(AuthStore.authData){
          this.applicationData = AuthStore.authData.user.userData.applicationData;
          this.isLoadingApplicationData = false;
        }
    }
    @action validateInput(inputType, value){
      switch(inputType){
        case "textInput":

      }
    }
    @action emptyApplicationData(){
      return new applicationData();
    }
    @computed get checkFormInValid(){
      console.log("this.activeObj")
      let flag = false;
      if(this.applicationData){
        if(this.activeObj){
      for (let field of this[this.activeObj+"Fields"]) {
        console.log(this.applicationData[this.activeObj][field] )

        if(!this.applicationData[this.activeObj][field] || this.errors[field]){
          console.log("OBSSS")
          flag =  true;
          break;
        }else{
          console.log("OBSSS2")

          flag = false;
        }
      }
    }
  }
    return flag;
  }
}
//export default registrationStore;
export default new registrationStore();