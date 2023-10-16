import { MongooseError } from "mongoose";

export const genericErrorHandler = (error, res) => {
  console.error(error);

  // Check the type of error
  if (error instanceof MongooseError) {
    return res.status(500).json({ error: error.message });
  } else if (error instanceof Error) {
    return res.status(500).json({ error: error.message });
  } else {
    return res.status(500).json(error);
  }
};
