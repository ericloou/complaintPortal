import ComplaintData from '../models/complaints.js';

export const getComplaints = async (req, res) => {
    try {
        const allComplaints = await ComplaintData.find();

        res.status(200).json(allComplaints);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createComplaint = async (req, res) => {
    const complaint = req.body;

    const newComplaint = new ComplaintData(complaint);

    try {
        await newComplaint.save();
        res.status(201).json(newComplaint);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}