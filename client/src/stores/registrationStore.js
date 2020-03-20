import { observable, action, computed} from "mobx";
import ConfigStore from "./configStore"
import AuthStore from "./AuthStore"

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

    @observable applicationData= new applicationData();
    @observable registerInProgress=false;
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
    @action handleDataChange(attr, value, obj) {
        this.applicationData[obj][attr] = value;
    }
    @action initApplicationData(){
        this.applicationData = AuthStore.authData.user.userData.applicationData;
        this.isLoadingApplicationData = false;

    }
}
//export default registrationStore;
export default new registrationStore();