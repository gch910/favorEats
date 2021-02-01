const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const { loginUser, logoutUser } = require("../auth");
const { csrfProtection, asyncHandler } = require("./utils");
const db = require("../db/models");

const userValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for username")
    .isLength({ max: 50 })
    .withMessage("Username must not be more than 50 characters long"),
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 50 })
    .withMessage("Email can't be more than 50 characters long")
    .isEmail()
    .withMessage("Email is not a valid email"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Your password contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),
  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw newError("Confirm Password does not match Password");
      }
      return true;
    }),
];

/* GET users listing. */
router.get("/sign-up", csrfProtection, (req, res) => {
  //const user = db.User.build(); //why??
  res.render("user-sign-up", {
    title: "Sign Up",
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/sign-up",
  csrfProtection,
  userValidators,
  asyncHanlder(async (req, res) => {
    const { username, email, password } = req.body;

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await db.User.create({
        username,
        email,
        hashedPassword,
      });
      loginUser(req, res, user);
      res.redirect("/");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);

      res.render("user-sign-up", {
        title: "Sign-up",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: 'Login',
    csrfToken: req.csrfToken()
  })
})

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password"),
];

router.post(
  "/login",
  csrfProtection,
  loginValidators,
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });
      if (user) {
        const passwordMatch = await bcrypt.compare(
          password,
          user.hashedPassword.toString()
        );

        if (passwordMatch) {
          loginUser(req, res, user);
          return res.redirect("/");
        }
      }
      errors.push("Login failed for provided email and password");
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render("user-login", {
      title: "Login",
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/users/login')
})

module.exports = router;
