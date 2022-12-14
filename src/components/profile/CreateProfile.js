import React from 'react';
import { useState } from 'react'
import ProfileForm from '../shared/ProfileForm';
import { createProfile } from '../../api/profiles';
import { useParams, useNavigate } from 'react-router-dom';
import messages from '../shared/AutoDismissAlert/messages'

const CreateProfile = (props) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user, setUser, msgAlert, setUpdatedProfile } = props
    // console.log(id)
    // console.log('these are the props in CreateService \n', props)
    const [profile, setProfile] = useState({ // this is the state for our form
        aboutMe: '',
        phone: '',
        image: '',
    })
    // console.log('this is service in createService', service)
    // this will handle typing in the form!
    const handleChange = (e) => {
        console.log('Handle Change ran')
        setProfile(prevProfile => {
            console.log('set profile ran')
         //setUser(prevProfile => {
            let updatedValue = e.target.value;
            const updatedName = e.target.name;
            // console.log('this is the input type', e.target.type)
            if (e.target.type === 'number') {
                // this is looking at the input type and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }
            const updatedProfile = {
                [updatedName]: updatedValue
            }
            console.log(
                "this is our return object the new prof",{
                // we can spread out the previous object
                ...prevProfile, 
                // AND the new one!
                // this will overwrite the stuff that changes in the previous state WHILE STILL keeping the new stuff!
                ...updatedProfile
            })
            return {
                // we can spread out the previous object
                ...prevProfile, 
                // AND the new one!
                // this will overwrite the stuff that changes in the previous state WHILE STILL keeping the new stuff!
                ...updatedProfile
            }
        })
    }
    // we'll add a handleSubmit function here that makes an API request that handles the response
    const handleSubmit = (e) => {
        
        e.preventDefault();
        // we want it to hit the createService function
        console.log('handle submit running')
        console.log("the user in handleSubmit", user)
        console.log("the profile in handleSubmit", profile)
        createProfile(user, profile)
        // api call
            .then((res) => console.log('here is the response', res))
            .then(() => setProfile(profile))
        // if successful, navigate to the show page for the new pet
            .then(() =>  
                navigate(`/profile`)
                // navigate(`/profile/${res.data.user.id}`)
            )
        // send a success message to the user
            .then(() =>
                msgAlert({
                    heading: 'Create Profile Success',
                    message: messages.createProfileSuccess,
                    variant: 'success',
                })
            )
            .catch(msgAlert({
                heading: 'Create Profile Error',
                message: messages.createProfileFailure,
                variant: 'danger',
            }))
    }
    return (
        <>
            <ProfileForm 
                user={ user } 
                profile={ profile } 
                handleChange={ handleChange } 
                handleSubmit={ handleSubmit }
                heading="Add a New Profile"
            />
        </>
    );
}

export default CreateProfile;
