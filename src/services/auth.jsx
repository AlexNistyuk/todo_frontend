import AxiosService from "./axios";
import LocalStorageService from "./localStorage";

export default class AuthService {
    axiosService = AxiosService
    loginEndpoint = "/api/v1/auth/login/"
    registerEndpoint = "/api/v1/auth/register/"
    userInfoEndpoint = "/api/v1/token/user-info/"

    async signIn(params){
        const localStorageService = new LocalStorageService()

        try{
            const {data} = await this.axiosService.post(this.loginEndpoint, params)

            localStorageService.setTokens(data)
        } catch (error) {
            if (error?.response && error.response.status === 401){
                throw new Error(error.response.data.detail)
            }

            throw new Error(error.message)
        }

        try{
            const {data} = await this.axiosService.get(this.userInfoEndpoint)

            return data
        } catch (error) {
            localStorageService.removeTokens()

            if (error.response.status === 401){
                throw new Error(error.response.data.detail)
            }

            throw new Error(error)
        }
    }

    async signUp(params){
        try{
            await this.axiosService.post(this.registerEndpoint, params)
        } catch (error) {
            if (error?.response){
                return error.response.data.detail
            }
            return error.message
        }
    }
}