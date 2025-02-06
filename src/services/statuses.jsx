import AxiosService from "./axios";

export default class StatusService {
    axiosService = AxiosService
    
    async getAllPageStatus(pageId){
        const url = '/api/v1/statuses/'
        const config = {params: {sheet_id: pageId}}

        const {data} = await this.axiosService.get(url, config)

        return data
    }
}