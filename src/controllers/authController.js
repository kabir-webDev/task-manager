import authService from '../services/authService.js';

const register = async (req, res) => {

    try {
        const { body } = req;
        if (!body.username || !body.email || !body.password || !body.profession) {
          return res.status(400).send({
              status: "FAILED",
              data: {
                  error: "One of the following keys is missing or is empty in the request body: 'username', 'email', 'password', 'phone', 'profession'",
              },
          });
        }
        const newUser = {
            username: body.username,
            email: body.email,
            password: body.password,
            profession: body.profession,
        };
  
        const createdUser = await authService.register(newUser);
        res.status(201).send({
            status: "OK",
            data: createdUser,
        });
    } catch (error) {
        console.error(error);
        res.status(error?.status || 500).send({
            status: "FAILED",
            data: {
                error: error?.message || error,
            },
        });
    }
  };
  
  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const isValidUser = await authService.login(email, password);
      if(isValidUser.status==='error') {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.status(200).json({status:'Login Successfull', access_token: isValidUser });
    } catch (error) {
      res.status(500).json({ error: 'Failed to log in' });
    }
  };

export default {register, login};