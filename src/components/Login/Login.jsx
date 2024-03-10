import React from "react";
import styles from "./Login.module.css";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";

function Login(props){
    const dispatch = useDispatch()
    const {register, handleSubmit, setError, formState: {errors, isValid}} = useForm({
        mode: "onChange"
    });
    const isLoading = useSelector(state => state.auth.status) === "loading"

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))

        if (!data.payload){
            return alert("Error while authorizing")
        }

        if ("tokens" in data.payload){
            window.localStorage.setItem("access_token", data.payload.tokens.access_token)
            window.localStorage.setItem("refresh_token", data.payload.tokens.refresh_token)
        }
    }

    if (props.isAuthorized){
        return <Navigate to="/"/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="Username"
                    error={Boolean(errors.username?.message)}
                    helperText={errors.username?.message}
                    {...register('username', {required: 'Enter username'})}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="Password"
                    fullWidth
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {required: 'Enter password'})}
                    type="password"
                />
                <Button disabled={isLoading} type="submit" size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );};

export default Login;