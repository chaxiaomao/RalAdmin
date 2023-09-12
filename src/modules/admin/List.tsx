import React from 'react';
import {Link} from "react-router-dom";

import {httpPost} from "../../request/http.tsx";

async function getUserList() {
    let data = await httpPost('/admin/user/index', {})
}

function List() {

    getUserList();

    return (
        <table className="table is-narrow is-striped">
            <thead>
            <tr>
                <th><abbr title="Position">ID</abbr></th>
                <th>名字</th>
                <th><abbr title="Email">邮箱</abbr></th>
                <th><abbr title="Status">状态</abbr></th>
                <th>动作</th>
            </tr>
            </thead>
            <tfoot>
            <tr>
                <th><abbr title="Position">ID</abbr></th>
                <th>名字</th>
                <th><abbr title="Email">邮箱</abbr></th>
                <th><abbr title="Status">状态</abbr></th>
                <th>动作</th>
            </tr>
            </tfoot>
            <tbody>
            <tr>
                <th>1</th>
                <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester
                    City</a> <strong>(C)</strong>
                </td>
                <td>38</td>
                <td>38</td>
                <td>
                    <nav className="level">
                        <div className="level-left">
                            <a className="level-item button is-small is-primary">Link</a>
                            <a className="level-item button is-small is-danger is-outlined">
                                <span>Delete</span>
                                <span className="icon is-small"><i className="fa fa-times"></i></span>
                            </a>
                        </div>
                    </nav>
                </td>
            </tr>
            <tr>
                <th>1</th>
                <td><a href="https://en.wikipedia.org/wiki/Leicester_City_F.C." title="Leicester City F.C.">Leicester
                    City</a> <strong>(C)</strong>
                </td>
                <td>38</td>
                <td>38</td>
                <td>
                    <nav className="level">
                        <div className="level-left">
                            <a className="level-item button is-small is-primary">Link</a>
                            <a className="level-item button is-small is-danger is-outlined">
                                <span>Delete</span>
                                <span className="icon is-small"><i className="fa fa-times"></i></span>
                            </a>
                        </div>
                    </nav>
                </td>
            </tr>
            </tbody>
        </table>
    );
}
export default List;