import axios from 'axios';
import { server } from './keys';

export const userInstance = axios.create({
    baseURL: server
})
