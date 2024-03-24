import React from "react";
import "./DropdownMenu.css";
import {useDispatch, useSelector} from "react-redux";
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import {logout} from "../../../../redux/slices/auth";
import {Link} from "react-router-dom";

//   font-family: 'Source Sans Pro', sans-serif;


function DropdownMenu(props){
    const userData = useSelector(state => state.auth.data)
    const dispatch = useDispatch()

    const onClickLogout = () => {
        dispatch(logout())
    }

    const items = [
      {
        label: (
          <div className="dropdown-choice">
              <Link to="/register">Sign up</Link>
          </div>
        ),
      },
      {
        label: (
          <div className="dropdown-choice" onClick={onClickLogout}>Sign out</div>
        ),
      },
    ];

    return (
        <div className="username">
            <Dropdown menu={{items}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        {/*{userData.username}*/}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </div>
    );
}

export default DropdownMenu;