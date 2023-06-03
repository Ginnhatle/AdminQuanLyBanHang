import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3030/mv-core/v1",
    headers: {
        "Content-type": "application/json"
    }
});