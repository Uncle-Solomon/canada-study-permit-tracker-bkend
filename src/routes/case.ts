import express from "express";
import {
  createCase,
  editCase,
  getAllCases,
  getCaseByUsername,
} from "../controllers/case";
import { validateUser } from "../middlewares/validateUser";

export const caseRoute = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Case:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           required: true
 *         application_date:
 *           type: string
 *           format: date
 *           required: true
 *         application_status:
 *           type: string
 *         biometric_status:
 *           type: string
 *         biometric_date:
 *           type: string
 *           format: date
 *         medical_status:
 *           type: string
 *         medical_date:
 *           type: string
 *           format: date
 *         elegibility_status:
 *           type: string
 *         elegibility_date:
 *           type: string
 *           format: date
 *         background_check_status:
 *           type: string
 *         background_check_date:
 *           type: string
 *           format: date
 *         ppr_request:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/cases:
 *   get:
 *     summary: Get all cases
 *     tags: [Cases]
 *     responses:
 *       '200':
 *         description: List of all cases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Case'
 *       '500':
 *         description: Internal server error
 */
caseRoute.get("/", validateUser, getAllCases);

/**
 * @swagger
 * /api/v1/cases:
 *   post:
 *     summary: Create a new case
 *     tags: [Cases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Case'
 *     responses:
 *       '201':
 *         description: Case created successfully
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
caseRoute.post("/", validateUser, createCase);

/**
 * @swagger
 * /api/v1/cases/{username}:
 *   get:
 *     summary: Get a case by username
 *     tags: [Cases]
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       '200':
 *         description: Case details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Case'
 *       '404':
 *         description: Case not found
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
caseRoute.get("/:username", validateUser, getCaseByUsername);

/**
 * @swagger
 * /api/v1/cases:
 *   put:
 *     summary: Update a case
 *     tags: [Cases]
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               # Specify properties that can be updated in the request body
 *               application_status:
 *                 type: string
 *               biometric_status:
 *                 type: string
 *               medical_status:
 *                 type: string
 *               # ... and so on for other optional fields
 *     responses:
 *       '200':
 *         description: Case updated successfully
 *       '404':
 *         description: Case not found
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
caseRoute.put("/", validateUser, editCase); // Add the
