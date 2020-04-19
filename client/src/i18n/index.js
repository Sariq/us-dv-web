import i18n from 'i18next';

import { initReactI18next } from 'react-i18next';

import resources from './strings';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: "en",
        debug: true,
        returnObjects:true,


    });

const addResource = (resources)=>{
    i18n.addResourceBundle("en",resources,true,true);
};

export {addResource};
export default i18n;