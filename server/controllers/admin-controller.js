const User = require("../models/user-model");
const Contact = require("../models/contact-model");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        console.log(users);

        if (!users || users.length === 0) {
            return res.status(404).send({ message: "No Users Found" });
        }
        return res.status(200).send(users);
    } catch (error) {
        next(error);
    }
};

// * Single User Logic 
const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).send(data)
    } catch (error) {
        next(error);
    }
};

// * User Delete Logic
const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        // const user = await User.findByIdAndDelete(id);
        await User.deleteOne({ _id: id });
        return res.status(200).send({ message: 'User deleted successfully' })
    } catch (error) {
        next(error);
    }
};

// *User update logic
const updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;

        const updatedData = await User.updateOne(
            { _id: id },
            {
                $set: updatedUserData,
            }
        )
        return res.status(200).send(updatedData)
    } catch (error) {
        next(error);
    }
};

// * getAllContacts Logic
const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);

        if (!contacts || contacts.length === 0) {
            return res.status(404).send({ message: "No Contacts Found" });
        }
        return res.status(200).send(contacts);
    }
    catch (error) {
        next(error);
    }

};

// * Contacts Delete Logic
const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        // const user = await User.findByIdAndDelete(id);
        await Contact.deleteOne({ _id: id });
        return res.status(200).send({ message: 'Contact deleted successfully' })
    } catch (error) {
        next(error);
    }
};

module.exports = { getAllUsers, getAllContacts, deleteUserById, getUserById, updateUserById, deleteContactById };