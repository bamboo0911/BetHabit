import { get } from "mongoose";
import {
  getHabit,
  postHabit,
  putHabit,
  getHabitStatus,
} from "../controllers/habit.js";
import express from "express";

const router = express.Router();

// GET /habit/:userid
router.get("/:userid", getHabit);
// POST /habit/:userid
router.post("/:userid", postHabit);
// PUT /habit/dailycheck/:habitid
router.put("/dailycheck/:habitid", putHabit);
// PUt /habit/getstatus/:habitid
router.put("/getstatus/:habitid", getHabitStatus);

/**
 * @swagger
 * /api/habit/{userid}:
 *   get:
 *     summary: Fetch all the habit of user => return in a list.
 *     tags:
 *       - Habit
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: Enter the userid.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully return the habits.
 *       '400':
 *         description: User ID is required.
 *       '404':
 *         description: User not found.
 */

/**
 * @swagger
 * /api/habit/{userid}:
 *   post:
 *     summary: Create a bet and habit with given title, due date.
 *     tags:
 *       - Habit
 *     parameters:
 *       - in: path
 *         name: userid
 *         required: true
 *         description: Enter the userid.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Enter title, date in format.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               habitTitle:
 *                 type: string
 *               stake:
 *                 type: integer
 *                 format: int64
 *                 minimum: 0
 *               betPartner:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Successfully create the habit.
 *       '400':
 *         description: User ID is required.
 *       '404':
 *         description: User not found.
 */

/**
 * @swagger
 * /api/habit/dailycheck/{habitid}:
 *   put:
 *     summary: Change the status of habit from uncheck to checked.
 *     tags:
 *       - Habit
 *     parameters:
 *       - in: path
 *         name: habitid
 *         required: true
 *         description: Enter the habitid.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully change the status to checked.
 *       '400':
 *         description: Status is not "uncheck" or habit Id is required.
 *       '404':
 *         description: Habit not found.
 */

/**
 * @swagger
 * /api/habit/getstatus/{habitid}:
 *   put:
 *     summary: Calculate habid to win or lose.
 *     tags:
 *       - Habit
 *     parameters:
 *       - in: path
 *         name: habitid
 *         required: true
 *         description: Enter the habitid.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully return win or lose.
 *       '400':
 *         description: Status is not "uncheck" or habit Id is required.
 *       '404':
 *         description: Habit not found.
 */
export default router;
