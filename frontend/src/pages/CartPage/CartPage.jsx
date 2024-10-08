import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../components/errormessage/errormessage';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';
import {
  addItemToCart,
  removeItemFromCart,
} from '../../redux/reducers/cart/cart.actions';

const CartPage = ({ match, location, history }) => {
  const productId = match.params.id;
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productId) {
      dispatch(addItemToCart(productId, quantity));
    }
  }, [dispatch, productId, quantity]);

  const removeItemFromCartHandler = (id) => {
    dispatch(removeItemFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };
  return (
    <Row>
      <Col md={8} className='bg-dark text-white'>
        <h1 className='bg-dark text-white'>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <ErrorMessage>
            Your Cart Is Empty! <Link to='/'>Go Back</Link>
          </ErrorMessage>
        ) : (
          <ListGroup variant='flush' className='bg-dark text-white'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} className='bg-dark text-white'>
                <Row className='bg-dark text-white'>
                  <Col md={2} className='bg-dark text-white'>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3} className='bg-dark text-white'>
                    <Link to={`/product/${item.product}`} className='bg-dark text-white'>{item.name}</Link>
                  </Col>
                  <Col md={2} >${(item.price * item.quantity).toFixed(2)}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          addItemToCart(item.product, Number(e.target.value))
                        )
                      }
                      className='bg-dark text-white'
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeItemFromCartHandler(item.product)}
                      className='bg-dark text-white'
                    >
                      <i className='fas fa-trash '></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
            <Row>
              <Col md={9}></Col>
              <Col md={3}>
                {cartItems.length > 0 && (
                  <Link className='btn btn-block my-3' style={{ color: 'white',backgroundColor:'black' }} to='/'>
                    Go Back
                  </Link>
                )}
              </Col>
            </Row>
          </ListGroup>
        )}
      </Col>
      <Col md={4} >
        
        <Card className=' text-black'>
        
          <ListGroup variant='flush' className='bg-dark text-black'>
            <ListGroup.Item >
              <h2 className=' text-black'>
                Subtotal (
                {cartItems.reduce(
                  (accumulator, item) => accumulator + item.quantity,
                  0
                )}
                ) Items
              </h2>
              $
              {cartItems
                .reduce(
                  (accumulator, item) =>
                    accumulator + item.quantity * item.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartPage;
