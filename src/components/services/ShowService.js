import React from 'react';
import { 
    Container,
    Card,
    Button 
} from 'react-bootstrap';
import LoadingScreen from '../shared/LoadingScreen';
// import service API functions
import { updateService, getOneService, removeService } from '../../api/services';
// this will allow us to set our params
import { 
    useParams,
    useNavigate 
} from 'react-router-dom';
// useNav will allow us to navigate to a specific page
// for error messages
import messages from '../shared/AutoDismissAlert/messages'
import { 
    useState, 
    useEffect 
} from 'react'
import EditServiceModal from './EditServiceModal';
import StripeContainer from '../stripe/StripeContainer';

const ShowService = (props) => {
    const [service, setService] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false) 
    // to let us know when to rerender!
    const [updated, setUpdated] = useState(false);
    // for the payment Form!
    const [showItem, setShowItem] = useState(false)

    let serviceToShow;
    // destructuring to get the id value from our route params
    const { id } = useParams();
    const navigate = useNavigate()
    // useNav returns a function
    // we can call that function to redirect the user wherever we want to
    // console.log('here are props', props)
    // console.log('here is the id from useParams', id)
    const { user, msgAlert } = props;
    useEffect(() => {
        getOneService(id)
            .then(res => setService(res.data.service))
            .catch(err => {
                msgAlert({
                    heading: 'Error getting service',
                    body: messages.getServicesFailure,
                    variant: 'danger',
                })
                // navigate back to the home page if there's an error fetching
                navigate('/');
            })
    }, [updated])
    let serviceRate;
    // here we'll declare a function that runs which will remove the pet
    // this function's promise chain should send a message, and then go somewhere
    const removeTheService = () => {
        removeService(user, service._id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeServiceSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing service',
                    message: messages.removeServiceFailure,
                    variant: 'danger'
                })
            })
    }
    // If service hasn't been loaded yet, show a loading message
    if (!service) {
        return <LoadingScreen />
    } else {
        serviceRate = service.rate
        console.log(serviceRate)
    }
    return (
        <>
            <Container className='fluid mt-4'>
                <Card>
                    <Card.Header><strong>{ service.name }</strong></Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><strong>Type: </strong><small>{ service.type }</small></div>
                            <div><strong>Description: </strong><small>{ service.description }</small></div>
                            <div><strong>Location: </strong><small>{ service.location }</small></div>
                            <div><strong>Rate: </strong><small>${ service.rate }</small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    {showItem ? <StripeContainer serviceRate={serviceRate} service={service} user={user}/> : <> <h3>${service.rate}</h3>
                    <button className="button" onClick={() => setShowItem(true)}>Purchase {service.name}</button></>}
                        {
                            user && service.owner === user._id ? 
                                <>
                                    <Button 
                                        onClick={() => setEditModalShow(true)} 
                                        className="m-2" 
                                        variant="warning"
                                    >
                                        Edit Service
                                    </Button> 
                                    <Button 
                                        onClick={() => removeTheService()} 
                                        className="m-2" 
                                        variant="danger"
                                    >
                                        Delete this Service
                                    </Button> 
                                </>
                                :
                                null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <EditServiceModal 
                user = {user}
                service = {service}
                show = {editModalShow}
                updateService = {updateService}
                msgAlert = {msgAlert}
                triggerRefresh  = {() => setUpdated(prev => !prev)}
                handleClose = {() => setEditModalShow((false))}
            />
        </>
    );
}

export default ShowService;
