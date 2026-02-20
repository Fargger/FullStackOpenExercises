import axios from 'axios';

const baseUrl = 'http://localhost:3001/contacts'

const getAllContacts = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const createNewContact = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

/**
 * @brief 更改条目内容
 * @param {待更新条目的ID} id 
 * @param {新的对象} newObject 
 * @returns Promise
 */
const updateContact = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then(response => response.data);
}

/**
 * @brief 删除指定联系人后，向服务端发送数据
 * @param {删除指定条目后的联系人列表} newObject 
 */
const deleteContact = (id) => {
    // 发送 DELETE 请求
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

export default {
    getAll: getAllContacts,
    create: createNewContact,
    update: updateContact,
    delete: deleteContact
};