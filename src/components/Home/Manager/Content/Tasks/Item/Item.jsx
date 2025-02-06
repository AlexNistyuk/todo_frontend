import React from "react";
import classes from "./Item.module.css";
import Grid from "@mui/material/Grid";
import {NavLink} from "react-router-dom";
import {styled} from "@mui/material/styles";
import {Paper} from "@mui/material";
import randomColor from "randomcolor";


const TaskItem = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: "0 5px 10px rgba(128,128,128,.5)"
}));


function Item(props){
    const estimatedDate = new Date(props.task.estimated_date).toLocaleDateString()

    return (
        <Grid item xs={5}>
            <NavLink to={`/tasks/${props.task.id}`}>
                <TaskItem>
                    <div className={classes.task}>
                        <div className={classes.verticalLine} style={{
                            backgroundColor: randomColor()
                        }}/>
                        <div className={classes.content}>
                            <div className={classes.name}>{props.task.name}</div>
                            <textarea className={classes.description}>
                                {props.state.truncate(props.task.description, props.state.task.maxShowDescriptionLength)}
                            </textarea>
                            <div className={classes.field}>
                                Status: {props.task.status.name}
                            </div>
                            <div className={classes.field}>
                                Page: {props.task.sheet.name}
                            </div>
                            <div className={classes.field}>
                                Estimated date: {estimatedDate}
                            </div>
                            <div className={classes.field}>
                                Assignee: {props.task.assignee ? props.task.assignee : "-"}
                            </div>
                        </div>
                    </div>
                </TaskItem>
            </NavLink>
        </Grid>
    );
}

export default Item;