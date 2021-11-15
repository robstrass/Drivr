import React, { useEffect } from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { loadImages } from '../../store/userImages';

import './UserProfile.css';

function UserProfile() {
    const dispatch = useDispatch();
    const images = useSelector((state) => Object.values(state.userImage.all));
    const sessionUser = useSelector(state => state.session.user);

    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }

    useEffect(() => {
        dispatch(loadImages(userId))
    }, [dispatch, userId]);

    if (!sessionUser) return <Redirect to = '/' />;


    return (
        <>
            <div className = 'profile-headline-div'>
                <h1 className = 'profile-headline'>
                    Your Photos
                </h1>
            </div>
            <div className = 'profile-all-images'>
                { images.length > 0 ? images.map(image => (
                    <NavLink
                        className = 'profile-nav-wrapper'
                        key = {image.id}
                        to = {`/profile/images/${image.id}`}
                    >
                        <div className = 'profile-indiv-image'>
                            <img
                                src = { image.imageUrl }
                                alt = 'car'
                                className = 'profile-images'
                            />
                        </div>
                    </NavLink>
                )): null}
            </div>
        </>
    )
}

export default UserProfile;
