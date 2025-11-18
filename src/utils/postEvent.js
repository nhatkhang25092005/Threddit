export const POST_EVENTS = {
    SAVE_CHANGED : 'post:save:changed',
    POST_DELETED : 'post:deleted',
    POST_EDITED : 'post:edited',
    POST_PINNED : 'post:pinned'
}

export function emitPostEvent(eventType, detail){
    window.dispatchEvent(new CustomEvent(eventType, {detail}))
}

export function listenToPostEvent(eventType, callBack){
    window.addEventListener(eventType, callBack)
    return () => window.removeEventListener(eventType, callBack)
}