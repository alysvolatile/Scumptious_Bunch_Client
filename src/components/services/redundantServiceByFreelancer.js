import React from 'react';
import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getServicesByUser } from '../../api/services'
import messages from '../shared/AutoDismissAlert/messages'


// ShowAllServices should make a request to the api
// To get all services
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const ServiceByFreelancer = (props) => {
    const [services, setServices] = useState(null)
    const [error, setError] = useState(false)
    const { id } = useParams();
    const freelancerId = id
    const { msgAlert } = props
    console.log('freelancer id is here:', freelancerId)
    console.log('Props in ShowByFreelancer', props)

    useEffect(() => {
        console.log(props)
        getServicesByUser(id)
            .then(res => setServices(res.data.services))
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Services',
                    message: messages.getServicesFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    // If services haven't been loaded yet, show a loading message
    if (!services) {
        return <LoadingScreen />
    } else if (services.length === 0) {
        return <p>This freelancer hasn't created any services yet, check back later!</p>
    }

    if (error) {
        return <p>Error!</p>
    }
    // console.log('here are our services!', services)

    const serviceCards = services.map(service => (
        <Card style={{ width: '30%', margin: 5}} key={ service._id }>
            <Card.Header>{ service.name}</Card.Header>
            <Card.Body>
                <Card.Text>
                    <small><em>Type: { service.type }</em></small><br />
                    <small>{ service.description }</small><br />
                    <small>Location: { service.location }</small><br />
                    <small>${ service.rate }</small><br />
                    <Link to={`/services/${service._id}`}>View { service.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <div style={ cardContainerStyle }>
            { serviceCards }
        </div>
    )
}


export default ServiceByFreelancer;
