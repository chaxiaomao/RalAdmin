import React, {useEffect, useState} from 'react';
import XInput from "../../components/input/XInput.tsx";
import XCheckbox from "../../components/checkbox/XCheckbox.tsx";
import XSelect from "../../components/select/XSelect.tsx";
import XMultipleSelect from "../../components/select/XMultipleSelect.tsx";
import XCalendar from "../../components/calendar/XCalendar.tsx";

function Edit() {

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

    // const statusOptions = {'活动': 1, '停用': 2};
    const statusOptions = {
        '活动': 1,
        '停用': 2,
    };
    const statusOptions2 = {
        'Paris': 1,
        'Bucharest': 2,
        'Piatra  Neamt': 3,
        'New York': 4,
        'India': 5,
        'Rome': 6,
    };

    const [formData, setFormData] = useState({
        username: '',
        password: '',
        status: '',
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

        console.log(formData)

    };

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFormChange1 = (val) => {
    };


    return (

        <div className="">
            <XCalendar
                placeholder="日期"
            />
            <XSelect
                label="Status"
                value={formData.status}
                onChange={handleFormChange1}
                optionData={statusOptions}
            />
            <XMultipleSelect
                label="City"
                optionData={statusOptions2}
                onChange={handleFormChange1}
            />
            <br/>
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
