import React, {useEffect, useState} from 'react';
import {redirect, useLocation} from "react-router-dom";
import {fakeAuthProvider} from "../router/auth.tsx";
import {login} from "../request/api.tsx";
import {httpPost} from "../request/http.tsx";

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
        }))

        setLoggingIn(false);

        if (res.meta.code != '000') {
            setErrors(res.data);
        }

        // window.location.replace(from);
        if (res.data.hasOwnProperty('access_token')) {
            await fakeAuthProvider.signin(res.data);
            window.location.replace(from);
        }

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

        <div className="setAsCenter background0">
            <div className="container column is-3">
                <article className="message is-primary">
                    <div className="message-header ">
                        <h2>Admin Panel</h2>
                    </div>
                    <div className="message-body field">
                        <form action="" onSubmit={handleSubmit}>
                            <div className="columns">
                                <div className="column">
                                    {/*<label htmlFor="nombre" className="label"></label>*/}
                                    <div className="field">
                                        <div className="control has-icons-left">
                                            <input
                                                type="text"
                                                className="input"
                                                name="username"
                                                value={formData.username}
                                                placeholder="username"
                                                onChange={handleFormChange}
                                                // onChange={(e) => handleFormChange(e.target.value)}
                                            />
                                            <span className="icon is-small is-left"><i className="fa fa-user"></i></span>
                                        </div>
                                        {errors.username ? <p className="help is-danger"> {errors.username[0]} </p> : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    {/*<label htmlFor="nombre" className="label"></label>*/}
                                    <div className="field">
                                        <div className="control has-icons-left">
                                            <input
                                                type="password"
                                                className="input"
                                                name="password"
                                                value={formData.password}
                                                placeholder="password"
                                                onChange={handleFormChange}
                                                // onChange={(e) => handleFormChange(e.target.value)}
                                            />
                                            <span className="icon is-small is-left"><i className="fa fa-lock"></i></span>
                                        </div>
                                        {errors.password ? <p className="help is-danger"> {errors.password[0]} </p> : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="columns">
                                <div className="column">
                                    {/*<label htmlFor="acceso" className="label">Días de acceso: </label>*/}
                                    <div className="control">
                                        <div className="form-check">
                                            <label className="form-check-label">
                                                <input type="checkbox" className="form-check-input"  />
                                                <span className="form-check-sign">Remember me</span>
                                            </label>
                                        </div>

                                        {/*<input type="checkbox" id="remember" name="remember" value="Lunes"/>*/}
                                        {/*&nbsp;&nbsp;&nbsp;Remember me*/}
                                        {/*<label htmlFor="remember"></label>*/}
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className={isLoggingIn ? 'button is-primary is-loading' : 'button is-primary'} id="login">
                                <span className="icon"><i className="fa fa-save"></i></span>
                                <span>Login</span>
                            </button>
                        </form>
                    </div>
                </article>
            </div>
        </div>

    )
}

export default LoginPage;
