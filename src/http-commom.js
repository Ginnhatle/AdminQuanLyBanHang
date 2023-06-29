import axios from "axios";

export default axios.create({
    baseURL: "http://13.54.43.177:3030/mv-core/v1",
    headers: {
        "Content-type": "application/json"
    }
});