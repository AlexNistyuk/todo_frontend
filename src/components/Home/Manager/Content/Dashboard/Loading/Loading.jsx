import React from "react";
import classes from "./Loading.module.css";
import {Skeleton} from "@mui/material";


function Loading(props){
    return (
        <div className="loading">
            <div className={classes.pagesSelector}>
                <Skeleton variant="rectangle" height="37px"/>
            </div>

            <div className={classes.columnContainer}>
                {
                    Object.entries([1,2,3,4,5]).map(() => (
                        <div className={classes.column}>
                            <Skeleton variant="rectangle" width={240} height={40}/>
                            <div className={classes.taskList}>
                                {
                                    Object.entries([1,2,3,4]).map(() => (
                                        <Skeleton sx={{ minHeight: 185, width: 240, marginTop: -4}}/>
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Loading;