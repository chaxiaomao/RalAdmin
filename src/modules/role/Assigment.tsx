import React, {useEffect, useState} from 'react';
import {httpGet, httpPost} from "../../request/http.tsx";
import {httpCode} from "../../config/common.tsx";
import XCard from "../../components/card/XCard.tsx";
import {Link, useNavigate} from "react-router-dom";
import XMultipleSelect from "../../components/select/XMultipleSelect.tsx";

function Assigment() {

    const navigate = useNavigate();

    const [isSubmitting, setSubmitting] = useState(false);
    const [initItemOptions, setInitItemOptions] = useState([])
    const [itemOptions, setItemOptions] = useState([])
    const [itemName, setItemName] = useState("")
    const [formData, setFormData] = useState([])

    useEffect(() => {

        let params = new URLSearchParams(location.search);
        let id = params.get("id");
        if (id) {
            setItemName(id)
            httpGet({
                url: '/admin/permission/options',
                queryParams: {id: id}
            }).then(async res => {
                if (res.meta.code == httpCode.SUCCESS) {
                    setItemOptions(res.data.options)
                    setInitItemOptions(res.data.children)
                }
            })
        }

    }, [])

    const handleSubmit = (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为

        setSubmitting(true);

        httpPost({
            url: '/admin/role/assigment-item?id=' + itemName,
            alert: true,
            data: JSON.stringify({
                items: formData
            })
        }).then(async res => {
            if (res.meta.code == httpCode.SUCCESS) {

            }
            setSubmitting(false);

        }).catch(err => {
            setSubmitting(false);
        })

    };

    const handlePermissionChange = (data) => {
        let fd = [];
        Object.keys(data).map((key, idx) => {
            fd.push(data[key]);
        })
        // setFormData([...formData, data.value]);
        setFormData(fd);
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

            <div className="column">
                <p>{itemName} 权限</p>
            </div>

            <div className="column">
                <XMultipleSelect
                    initValue={initItemOptions}
                    // value={formData.status}
                    onChange={handlePermissionChange}
                    optionData={itemOptions}
                />
            </div>

            <div className="column">
                <button onClick={handleSubmit} className={isSubmitting ? 'button is-primary is-loading' : 'button is-primary'} >
                    <span className="icon"><i className="fa fa-save"></i></span>
                    <span>保存</span>
                </button>
            </div>

        </XCard>

    )
}

export default Assigment;
