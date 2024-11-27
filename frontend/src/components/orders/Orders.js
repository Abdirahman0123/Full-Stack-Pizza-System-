import React, {useEffect, useState} from 'react'
import OrderService from '../../services/OrderService';
import Swal from "sweetalert2"
import { Link } from 'react-router-dom';

const Orders = () => {

  const [orders, setOrders] = useState([]);
  
  const getOrders = () => {
    OrderService.getAllOrders()
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((e) => {
        console.log(e.response.data.errors);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const deleteOrder = (orderId, menuId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      OrderService.deleteOrder(orderId, menuId)
    .then((res) => {
      console.log("Done");
      window.location.reload();
    })
    .catch((e) => console.error(e.response));
    })
    
};
  return (
    
    <>
    
    <h2>Note: missing column values not eligible for Delivery</h2>
      <div className="d-flex justify-content-center">
        <table className="table mt-5 text-center w-auto  ">
          <thead>
            <tr>
              <th scope="col">Menu Id</th>
              <th scope="col">Delivery Option</th>
              <th scope="col">Quantity</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Address1</th>
              <th scope="col">Address2</th>
              <th scope="col">Street</th>
              <th scope="col">Post Code</th>
              <th scope="col">Total</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
              
              
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.menuId}</td>
                <td>{order.deliveryOption}</td>
                <td>{order.quantity}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.address1}</td>
                <td>{order.address2}</td>
                <td>{order.street}</td>
                <td>{order.postCode}</td>                            
                <td>{"£"+order.total}</td>
                <td>
                  <Link to={"/orders/" + order.orderId + "/" + order.menuId} className="btn btn-warning">
                    Edit
                  </Link>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteOrder(order.orderId, order.menuId)}>
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Orders