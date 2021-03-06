const express = require('express')
const router = express.Router()
const authMiddleware = require('../middleware/authMiddleware')
const { getUsers, saveUser, updateUser, deleteUser } = require('../controllers/usersController')
const profileGroupsContorller = require('../controllers/profileGroupsController')
const calendarsController = require('../controllers/calendarsController')
const { login, logout } = require('../controllers/authController')
const AuthRequestMiddlware = require('../middleware/authRequestMiddleware')

//Routes 
router.get('/', (req, res) => {
    res.send({ message: 'Success' })
})

//auth
router.post('/login', AuthRequestMiddlware.verifyAuthRequest, login)
router.post('/signup', saveUser)
router.post('/logout', logout)

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

//calendars
router.get('/calendars', authMiddleware, calendarsController.getCalendars)
router.post('/calendars', authMiddleware, calendarsController.saveCalendar)
router.get('/calendars/:id', authMiddleware, calendarsController.getCalendar)
router.put('/calendars/:id', authMiddleware, calendarsController.updateCalendar)
router.delete('/calendars/:id', authMiddleware, calendarsController.deleteCalendar)


module.exports = router