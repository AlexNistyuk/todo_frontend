import axios from "../axios";

export default class AxiosService {
    static async get(url, config=null){
        return await axios.get(url, config)
    }

    static async patch(url, data){
        return await axios.patch(url, data)
    }
}