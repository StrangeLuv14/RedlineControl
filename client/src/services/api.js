import axios from 'axios'
console.log('env:', process.env.NODE_ENV);
console.log('host:', process.env.HOST);

export default() => {
	return axios.create({
		baseURL: 'http://' + process.env.HOST  + ':3000'
	})
}
