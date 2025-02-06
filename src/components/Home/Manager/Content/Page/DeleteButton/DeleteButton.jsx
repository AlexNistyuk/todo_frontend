import React from "react";

import DeleteIcon from "@material-ui/icons/Delete"
import classes from "./DeleteButton.module.css"
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {Button} from "@mui/material"
import PageService from "../../../../../../services/pages";
import {useNavigate} from "react-router-dom";
import ToastService from "../../../../../../services/toasts";


function DeleteButton(props) {
    const navigate = useNavigate()
    const deletePage = async () => {
        await new PageService().deletePage(props.pageId)

        new ToastService(props.state).success(props.pageName, "deleted")
        navigate("/pages")
    }

    const onClickDelete = () => {
        confirmAlert({
            title: "Delete page",
            message: 'Are you sure?',
            buttons: [
                {
                  label: 'Yes',
                  onClick: deletePage
                },
                {
                  label: 'No',
                }
            ]
        });
    };

    return (
        <Button
            className={classes.deletePageButton}
            startIcon={<DeleteIcon />}
            onClick={onClickDelete}
        >
            Delete page
        </Button>
    );
}

export default DeleteButton;