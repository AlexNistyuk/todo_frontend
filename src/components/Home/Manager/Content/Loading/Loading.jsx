import React from "react";
import classes from "./Loading.module.css";
import {Circles} from "react-loader-spinner";


function Loading(props){
    return (
        <div className={classes.loading}>
           <Circles
              height="50"
              width="50"
              color="grey"
              ariaLabel="circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              />
        </div>
    )
}

export default Loading;