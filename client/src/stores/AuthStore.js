import { observable, action, computed} from "mobx";
import ConfigStore from "./configStore"
import registrationStore from "./registrationStore"

const apis = {
    login(data){
      return fetch(ConfigStore.configData.domain + 'api/users/login/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "user": {
            "userName": data.userName,
            "password": data.password
          }
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.user){
          console.log(responseJson.user)
          
        }else{
         
        }        
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
    },
    logOut(data){
        return fetch(ConfigStore.configData.domain + 'api/users/signOut/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + data.token
            },
            body: JSON.stringify({
              "user": data
            }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
          })
          .catch((error) => {
            console.log(error);
          });
    },
    getUserData(data){
        return fetch(ConfigStore.configData.domain + 'api/users/current/', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + data.token

            },
            body: JSON.stringify({
              "user": data
            }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson)
            return responseJson;
          })
          .catch((error) => {
            console.log(error);
          });
    }
}
class AuthStore {
    @observable authData=null;
    @observable loadingUserData = false;
    @action login (data) {
        return apis.login(data).then((data)=>{
            if(data && data.user){
                this.setUserDataLocal(data)};
            });
    };
    @action getUserDataLocal () {
        //this.authData = this.authDataJSON.parse(localStorage.getItem('authData'));
        //const authData = this.authDataJSON.parse(localStorage.getItem('authData'));
        return JSON.parse(localStorage.getItem('authData'))
    };
    @action setUserDataLocal (data) {
        if(!data.user.userData.registrationData){
            data.userData.registrationData = {
                personalDetails:{},
                paymentData:{}
            };
        }
        if(!data.user.userData.applicationData){
            data.user.userData.applicationData = registrationStore.emptyApplicationData();
        }
        localStorage.setItem('authData', JSON.stringify(data));
        this.authData = data;       
    };
    @action initLogin () {
        this.authData = JSON.parse(localStorage.getItem('authData'));
    };
    @action logOut () {
        return apis.logOut(this.authData.user).then(()=>{
            localStorage.setItem('authData',null);
            this.authData = null;
            registrationStore.applicationData =registrationStore.emptyApplicationData();
            registrationStore.registrationData = {
              personalDetails:{},
              paymentData:{}
          };
        });
    }
    @action getUserData(){
        this.loadingUserData = true;
        return apis.getUserData(this.authData.user).then((data)=>{
           this.setUserDataLocal(data);
           this.loadingUserData = false;
        });
    }
}
export default new AuthStore();

