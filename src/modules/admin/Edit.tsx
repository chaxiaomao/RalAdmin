import React, {useEffect, useState} from 'react';
import XInput from "../../components/input/XInput.tsx";
import XSelect from "../../components/select/XSelect.tsx";
import {httpGet, httpPost} from "../../request/http.tsx";
import {httpCode} from "../../config/common.tsx";
import XCard from "../../components/card/XCard.tsx";
import {Link, useNavigate} from "react-router-dom";

function Edit() {

    const navigate = useNavigate();
    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({})

    const statusOptions = {
        '活动': 1,
        '停用': 2,
    };

    const [formData, setFormData] = useState({
        id: '',
        username: '',
        email: '',
        password: '',
        status: '',
    })

    useEffect(() => {

        let params = new URLSearchParams(location.search);
        let id = params.get("id");

        if (id) {
            httpGet({
                url: '/admin/user/edit',
                queryParams: {id: id}
            }).then(res => {
                if (res.meta.code == httpCode.SUCCESS) {
                    setData(res.data)
                }
            }).catch(e => {

            })
        }

    }, [])

    function setData(data) {

        setFormData({
            id: data.id,
            username: data.username,
            email: data.email,
            password: '',
            status: data.status,
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为


        // 执行你想要的操作，如表单验证、数据处理等
        if (formData.username === '') {
            setErrors({username: '请填入用户名'})
            return ;
        }

        if (formData.id == '' && formData.password === '') {
            setErrors({password: '请填入密码'})
            return ;
        }

        setSubmitting(true);

        httpPost({
            url: '/admin/user/edit?id=' + formData.id,
            alert: true,
            data: JSON.stringify({
                BeUser: formData
            })
        }).then(res => {
            if (res.meta.code == httpCode.SUCCESS) {
                setData(res.data)
                setErrors({});
            } else {
                setErrors(res.data);
            }
            setSubmitting(false);

        }).catch(err => {
            setSubmitting(false);
        })

    };

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleStatusChange = (item) => {
        setFormData((prevData) => ({
            ...prevData,
            status: item.value,
        }));
    };

    return (

        <XCard>

            <div className="tabs">
                <ul>
                    <li>
                        <a onClick={() => navigate(-1)}>
                            <span className="icon"><i className="fa fa-angle-left"></i></span>
                            <span>返回</span>
                        </a>
                    </li>
                </ul>
            </div>

            <form className="form-300" action="" onSubmit={handleSubmit}>
                <div className="columns">
                    <div className="column is-3">
                        <label className="form-label">用户名</label>
                    </div>
                    <div className="column">
                        <XInput
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleFormChange}
                            errors={errors.username}
                        />
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-3">
                        <label className="form-label">邮箱</label>
                    </div>
                    <div className="column">
                        <XInput
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            errors={errors.email}
                        />
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-3">
                        <label className="form-label">密码</label>
                    </div>
                    <div className="column">
                        <XInput
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormChange}
                            errors={errors.password}
                        />
                    </div>
                </div>
                <div className="columns">
                    <div className="column is-3">
                        <label className="form-label">状态</label>
                    </div>
                    <div className="column">
                        <div className="control">

                            <XSelect
                                initValue={formData.status}
                                // value={formData.status}
                                onChange={handleStatusChange}
                                optionData={statusOptions}
                            />
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-3">
                    </div>
                    <div className="column">
                        <button type="submit" className={isSubmitting ? 'button is-primary is-loading' : 'button is-primary'} >
                            <span className="icon"><i className="fa fa-save"></i></span>
                            <span>保存</span>
                        </button>
                    </div>
                </div>

            </form>
        </XCard>

    )
}

export default Edit;
