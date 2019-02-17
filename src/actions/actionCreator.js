export function loadPictures(pictures) {
    return { type: 'LIST', pictures };
}

export function addComment(pictureId, newComment) {
    return { type: 'COMMENT', pictureId, newComment };
}

export function addLike(pictureId, liker) {
    return { type: 'LIKE', pictureId, liker };
}

export function showMessage(message) {
    return { type: 'SHOW_MESSAGE', message };
}