const Service = require("../models/service-model");

const services = async (req, res) => {
    try {
        const response = await Service.find();
        if (!response) {
            res.status(404).send({ msg: "No service found" });
            return;
        }
        res.status(200).send({ msg: response });
    } catch (error) {
        console.log(`Error from service: ${error}`);
    };
};

module.exports = services;