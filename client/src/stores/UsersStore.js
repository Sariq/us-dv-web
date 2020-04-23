import { observable, action, computed} from "mobx";
import ConfigStore from "./configStore"
import AuthStore from "./AuthStore"
import registrationStore from "./registrationStore"
import { act } from "@testing-library/react";

const apis = {
    // getUsersList (currentPage, rowsPerPage, seacrh,filterData){
    //     let seacrhVal = seacrh || "";
    //     return fetch(ConfigStore.configData.domain + 'api/users/users-page/'+ currentPage +'/' +rowsPerPage+ '?search=' + seacrhVal, {
    //         method: 'GET',
            
    //       })
    //       .then((response) => response.json())
    //       .then((responseJson) => {
    //         if(responseJson.user){
    //           console.log(responseJson)
    //         }else{
             
    //         }        
    //         return responseJson;
    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    // },
    getUsersList (currentPage, rowsPerPage, seacrh,filterData){
      let seacrhVal = seacrh || "";
      let data = {
        page: currentPage,
        rowsPerPage: rowsPerPage,
        search: seacrhVal,
        filterData : filterData
      }
      return fetch(ConfigStore.configData.domain + 'api/users/users-page/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "data": data
        }),
          
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
  },
  updateLeadStatusById(userId, status){
    return fetch(ConfigStore.configData.domain + 'api/users/updateLeadStatusById/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "userId": userId,
        "status": status
      }),
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
    @action getUsersList (currentPage, rowsPerPage, seacrh,filterData) {
        this.loadingUsersList = true;
        return apis.getUsersList(currentPage, rowsPerPage, seacrh,filterData).then((data)=>{
          console.log(data)
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
          //AuthStore.setUserDataLocal(data);
          //data.user.userData = data.user;
            console.log("getUserByIdStore")
          action(AuthStore.authData.user.userData.applicationData = data.user.applicationData ? (data.user.applicationData) : registrationStore.emptyApplicationData());
            
        }).finally(()=>this.loadingUser = false);
    };
    @action deleteApplicationById (userId) {
      this.deletingUser = true;
      return apis.deleteApplicationById(userId).then((data)=>{
          action(this.getUsersList());
      }).finally(()=>this.deletingUser = false);
  };
    @action handleLeadStatusChange(status, userId){
      this.updateUser = true;
      return apis.updateLeadStatusById(userId, status).then((data)=>{
          action(this.getUsersList(this.usersList.currentPage, 10));
      }).finally(()=>this.deletingUser = false);
    }
    
}
export default new UsersStore();