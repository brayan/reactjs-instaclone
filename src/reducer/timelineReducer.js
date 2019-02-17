import { List } from 'immutable';

// REDUCER -> Vai ser chamado pelo store;
export function timeline(state = new List(), action) {
    if (action.type === "LIST") {
        return new List(action.pictures);
    }

    if (action.type === "COMMENT") {
        return replacePicture(state, action.pictureId, pictureOldState => {
            const newComments = pictureOldState.comentarios.concat(action.newComment);
            return {comentarios: newComments};
        });
    }

    if (action.type === 'LIKE') {
        return replacePicture(state, action.pictureId, pictureOldState => {
            const liked = !pictureOldState.likeada;
            const possibleLiker = pictureOldState.likers.find(currentLiker => currentLiker.login === action.liker.login);
    
            let newLikers;
            if (possibleLiker === undefined) {
                newLikers = pictureOldState.likers.concat(action.liker);
            } else {
                newLikers = pictureOldState.likers.filter(currentLiker => currentLiker.login !== action.liker.login);
            }
    
            return {likeada: liked, likers: newLikers};
        });
    }

    return state;
}

function replacePicture(list, pictureId, updatePropsCallback) {
    const pictureOldState = list.find(picture => picture.id === pictureId);
    const newProps = updatePropsCallback(pictureOldState);
    const pictureNewState = Object.assign({}, pictureOldState, newProps);
    const listIndex = list.findIndex(picture => picture.id === pictureId);

    const newList = list.set(listIndex, pictureNewState);

    return newList;
}