import axios from "axios";
import authHeader from "./AuthHeader";
class OrderService{

    getAllOrders() {
        return axios.get("https://localhost:7192/v1/api/orders",
            { headers: authHeader() })  
    }

    getOrderById(menuId, orderId) {
        return axios.get(`https://localhost:7192/v1/api/orders/${menuId}/${orderId}`,
            { headers: authHeader() }) 
    }

    createOrder(order) {
        return axios.post("https://localhost:7192/v1/api/orders", order , 
            { headers: authHeader() })    
    }

    updateOrder(orderId, menuId, order) {
        return axios.put(`https://localhost:7192/v1/api/orders/${orderId}/${menuId}`, order , 
            { headers: authHeader() })
        
    }
   
    deleteOrder(orderId, menuId) {
        return axios.delete(`https://localhost:7192/v1/api/orders/${orderId}/${menuId}`,
            { headers: authHeader() } 
        )
    }

}
export default new OrderService();