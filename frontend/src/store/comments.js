import { csrfFetch } from './csrf';

const GET_COMMENTS = '/comment/GET_COMMENTS';
const ADD_COMMENT = '/comment/ADD_COMMENT';
const DELETE_COMMENT = '/comment/DELETE_COMMENT';
const EDIT_COMMENT = '/comment/EDIT_COMMENT';

// Action Creators
const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
});

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
});

const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    comment
});

// Thunks
export const getCommentsThunk = (imageId) => async (dispatch) => {
    const response = await csrfFetch(`/api/images/${imageId}/comments`);

    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data));
        return data;
    }
};

export const addCommentThunk = (comment) => async (dispatch) => {
    const { imageId } = comment;
    const response = await csrfFetch(`/api/images/${imageId}/comments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(addComment(data));
        console.log('data this', data)
        return data;
    }
}

export const deleteCommentThunk = (commentId) => async(dispatch) => {
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteComment(commentId));
        return commentId;
    }
}

export const editCommentThunk = (comment) => async(dispatch) => {
    const { commentId } = comment;
    const response = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(comment)
    });

    if (response.ok) {
        const comment = await response.json();
        dispatch(editComment(comment));
        return comment;
    }
}

// Reducah
const commentsReducer = (state = {}, action) => {
    let newState = {};
    switch(action.type) {
        case GET_COMMENTS:
            newState = { ...state };
            action.comments.forEach(comment => {
                newState[comment.id] = comment;
            });
            return newState;
        case ADD_COMMENT:
                newState = { ...state };
                newState[action.comment.id] = action.comment;
                console.log('hello there', action)
                console.log('hello there', action.comment)
            return newState;
        case DELETE_COMMENT:
            newState = { ...state };
            delete newState[action.commentId];
            return newState;
        case EDIT_COMMENT:
            newState = { ...state }
            newState[action.comment.id] = action.comment;
            return newState;
        default:
            return state;
    }
};

export default commentsReducer;
