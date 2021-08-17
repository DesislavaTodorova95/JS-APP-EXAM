import * as api from './api.js';
api.settings.host ='http://localhost:3030';
const host = api.settings.host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;
export async function getAllBooks(){
    return await api.get(host + '/data/books?sortBy=_createdOn%20desc');
}

export async function getBookById(id){
    return await api.get(host + `/data/books/${id}`);
}
export async function deleteBook(id){
    return await api.del(host + '/data/books/' + id);
}
export async function createBook(body){
    return await api.post(host + '/data/books', body);
}
export async function updateBook(id, body){
    return api.put(host + '/data/books/' +id, body);
}

export async function getMyBooks(){
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
export async function addLikes(bookId){
    return await api.post(host + '/data/likes', bookId)
}

export async function getLikes(bookId){
    return await api.get(host + `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export async function getLikesByUser(bookId, userId){
return await api.get(host + `/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
}