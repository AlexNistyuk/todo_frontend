import AxiosService from "./axios";
import axiosService from "./axios";

export default class TokenService {
    axiosService = AxiosService
    userInfoEndpoint = "/api/v1/token/user-info/"
    refreshTokensEndpoint = "/api/v1/token/refresh/"
    verifyEndpoint = "/api/v1/token/verify/"

    async getUserInfo(){
        const {data} = await this.axiosService.get(this.userInfoEndpoint)

        return data
    }

    async verify(){
        await axiosService.get(this.verifyEndpoint)
    }
}