import {toast} from "react-toastify";
import SuccessMessage from "../components/Home/Manager/Content/Toast/SuccessMessage/SuccessMessage";
import React from "react";
import ErrorMessage from "../components/Home/Manager/Content/Toast/ErrorMessage/ErrorMessage";

export default class ToastService {

    constructor(state) {
        this.state = state
    }

    success(header, event, color=null){
        toast.success(
            <SuccessMessage
                state={this.state}
                header={header}
                event={event}
                color={color}
            />
        )
    }

    error(reason=null){
        toast.error(
            <ErrorMessage
                state={this.state}
                reason={reason}
            />
        )
    }

    warning(reason=null){
        toast.warning(
            <ErrorMessage
                state={this.state}
                reason={reason}
            />
        )
    }
}