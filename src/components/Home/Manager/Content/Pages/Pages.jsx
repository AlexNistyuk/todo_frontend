import React, {useEffect, useState} from "react";
import classes from "./Pages.module.css";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import {Box, Paper} from "@mui/material";
import {NavLink} from "react-router-dom";
import randomColor from "randomcolor";
import PagesLoading from "./Loading/Loading";
import PageService from "../../../../../services/pages";
import AddPage from "./AddPage/AddPage";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  boxShadow: "0 5px 10px rgba(128,128,128,.5)"
}));


function Pages(props){
    const [isPagesLoading, setPagesLoading] = useState(true);
    const [pages, setPages] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false)

    useEffect( () => {
        setPagesLoading(true)

        setTimeout(async () => {
            try{
                const data = await new PageService().getAllUserPage(true)

                setPagesLoading(false);

                if (data) {
                    setPages(data);
                }
            } catch (err){
                setPagesLoading(true);
            }
        }, 500)

    }, [refreshPage])

    return (
        isPagesLoading ? <PagesLoading/>:
        <div className={classes.pages}>
            <AddPage refreshPage={refreshPage} setRefreshPage={setRefreshPage} state={props.state}/>

            <Box sx={{flexGrow: 1}}>
                <Grid container spacing={10} columns={20}>
                    {
                        Object.entries(pages).map(([_, page], index) => (
                            <Grid item xs={5}>
                                <NavLink to={`/pages/${page.id}`}>
                                    <Item>
                                        <div className={classes.page}>
                                            <div className={classes.verticalLine} style={{
                                                backgroundColor: randomColor()
                                            }}/>
                                            <div className={classes.content}>
                                                <div className={classes.name}>{page.name}</div>
                                                <textarea className={classes.description}>{page.description}</textarea>
                                                <div className={classes.count}>
                                                    <div className={classes.countPrefix}>Statuses:</div>
                                                    <div className={classes.circle}>
                                                        {page.status_count}
                                                    </div>
                                                </div>
                                                <div className={classes.count}>
                                                    <div className={classes.countPrefix}>Tasks:</div>
                                                    <div className={classes.circle}>
                                                        {page.task_count}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Item>
                                </NavLink>
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </div>
    );
}

export default Pages;