import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000/api";

const sendRequest = async (method, route, body) => {
  const response = await axios.request({
    method: method,
    url: route,
    data: body,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (response.status === 401) {
    localStorage.removeItem("token");
  }

  return response;
};

export default sendRequest;