import axios from 'axios';


const instance = axios.create({
    baseURL: 'https://react-burger-cb022.firebaseio.com/'
});

export default instance;