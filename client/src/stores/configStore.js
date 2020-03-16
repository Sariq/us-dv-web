import { observable} from "mobx";

class ConfigStore {
    @observable configData={
        domain : 'http://localhost:8000/'
    };
}
export default new ConfigStore();