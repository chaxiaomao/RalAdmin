import React, {useEffect, useState} from 'react';
import {redirect, useLocation} from "react-router-dom";
import {httpPost} from "../../request/http.tsx";
import XForm from "../../components/form/XForm.tsx";

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

        let data = await httpPost('/admin/user/login', JSON.stringify({
            LoginForm: {
                username: formData.username,
                password: formData.password,
            }
        }))

        setLoggingIn(false);

        console.log(data)


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

        <XForm>
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
                                <p className="help is-danger">This email is invalid</p>
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
                                <p className="help is-danger">This email is invalid</p>
                            </div>
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column">
                            {/*<label htmlFor="acceso" className="label">Días de acceso: </label>*/}
                            <div className="control">
                                <input type="checkbox" id="remember" name="remember" value="Lunes"/>
                                &nbsp;&nbsp;&nbsp;Remember me
                                <label htmlFor="remember"></label>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className={isLoggingIn ? 'button is-primary is-loading' : 'button is-primary'} id="login">
                        <span className="icon"><i className="fa fa-save"></i></span>
                        <span>Login</span>
                    </button>
                </form>
            </div>
        </XForm>

    )
}

export default Edit;
