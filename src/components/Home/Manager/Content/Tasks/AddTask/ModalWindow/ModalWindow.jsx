import React, {useEffect, useState} from "react";
import classes from "./ModalWindow.module.css";
import {useForm} from "react-hook-form";
import {Button, FormControl, InputLabel, MenuItem, TextField, Typography, Select} from "@mui/material";
import ToastService from "../../../../../../../services/toasts";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PageService from "../../../../../../../services/pages";
import TaskService from "../../../../../../../services/tasks";


function ModalWindow(props){
    const [selectValue, setSelectValue] = useState(10)
    const [estimatedDateValue, setEstimatedDateValue] = useState(dayjs(new Date()))
    const [pages, setPages] = useState([])
    const {register, handleSubmit, setError, formState: {errors}} = useForm({
        mode: "onChange"
    });

    const isSubmitButtonDisabled = (
        Boolean(errors[props.state.task.nameRegister]?.message) ||
        Boolean(errors[props.state.task.descriptionRegister]?.message) ||
        Boolean(errors[props.state.task.assigneeRegister]?.message)
    )

    const onChangeTaskName = (event) => {
        if (event.target.value.length > props.state.task.maxNameLength){
            setError(props.state.task.nameRegister, {
                message: `task name should be at most ${props.state.task.maxNameLength} characters`
            })
        } else {
            setError(props.state.task.nameRegister, null)
        }
    }

    const onChangeTaskAssignee = (event) => {
        if (event.target.value.length > props.state.task.maxAssigneeLength){
            setError(props.state.task.assigneeRegister, {
                message: `task assignee should be at most ${props.state.task.maxAssigneeLength} characters`
            })
        } else {
            setError(props.state.task.assigneeRegister, null)
        }
    }

    const onChangeTaskDescription = (event) => {
        if (event.target.value.length > props.state.task.maxDescriptionLength){
            setError(props.state.task.descriptionRegister, {
                message: `task description should be at most ${props.state.task.maxDescriptionLength} characters`
            })
        } else {
            setError(props.state.task.descriptionRegister, null)
        }
    }

    const onSubmit = async (values) => {
        values["sheet_id"] = selectValue
        values["estimated_date"] = estimatedDateValue.format()

        try{
            await new TaskService().createTask(values)
        } catch(error) {
            if (error.response.status === 400){
                const message = "Task name should be unique for a page"

                new ToastService(props.state).error(message)
                setError(props.state.task.nameRegister, {
                    message: message
                })

                return
            }
        }

        props.close()
        props.setRefreshPage(!props.refreshPage)
        new ToastService(props.state).success(values.name, "created")
    }

    useEffect(() => {
        new PageService().getAllUserPage().then((data) => {
            if (data.length === 0){
                new ToastService(props.state).warning("There are no pages")
                props.close()

                return
            }
            setPages(data)
            setSelectValue(data[0].id)
        })
    }, []);

    return (
        <div className={classes.modalWindow}>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.modalWindowForm}>
                <Typography classes={{root: classes.modalWindowTitle}} variant="h5">
                    New Task
                </Typography>

                <div className={classes.modalWindowData}>
                    <TextField
                        label="Name"
                        error={Boolean(errors[props.state.task.nameRegister]?.message)}
                        helperText={errors[props.state.task.nameRegister]?.message}
                        {...register(props.state.task.nameRegister, {required: 'Enter task name'})}
                        fullWidth
                        style={{width: 400}}
                        onChange={onChangeTaskName}
                        inputProps={{
                            maxLength: props.state.task.maxNameLength,
                        }}
                    />
                    <TextField
                        label="Description"
                        error={Boolean(errors[props.state.task.descriptionRegister]?.message)}
                        helperText={errors[props.state.task.descriptionRegister]?.message}
                        {...register(props.state.task.descriptionRegister)}
                        multiline
                        maxRows={3}
                        fullWidth
                        style={{width: 400}}
                        onChange={onChangeTaskDescription}
                        inputProps={{
                            maxLength: props.state.task.maxDescriptionLength,
                        }}
                    />
                    <TextField
                        label="Assignee"
                        error={Boolean(errors[props.state.task.assigneeRegister]?.message)}
                        helperText={errors[props.state.task.assigneeRegister]?.message}
                        {...register(props.state.task.assigneeRegister)}
                        fullWidth
                        style={{width: 400}}
                        onChange={onChangeTaskAssignee}
                        inputProps={{
                            maxLength: props.state.task.maxAssigneeLength,
                        }}
                    />
                    <FormControl variant="standard">
                        <InputLabel id="demo-simple-select-standard-label">Page</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            label="Page"
                            value={selectValue}
                            onChange={(event) => {setSelectValue(event.target.value)}}
                        >
                            {
                                Object.entries(pages).map(([, page]) => (
                                    <MenuItem value={page.id}>{page.name}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            disablePast
                            label="Estimated date"
                            value={estimatedDateValue}
                            onChange={(value) => {setEstimatedDateValue(value)}}
                        />
                    </LocalizationProvider>

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