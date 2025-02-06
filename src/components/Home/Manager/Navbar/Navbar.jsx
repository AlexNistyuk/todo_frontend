import React from "react";
import "./Navbar.css";
import Item from "./Item/Item";

const items = [
    {path: '/dashboard', text: 'Dashboard', image: 'https://cdn2.iconfinder.com/data/icons/thin-charts-analytics/24/thin-1086_kpi_dashboard_monitor-1024.png'},
    {path: '/pages', text: 'Pages', image: 'https://www.svgrepo.com/show/163266/files.svg'},
    {path: '/tasks', text: 'Tasks', image: 'https://cdn2.iconfinder.com/data/icons/postal-services-2/50/checklist-1024.png'}
];


function Navbar(props){
    return (
        <div className="navigation">
            {
                items.map((item) => (
                    <Item {...item}/>
                ))
            }
        </div>
    )
}

export default Navbar;