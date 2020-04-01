import { observable, action, computed} from "mobx";
import ConfigStore from "./configStore";

function arrBuffToString(buff) {
    // just doing a simple
    // String.fromCharCode(null, new Uint8Array(buff))
    // fails when the data is too big
    const arr = new Uint8Array(buff);
    const result = [];
    const step = Math.pow(2, 14);

    for (let i = 0; i < arr.length; i += step) {
        let end = Math.min(i + step, arr.length);
        result.push(String.fromCharCode.apply(null, arr.subarray(i, end)));
    }
    return result.join('');
}

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
    uploadFile(file) {
        return new Promise(function(resolve) {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);
            reader.onload = function(arrBuff) {
                const data = arrBuffToString(arrBuff.target.result);
                const body = {
                    base64_data: btoa(data),
                    size: data.length,
                    name: file.name
                };
                resolve(body);
            };
        })
        //.then(body => ApiCaller.doPost('upload_file', null, body));
    }
 
}
class Apptore {
    @observable authData=null;
    @action uploadMedia (files) {
        const promises = [];
        if (files && files.length) {
            this.uploadingFile = true;
            Array.from(files).forEach(file => {
                const promise = apis.uploadFile(file).then(response => {
                    const url = response.url;
                    return {media_url: url, media_content_type: file.type};
                })
                .catch(err => {
                    return false;
                });
                promises.push(promise);
            });
        }
     
        return Promise.all(promises).then(result => {
            this.uploadingFile = false;
            return result;
        });
     };
     
    
}
export default new Apptore();

