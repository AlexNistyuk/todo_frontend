import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000'
});

const instance2 = axios.create({
    baseURL: 'http://localhost:8001'
});

instance2.interceptors.request.use((config) => {
    const access_token = window.localStorage.getItem("access_token")

    config.headers.Authorization = `Bearer ${access_token}`

    return config
})


instance.interceptors.request.use((config) => {
    const access_token = window.localStorage.getItem("access_token")

    config.headers.Authorization = `Bearer ${access_token}`

    return config
})

instance2.interceptors.response.use(
  async (response) => {
    if (response.status === 200){
        const new_tokens = await instance2.post("/api/v1/token/refresh/", {
            refresh_token: window.localStorage.getItem("refresh_token")
        })

        console.log(new_tokens)
    }

    return response;
  },
);

export default instance