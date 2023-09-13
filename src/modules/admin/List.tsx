import React from 'react';
import {Link} from "react-router-dom";

import {httpPost} from "../../request/http.tsx";

async function getUserList() {
    let data = await httpPost('/admin/user/index', {})
}

function List() {

    getUserList();

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

            <hr/>

            <table className="table is-narrow is-striped">
                <thead>
                <tr>
                    <th>
                        <div className="field">
                            <label className="label">ID</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Text input"/>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div className="field">
                            <label className="label">名字</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Text input"/>
                            </div>
                        </div>

                    </th>
                    <th>

                        <div className="field">
                            <label className="label">邮箱</label>
                            <div className="control">
                                <input className="input" type="text" placeholder="Text input"/>
                            </div>
                        </div>
                    </th>
                    <th>
                        <div className="field">
                            <label className="label">状态</label>
                            <div className="control">
                                <div className="select">
                                    <select>
                                        <option>Select dropdown</option>
                                        <option>With options</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </th>
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
                    <td>38

                        <div className="form-check"><label className="form-check-label"><input type="checkbox"
                                                                                               className="form-check-input"
                                                                                               checked=""/><span
                            className="form-check-sign"></span></label></div>
                    </td>
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

        </div>
    );
}

export default List;