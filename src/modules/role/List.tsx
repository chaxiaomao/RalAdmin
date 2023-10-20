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
import {Tooltip} from "react-tooltip";
import Assigment from "./Assigment.tsx";

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
            [item.name]: !checkedItems[item.name],
        });
    };

    const handleCheckboxChangeAll = () => {
        let items = {};
        data.map((item) => {
            items[item.name] = !checkedItemsAll;
        })
        setCheckedItems(items);
        setCheckedItemsAll(!checkedItemsAll);
    };

    function getData() {
        // console.log('currentPage:' + currentPage)
        // console.log('pageSize:' + currentPageRows)
        XLoading.show()

        httpGet({
            url: '/admin/role/index',
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
        await httpPost({url: '/admin/role/delete?id=' + id});
        getData();
    }

    async function deleteIds(ids) {
        if (ids != "") {
            await httpPost({
                url: '/admin/role/multiple-delete',
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

    const handleAssigment = (id) => {
        Assigment.show({title: '', data: id})
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
                    <Link className="btn btn-success" to={'/admin/role/add'}>新增</Link>
                    <XButton onClick={handleDeleteIds} color="danger" text="删除"/>
                    <XButton onClick={getData} color="secondary" text="刷新"/>
                </div>
            </div>

            {/*<XPagination*/}
            {/*    pageCount={pageCount}*/}
            {/*    currentPage={currentPage}*/}
            {/*    onPageChange={handlePage}*/}
            {/*    onPageRowChange={handlePageRow}*/}
            {/*/>*/}

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
                            <label className="label">名字</label>
                        </div>
                    </th>
                    <th>

                        <div className="field">
                            <label className="label">类型</label>
                        </div>
                    </th>
                    <th>
                        <div className="field">
                            <label className="label">描述</label>
                        </div>
                    </th>
                    <th>
                        <div className="field">
                            <label className="label">规则名字</label>
                        </div>
                    </th>
                    <th>
                        <div className="field">
                            <label className="label">数据</label>
                        </div>
                    </th>
                    <th>动作</th>
                </tr>
                </thead>
                {/*<tfoot>*/}
                {/*<tr>*/}
                {/*    <th></th>*/}
                {/*    <th><abbr title="Position">ID</abbr></th>*/}
                {/*    <th>名字</th>*/}
                {/*    <th><abbr title="Email">邮箱</abbr></th>*/}
                {/*    <th><abbr title="Status">状态</abbr></th>*/}
                {/*    <th>动作</th>*/}
                {/*</tr>*/}
                {/*</tfoot>*/}

                <tbody>
                {
                    data.map((item, id) => {
                        return (
                            <tr key={id}>
                                <td>
                                    <XCheckbox
                                        // value={item.id}
                                        checked={checkedItems[item.name] || false}
                                        onChange={() => handleCheckboxChange(item)}
                                    />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.description}</td>
                                <td>{item.rule_name}</td>
                                <td>{item.data}</td>
                                <td>

                                    <NavLink
                                        to={'/admin/permission/edit?id=' + item.name}
                                        className="btn btn-success btn-icon btn-sm item-edit">
                                        <i className="fa fa-edit"></i>
                                    </NavLink>

                                    {/*<NavLink*/}
                                    {/*    to={'/admin/role/assigment?id=' + item.name}*/}
                                    {/*         className="btn btn-success btn-icon btn-sm item-assigment">*/}
                                    {/*    <i className="fa fa-tree"></i>*/}
                                    {/*</NavLink>*/}

                                    <XButton
                                        color="success"
                                        optionClass="btn-icon btn-sm item-assigment"
                                        onClick={() => handleAssigment(item.name)}
                                    >
                                        <i className="fa fa-tree"></i>
                                    </XButton>

                                    <XButton
                                        color="danger"
                                        optionClass="btn-icon btn-sm item-delete"
                                        onClick={() => handleDelete(item.name)}
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

            <XPagination
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={handlePage}
                onPageRowChange={handlePageRow}
            />

            <Tooltip anchorSelect=".item-edit" place="top" className="tooltip-a">编辑</Tooltip>
            <Tooltip anchorSelect=".item-assigment" place="top" className="tooltip-a">分配</Tooltip>
            <Tooltip anchorSelect=".item-delete" place="top" className="tooltip-a">删除</Tooltip>
        </XCard>
    );
}

export default List;