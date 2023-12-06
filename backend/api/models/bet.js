import mongoose, { Schema } from "mongoose";
const ObjectId = Schema.Types.ObjectId;

const BetSchema = new mongoose.Schema({
  betId: {
    type: ObjectId,
    required: true,
  },
  habitId: {
    type: ObjectId,
  },
  betPartner: {
    type: String,
  },
  userStake: {
    type: String,
    required: true,
    min: 1,
  },
  partnerStake: {
    type: String,
    required: true,
    min: 1,
  },
});

const Bet = mongoose.model("Bet", BetSchema);
export default Bet;
