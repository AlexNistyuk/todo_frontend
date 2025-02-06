import React from "react";
import styles from "./Login.module.css";
import {Button, Paper, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchSignIn} from "../../redux/slices/auth";
import {Link, Navigate} from "react-router-dom";
import PasswordInput from "../../common/components/PasswordInput/PasswordInput";
import UsernameInput from "../../common/components/UsernameInput/UsernameInput";
import {toast} from "react-toastify";
import ErrorMessage from "../Home/Manager/Content/Toast/ErrorMessage/ErrorMessage";

import 'react-toastify/dist/ReactToastify.css';

function Login(props){
    const dispatch = useDispatch()
    const {register, handleSubmit, setError, formState: {errors}} = useForm({
        mode: "onChange"
    });
    const isLoading = useSelector(state => state.auth.status) === "loading"
    const buttonDisabled = Boolean(errors.username?.critical) || Boolean(errors.password?.critical)

    const onSubmit = async (values) => {
        const payload = await dispatch(fetchSignIn(values))

        if (payload?.error){
            toast.error(
                <ErrorMessage
                    state={props.state}
                    header="Log in"
                    reason={payload.error.message}
                />
            )
        }
    }

    if (props.isAuthorized){
        return <Navigate to="/"/>
    }

    return (
        <Paper classes={{root: styles.root}}>
            <div className={styles.header}>
                <Typography classes={{root: styles.title}} variant="h5">
                    Sign In
                </Typography>
                <Link to="/register">
                    Sign Up
                </Link>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <UsernameInput
                    label="Username"
                    error={errors.username}
                    registerName="username"
                    style={styles.field}
                    register={register}
                    setError={setError}
                />
                <PasswordInput
                    label="Password"
                    style={styles.field}
                    error={errors.password}
                    register={register}
                    registerName="password"
                    visibility={true}
                />
                <Button disabled={isLoading || buttonDisabled} type="submit" size="large" variant="contained" fullWidth>
                    Submit
                </Button>
            </form>
        </Paper>
    );};

export default Login;