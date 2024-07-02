const Discussion = require('../models/discussion');

exports.createDiscussion = async (req, res) => {
    const { text, image, hashtags, user } = req.body;
    try {
        const discussion = new Discussion({ text, image, hashtags, user });
        await discussion.save();
        res.status(201).json({ message: 'Discussion created successfully', discussion });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateDiscussion = async (req, res) => {
    const { id } = req.params;
    const { text, image, hashtags } = req.body;
    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        discussion.text = text || discussion.text;
        discussion.image = image || discussion.image;
        discussion.hashtags = hashtags || discussion.hashtags;
        await discussion.save();
        res.status(200).json({ message: 'Discussion updated successfully', discussion });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteDiscussion = async (req, res) => {
    const { id } = req.params;
    try {
        const discussion = await Discussion.findById(id);
        if (!discussion) {
            return res.status(404).json({ message: 'Discussion not found' });
        }
        await discussion.remove();
        res.status(200).json({ message: 'Discussion deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDiscussions = async (req, res) => {
    try {
        const discussions = await Discussion.find().populate('user');
        res.status(200).json(discussions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getDiscussionsByTags = async (req, res) => {
    const { tags } = req.query;
    try {
        const discussions = await Discussion.find({ hashtags: { $in: tags.split(',') } }).populate('user');
        res.status(200).json(discussions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.searchDiscussionsByText = async (req, res) => {
    const { text } = req.query;
    try {
        const discussions = await Discussion.find({ text: { $regex: text, $options: 'i' } }).populate('user');
        res.status(200).json(discussions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
