import axios from 'axios';

const HOST_URL = "http://ec2-174-129-182-7.compute-1.amazonaws.com:2000";

const SKILL_TRACKER_CMD_API_BASE_URL = HOST_URL + "/skill-tracker/api/v1/engineer";

const SKILL_TRACKER_QUERY_API_BASE_URL = HOST_URL + "/skill-tracker/api/v1/admin";
class SkillTrackerService {

    createEmployee(employee, jsToken) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jsToken
        }
        return axios.post(SKILL_TRACKER_CMD_API_BASE_URL + '/add-profile', employee, {
            headers: headers
        });
    }

    updateEmployee(employee, employeeId, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.put(SKILL_TRACKER_CMD_API_BASE_URL + '/update-profile/' + employeeId, employee, {
            headers: headers
        });
    }

    deleteEmployee(employeeId, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.delete(SKILL_TRACKER_CMD_API_BASE_URL + '/delete-profile/' + employeeId, {
            headers: headers
        });
    }

    getEmployeeById(employeeId, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Id/' + employeeId, {
            headers: headers
        });
    }

    getEmployeeByName(employeeName, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Name/' + employeeName, {
            headers: headers
        });
    }

    getEmployeeBySkill(skillName, token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL + '/Skill/' + skillName, {
            headers: headers
        });
    }

    getEmployees(token) {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
        return axios.get(SKILL_TRACKER_QUERY_API_BASE_URL, {
            headers: headers
        });
    }
}

export default new SkillTrackerService();