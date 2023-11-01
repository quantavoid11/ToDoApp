import { Router } from "express";
import { userLoginValidator,userSignupValidator } from "../../validators/auth/user.validators";

const router=Router();

router.route("/signup").post(userSignupValidator(),validate,registerUser);
router.route("/login").post(UserLoginValidator(),validate,loginUser);
          