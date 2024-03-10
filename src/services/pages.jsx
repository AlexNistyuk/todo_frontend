import AxiosService from "./axios";

export default class PageService {
    axiosService = AxiosService

    async getAllUserPage(){
        const url = '/api/v1/sheets/'

        const {data} = await this.axiosService.get(url)

        return data
    }
}