const express = require('express');
const {
    createDiscussion,
    updateDiscussion,
    deleteDiscussion,
    getDiscussions,
    getDiscussionsByTags,
    searchDiscussionsByText,
} = require('../controllers/discussionController');
const router = express.Router();

router.post('/', createDiscussion);
router.put('/:id', updateDiscussion);
router.delete('/:id', deleteDiscussion);
router.get('/', getDiscussions);
router.get('/tags', getDiscussionsByTags);
router.get('/search', searchDiscussionsByText);

module.exports = router;
