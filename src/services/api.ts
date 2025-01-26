import axios from "axios";

export const api = axios.create({
  baseURL: "https://openlibrary.org/search.json?",
  headers:{
    "Content-Type": "application/json"
  }
})
