import { Link, useParams, useparams } from 'react-router-dom';
import { 
    Row, 
    Col, 
    ListGroup, 
    Image, 
    Form, 
    Button, 
    Card } 
    from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const { data: order, refetch, isLoading, isError } = useGetOrderDetailsQuery(orderId);
    console.log(order);
  return (
    <div >Order Screen    </div>
  )
}

export default OrderScreen
