import * as actionCreator from '../actions/actionCreator';

export default class TimelineAPI {

    constructor(pictures) {
        this.pictures = pictures;
    }

    static onLikePicture(pictureId) {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/fotos/${pictureId}/like?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, { method: 'POST' })
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Não foi possível realizar o like da foto");
                    }
                })
                .then(liker => {
                    dispatch(actionCreator.addLike(pictureId, liker));
                    return liker;
                });
        }
    }

    static onSubmitComment(pictureId, comment) {
        return dispatch => {
            const requestInfo = {
                method: 'POST',
                body: JSON.stringify({ texto: comment }),
                headers: new Headers({
                    'Content-type': 'application/json'
                })
            };

            fetch(`https://instalura-api.herokuapp.com/api/fotos/${pictureId}/comment?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`, requestInfo)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Não foi possível realizar o comentário na foto");
                    }
                })
                .then(newComment => {
                    dispatch(actionCreator.addComment(pictureId, newComment));
                    return newComment;
                });
        }
    }

    static loadPictures(urlPerfil) {
        return dispatch => {
            fetch(urlPerfil)
                .then(response => response.json(urlPerfil))
                .then(pictures => {
                    dispatch(actionCreator.loadPictures(pictures));
                    return pictures;
                });
        }
    }

    static searchPictures(login) {
        return dispatch => {
            fetch(`https://instalura-api.herokuapp.com/api/public/fotos/${login}`)
                .then(response => response.json())
                .then(pictures => {
                    if (pictures.length === 0) {
                        dispatch(actionCreator.showMessage("User not found"));    
                    } else {
                        dispatch(actionCreator.showMessage(""));  
                    }
                    dispatch(actionCreator.loadPictures(pictures));
                    return pictures;
                });
        }
    }

}