import User from "../models/user.js";
export const get = async (req, res) => {
  try {
    const email = req.query.email;
    const data = await User.find({
      email,
    });
    res.status(200).json({ status: true, data });
  } catch (error) {
    res.status(400).json({ status: false, error });
  }
};
