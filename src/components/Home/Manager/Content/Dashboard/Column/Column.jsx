import React from "react";
import classes from "./Column.module.css";
import Header from "./Header/Header";
import Task from "./Task/Task";
import {Droppable} from "@hello-pangea/dnd";


function Column(props){
    return (
        <div className={classes.div}>
            <Header color={props.color} name={props.name} number={props.tasks.length}/>
            <Droppable droppableId={props.index.toString()} ignoreContainerClipping={true}>
                {
                    (provided) => (
                        <div className={classes.taskList} ref={provided.innerRef} {...provided.droppableProps}>
                            {
                                props.tasks.map((task, index) => (
                                    <Task {...task}
                                          color={props.color}
                                          key={task.id.toString()}
                                          index={index}
                                          state={props.state}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </div>
    )
}

export default Column;