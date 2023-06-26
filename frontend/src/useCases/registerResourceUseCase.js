import Api from "../api/api";

const registerResourceUseCase = (formValues) => {

    return Api.post("/resources", {
        sellerWallet: formValues.wallet,
        resourceIpAddress: formValues.resourceIP,
        resoureUser: formValues.resourceUser,
        resourcePassword:formValues.resourcePassword,
        resourceSpace:parseInt(formValues.resourceSize),
        resourceValue: parseInt(formValues.resourcePrice),
    })
    
};
export default registerResourceUseCase