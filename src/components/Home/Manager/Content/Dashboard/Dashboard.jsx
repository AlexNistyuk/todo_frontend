import React, {useEffect, useState} from "react";
import classes from "./Dashboard.module.css";
import Column from "./Column/Column";
import {DragDropContext} from "@hello-pangea/dnd";
import {toast} from "react-toastify";
import SuccessMessage from "../Toast/SuccessMessage/SuccessMessage";
import ErrorMessage from "../Toast/ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import DashboardService from "../../../../../services/dashboard";
import {useSearchParams} from "react-router-dom";
import TaskService from "../../../../../services/tasks";
import Selector from "./Selector/Selector";


function Dashboard(props){
    const [searchParams, setSearchParams] = useSearchParams();
    const [columns, setColumns] = useState([]);
    const [isDashboardLoading, setDashboardLoading] = useState(true);
    const [selectOptions, setSelectOptions] = useState(null);
    const [selectDefaultValue, setSelectDefaultValue] = useState(null);
    const selector = {
        options: selectOptions,
        setOptions: setSelectOptions,
        setDefaultValue: setSelectDefaultValue
    }
    const pageId = searchParams.get('pageId');

    useEffect( () => {
        new DashboardService().getByPageId(pageId, selector)
            .then(function (data) {
                setColumns(data.dashboard);
                setDashboardLoading(false);
                setSearchParams({ pageId: data.pageId });
            })
    }, [searchParams])

    return (
        isDashboardLoading ? <Loading/> :
        <div className="dashboard-data">
            <div className={classes.pagesSelector}>
                <Selector setParam={setSearchParams} options={selectOptions} defaultValue={selectDefaultValue}/>
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
        if (!destination){
            toast.warning(<ErrorMessage
                state={state}
                header="Cannot change status"
                reason="There is no destination column"
            />)

            return;
        }
        if (destination.droppableId === source.droppableId){
            toast.warning(<ErrorMessage
                state={state}
                header="Cannot change status"
                reason="The same column"
            />)

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
                toast.success(<SuccessMessage
                    state={state}
                    header={removed.name}
                    event={destinationColumn.name}
                    color={destinationColumn.color}
                />)
        }).catch(error => {
            setColumns(columns)

            toast.error(<ErrorMessage
                state={state}
                header="Cannot change status"
                reason={error.message}
            />)
        })
}