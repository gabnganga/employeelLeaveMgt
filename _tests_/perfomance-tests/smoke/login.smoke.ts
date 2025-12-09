import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
    vus: 30,
    duration: "30s",
}

export default () => {
    const url = "http://localhost:8081/login"
    const payload =JSON.stringify({
        email:"tester002@gmail.com",
        password: "tester"
    })

    const params = {
        headers: {
        'Content-Type':'application/json',
        }
    }
    const res = http.post(url, payload, params)
    check(res, {
        "is status 200": (r) => r.status === 200,
        "has token":(res) => {
            return res.json('token') !== undefined
        }
    })
    sleep(1)
}
