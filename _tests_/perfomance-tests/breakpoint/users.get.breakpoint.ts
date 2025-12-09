import http from "k6/http"
import { check, sleep } from "k6"

export const options = {
stages: [
    {duration:'20m', target: 10000},
    {duration:'20m', target: 12000},
    {duration:'30m', target: 15000}
]
}

export default () => {
    const res = http.get("http://localhost:8081/users")
    check(res, {
        "is status 200": (r) => r.status === 200,
    })
    sleep(1)
}
