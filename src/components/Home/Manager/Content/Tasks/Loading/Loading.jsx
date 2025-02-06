import React from "react";
import classes from "./Loading.module.css"
import {Skeleton} from "@mui/material";


function PagesLoading(){
    return (
        <div className={classes.tasks}>
            <div><Skeleton sx={{height: 60, width: 150}}/></div>
            <div className={classes.taskSkeletonContainer}>
                {
                    Object.entries([1,2]).map(() => (
                        <div className={classes.row}>
                            {
                                Object.entries([1,2,3,4]).map(() => (
                                    <Skeleton sx={{maxHeight: 340, minHeight: 340, minWidth: 320}}/>
                                ))
                            }
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default PagesLoading;