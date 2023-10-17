import React, {useEffect, useState} from 'react';
import XInput from "../../components/input/XInput.tsx";
import XSelect from "../../components/select/XSelect.tsx";
import {httpGet, httpPost} from "../../request/http.tsx";
import {httpCode} from "../../config/common.tsx";
import XCard from "../../components/card/XCard.tsx";
import {Link, useNavigate} from "react-router-dom";
import XTextarea from "../../components/input/XTextarea.tsx";

function Edit() {

    const navigate = useNavigate();

    const [isSubmitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({})
    const [itemName, setItemName] = useState("")
    const [routeOptions, setRouteOptions] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        type: '',
        description: '',
        rule_name: '',
        data: '',
    })

    useEffect(() => {

        let params = new URLSearchParams(location.search);
        let id = params.get("id");

        if (id) {
            httpGet({
                url: '/admin/permission/edit',
                queryParams: {id: id}
            }).then(async res => {
                if (res.meta.code == httpCode.SUCCESS) {
                    setData(res.data)
                }
            })
        }

        httpGet({
            url: '/admin/route/index',
        }).then(async res => {
            if (res.meta.code == httpCode.SUCCESS) {
                setRouteOptions(res.data.available)
            }
        }).catch(e => {

        })

    }, [])

    function setData(data) {
        setItemName(data.name)
        setFormData({
            name: data.name,
            type: data.type,
            description: data.description ? data.description : '',
            rule_name: data.rule_name ? data.rule_name : '',
            data: data.data ? data.data : '',
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为


        // 执行你想要的操作，如表单验证、数据处理等
        if (formData.name === '') {
            setErrors({name: '请填入名称'})
            return ;
        }

        setSubmitting(true);

        httpPost({
            url: '/admin/permission/edit?id=' + itemName,
            alert: true,
            data: JSON.stringify({
                Permission: formData
            })
        }).then(async res => {
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

    const handleRouteChange = (data) => {
        setFormData((prevData) => ({
            ...prevData,
            name: data.value,
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

            <form className="" action="" onSubmit={handleSubmit}>
                <div className="columns">
                    <div className="column">
                        <label>名字</label>
                        {/*<XInput*/}
                        {/*    type="text"*/}
                        {/*    name="name"*/}
                        {/*    value={formData.name}*/}
                        {/*    onChange={handleFormChange}*/}
                        {/*    errors={errors.name}*/}
                        {/*/>*/}

                        <XSelect
                            initValue={formData.name}
                            // value={formData.status}
                            onChange={handleRouteChange}
                            optionData={routeOptions}
                            customerAble={true}
                        />


                    </div>

                    <div className="column">
                        <label>描述</label>
                        <XInput
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleFormChange}
                            errors={errors.description}
                        />
                    </div>

                    <div className="column">
                        <label>规则名字</label>
                        <XInput
                            type="text"
                            name="rule_name"
                            value={formData.rule_name}
                            onChange={handleFormChange}
                            errors={errors.rule_name}
                        />
                    </div>

                </div>

                <div className="columns">
                    <div className="column is-one-third-tablet">
                        <label>数据</label>
                        <XTextarea
                            type="textarea"
                            name="data"
                            value={formData.data}
                            onChange={handleFormChange}
                            errors={errors.data}
                        />
                    </div>
                </div>

                <div className="columns">
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
