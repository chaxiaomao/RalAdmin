import React, {useEffect, useState} from 'react';
import {redirect, useLocation} from "react-router-dom";
import {httpPost} from "../../request/http.tsx";
import XForm from "../../components/form/XForm.tsx";
import XInput from "../../components/input/XInput.tsx";
import XCheckbox from "../../components/checkbox/XCheckbox.tsx";
import XSelect from "../../components/select/XSelect.tsx";

function Edit() {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    const [errors, setErrors] = useState({
        username: '',
        password: '',
    })
    const [isLoggingIn, setLoggingIn] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault(); // 阻止表单的默认提交行为

        // 执行你想要的操作，如表单验证、数据处理等
        // var username = document.querySelector('input[name="username"]').value;
        // var password = document.querySelector('input[name="password"]').value;


        // 执行你想要的操作，如表单验证、数据处理等
        if (formData.username === '' || formData.password === '') {
            alert('Please fill in all fields.');
            return;
        }

        // 在这里可以进行表单提交或其他操作

        setLoggingIn(true);

        // let data = await login(formData.username, formData.password);
        // let data = await login(formData.username, formData.password);

        let res = await httpPost('/admin/user/login', JSON.stringify({
            LoginForm: {
                username: formData.username,
                password: formData.password,
            }
        }))

        setLoggingIn(false);

        if (res.meta.code != '000') {
            setErrors(res.data);
        }

        console.log(res)

        // return redirect(from);
    };

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (

        <div className="message-body field">
            <XSelect />
            <form action="" onSubmit={handleSubmit}>
            <div className="columns">
                <div className="column">
                    <XInput
                        type="text"
                        name="username"
                        value={formData.username}
                        placeholder="username"
                        onChange={handleFormChange}
                        errors={errors.username}
                        />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    {/*<label htmlFor="nombre" className="label"></label>*/}
                    <XInput
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="password"
                        onChange={handleFormChange}
                        errors={errors.password}
                    />
                </div>
            </div>
            <div className="columns">
                <div className="column">
                    {/*<label htmlFor="acceso" className="label">Días de acceso: </label>*/}
                    <div className="control">

                        <XCheckbox
                            label="Remember me"
                        />
                    </div>
                </div>
            </div>
            <button type="submit" className={isLoggingIn ? 'button is-primary is-loading' : 'button is-primary'}
                    id="login">
                <span className="icon"><i className="fa fa-save"></i></span>
                <span>Login</span>
            </button>
            </form>
        </div>

    )
}

export default Edit;
