import React from "react";
import {TextField} from "@mui/material";


function UsernameInput(props) {
    const maxUsernameLength = 20;

    const onChange = async (event) => {
        const username = event.target.value;

        if (username.length > maxUsernameLength) {
            props.setError(props.registerName, {
                message: `username should have at most ${maxUsernameLength} characters`,
                critical: true
            })
        } else {
            props.setError(props.registerName, null)
        }
    }

    return (
        <TextField
            className={props.style}
            label={props.label}
            error={Boolean(props.error?.message)}
            helperText={props.error?.message}
            {...props.register(props.registerName, {required: 'Enter username'})}
            fullWidth
            onChange={onChange}
            inputProps={
                {maxLength: maxUsernameLength}
            }
        />
    );
};

export default UsernameInput;