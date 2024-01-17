import userService from "../services/userService.js";

const createNewUser = async (req, res) => {
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

      const createdUser = await userService.createNewUser(newUser);

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

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await userService.getAllUsers();
        res.send(allUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }   
}
export default {createNewUser, getAllUsers};