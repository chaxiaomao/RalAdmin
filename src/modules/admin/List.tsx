import React, {useContext, useEffect, useState} from 'react';
import {Link, NavLink, Outlet} from "react-router-dom";

import {httpGet, httpPost, httpRequest} from "../../request/http.tsx";
import XCheckbox from "../../components/checkbox/XCheckbox.tsx";
import {AppContext} from "../../components/context/AppContent.tsx";
import XButton from "../../components/button/XButton.tsx";
import XPagination from "../../components/pagination/XPagination.tsx";
import {status} from '../../config/common.tsx'
import XCard from "../../components/card/XCard.tsx";
import XModal from "../../components/alert/XModal.tsx";
import XLoading from "../../components/loading/XLoading.tsx";
import XNotification from "../../components/alert/XNotificition.tsx";

function List() {

    // let currentPage = 1;
    // let pageRows = 10;

    const [data, setData] = useState([]);
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
        data.map((item) => {
            items[item.id] = !checkedItemsAll;
        })
        setCheckedItems(items);
        setCheckedItemsAll(!checkedItemsAll);
    };

    function getData() {
        // console.log('currentPage:' + currentPage)
        // console.log('pageSize:' + currentPageRows)
        XLoading.show()

        httpGet({
            url: '/admin/user/index',
            queryParams: {
                page: currentPage,
                pageSize: currentPageRows
            }
        }).then((data) => {
            setData(data.data);
            setPageCount(data.meta.extraData.pageCount);
            setCheckedItems({});
            setCheckedItemsAll(false);
            XLoading.hide();
        }).catch(err => {

        });
    }

    async function deleteId(id) {
        await httpPost({url: '/admin/user/delete?id=' + id});
        getData();
    }

    async function deleteIds(ids) {
        if (ids != "") {
            await httpPost({
                url: '/admin/user/multiple-delete',
                data: JSON.stringify({'ids': ids}),
                // header: {
                //     'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                // },
            });
            getData();
        }
    }

    const search = () => {
        console.log(checkedItems)
    };

    // 创建一个副作用函数，该函数会在组件挂载后执行
    useEffect(() => {
        getData();
    }, [currentPage, currentPageRows]);

    const handlePage = (val) => {
        setCurrentPage(val.page)
    };

    const handlePageRow = (val) => {
        setCurrentPageRows(val.page_rows)
    };

    const handleDelete = (id) => {
        XModal.show({
            // title: '提示',
            // content: '确认删除此条记录',
            onConfirm: () => {
                deleteId(id)
            }
        })
    }

    const handleDeleteIds = () => {

        let params = Object.keys(checkedItems)
            .filter(key => checkedItems[key] == true)
            // .map((key) => {
            //     return encodeURIComponent('ids[]') + '=' + encodeURIComponent(key);
            // })
            .join(',');

        if (params == "") {
            XNotification.show({
                color: 'warning',
                title: '请选择删除项目'
            })
            return;
        }

        XModal.show({
            onConfirm: () => {
                deleteIds(params)
            }
        })
    }

    return (
        <XCard>

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
                <div className="column is-3">
                    <div className="field field-search">
                        <XButton type={"submit"} onClick={search} color="primary" text="搜索"/>
                    </div>
                </div>
            </div>

            <div className="columns">
                <div className="column">
                    <Link className="btn btn-success" to={'/admin/user/add'}>新增</Link>
                    <XButton onClick={handleDeleteIds} color="danger" text="删除"/>
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
                            <label className="label">用户名</label>
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
                    data.map((item, id) => {
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
                                <td><Link to={'/admin/user/edit?id=' + item.id}
                                          title={item.username}>{item.username}</Link>
                                </td>
                                <td>{item.email}</td>
                                <td>{status[item.status]}</td>
                                <td>

                                    <NavLink to={'/admin/user/edit?id=' + item.id}
                                             className="btn btn-success btn-icon btn-sm">
                                        <i className="fa fa-edit"></i>
                                    </NavLink>


                                    <XButton
                                        color="danger"
                                        optionClass="btn-icon btn-sm"

                                        onClick={() => handleDelete(item.id)}
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


        </XCard>
    );
}

export default List;