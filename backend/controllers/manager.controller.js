import Manager from "../models/manager.model.js";
import jwt from "jsonwebtoken";

export const getManagers = (req, res) => {
  Manager.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error" + err));
};

export const signup = async (req, res) => {
  const { username, password, phone_number } = req.body;

  try {
    const existingManager = await Manager.findOne({ username });
    if (existingManager) {
      return res.status(409).json({ message: "Username already taken" });
    }

    const newManager = new Manager({
      username,
      password,
      phone_number,
    });

    await newManager.save();

    res.status(201).json({ message: "Manager successfully registered" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signin = (req, res) => {
  let { username, password } = req.body;
  Manager.findOne({ username: username })
    .then((founduser) => {
      console.log(username, password);
      if (!founduser) {
        res.status(404).send({ Messege: "User does not exist" });
      } else {
        if (password == founduser.password) {
          console.log(founduser);
          let token = jwt.sign(
            {
              username: founduser.username,
            },
            process.env.SECRET_KEY,
            { expiresIn: "21h" }
          );
          console.log(token);
          res.status(200).send({ user: founduser, token: token });
        } else {
          console.log(username, password);
          res.status(400).send({ Messege: " Not Found " });
        }
      }
    })
    .catch((e) => {
      res.status(500).send("no understanding of error");
    });
};
