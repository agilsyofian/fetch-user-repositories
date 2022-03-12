import axios from "axios";

const fetchData = async (methodReq, urlReq, databody, header) => {

	try {
		const response = await axios({
												method: methodReq,
												url: urlReq,
												data: databody,
												headers : header
											}); 

		return response
	} catch (error) {
		console.log(error)
		return {status : 'error', msg: error}
	}
	
};

export default fetchData;
