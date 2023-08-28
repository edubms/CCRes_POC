import Api from "../api/api";

const buyResourcesUseCase = async(resourceID) => {

    const response = await Api.post('/resources/buy', {resourceID});
    console.log(response);

}
export default buyResourcesUseCase