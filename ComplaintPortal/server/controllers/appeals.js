import AppealData from '../models/appeals.js';

export const getAppeals = async (req, res) => {
    try {
        const allAppeals = await AppealData.find();

        res.status(200).json(allAppeals);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createAppeals = async (req, res) => {
    const appeals = req.body;

    const newAppeals = new AppealData(appeals);

    try {
        await newAppeals.save();
        res.status(201).json(newAppeals);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}