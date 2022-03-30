const router = require("express").Router();

const {
  getHomepage,
  postCreateUser,
  loginuser,
} = require("../controllers/userController");
const {
  isAuthenticatedUser,
  isAuthorizedroles,
} = require("../middleware/auth");

/**
 * @desc Opens the user homepage
 * @route GET /api/v1/user
 * @access Public
 */
router
  .route("/")
  .get(isAuthenticatedUser, isAuthorizedroles("user"), getHomepage);

/**
 * @desc
 * @route GET /api/v1/user/create
 * @access Public
 */
router.route("/create").post(postCreateUser);

/**
 * @desc
 * @route GET /api/v1/user/login
 * @access Public
 */
router.route("/login").post(loginuser);

module.exports = router;
