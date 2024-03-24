import AxiosService from "./axios";

export default class PageService {
    axiosService = AxiosService
    pageUrl = "/api/v1/sheets/"

    async getAllUserPage(withCount=false){
        const {data} = await this.axiosService.get(this.pageUrl, {params: {with_count: withCount}})

        return data
    }

    async createPage(values){
        return await this.axiosService.post(this.pageUrl, values)
    }

    async deletePage(pageId){
        return await this.axiosService.delete(`${this.pageUrl}${pageId}/`)
    }
}