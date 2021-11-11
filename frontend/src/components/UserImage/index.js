import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { loadOneImage } from '../../store/userImages';

import './UserImage.css';

function UserImage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const image = useSelector((state) => (state.userImage.current));

    useEffect(() => (
        dispatch(loadOneImage(id))
    ), [dispatch, id]);

    const sessionUser = useSelector(state => state.session.user);
    if (!sessionUser) return <Redirect to = '/' />;

    return (
        <div className = 'profile-single-img-container'>
            <div className = 'profile-single-div-style'>
                <div className = 'profile-single-img-div'>
                    <img
                        className = 'profile-single-img'
                        src = {image.imageUrl}
                        alt = 'car'
                    />
                </div>
                <div className = 'profile-single-img-content'>{image.content}</div>
                <div className = 'profile-single-img-buttons'>
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default UserImage;
