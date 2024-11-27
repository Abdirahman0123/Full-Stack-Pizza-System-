import axios from "axios";
const API_URL = "http://localhost:8080/auth/";
class AuthService {
  login(formData) {
    return axios.post("https://localhost:7192/v1/api/users/login", formData);
  }

  register(formData) {
    axios
      .post("https://localhost:7192/v1/api/users/register", formData)
      .then((response) => response.data)
  
      .catch((error) => {
        console.log(error.response.data);
      });
  }
  // logout method
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
