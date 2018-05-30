import Utils from './utils';
export default class OnLoads {
    static default(element){
        console.log("entro en onload");
    }
    static subscriptionsLoaded(element){
        Utils.triggerEvent("subscriptionsTplLoaded",{})
    }
    static modalsLoaded(element){
        Utils.triggerEvent("modalsTplLoaded",{})
    }
}