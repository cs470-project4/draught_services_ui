import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(user_id) {
        return axiosAgent.get(`login/${user_id}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async allRoutes() {
        return axiosAgent.get(`routes/all-routes`);
    }

    async routesWithID(routeID) {
        return axiosAgent.get(`routes/${routeID}`);
    }

    async allMarkets() {
        return axiosAgent.get(`markets/all-markets`);
    }

    async allEmployees() {
        return axiosAgent.get(`employees/all-employees`);
    }

    // transactions total count
    async getTransactionsCount() {
        return axiosAgent.get(`transactions/transaction-count`);
    }

    // transactions by accountID
    async transactionsByAccount(accountID) {
        return axiosAgent.get(`transactions/account/${accountID}`);
    }

    // transactions by routeID
    async transactionsByRoute(routeID) {
        return axiosAgent.get(`transactions/route/${routeID}`);
    }

    // transactions for all routes
    async transactionsForAllRoutes() {
        return axiosAgent.get(`transactions/all-routes`);
    }

    // transactions by marketID
    async transactionsByMarket(marketID) {
        return axiosAgent.get(`transactions/market/${marketID}`);
    }

}