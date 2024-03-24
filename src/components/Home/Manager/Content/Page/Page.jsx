import React from "react";
import {useParams} from "react-router-dom";
import ProgressBars from "./ProgressBars/ProgressBars";
import classes from "./Page.module.css"
import DeleteButton from "./DeleteButton/DeleteButton";



const bars = [
    {text: "To do", value: 15},
    {text: "In progress", value: 50},
    {text: "In review", value: 19},
    {text: "Done", value: 25},
    {text: "Done", value: 25},
    {text: "Done", value: 25},
    {text: "Done", value: 25},
]


function Page(props) {
    const {pageId} = useParams()
    const pageName = "WhiteSnake Project"

    return (
        <div className={classes.page}>
            <DeleteButton pageId={pageId} state={props.state} pageName={pageName}/>
            <ProgressBars bars={bars}/>
        </div>


    );
}

export default Page;