import { Router } from "express";
import { userLoginValidator,userSignupValidator } from "../../validators/auth/user.validators.js";
import {validate} from '../../middlewares/validate.js';
import { registerUser,loginUser} from "../../controllers/auth/user.controllers.js";



const router=Router();
router.route("/signup").post(userSignupValidator(),validate,registerUser);
router.route("/login").post(userLoginValidator(),validate,loginUser);

export default router;