import React from 'react'
import {Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'


const CheckoutSteps = ({step1,step2,step3,step4}) => {
    return (
        <Nav className='justify-content-center mb-4 ' >
            <Nav.Item>
                {step1 ? (<LinkContainer to='/login' style={{ backgroundColor:'black',color: 'white' }}>
                <Nav.Link >Sign In</Nav.Link>
                </LinkContainer>):<Nav.Link disabled >Sign In</Nav.Link>}

            </Nav.Item>
            <Nav.Item>
                {step2 ? (<LinkContainer to='/shipping' style={{ backgroundColor:'black',color: 'white' }}>
                <Nav.Link>Shipping</Nav.Link>
                </LinkContainer>):<Nav.Link disabled>Shipping</Nav.Link>}
                
            </Nav.Item>

            <Nav.Item>
                {step3 ? (<LinkContainer to='/payment' style={{ backgroundColor:'black',color: 'white' }}>
                <Nav.Link>Payment</Nav.Link>
                </LinkContainer>):<Nav.Link disabled>Payment</Nav.Link>}
                
            </Nav.Item>

            <Nav.Item>
                {step4 ? (<LinkContainer to='/placeorder'style={{ backgroundColor:'black',color: 'white' }}>
                <Nav.Link>Place Order</Nav.Link>
                </LinkContainer>):<Nav.Link disabled>Place Order</Nav.Link>}
                
            </Nav.Item>
            
        </Nav>
    )
}

export default CheckoutSteps
