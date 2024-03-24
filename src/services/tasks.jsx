import AxiosService from "./axios";

export default class TaskService {
    axiosService = AxiosService
    url = "/api/v1/tasks/"

    async getAllPageTask(pageId, withJoins = false){
        const config = {
            params: {sheet_id: pageId, with_joins: withJoins}
        }

        const {data} = await this.axiosService.get(this.url, config)

        return data
    }

    async getAllUserTask(withJoins = false){
        const config = {
            params: {with_joins: withJoins}
        }

        const {data} = await this.axiosService.get(this.url, config)

        return data
    }

    async updateStatus(task_id, new_status_id){
        const url = `${this.url}${task_id}/`
        const data = {status_id: new_status_id}

        await this.axiosService.patch(url, data)
    }

    async createTask(data){
        return this.axiosService.post(this.url, data)
    }
}