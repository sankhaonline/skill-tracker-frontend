import axios from 'axios';

const HOST_URL = "http://ec2-174-129-182-7.compute-1.amazonaws.com:2000";

const USER_CMD_API_BASE_URL = HOST_URL + "/api/v1/user";

const USER_QUERY_API_BASE_URL = HOST_URL + "/api/v1/user";
const USER_CMD_SIGNUP_BASE_URL = HOST_URL + "/signup";

class UserService {

    findToken(userName, password) {
        var details = {
            'username': userName,
            'password': password,
            'grant_type': 'password'
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic c2tpbGx0cmFja2VyQ2xpZW50OnNraWxsdHJhY2tlclNlY3JldA=='
        }

        return axios.post(HOST_URL + '/oauth/token', formBody, {
            headers: headers
        });
    }

    createUser(user, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.post(USER_CMD_API_BASE_URL + '/createUser', user, {
            headers: headers
        });
    }

    registerUser(user) {
        const headers = {
            'Content-Type': 'application/json'
        }
        return axios.post(USER_CMD_SIGNUP_BASE_URL + '/registerUser', user, {
            headers: headers
        });
    }

    findUserByName(user, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.post(USER_QUERY_API_BASE_URL + '/name', user, {
            headers: headers
        });
    }

    getUsers(token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(USER_QUERY_API_BASE_URL, {
            headers: headers
        });
    }

    /* updateUser(user, userId, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.put(USER_CMD_API_BASE_URL + '/updateUser/' + userId, user, {
            headers: headers
        });
    }

    deleteUser(user, userId, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.put(USER_CMD_API_BASE_URL + '/removeUser/' + userId, user, {
            headers: headers
        });
    } */

    /* findUserById(userId, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        return axios.post(USER_QUERY_API_BASE_URL + '/byId/', userId, {
            headers: headers
        });
    } */

    /* searchUserByFilter(filter, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        return axios.post(USER_QUERY_API_BASE_URL + '/byFilter/', filter, {
            headers: headers
        });
    } */

}

export default new UserService()