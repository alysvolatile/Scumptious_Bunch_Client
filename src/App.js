// import React, { Component, Fragment } from 'react'
import React, { useState, Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// import AuthenticatedRoute from './components/shared/AuthenticatedRoute'
import AutoDismissAlert from './components/shared/AutoDismissAlert/AutoDismissAlert'
import Header from './components/shared/Header'
import RequireAuth from './components/shared/RequireAuth'
import RequireFreelancer from './components/shared/RequireFreelancer'
import Home from './components/Home'
import SignUp from './components/auth/SignUp'
import SignIn from './components/auth/SignIn'
import SignOut from './components/auth/SignOut'
import ChangePassword from './components/auth/ChangePassword'
import ShowAllServices from './components/services/ShowAllServices.js'
import ShowService from './components/services/ShowService.js'
import CreateService from './components/services/CreateService'
import FreelancerIndex from './components/freelancers/FreelancerIndex'
import ShowFreelancer from './components/freelancers/ShowFreelancer'
import CreateProfile from './components/profile/CreateProfile'
// import ShowProfile from './components/profile/ShowProfile'
import ShowProfiles from './components/profile/ShowProfile'
import StripeContainer from './components/stripe/StripeContainer'

const App = () => {

	const [user, setUser] = useState(null)
	const [msgAlerts, setMsgAlerts] = useState([])
	const [updatedProfile, setUpdatedProfile] = useState({})
	console.log('user in app', user)
	console.log('message alerts', msgAlerts)
	const clearUser = () => {
		console.log('clear user ran')
		setUser(null)
	}

		const deleteAlert = (id) => {
			setMsgAlerts((prevState) => {
				return (prevState.filter((msg) => msg.id !== id) )
			})
		}

		const msgAlert = ({ heading, message, variant }) => {
			const id = uuid()
			setMsgAlerts(() => {
				return (
					[{ heading, message, variant, id }]
		)
			})
		}

		return (
			<Fragment>
				<Header user={user} />
				<Routes>
					<Route path='/' element={<Home msgAlert={msgAlert} user={user} />} />
					<Route
						path='/sign-up'
						element={<SignUp msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
						path='/sign-in'
						element={<SignIn msgAlert={msgAlert} setUser={setUser} />}
					/>
					<Route
					path='/sign-out'
					element={
						<RequireAuth user={user}>
						<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
					}
					/>
					<Route
					path='/change-password'
					element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
					<Route
						path="/services/"
						element={ <ShowAllServices msgAlert={msgAlert} user={user} />} 
					/>
					<Route
						path="/services/create-service"
						element={ 
							<RequireFreelancer user={user}>
								<CreateService msgAlert={msgAlert} user={user} />
							</RequireFreelancer>
							} 
					/>
					<Route
						path="/services/:id"
						element={ <ShowService msgAlert={msgAlert} user={user}/>} 
					/>
					<Route
						path="/services/user/:id"
						element={ <ShowService msgAlert={msgAlert} user={user} />} 
					/>
					<Route
						path="/services/"
						element={ 
							<RequireAuth user={user}>
								<CreateService msgAlert={msgAlert} user={user} /> 
							</RequireAuth>
						}
					/>
					<Route
						path="/profile/:userId"
						element={ 
							<RequireAuth user={user} > 
								<CreateProfile msgAlert={msgAlert} user={user} setUpdatedProfile={setUpdatedProfile}/> 
							</RequireAuth>
						}
					/>
					<Route
						path="/profile"
						element={ 
							<RequireAuth user={user}>
								<ShowProfiles msgAlert={msgAlert} user={user} setUser={setUser} updatedProfile={updatedProfile}/> 
							</RequireAuth>
						}
					/>
					<Route path='/freelancers' element={<FreelancerIndex msgAlert={msgAlert} />} />
					<Route 
						path='/freelancers' 
						element={
							<FreelancerIndex msgAlert={msgAlert} />
						} 
					/>
					<Route 
						path='/freelancers/:id' 
						element={<ShowFreelancer user={ user } msgAlert={ msgAlert }/>} 
					/>
					<Route
						path='/sign-out'
						element={
						<RequireAuth user={user}>
							<SignOut msgAlert={msgAlert} clearUser={clearUser} user={user} />
						</RequireAuth>
						}
					/>
					<Route
						path='/change-password'
						element={
						<RequireAuth user={user}>
							<ChangePassword msgAlert={msgAlert} user={user} />
						</RequireAuth>}
					/>
				</Routes>
				{msgAlerts.map((msgAlert) => (
					<AutoDismissAlert
						key={msgAlert.id}
						heading={msgAlert.heading}
						variant={msgAlert.variant}
						message={msgAlert.message}
						id={msgAlert.id}
						deleteAlert={deleteAlert}
					/>
				))}
			</Fragment>
		)
}

export default App