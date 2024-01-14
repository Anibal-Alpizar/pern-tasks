import axios from './axios.js';

export const createTaskRequest = (task) => axios.post('/tasks', task);
export const getTasksRequest = () => axios.get('/tasks');
export const deleteTaskRequest = (id) => axios.delete(`/tasks/${id}`);