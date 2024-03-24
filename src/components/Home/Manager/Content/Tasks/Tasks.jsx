import React, {useEffect, useState} from "react";
import classes from "./Tasks.module.css";
import Grid from '@mui/material/Grid';
import {Box} from "@mui/material";
import TaskService from "../../../../../services/tasks";
import AddTask from "./AddTask/AddTask";
import Item from "./Item/Item"
import Loading from "./Loading/Loading";


function Tasks(props){
    const [isTasksLoading, setTasksLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false)

    useEffect( () => {
        setTasksLoading(true)

        setTimeout(async () => {
            try{
                const data = await new TaskService().getAllUserTask(true)

                setTasksLoading(false);

                if (data) {
                    setTasks(data);
                }
            } catch (err){
                setTasksLoading(true);
            }
        }, 500)

    }, [refreshPage])

    return (
        isTasksLoading ? <Loading/>:
        <div className={classes.tasks}>
            <AddTask refreshPage={refreshPage} setRefreshPage={setRefreshPage} state={props.state}/>

            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={10} columns={20}>
                    {
                        Object.entries(tasks).map(([_, task], index) => (
                            <Item task={task} state={props.state}/>
                        ))
                    }
                </Grid>
            </Box>
        </div>
    );
}

export default Tasks;