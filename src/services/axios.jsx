import axios from "../axios";

export default class AxiosService {
    static async get(url, config=null){

        return await axios.get(url, config)
    }

    static async patch(url, data){
        return await axios.patch(url, data)
    }

    static async post(url, data=null){
        return await axios.post(url, data)
    }

    static async delete(url, config=null){
        return await axios.delete(url, config)
    }
}