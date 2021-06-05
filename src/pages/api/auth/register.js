import connectDB from "../../../utils/connectDB";
import User from "../../../models/userModel";
import validate from "../../../utils/validate";
import bcrypt from "bcrypt";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      await register(req, res);
      break;

    default:
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, cf_password } = req.body;
    const errMsg = validate(name, email, password, cf_password);
    if (errMsg) return res.status(400).json({ err: errMsg });

    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ err: "This email already exists." });

    const passwordHash = await bcrypt.hash(password, 12);
    const newUser = new User({
      name,
      email,
      password: passwordHash,
      cf_password,
    });

    await newUser.save();
    res.json({ msg: "Register Successful!" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
};
