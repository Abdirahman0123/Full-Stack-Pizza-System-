import axios from "axios";
import authHeader from "./AuthHeader";
class MenuService{

    getAllMenus() {
        return axios.get("https://localhost:7192/v1/api/menus")
    }

    getMenuById(id) {
        return axios.get(`https://localhost:7192/v1/api/menus/${id}`)
    }

    createMenue(menu) {
        return axios.post("https://localhost:7192/v1/api/menus", menu , 
            { headers: authHeader() })    
    }

    updateMenu(id, menu) {
        return axios.put(`https://localhost:7192/v1/api/menus/${id}`, menu , 
            { headers: authHeader() }
        )
    }
    deleteMenu(id) {
        return axios.delete(`https://localhost:7192/v1/api/menus/${id}`,
            { headers: authHeader() } 
        )
    }

}
export default new MenuService();