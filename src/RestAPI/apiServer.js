const server = "staging"
// const baseUrl = server === "staging" ? "http://13.250.224.209:8003/v1/api/" : null
// const baseUrl = server === "staging" ? "http://52.8.239.207:8000/v1/api/" : null
const baseUrl = server === "staging" ? "https://api.covidactionalert.com/v1/api/" : null
export { baseUrl }