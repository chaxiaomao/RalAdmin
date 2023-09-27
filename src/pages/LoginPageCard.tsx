import React, {useEffect, useState} from 'react';
import {redirect, useLocation} from "react-router-dom";
import {fakeAuthProvider} from "../router/auth.tsx";
import {login} from "../request/api.tsx";
import {httpPost} from "../request/http.tsx";
import XInput from "../components/input/XInput.tsx";
import XCheckbox from "../components/checkbox/XCheckbox.tsx";
import XButton from "../components/button/XButton.tsx";
import {httpCode} from "../config/common.tsx";

function LoginPage() {
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
            return ;
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
        })).then(async res => {
            if (res.meta.code != httpCode.SUCCESS) {
                setErrors(res.data);
                setLoggingIn(false);
                return;
            }

            // window.location.replace(from);
            // if (res.data.hasOwnProperty('access_token')) {
            //
            // }

            await fakeAuthProvider.signin(res.data);

            setLoggingIn(false);

            window.location.replace(from);

        }).catch(err => {
            setLoggingIn(false);
        })

        // return redirect(from);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    return (

        <div className="setAsCenter">


            <div className="card-tim column is-3" style={{margin: "0 auto", minWidth: "360px"}}>
                <form action="" onSubmit={handleSubmit}>

                    <div className="card-header">
                        <h3 className="login-header">Log!n</h3>
                    </div>
                    <div className="card-body">

                        <XInput
                            type="text"
                            name="username"
                            value={formData.username}
                            placeholder="username"
                            onChange={handleFormChange}
                            errors={errors.username}
                            icon="fa fa-user"
                        />
                        <XInput
                            type="password"
                            name="password"
                            value={formData.password}
                            placeholder="password"
                            onChange={handleFormChange}
                            errors={errors.password}
                            icon="fa fa-lock"
                        />
                        <XCheckbox
                            label="Remember me"
                        />
                    </div>

                    <div className="card-footer">
                        <XButton
                            id="login"
                            text="Enter"
                            type="submit"
                            color="primary"
                            isLoading={isLoggingIn}
                        >
                        </XButton>
                    </div>

                </form>

            </div>

        </div>

    )
}

export default LoginPage;
