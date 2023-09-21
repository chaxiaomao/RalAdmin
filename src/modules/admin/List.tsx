import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

import {httpPost} from "../../request/http.tsx";
import XCheckbox from "../../components/checkbox/XCheckbox.tsx";

async function getUserList() {
    return await httpPost('/admin/user/index', {})
}

function List() {



    const [userList, setUserList] = useState([]);

    const [checkedItems, setCheckedItems] = useState([]);

    // 创建一个函数来处理复选框状态的变化
    const handleCheckboxChange = (item) => {
        setCheckedItems({
            ...checkedItems,
            [item.id]: !checkedItems[item.id],
        });
    };

    const kk = () => {
        console.log(checkedItems)
    };

    // 创建一个副作用函数，该函数会在组件挂载后执行
    useEffect(() => {
        getUserList().then((data) => {
            console.log(data)
            setUserList(data.data);
        })

    }, []); // 仅在count发生变化时才执行副作用函数

    return (


        <div>
            <div className="columns">
                <div className="column">
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input className="input" type="text" placeholder="Text input"/>
                        </div>
                    </div>
                </div>
                <div className="column">
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
                        <button onClick={kk} className="level-item button is-primary">搜索</button>
                    </div>
                </div>

            </div>

            <hr/>

            <table className="table is-narrow is-striped">
                <thead>
                <tr>
                    <th>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"  />
                                <span className="form-check-sign"></span>
                            </label>
                        </div>
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
                    <th>
                        <div className="form-check">
                            <label className="form-check-label">
                                <input type="checkbox" className="form-check-input"  />
                                <span className="form-check-sign"></span>
                            </label>
                        </div>
                    </th>
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
                                    <nav className="level">
                                        <div className="level-left">
                                            <a className="level-item button is-primary">Link</a>
                                            <a className="level-item button is-danger">
                                                <span>Delete</span>
                                                <span className="icon is-small"><i className="fa fa-times"></i></span>
                                            </a>
                                        </div>
                                    </nav>
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