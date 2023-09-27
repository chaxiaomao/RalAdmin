import {fakeAuthProvider} from "../router/auth.tsx";
import {httpCode} from '../config/common.tsx'
import Swal from 'sweetalert2'

const defaultHeaders = {'Content-Type': 'application/json'}

const baseUrl = 'http://be.gxservice.local';
// const baseUrl = 'http://localhost:80';

const Toast = Swal.mixin({
    // html: '<a class="button is-primary">Primary</a>',
    showCancelButton: false,
    showConfirmButton: false,
    showCloseButton: true,
    showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
    }
})

const getAuth = (header = {}) => {

    let headers = Object.assign({}, {'Content-Type': 'application/json'}, header);
    let user = fakeAuthProvider.user;
    if (user) {
        headers['Authorization'] = 'Bearer ' + user.access_token;
    }
    return headers;
}

async function alertAuth() {
    await fakeAuthProvider.signout();
    let timerInterval
    Toast.fire({
        icon: 'question',
        title: '认证到期，3秒后跳转到登录..',
        // html: '认证到期，3秒后跳转到登录...',
        timer: 3000,
        timerProgressBar: true,
        position: 'top-end',
        willClose: () => {
            clearInterval(timerInterval)
        }
    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            window.location.replace('/');
        }
    })
}

export function httpGet(url, queryParams = {}, alert = false) {

    // 将参数对象转换为查询字符串
    const queryString = Object.keys(queryParams)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
        .join('&');

    // 构建完整的URL，包括查询字符串
    url = `${baseUrl}${url}?${queryString}`;

    return fetch(url, {
        headers: getAuth()
    }).then(response => {

        return handleResp(response);
    }).catch(error => {
        console.error('There was an error!', error);
    });
}

export function httpPost(url, data, alert = false, header = {}) {
    return fetch(baseUrl + url, {
        method: 'post',
        headers: getAuth(header),
        body: JSON.stringify(data)
    }).then(response => {

        return handleResp(response);
    }).catch(error => {

        console.error('There was an error!', error);
    });
}

async function handleResp(response) {
    if (!response.ok) {
        // get error message from body or default to response statusText
        const error =  response.statusText;

        if (response.status == httpCode.AUTH_EXPIRED) {
            await alertAuth();
            return Promise.reject(error);
        }

        await Toast.fire({
            // icon: 'error',
            title: error,
            position: 'top',
        })

        return Promise.reject(error);
    }

    let res = await response.json();

    if (res.meta.code != httpCode.SUCCESS && alert) {
        await Toast.fire({
            // icon: 'warning',
            title: res.meta.msg,
            position: 'top',
        })
    }

    // const Toast = Swal.mixin({
    //     toast: true,
    //     position: 'top-end',
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //     didOpen: (toast) => {
    //         toast.addEventListener('mouseenter', Swal.stopTimer)
    //         toast.addEventListener('mouseleave', Swal.resumeTimer)
    //     }
    // })

    return res;

    // check for error response
    // if (!response.ok) {
    //     // get error message from body or default to response statusText
    //     const error = (data && data.message) || response.statusText;
    //     return Promise.reject(error);
    // }
}