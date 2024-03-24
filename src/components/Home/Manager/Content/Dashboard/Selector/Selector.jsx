import React from "react";
import Select from "react-select";


function Selector(props){
    const handleOnChange = (event) => {
        props.setParam(event.value)
    }

    return (
       <Select options={props.options} onChange={handleOnChange} defaultValue={props.defaultValue}/>
    )
}

export default Selector;