const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const Users = require('../models/Users')
const { getUsers, saveUser, updateUser, deleteUser } = require('../controllers/usersController')
const profileGroupsContorller = require('../controllers/profileGroupsController')
const { login } = require('../controllers/authController')
//Routes 
router.get('/', (req, res) => {
    res.send({ message: 'Success' })
})

//auth
router.post('/login', login)
router.post('/signup', saveUser)

//users
router.get('/users', authMiddleware, getUsers)
router.post('/users', saveUser)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

//profile-groups
router.get('/profile-groups', authMiddleware, profileGroupsContorller.getProfileGroups)
router.post('/profile-groups', authMiddleware, profileGroupsContorller.saveProfileGroup)
router.get('/profile-groups/:id', authMiddleware, profileGroupsContorller.getProfileGroup)
router.put('/profile-groups/:id', authMiddleware, profileGroupsContorller.updateProfileGroup)
router.delete('/profile-groups/:id', authMiddleware, profileGroupsContorller.deleteProfileGroup)

module.exports = router