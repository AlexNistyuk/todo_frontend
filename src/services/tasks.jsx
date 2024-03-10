import AxiosService from "./axios";

export default class TaskService {
    axiosService = AxiosService

    async getAllPageTask(pageId){
        const url = '/api/v1/tasks/'
        const config = {params: {sheet_id: pageId}}

        const {data} = await this.axiosService.get(url, config)

        return data
    }

    async updateStatus(task_id, new_status_id){
        const url = `/api/v1/tasks/${task_id}/`
        const data = {status_id: new_status_id}

        await this.axiosService.patch(url, data)
    }
}