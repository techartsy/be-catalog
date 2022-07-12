const { Testimonial } = require("../../models");
const joi = require("joi");
const exclude = ["createdAt", "updatedAt"];
const { encryptData, decryptData } = require("../utils/encryption");

// Get All
exports.getAllTestimoni = async (req, res) => {
  try {
    const testimonies = await Testimonial.findAll({
      attributes: {
        exclude: exclude,
      },
    });
    res.status(200).send({
      status: "Success",
      message: "Guest Successfully Get",
      data: {
        response: encryptData(testimonies),
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

// Find One
exports.findTestimoni = async (req, res) => {
  try {
    const { id } = req.params;
    const checkId = await Testimonial.findOne({
      where: {
        id,
      },
      attributes: {
        exclude,
      },
    });

    if (!checkId) {
      return res.status(404).send({
        status: "Failed",
        message: `Testimoni with id: ${id} not found`,
      });
    }

    res.status(200).send({
      status: "Success",
      message: `Testimoni ${id} Successfully`,
      data: {
        guest: checkId,
      },
    });
  } catch (error) {
    res.send({
      status: "Failed",
      message: "Server Error",
    });
  }
};

// Create Testimoni
exports.createTestimoni = async (req, res) => {
  try {
    let { body } = req;
    const scheme = joi.object({
      name: joi.string().min(3).required(),
      message: joi.string().required(),
      info: joi.string().allow(null, ""),
      institution: joi.string().min(3).required(),
      rating: joi.string(),
    });

    const { error } = scheme.validate(body);

    if (error) {
      return res.status(400).json({
        status: "Validation Failed",
        message: error.details[0].message,
      });
    }

    const dataGuest = await Testimonial.create(body);

    res.status(201).send({
      message: "Success Create Testimoni",
      data: body,
    });
  } catch (error) {
    res.status(500).send({
      status: "Failed",
      message: "Internal Server Error",
    });
  }
};

// delete
exports.removeTestimoni = async (req, res) => {
  try {
    const { id } = req.params;
    const chekGuest = await Testimonial.findOne({
      where: {
        id,
      },
    });
    if (!chekGuest) {
      res.status(404).send({
        status: "Failed",
        messages: "Testimoni not Found",
      });
    } else {
      await Testimonial.destroy({
        where: {
          id,
        },
      });

      res.status(200).send({
        status: "Success",
        message: "Testimoni Successfully Deleted",
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
