import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import errorHandler from "../utils/error.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hasedpassword = await bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hasedpassword });
  try {
    await newUser.save();
    res.status(201).json("user created succsesfully!");
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found!"));
    // const validPassword = await User.findOne({ password });
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong Password!"));
    if (!validUser.isActive)
      return next(errorHandler(401, "Your account has been Deactivated"));
    const token = jwt.sign({ id: validUser._id }, process.env.jwt_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOonly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

const activeEmail = async (req, res, next) => {
  try {
    const { email ,to ,subject , description } = req.body;
    const validUser = await User.findOne({ email:to });
    if (!validUser) return next(errorHandler(404, "User not found!"));

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `process.env.authEmail`,
        pass: `process.env.authEmailpassword`,
      },
    });
    console.log(process.env.authEmail);
    console.log(process.env.authEmailpassword);
    // const otp =
    var mailOptions = {
      from: `process.env.authEmail`,
      to: to,
      subject: subject,
      text: description,
      html: `
    <div style="padding:10px;border-style: ridge">
    <h4>This mail from Billing Management System </h4>
    <ul>
        <li>Email: ${req.body.to}</li>
        <li>Subject: ${req.body.subject}</li>
        <li>Message: ${req.body.description}</li>
    </ul>
    <div>
      <h3>Here is your active approval code:</h3>
      <h1>123456</h1>
    </div>
  `,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        res.json({ status: false, respMesg: error });
      } else {
        res.json({ status: true, respMesg: "Email Sent Successfully" });
      }
    });
  } catch (error) {
    next(error);
  }
};

// const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.jwt_SECRET);
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie("access_token", token, { httpOonly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hasedpassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new User({
//         username:
//           req.body.name.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         password: hasedpassword,
//         email: req.body.email,
//         avatar: req.body.photo,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.jwt_SECRET);
//       const { password: pass, ...rest } = newUser._doc;
//       res
//         .cookie("access_token", token, { httpOonly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export { signin, signup, activeEmail };
