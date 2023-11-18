import { Router } from "express";
import {validate} from "../../middlewares/validate.js";
import { createTodo,getAllTodos,getTodoById,updateTodo,deleteTodo,toggleTodoStatus } from "../../controllers/todo/todo.controllers.js";
import { createTodoValidator,getAllTodosValidator,updateTodoValidator } from '../../validators/todo/todo.validators.js';
import { pathValidator } from "../../validators/mongo/mongodb.validators.js";
const router=Router();

router
    .route("/")
    .post(createTodoValidator(),validate,createTodo)
    .get(getAllTodosValidator(),validate,getAllTodos)

router
    .route("/:todoId")
    .get(pathValidator("todoId"), validate,getTodoById)
    .patch(
        pathValidator("todoId"),
        updateTodoValidator(),
        validate,
        updateTodo
    )
    .delete(
        pathValidator("todoId"),
        validate,
        deleteTodo
    )

router
    .route("/toggle/status/:todoId")
    .patch(
        pathValidator("todoId"),
        validate,
        toggleTodoStatus
    )


export default router;