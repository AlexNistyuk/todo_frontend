import React from "react";
import styles from "./Register.module.css";
import {Button, Paper, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import PasswordInput from "../../common/components/PasswordInput/PasswordInput";
import UsernameInput from "../../common/components/UsernameInput/UsernameInput";
import ToastService from "../../services/toasts";
import {fetchSignUp} from "../../redux/slices/auth";


function Register(props){
    const dispatch = useDispatch()
    const {register, handleSubmit, setError, formState: {errors}} = useForm({
        mode: "all"
    });
    const isLoading = useSelector(state => state.auth.status) === "loading"
    const buttonDisabled =
        Boolean(errors.username?.critical) ||
        Boolean(errors.password?.critical) ||
        Boolean(errors.confirmPassword?.critical)

    const onSubmit = async (values) => {
        if (values.password !== values.confirmPassword) {
            setError("password", {
                message: "passwords must match",
                critical: true
            })
            setError("confirmPassword", {
                message: "passwords must match",
                critical: true
            })

            return;
        }

        const toastService = new ToastService(props.state)
        const {payload} = await dispatch(fetchSignUp({
            username: values.username,
            password: values.password,
        }))

        if (!payload) {
            toastService.success("Sign up", "Created")
        } else {
            if (payload === "Provided data not unique") {
                const reason = "Not unique username"
                toastService.error(null, reason)
                setError("username", {
                    message: "Username must be unique",
                    critical: false
                })

                return;
            }

            toastService.error(null, payload)
        }
    }

    const handleOnInputPassword = () => {
        setError("password", null)
        setError("confirmPassword", null)
    }

    return (
        <Paper classes={{root: styles.root}}>
            <div className={styles.header}>
                <Typography classes={{root: styles.title}} variant="h5">
                    Sign Up
                </Typography>
                <Link to="/login">
                    Sign In
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
                <TextField
                    className={styles.field}
                    label="Confirm password"
                    fullWidth
                    error={Boolean(errors.confirmPassword?.message)}
                    helperText={errors.confirmPassword?.message}
                    {...register("confirmPassword")}
                    type="password"
                    onInput={handleOnInputPassword}
                />
                <Button disabled={isLoading || buttonDisabled} type="submit" size="large" variant="contained" fullWidth>
                    Submit
                </Button>
            </form>
        </Paper>
    );};

export default Register;