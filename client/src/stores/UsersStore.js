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
    deleteApplicationById (userId){
      return fetch(ConfigStore.configData.domain + 'api/users/deleteApplicationById/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "userId": userId
        }),
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson){
          console.log(responseJson)
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
    @observable deletingUser = false;

    selectedUser
    @action getUsersList () {
        this.loadingUsersList = true;
        return apis.getUsersList().then((data)=>{
            this.usersList=data;
        }).finally(()=>this.loadingUsersList = false);
    };
    // @computed filteredUsersList(){
    //   // return this.usersList.filter((users){
    //   //   users
    //   // })
    // }
    @action getUserById (userId) {
        this.loadingUser = true;
        return apis.getUserById(userId).then((data)=>{
            registrationStore.applicationData = data.user.userData.applicationData ? data.user.userData.applicationData : registrationStore.emptyApplicationData();
        }).finally(()=>this.loadingUser = false);
    };
    @action deleteApplicationById (userId) {
      this.deletingUser = true;
      return apis.deleteApplicationById(userId).then((data)=>{
          action(this.getUsersList());
      }).finally(()=>this.deletingUser = false);
  };
    
    
}
export default new UsersStore();