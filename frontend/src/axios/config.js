import axios from "axios"

const partyFecth = axios.create({
    baseURL: "https://party-time-r5i2.onrender.com/api/", 
    headers:{
        "Content-Type": "application/json",
    },
})

export default partyFecth;