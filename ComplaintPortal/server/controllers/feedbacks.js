import FeedbackData from '../models/feedbacks.js';

export const getFeedbacks = async (req, res) => {
    try {
        const allFeedbacks = await FeedbackData.find();

        res.status(200).json(allFeedbacks);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createFeedbacks = async (req, res) => {
    const feedbacks = req.body;

    const newFeedbacks = new FeedbackData(feedbacks);

    try {
        await newFeedbacks.save();
        res.status(201).json(newFeedbacks);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}