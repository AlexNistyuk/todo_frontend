import React from "react";
import classes from "./Task.module.css";
import {Draggable} from "@hello-pangea/dnd";
import {NavLink} from "react-router-dom";


function Task(props){
    let taskPath = `/tasks/${props.id}`
    const estimatedDate = new Date(props.estimated_date).toLocaleDateString()

    return (
        <Draggable draggableId={props.id.toString()} index={props.index}>
            {
                (provided) => (
                    <div className={classes.div} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <div className={classes.verticalLine} style={{
                            backgroundColor: `${props.color}`
                        }}/>
                        <div className={classes.content}>
                            <NavLink to={taskPath}>
                                <div className={classes.name}>{
                                    props.state.truncate(props.name, props.state.maxTaskName)}
                                </div>
                            </NavLink>
                            <textarea className={classes.description}>{
                                props.state.truncate(props.description, props.state.maxTaskDescription)}
                            </textarea>
                            <div className={classes.estimatedDate}>
                                {estimatedDate}
                            </div>
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default Task;