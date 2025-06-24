import { NextFunction, Request, Response } from "express";

export const validateBodyTask = (isPartial: boolean = false) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    console.log(req.body);
    let errorMessages: string[] = [];

    if (!("title" in req.body) && !isPartial) {
      errorMessages.push("Title is required");
    } else if (req.body.title !== undefined) {
      if (typeof req.body.title !== "string") {
        errorMessages.push("Title must be a string");
      } else if (req.body.title.length < 3 || req.body.title.length > 50) {
        errorMessages.push("Title must be between 3 and 50 characters long");
      }
    }

    if (!("description" in req.body) && !isPartial) {
      errorMessages.push("Description is required");
    } else if (req.body.description !== undefined) {
      if (typeof req.body.description !== "string") {
        errorMessages.push("Description must be a string");
      } else if (
        req.body.description.length < 3 ||
        req.body.description.length > 500
      ) {
        errorMessages.push(
          "Description must be between 3 and 500 characters long"
        );
      }
    }

    if ("completed" in req.body) {
      if (typeof req.body.completed !== "boolean") {
        errorMessages.push("Completed must be a boolean");
      }
    }

    if (errorMessages.length > 0) {
      res.status(400).json({ errors: errorMessages });
      return;
    }

    next();
  };
};
