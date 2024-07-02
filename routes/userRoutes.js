const express = require('express');
const {
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    searchUser
} = require('../controllers/userController');
const router = express.Router();

router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/', getUsers);
router.get('/search', searchUser);

module.exports = router;
