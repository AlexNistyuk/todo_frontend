import randomColor from "randomcolor";
import TaskService from "./tasks";
import StatusService from "./statuses";
import PageService from "./pages";


export default class DashboardService {

    constructor() {
        this.pageService = new PageService()
        this.taskService = new TaskService()
        this.statusService = new StatusService()
    }

    async getByPageId(pageId, selector){
        if (!selector.options){
            const userPages = await this.pageService.getAllUserPage()
            if (userPages.length === 0){
                return null;
            }

            let newOptions = []

            if (!pageId){
                pageId = userPages[0].id
            }

            userPages.forEach((page) => {
                const data = {
                    label: page.name,
                    value: page.id,
                }
                newOptions.push(data)

                if (page.id === Number(pageId)) {
                    selector.setDefaultValue(data)
                }
            })

            selector.setOptions(newOptions)
        }

        const statuses = await this.statusService.getAllPageStatus(pageId)
        const tasks = await this.taskService.getAllPageTask(pageId)

        let tasks_match = {}
        statuses.forEach( (status) => {
            tasks_match[status.id] = []
        })
        tasks.forEach( (task) => {
            tasks_match[task.status_id].push(task)
        })

        statuses.forEach( (status) => {
            status["tasks"] = tasks_match[status.id]
            status["color"] = randomColor()
        })

        return {
            dashboard: statuses,
            pageId: pageId,
        }
    }
}