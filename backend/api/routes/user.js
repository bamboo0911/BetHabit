import {
  clerkCreate,
  getUser,
  postUser,
} from "../controllers/user.js";
import express from "express";

const router = express.Router();

// POST /user/clerkCreate
router.post("/clerkCreate", clerkCreate);
// POST /user/:userid
router.post("/:userid", postUser);
// GET /user/:userid
router.get("/:userid", getUser);

/**
 * @swagger
 * /api/user/{userid}:
 *   post:
 *     summary: Create a user with userid, username.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: Enter the userid.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Enter username.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully create the user.
 *       '400':
 *         description: Username or user ID is required.
 */

/**
 * @swagger
 * /api/user/{userid}:
 *   get:
 *     summary: Get username, saysayPoint.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: Enter the userid.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrive username, saysaypoint.
 *       '400':
 *         description: Username or user ID is required.
 *       '404':
 *         description: User not found.
 */

export default router;
