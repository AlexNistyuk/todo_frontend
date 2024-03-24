import React from "react";
import classes from "./ModalWindow.module.css";
import {useForm} from "react-hook-form";
import {Button, TextField, Typography} from "@mui/material";
import PageService from "../../../../../../../services/pages";
import ToastService from "../../../../../../../services/toasts";


function ModalWindow(props){
    const {register, handleSubmit, setError, formState: {errors}} = useForm({
        mode: "onChange"
    });

    const isSubmitButtonDisabled = (
        Boolean(Boolean(errors[props.state.page.nameRegister]?.message)) ||
        Boolean(Boolean(errors[props.state.page.descriptionRegister]?.message))
    )

    const onChangePageName = (event) => {
        if (event.target.value.length > props.state.page.maxNameLength){
            setError(props.state.page.nameRegister, {
                message: `page name should be at most ${props.state.page.maxNameLength} characters`
            })
        } else {
            setError(props.state.page.nameRegister, null)
        }
    }

    const onChangePageDescription = (event) => {
        if (event.target.value.length > props.state.page.maxDescriptionLength){
            setError(props.state.page.descriptionRegister, {
                message: `page description should be at most ${props.state.page.maxDescriptionLength} characters`
            })
        } else {
            setError(props.state.page.descriptionRegister, null)
        }
    }

    const onSubmit = async (values) => {
        await new PageService().createPage(values)

        props.close()
        props.setRefreshPage(!props.refreshPage)
        new ToastService(props.state).success(values.name, "created")
    }

    return (
        <div className={classes.modalWindow}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.modalWindowForm}>
                <Typography classes={{root: classes.modalWindowTitle}} variant="h5">
                    New Page
                </Typography>

                <div className={classes.modalWindowData}>
                    <TextField
                        label="Name"
                        error={Boolean(errors[props.state.page.nameRegister]?.message)}
                        helperText={errors[props.state.page.nameRegister]?.message}
                        {...register(props.state.page.nameRegister, {required: 'Enter page name'})}
                        fullWidth
                        style={{width: 400, height: 40}}
                        onChange={onChangePageName}
                        inputProps={{
                            maxLength: props.state.page.maxNameLength,
                        }}
                    />
                    <TextField
                        label="Description"
                        error={Boolean(errors[props.state.page.descriptionRegister]?.message)}
                        helperText={errors[props.state.page.descriptionRegister]?.message}
                        {...register(props.state.page.descriptionRegister)}
                        multiline
                        maxRows={3}
                        fullWidth
                        style={{width: 400, height: 40}}
                        onChange={onChangePageDescription}
                        inputProps={{
                            maxLength: props.state.page.maxDescriptionLength,
                        }}
                    />
                </div>
                <div className={classes.modalWindowButtons}>
                    <Button variant="outlined" color="error" onClick={props.close}>Cancel</Button>
                    <Button type="submit" variant="outlined" disabled={isSubmitButtonDisabled}>Submit</Button>
                </div>
            </form>
        </div>
    );
}

export default ModalWindow;