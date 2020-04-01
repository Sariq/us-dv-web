import { observable, action, computed} from "mobx";
import ConfigStore from "./configStore"
import AuthStore from "./AuthStore"
import registrationStore from "./registrationStore"

const apis = {
    getUsersList (){
        return fetch(ConfigStore.configData.domain + 'api/users/users-page/'+ 1 + '?search=', {
            method: 'GET',
            
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.user){
              console.log(responseJson)
            }else{
             
            }        
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
    },
    getUserById (userId){
        return fetch(ConfigStore.configData.domain + 'api/users/getUserById/'+ userId, {
            method: 'GET',
          })
          .then((response) => response.json())
          .then((responseJson) => {
            if(responseJson.user){
              console.log(responseJson)
            }else{
             
            }        
            return responseJson;
          })
          .catch((error) => {
            console.error(error);
          });
    }
}


class UsersStore {
    @observable usersList= null;
    @observable loadingUser = false;
    @observable loadingUsersList = false;
    @observable selectedUser = null;

    selectedUser
    @action getUsersList () {
        this.loadingUsersList = true;
        return apis.getUsersList().then((data)=>{
            this.usersList=data;
        }).finally(()=>this.loadingUsersList = false);
    };
    @action getUserById (userId) {
        this.loadingUser = true;
        return apis.getUserById(userId).then((data)=>{
            registrationStore.applicationData=data.user.userData.applicationData;
        }).finally(()=>this.loadingUser = false);
    };
    
}
export default new UsersStore();