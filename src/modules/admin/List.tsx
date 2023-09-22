import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink} from "react-router-dom";

import {httpPost} from "../../request/http.tsx";
import XCheckbox from "../../components/checkbox/XCheckbox.tsx";
import {AppContext} from "../../components/context/AppContent.tsx";
import XButton from "../../components/button/XButton.tsx";


function List() {

    const { isLoading, setIsLoading, } = useContext(AppContext);

    const [userList, setUserList] = useState([]);

    const [checkedItems, setCheckedItems] = useState({});

    const [checkedItemsAll, setCheckedItemsAll] = useState(false);

    // 创建一个函数来处理复选框状态的变化
    const handleCheckboxChange = (item) => {
        setCheckedItems({
            ...checkedItems,
            [item.id]: !checkedItems[item.id],
        });
    };

    const handleCheckboxChangeAll = () => {
        let items = {};
        userList.map((item) => {
            items[item.id] = !checkedItemsAll;
        })
        setCheckedItems(items);
        setCheckedItemsAll(!checkedItemsAll);
    };

    async function getUserList() {
        setIsLoading(true);
        let res = await httpPost('/admin/user/index', {});
        setIsLoading(false);
        return res;
    }

    const search = () => {
        console.log(checkedItems)
    };

    // 创建一个副作用函数，该函数会在组件挂载后执行
    useEffect(() => {
        getUserList().then((data) => {
            setUserList(data.data);
        })
    }, []);

    return (

        <div>
            <div className="columns">
                <div className="column is-3">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input"/>
                        </div>
                    </div>
                </div>
                <div className="column is-3">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input"/>
                        </div>
                    </div>
                </div>

            </div>

            <div className="columns">

                <div className="column">
                    <div className="field">

                        <XButton onClick={search} color="primary" text="搜索" />
                    </div>
                </div>

            </div>

            <hr/>

            <table className="table is-narrow is-striped">
                <thead>
                <tr>
                    <th>
                        <XCheckbox
                            // value={item.id}
                            checked={checkedItemsAll}
                            onChange={() => handleCheckboxChangeAll()}
                        />
                    </th>
                    <th>
                        <div className="field">
                            <label className="label">ID</label>
                        </div>
                    </th>
                    <th>
                        <div className="field">
                            <label className="label">名字</label>
                        </div>
                    </th>
                    <th>

                        <div className="field">
                            <label className="label">邮箱</label>
                        </div>
                    </th>
                    <th>
                        <div className="field">
                            <label className="label">状态</label>
                        </div>
                    </th>
                    <th>动作</th>
                </tr>
                </thead>
                <tfoot>
                <tr>
                    <th></th>
                    <th><abbr title="Position">ID</abbr></th>
                    <th>名字</th>
                    <th><abbr title="Email">邮箱</abbr></th>
                    <th><abbr title="Status">状态</abbr></th>
                    <th>动作</th>
                </tr>
                </tfoot>
                <tbody>
                {
                    userList.map((item, id) => {
                        return (
                            <tr key={id}>
                                <td>
                                    <XCheckbox
                                        // value={item.id}
                                        checked={checkedItems[item.id] || false}
                                        onChange={() => handleCheckboxChange(item)}
                                    />
                                </td>
                                <th>1</th>
                                <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester
                                    City</a> <strong>(C)</strong>
                                </td>
                                <td>38</td>
                                <td>38</td>
                                <td>

                                    <NavLink to='/admin/user/edit' className="btn btn-primary btn-icon btn-sm">
                                        <i className="fa fa-edit"></i>
                                    </NavLink>


                                    <XButton
                                        color="danger"
                                        optionClass="btn-icon btn-sm"
                                    >
                                        <i className="fa fa-times"></i>
                                    </XButton>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </div>
    );
}

export default List;