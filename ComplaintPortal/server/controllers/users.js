import usersData from '../models/users.js';

export const getComplaints = async (req, res) => {
    try {
        const allComplaints = await ComplaintData.find();

        res.status(200).json(allComplaints);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    const users = req.body;

    const newUsers = new usersData(users);

    try {
        await newUsers.save();
        res.status(201).json(newUsers);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}