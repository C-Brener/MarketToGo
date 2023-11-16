import Jwt from "jsonwebtoken";

const createUserToken = async (user, req, res) => {
  const token = Jwt.sign(
    {
      name: user.name,
      id: user.id,
    },
    "oursecret"
  );

  res.status(200).json({
    message: "You are Autenticated",
    token: token,
    userId: user.id,
  });
};

export default createUserToken;
