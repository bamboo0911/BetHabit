import { get } from "mongoose";
import {
  getAllHabits,
  createHabit,
  dailyCheckHabit,
  closeHabit,
  shareHabit,
} from "../controllers/habit.js";
import express from "express";

const router = express.Router();

// GET /habit/:userid
router.get("/:userid", getAllHabits);
// POST /habit/:userid
router.post("/:userid", createHabit);
// PUT /habit/dailycheck/:habitid
router.put("/dailycheck/:habitid", dailyCheckHabit);
// PUt /habit/close/:habitid
router.put("/close/:habitid", closeHabit);
// GET /habit/share/:habitid
router.get("/share/:habitid", shareHabit);

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
 *               bets:
 *                type: array
 *                items: object
 *                properties:
 *                  betPartner: string
 *                  userStake: string
 *                  partnerStake: string
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
 * /api/habit/close/{habitid}:
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

/**
 * @swagger
 * /api/habit/share/{habitid}:
 *  get:
 *   summary: Share the habit to social media.
 *   tags:
 *     - Habit
 *   parameters:
 *       - in: path
 *         name: habitid
 *         required: true
 *         description: Enter the habitid.
 *         schema:
 *           type: string
 *  responses:
 *    '200':
 *      description: Successfully get habit information.
 *    '400':
 *      description: Habit Id is required.
 *    '404':
 *      description: Habit not found.
 */

export default router;
