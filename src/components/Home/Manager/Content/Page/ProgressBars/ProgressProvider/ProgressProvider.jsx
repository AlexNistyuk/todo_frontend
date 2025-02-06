import React from "react";
import classes from "./ProgressProvider.module.css"
import {buildStyles, CircularProgressbarWithChildren} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';



const ProgressProvider = ({bar}) => {
    const [value, setValue] = React.useState(0);

    React.useEffect(() => {
        setTimeout(() => {
            if (value < bar.value){
                setValue(value+1);
            }
        }, 30)
    }, [value]);

    return (
        <div className={classes.circularBar}>
            <CircularProgressbarWithChildren
                value={value}
                styles={buildStyles({
                  pathColor: "turquoise",
                })}
            >
                <div className={classes.progressBarText}>
                    <div>{bar.text.toUpperCase()}</div>
                    <div>{value}%</div>
                </div>
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default ProgressProvider;
