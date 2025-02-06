import React, {useEffect, useState} from "react";
import classes from "./Dashboard.module.css";
import Column from "./Column/Column";
import {DragDropContext} from "@hello-pangea/dnd";
import Loading from "./Loading/Loading";
import DashboardService from "../../../../../services/dashboard";
import {useSearchParams} from "react-router-dom";
import TaskService from "../../../../../services/tasks";
import Selector from "./Selector/Selector";
import ToastService from "../../../../../services/toasts";


function Dashboard(props){
    const [searchParams, setSearchParams] = useSearchParams();
    const [pageId, setPadeId] = useState(searchParams.get("pageId"))
    const [columns, setColumns] = useState([]);
    const [isDashboardLoading, setDashboardLoading] = useState(true);
    const [selectOptions, setSelectOptions] = useState(null);
    const [selectDefaultValue, setSelectDefaultValue] = useState(null);
    const selector = {
        options: selectOptions,
        setOptions: setSelectOptions,
        setDefaultValue: setSelectDefaultValue
    }

    useEffect( () => {
        setTimeout(async () => {
            try{
                const data = await new DashboardService().getByPageId(pageId, selector)
                setDashboardLoading(false);

                if (data){
                    setColumns(data.dashboard);
                    setSearchParams({ pageId: data.pageId });
                    setPadeId(data.pageId)
                }
            } catch {
                setDashboardLoading(true);
            }
        }, 500)

    }, [pageId])

    return (
        isDashboardLoading ? <Loading/> :
        !selectOptions? null :
        <div className="dashboard-data">
            <div className={classes.pagesSelector}>
                <Selector setParam={setPadeId} options={selectOptions} defaultValue={selectDefaultValue}/>
            </div>
            <div className="pages-data">
                <DragDropContext onDragEnd={result => onDragEnd(result, props.state, columns, setColumns)}>
                    <div className={classes.div}>
                        {
                            Object.entries(columns).map(([_, column], index) => (
                                <Column {...column} key={column.id} index={index} state={props.state}/>
                            ))
                        }
                    </div>
                </DragDropContext>
            </div>
        </div>
    )
}

export default Dashboard;


const onDragEnd = (result, state, columns, setColumns) => {
        const { destination, source } = result;
        const toastService = new ToastService(state)

        if (!destination){
            toastService.warning("Cannot change status", "There is no destination column")

            return;
        }
        if (destination.droppableId === source.droppableId){
            toastService.warning("Cannot change status", "The same column")

            return;
        }

        const sourceColumn = columns[Number(source.droppableId)]
        const destinationColumn = columns[Number(destination.droppableId)]
        const sourceTasks = [...sourceColumn.tasks];
        const destinationTasks = [...destinationColumn.tasks];

        const [removed] = sourceTasks.splice(source.index, 1);

        destinationTasks.splice(destination.index, 0, removed);

        const newColumns = {
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              tasks: sourceTasks
            },
            [destination.droppableId]: {
              ...destinationColumn,
              tasks: destinationTasks
            },
        };
        setColumns(newColumns);

        new TaskService().updateStatus(
            removed.id, destinationColumn.id
        ).then(() => {
            toastService.success(removed.name, destinationColumn.name, destinationColumn.color)
        }).catch(error => {
            setColumns(columns)

            toastService.error("Cannot change status", error.message)
        })
}