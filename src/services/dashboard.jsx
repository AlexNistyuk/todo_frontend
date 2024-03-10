import randomColor from "randomcolor";
import TaskService from "./tasks";
import StatusService from "./statuses";
import PageService from "./pages";


// [
//     {id: 1, color: 'rgb(3,102,251)', name: 'Todo', tasks: get_tasks(1)},
//     {id: 2, color: 'rgb(255,230,1)', name: 'In progress', tasks: get_tasks(2)},
//     {id: 3, color: 'rgb(9,251,62)', name: 'In review', tasks: get_tasks(3)},
//     {id: 4, color: 'rgb(0,255,255)', name: 'Done', tasks: get_tasks(4)},
// ]



export default class DashboardService {

    constructor() {
        this.pageService = new PageService()
        this.taskService = new TaskService()
        this.statusService = new StatusService()
    }

    async getByPageId(pageId, selector){
        if (!selector.options){
            const userPages = await this.pageService.getAllUserPage()
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