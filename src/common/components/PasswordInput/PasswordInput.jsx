import React, {useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function PasswordInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <TextField
            className={props.style}
            label={props.label}
            fullWidth
            error={Boolean(props.error?.message)}
            helperText={props.error?.message}
            {...props.register(props.registerName, {required: 'Enter password'})}
            type={showPassword ? "text" : "password"}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {props.visibility ?
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton> : null
                        }
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default PasswordInput;