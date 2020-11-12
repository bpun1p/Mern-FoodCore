export default {
    login : user => {
        return fetch('http://localhost:5000/user/login',
            {
                method : 'post',
                body : JSON.stringify(user),
                headers : {'Content-Type' : 'application/json'},
                withCredentials: true,
                credentials: 'include'
            })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated : false, user : {username : ''}};
            });
    },

    register : user => {
        return fetch('http://localhost:5000/user/register',
            {
                method : 'post',
                body : JSON.stringify(user),
                headers : { 'Content-Type' : 'application/json'}
            })
            .then(res => res.json())
            .then(data => data);
    },

    logout : () => {
        return fetch('http://localhost:5000/user/logout', 
            {
                withCredentials: true, 
                credentials:'include'
            }) 
            .then(res => res.json())
            .then(data => data);
    },

    isAuthenticated : () => {
        return fetch('http://localhost:5000/user/authenticated', 
            {
                withCredentials: 'true', 
                credentials: 'include'
            })
            .then(res => {
                if(res.status !== 401)
                    return res.json().then(data => data);
                else
                    return { isAuthenticated : false, user : {username : ''}};
            });
    }
};