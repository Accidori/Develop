import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
  try{
    const response = await fetch('/api/auth/login', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userInfo)
    })

    if (!response.ok) {
 
        throw new Error('Failed to login');
    }

    const data = await response.json();

    if (data.token) {
        return {token: data.token};
    } else {
        throw new Error('token not found');
    }

    }catch (error){
        console.log('Error in login', error);
    }


}



export { login };
