import React from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import classes from "./AddTask.module.css"
import {Button} from "@mui/material";
import {confirmAlert} from "react-confirm-alert";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutlineOutlined"


function AddTask(props) {
    const onClickAdd = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
               return <ModalWindow close={onClose} {...props}/>
            },
        });
    };

    return (
        <Button
            className={classes.addTaskButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={onClickAdd}
        >
            Add task
        </Button>
    )
}

export default AddTask;