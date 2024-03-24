export default class LocalStorageService {
    accessTokenKey = "access_token"
    refreshTokenKey = "refresh_token"

    getAccessToken(){
        return window.localStorage.getItem(this.accessTokenKey)
    }

    setAccessToken(accessToken){
        window.localStorage.setItem(this.accessTokenKey, accessToken)
    }

    removeAccessToken(){
        this.setAccessToken(null)
    }

    getRefreshToken(){
        return window.localStorage.getItem(this.refreshTokenKey)
    }

    setRefreshToken(refreshToken){
        window.localStorage.setItem(this.refreshTokenKey, refreshToken)
    }

    removeRefreshToken(){
        this.setRefreshToken(null)
    }

    setTokens(tokens){
        this.setAccessToken(tokens.access_token)
        this.setRefreshToken(tokens.refresh_token)
    }

    removeTokens(){
        this.removeAccessToken()
        this.removeRefreshToken()
    }

}