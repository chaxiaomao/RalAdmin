import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";

import {httpGet, httpPost} from "../../request/http.tsx";
import XCheckbox from "../../components/checkbox/XCheckbox.tsx";
import {AppContext} from "../../components/context/AppContent.tsx";
import XButton from "../../components/button/XButton.tsx";
import XPagination from "../../components/pagination/XPagination.tsx";
import {status} from '../../config/common.tsx'

function List() {

    // let currentPage = 1;
    // let pageRows = 10;

    const [userList, setUserList] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [currentPageRows, setCurrentPageRows] = useState(10);

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

    function getUserList() {
        console.log('currentPage:' + currentPage)
        console.log('pageSize:' + currentPageRows)

        httpGet('/admin/user/index', {page: currentPage, pageSize: currentPageRows}).then((data) => {
            setUserList(data.data);
            setPageCount(data.meta.extraData.pageCount);
        }).catch(err => {

        });
    }

    const search = () => {
        console.log(checkedItems)
    };

    // 创建一个副作用函数，该函数会在组件挂载后执行
    useEffect(() => {
        getUserList();
    }, [currentPage, currentPageRows]);

    const handlePage = (val) => {
        setCurrentPage(val.page)
    };

    const handlePageRow = (val) => {
        setCurrentPageRows(val.page_rows)
    };

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


            <XPagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={handlePage}
                onPageRowChange={handlePageRow}
            />

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
                                <th>{item.id}</th>
                                <td><Link to={'/admin/user/edit?id=' + item.id} title={item.username}>{item.username}</Link>
                                </td>
                                <td>{item.email}</td>
                                <td>{status[item.status]}</td>
                                <td>

                                    <NavLink to={'/admin/user/edit?id=' + item.id} className="btn btn-success btn-icon btn-sm">
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