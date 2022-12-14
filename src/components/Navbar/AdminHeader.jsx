import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from "react-router-dom";

class AdminHeader extends React.Component{
  render() {
    let log = <></> 

    const isUserLoggedIn = () => {
      let id = localStorage.getItem("userId")
      console.log(id)
      if(id != null) {
        return true;
      }
      return false;
    }

    const handleLogoutClick = () => {
      console.log("Delete id")
      localStorage.removeItem("userId");
      window.location.reload();
    }
  

    if(!isUserLoggedIn()) {
      log =  <Nav.Link><Link to="/login">Login</Link></Nav.Link>
    } else {
      log = <><Nav.Link> <Link to="/orders">My Orders</Link></Nav.Link><Nav.Link onClick={handleLogoutClick}>Logout</Nav.Link></>
    }
  return (
    <>
      <Navbar bg="dark" variant="dark" className='col-md-12'>
      <Navbar.Brand className='mx-5'>
      <Link to="/">
        GrocerHQ
      </Link>
      </Navbar.Brand>
        <Container className='d-flex flex-row-reverse'>
           <Nav className='d-flex flex-row'>
            <Nav.Link>
            <Link to="/update">Update</Link>
            </Nav.Link>
            <Nav.Link>
            <Link to="/create">Create</Link>
            </Nav.Link>
            <Nav.Link>
            <Link to="/orders">Orders</Link>
            </Nav.Link>
            {log}
          </Nav>
        </Container>
      </Navbar>
      <br />
    </>
  );
}
}
export default AdminHeader;