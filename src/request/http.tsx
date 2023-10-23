import {fakeAuthProvider} from "../router/auth.tsx";
import {httpCode} from '../config/common.tsx'
import XNotification from '../components/alert/XNotificition.tsx'

const defaultHeaders = {
    'Content-Type': 'application/json',
    // 'cache-control': 'private, max-age=0',
}

// const baseUrl = 'http://be.gxservice.local';
const baseUrl = 'http://localhost:21080';

interface IHttpParams {
    method?: string
    url?: string
    queryParams?: any
    data?: any
    header?: any
    alert?: boolean
}

const getAuth = (header = {}) => {
    let headers = Object.assign({}, defaultHeaders, header);
    let user = fakeAuthProvider.user;
    if (user) {
        headers['Authorization'] = 'Bearer ' + user.access_token;
    }
    return headers;
}

export function httpGet({url, queryParams = {}, alert = false} : IHttpParams) {

    // 将参数对象转换为查询字符串
    const queryString = Object.keys(queryParams)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
        .join('&');

    // 构建完整的URL，包括查询字符串
    url = `${baseUrl}${url}?${queryString}`;

    return fetch(url, {
        headers: getAuth()
    }).then(response => {

        return handleResp(response, alert);
    }).catch(error => {
        console.error('There was an error!', error);
    });
}

export function httpPost({url, data, alert = false, header = {}} : IHttpParams) {

    return fetch(baseUrl + url, {
        method: 'post',
        headers: getAuth(header),
        body: data
    }).then(response => {

        return handleResp(response, alert);
    }).catch(error => {

        console.error('There was an error!', error);
    });
}

export function httpRequest({method, url, data, alert = false, header = {}} : IHttpParams) {

    return fetch(baseUrl + url, {
        method: method,
        headers: getAuth(header),
        body: data
    }).then(response => {

        return handleResp(response, alert);
    }).catch(error => {

        console.error('There was an error!', error);
    });
}

async function handleResp(response, alert = false) {

    /// handle fail
    if (!response.ok) {
        // get error message from body or default to response statusText
        const error =  response.statusText;

        if (response.status == httpCode.AUTH_EXPIRED) {
            XNotification.show({title: '认证到期，3秒后跳转到登录。'})
            await fakeAuthProvider.signout();
            // let timeoutClose = setInterval(() => {
            //     clearInterval(timeoutClose)
            //     window.location.replace('/');
            // }, 3000)
            return Promise.reject(error);
        }

        if (response.status == httpCode.AUTH_NOT_ALLOWED) {
            XNotification.show({title: '您没有执行此操作的权限。'})
            return Promise.reject(error);
        }

        XNotification.show({title: error})

        return Promise.reject(error);
    }

    let res = await response.json();

    if (res.meta.code != httpCode.SUCCESS && alert) {
        // XAlert.show({title: 'xxx'});
        XNotification.show({title: res.meta.msg != '' ?  res.meta.msg : '操作失败'})
    }

    if (res.meta.code == httpCode.SUCCESS && alert) {
        XNotification.show({title: res.meta.msg != '' ?  res.meta.msg : '操作成功', color: 'success'})
    }

    return res;

    // check for error response
    // if (!response.ok) {
    //     // get error message from body or default to response statusText
    //     const error = (data && data.message) || response.statusText;
    //     return Promise.reject(error);
    // }
}
