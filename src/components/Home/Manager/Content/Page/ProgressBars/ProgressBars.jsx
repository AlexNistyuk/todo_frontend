import React from "react";
import classes from "./ProgressBars.module.css"

import ProgressProvider from "./ProgressProvider/ProgressProvider";


function ProgressBars(props){
    const maxLineItems = 6
    const lineCount = Math.ceil(props.bars.length / maxLineItems)
    let groupArray = []

    for (let i = 0; i < lineCount; i++){
        let new_array = []

        for(let j = 0; j < maxLineItems; j++){
            if (i*maxLineItems + j >= props.bars.length){
                break;
            }

            new_array.push(props.bars[i*maxLineItems + j])
        }

        groupArray.push(new_array)
    }

    return (
        <div className={classes.progressBar}>
            {
                Object.entries(groupArray).map(([_, lineArray]) => (
                   <div className={classes.progressBarLine}>
                       {
                           Object.entries(lineArray).map(([_, bar]) => (
                               <ProgressProvider bar={bar}/>
                           ))
                       }
                    </div>
                ))
            }
        </div>
    );
}

export default ProgressBars;