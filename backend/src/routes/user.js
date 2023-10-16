import {
  postUser,
} from "../controllers/user.js";
import express from "express";

const router = express.Router();

// POST /user/:userid
router.post("/:userid", postUser);

/**
 * @swagger
 * /api/user/{userid}:
 *   post:
 *     summary: Create a user with userid, username.
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
 *         description: User ID is required.
 */

export default router;
