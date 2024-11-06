import express from "express";

import { signup } from "../controllers/auth/signup";
import { login } from "../controllers/auth/login";
import { verifyEmail } from "../controllers/auth/verifyEmail";

export const authRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     signup:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         username:
 *           type: string
 *       required:
 *         - email
 *         - password
 *         - username
 *     login:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           format: string
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - username
 *         - password
 *     verify-email:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           format: string
 *         secretKey:
 *           type: string
 *           format: password
 *       required:
 *         - username
 *         - secretKey
 */

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signup'
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 *       '422':
 *         description: Unprocessable entity
 *       '500':
 *         description: Internal server error
 */
authRoute.post("/signup", signup);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/login'
 *     responses:
 *       '200':
 *         description: User login successful
 *       '404':
 *         description: User does not exist
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
authRoute.post("/login", login);

/**
 * @swagger
 * /api/v1/auth/verify-email:
 *   post:
 *     summary: Verify Email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/verify-email'
 *     responses:
 *       '200':
 *         description: User Email verification successful
 *       '404':
 *         description: User does not exist
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
authRoute.post("/verify-email", verifyEmail);
