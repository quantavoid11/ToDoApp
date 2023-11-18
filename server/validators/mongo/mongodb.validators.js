import {body,param} from 'express-validator';


export const pathValidator=(id)=>{
    return [
        param(id)
            .notEmpty()
            .isMongoId()
            .withMessage("Invalid "+id)
    ]
};

