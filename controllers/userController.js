const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    const { name, mobileNo, email } = req.body;
    try {
        const existingUser = await User.findOne({ $or: [{ email }, { mobileNo }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({ name, mobileNo, email });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user });
    } catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Update an existing user
exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, mobileNo, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { name, mobileNo, email },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Get a list of users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Search for a user by name
exports.searchUser = async (req, res) => {
    const { name } = req.query;
    try {
        const users = await User.find({ name: new RegExp(name, 'i') });
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found' });
        }
        res.status(200).json(users);
    } catch (err) {
        console.error('Error searching for users:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
