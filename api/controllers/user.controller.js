import User from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.send("api route is working");
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) return next(errorHandler(404, "User not found"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req._id !== req.params._id)
    return next(errorHandler(401, "You can only update your own account!"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
          isActive: req.body.isActive,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  // if (req._id !== req.params.id)
  //   return next(errorHandler(401, 'You can only delete your own account!'));
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const getBills = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const addbills = async (req, res, next) => {
  const { id } = req.params;
  const { description, categories, date, amount } = req.body;
  try {
    const addBills = await User.findByIdAndUpdate(
      id,
      { $push: { bills: { description, categories, date, amount } } },
      { new: true }
    );
    res.status(200).json(addBills);
  } catch (error) {
    next(error);
  }
};

export const deletebills = async (req, res, next) => {
  const { id } = req.params;
  const { index } = req.body;
  try {
    const deleteBills = await User.findByIdAndUpdate(
      id,
      { $unset: { [`bills.${index}`]: "1" } },
      { new: true }
    );
    await User.findByIdAndUpdate(id, { $pull: { bills: null } }, { new: true });
    res.status(200).json(deleteBills);
  } catch (error) {
    next(error);
  }
};

export const updatebills = async (req, res, next) => {
  const { id } = req.params;
  const { description, categories, date, amount, index } = req.body;
  try {
    const updateBills = await User.findByIdAndUpdate(
      id,
      {
        $set: { [`bills.${index}`]: { description, categories, date, amount } },
      },
      { new: true }
    );
    res.status(200).json(updateBills);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user.categories);
  } catch (error) {
    next(error);
  }
};

export const addCategories = async (req, res, next) => {
  const { id } = req.params;
  const { categories } = req.body;
  try {
    const addCategories = await User.findByIdAndUpdate(
      id,
      { $set: { categories: categories } },
      { new: true }
    );
    res.status(200).json(addCategories);
  } catch (error) {
    next(error);
  }
};

export const updateCategories = async (req, res, next) => {
  const { id } = req.params;
  const { categories, index } = req.body;
  try {
    const updateCategories = await User.findByIdAndUpdate(
      id,
      {
        $set: { [`categories.${index}`]:  categories  },
      },
      { new: true }
    );
    res.status(200).json(updateCategories);
  } catch (error) {
    next(error);
  }
};
export const deleteCategories = async (req, res, next) => {
  const { id } = req.params;
  const { index } = req.body;
  try {
    const deleteCategories = await User.findByIdAndUpdate(
      id,
      { $unset: { [`categories.${index}`]: "1" } },
      { new: true }
    );
    await User.findByIdAndUpdate(id, { $pull: { categories: null } }, { new: true });
    res.status(200).json(deleteCategories);
  } catch (error) {
    next(error);
  }
};
