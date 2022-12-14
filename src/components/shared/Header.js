import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import RequireAuth from './RequireAuth'
import RequireFreelancer from './RequireFreelancer'
const linkStyle = {
    color: 'white',
    textDecoration: 'none'
}

const freelancerOptions = (
		<>
			<Nav.Item className="m-2">
				<Link to='services/create-service' style={linkStyle}>
					Create Service
				</Link>
			</Nav.Item>
		</>
)
const profileShowOptions = (
		<>
			<Nav.Item className="m-2">
				<Link to='profile' style={linkStyle}>
					Show Profile
				</Link>
			</Nav.Item>
		</>
)
const profileAddOptions = (
		<>
			<Nav.Item className="m-2">
				<Link to='profile/create' style={linkStyle}>
					Add Profile
				</Link>
			</Nav.Item>
		</>
)

const profileOptions = (
	<>
		<Nav.Item className="m-2">
			<Link to='services/create-service' style={linkStyle}>
				Create Service
			</Link>
		</Nav.Item>
	</>
)

const authenticatedOptions = (
	<>
		<Nav.Item className="m-2">
			<Link to='change-password' style={linkStyle}>
				Change Password
			</Link>
		</Nav.Item>

		<Nav.Item className="m-2">
			<Link to='sign-out' style={linkStyle}>
				Sign Out
			</Link>
		</Nav.Item>
	</>
)

const unauthenticatedOptions = (
	<>
        <Nav.Item className="m-2">
			<Link to='sign-up' style={linkStyle}>Sign Up</Link>
        </Nav.Item>
        <Nav.Item className="m-2">
			<Link to='sign-in' style={linkStyle}>Sign In</Link>
        </Nav.Item>
	</>
)

const alwaysOptions = (
	<>
		<Nav.Item className="m-2">
			<Link to='/' style={linkStyle}>
				Home
			</Link>
		</Nav.Item>
		<Nav.Item className="m-2">
			<Link to='/services/' style={linkStyle}>
				View All Services
			</Link>
		</Nav.Item>
	</>
)

const Header = ({ user }) => (
	<Navbar bg='dark' variant='dark' expand='md' style={{border: '2px solid black'}}>
		<Navbar.Brand>
            <Link to='/' style={linkStyle} className='m-2'>
                <image scr='/Users/jacobclapper/sei/projects/project-3/client/Scumptious_Bunch_Client/Project3Client/public/favicon.ico'></image>Freelancr
            </Link>
        </Navbar.Brand>
		<Navbar.Toggle aria-controls='basic-navbar-nav' />
		<Navbar.Collapse id='basic-navbar-nav'>
			<Nav className='ml-auto'>
				{user && (
					<span className='navbar-text mr-2'>Welcome, <span style={{color: 'lightgreen'}}>{user.email}</span></span>
				)}
				{alwaysOptions}
				{user && user.isFreelancer ? freelancerOptions : null}
				{user && user.profile ? profileShowOptions : null}
				{user && !user.profile ? profileAddOptions : null}
				{user ? authenticatedOptions : unauthenticatedOptions}
			</Nav>
		</Navbar.Collapse>
	</Navbar>
)

export default Header
