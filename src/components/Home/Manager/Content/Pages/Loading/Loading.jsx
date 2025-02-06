import React from "react";
import classes from "./Loading.module.css"
import {Skeleton} from "@mui/material";


function PagesLoading(){
    return (
        <div className={classes.pages}>
            <div><Skeleton sx={{height: 60, width: 150}}/></div>
            <div className={classes.pageSkeletonContainer}>
                {
                    Object.entries([1,2,3]).map(() => (
                        <div className={classes.row}>
                            {
                                Object.entries([1,2,3,4]).map(() => (
                                    <Skeleton sx={{maxHeight: 270, minHeight: 270, minWidth: 320}}/>
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