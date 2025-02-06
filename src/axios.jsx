import axios from "axios";
import LocalStorageService from "./services/localStorage";
import {logout} from "./redux/slices/auth";
import TokenService from "./services/token";

// const baseUrl = "https://5068-37-45-177-126.ngrok-free.app"
const baseUrl = "http://192.168.59.104:30012"

const instance = axios.create({
    baseURL: baseUrl
});
const localStorageService = new LocalStorageService()

export const interceptors = (store) => {
    instance.interceptors.request.use((config) => {
        const access_token = localStorageService.getAccessToken()

        config.headers.Authorization = `Bearer ${access_token}`

        return config
    })

    instance.interceptors.response.use(
        response => {
            return response
        },
        async (error) => {
            if (error.code !== "ERR_NETWORK") {
                const {config, response: {status}} = error;
                const originalRequest = config;
                const accessToken = localStorageService.getAccessToken()

                if (accessToken !== "null" && status === 401) {
                    const {dispatch} = store
                    const isRefreshedToken = await refreshTokens(dispatch)
                    if (!isRefreshedToken) {
                        await dispatch(logout())

                        return Promise.reject(error);
                    }

                    const accessToken = localStorageService.getAccessToken()
                    const retryOrigReq = new Promise((resolve, reject) => {
                        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                        resolve(axios(originalRequest));
                    });

                    return retryOrigReq;
                }
            }

            return Promise.reject(error);
        }
    );
}


const refreshTokens = async (dispatch, oldUserData) => {
    try {
        const tokenService = new TokenService()
        const url = `${baseUrl}${tokenService.refreshTokensEndpoint}`

        const tokenResponse = await axios.post(url, {
            refresh_token: localStorageService.getRefreshToken()
        })

        const userInfoResponse = tokenService.getUserInfo()
        if (oldUserData !== userInfoResponse.data){
            return false
        }

        localStorageService.setTokens(tokenResponse.data)

        return true
    } catch (error) {
        return false
    }

}


export default instance
