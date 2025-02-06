import React from "react";
import ModalWindow from "./ModalWindow/ModalWindow";
import classes from "./AddPage.module.css"
import {Button} from "@mui/material";
import {confirmAlert} from "react-confirm-alert";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutlineOutlined"


function AddPage(props) {
    const onClickAdd = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
               return <ModalWindow close={onClose} {...props}/>
            },
        });
    };

    return (
        <Button
            className={classes.addPageButton}
            startIcon={<AddCircleOutlineIcon />}
            onClick={onClickAdd}
        >
            Add page
        </Button>
    )
}

export default AddPage;