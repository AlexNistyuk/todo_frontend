import './App.css';
import state from "./redux/state";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/Login/Login";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import React, {useEffect} from "react";
import Home from "./components/Home/Home";
import {verifyToken} from "./redux/slices/auth";
import Loading from "./components/Home/Manager/Content/Loading/Loading";


function App() {
    const dispatch = useDispatch()
    const isAuthorized = useSelector(state => state.auth.isAuthorized)

    useEffect(() => {
        dispatch(verifyToken())
    }, [])


    return (
        <div className="App">
            {
                <Routes>
                    <Route path="*" element={<Home state={state} isAuthorized={isAuthorized}/>}/>
                    <Route exact path="/login" element={<Login isAuthorized={isAuthorized}/>}/>
                </Routes>
            }
        </div>
    )
}

export default App;
