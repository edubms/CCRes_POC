import Api from "../api/api";

const listResourcesUseCase = async () => {
    const response = await Api.get('/resources');
    return response.data
}; 
export default listResourcesUseCase