const router = require('express').Router();
const { 
    getHomepage,
    postCreateUser 
} = require('../controllers/userController');

/**
 * @desc Opens the user homepage
 * @route GET /api/v1/user
 * @access Public   
 */
router.route('/').get(getHomepage);


/**
 * @desc Opens the user homepage
 * @route GET /api/v1/user/create
 * @access Public   
 */
 router.route('/create').post(postCreateUser);

module.exports = router;