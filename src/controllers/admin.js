const { Admin } = require("../../models");
const { generateToken } = require("../helpers/jwt");
const { comparePass } = require("../helpers/bcrypt");
const exclude = ["createdAt", "updatedAt"];
const joi = require("joi");

exports.adminReg = async (req, res) => {
  try {
    const { username } = req.body;
    const data = req.body;
    const scheme = joi.object({
      username: joi.string().min(5).required(),
      password: joi.string().min(5).required(),
    });
    const { error } = scheme.validate(data);
    if (error) {
      return res.status(400).json({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }
    const userCheck = await Admin.findOne({
      where: {
        username,
      },
    });
    if (userCheck) {
      return res.status(400).json({
        status: "Failed",
        mesgae: "Username already Registered",
      });
    }

    const dataAdmin = {
      ...data,
    };
    const dataUser = await Admin.create(dataAdmin);
    const token = generateToken(dataUser);

    res.status(201).send({
      message: "Success",
      token,
    });
  } catch (error) {
    res.status({
      status: "Failed",
      message: "Server not Found",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    Admin.findOne({ where: { username } }).then((admin) => {
      if (!admin || !comparePass(password, admin.password)) {
        res.status(400).send({
          status: "Failed",
          message: "Invalid Username or Password",
        });
      } else {
        const access_token = generateToken(admin);
        res.status(200).json({ access_token });
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const admins = await Admin.findAll({
      attributes: {
        exclude: exclude,
      },
    });
    res.status(200).send({
      status: "Success",
      data: admins,
    });
  } catch (error) {
    console.log(error, "<< error");
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const chekGuest = await Admin.findOne({
      where: {
        id,
      },
    });
    if (!chekGuest) {
      res.status(404).send({
        status: "Failed",
        messages: "User not Found",
      });
    } else {
      await Admin.destroy({
        where: {
          id,
        },
      });

      res.status(200).send({
        status: "Success",
        message: "User Successfully Deleted",
        data: {
          id,
        },
      });
    }
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};
