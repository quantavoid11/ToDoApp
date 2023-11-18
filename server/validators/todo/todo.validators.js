import {body} from 'express-validator';

export const createTodoValidator=()=>{
    return [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Todo title is required")
    ]
};

export const getAllTodosValidator=()=>{

};

export const updateTodoValidator=()=>{
    return [
        body("title")
            .trim()
            .notEmpty()
            .withMessage("Todo title is required")
    ]
};