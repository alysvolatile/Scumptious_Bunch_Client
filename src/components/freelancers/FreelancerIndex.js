import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllFreelancers } from '../../api/freelancers'
import messages from '../shared/AutoDismissAlert/messages'

// FreelancerIndex should make a request to the api
// To get all freelancers
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const FreelancerIndex = (props) => {
    const [freelancers, setFreelancers] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in FreelancerIndex', props)

    useEffect(() => {
        console.log(props)
        getAllFreelancers()
            .then(res => {
                console.log('users:', res.data.users)
                setFreelancers(res.data.users)
            })
            .catch(err => {
                msgAlert({
                    heading: 'Error Getting Freelancers',
                    message: messages.getFreelancersFailure,
                    variant: 'danger',
                })
                setError(true)
            })
    }, [])

    // if (error) {
    //     return <p>Error!</p>
    // }

    // If freelancers haven't been loaded yet, show a loading message
    if (!freelancers) {
        return <LoadingScreen />
    } else if (freelancers.length === 0) {
        return <p>No freelancers yet. New people will sign up soon.</p>
    }

    const freelancerCards = freelancers.map(freelancer => (
        <Card style={{ width: '30%', margin: 5}} key={ freelancer.id }>
            <Card.Header>{ freelancer.fullTitle }</Card.Header>
            <Card.Body>
                <Card.Text className='centerFontBuff'>
                    <Link to={`/freelancers/${freelancer._id}`}>View { freelancer.name }</Link>
                </Card.Text>
            </Card.Body>
        </Card>
    ))

    return (
        <>
        <h3>Check out some of our talented freelancers below to learn more about what they have to offer.</h3>
            <div style={ cardContainerStyle }>
                { freelancerCards }
            </div>
        </>
    )
    // return (
    //     <>hi</>
    // )
}

export default FreelancerIndex