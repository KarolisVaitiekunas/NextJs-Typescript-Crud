import { Request, Response, NextFunction } from "express";
import { OptionalObjectSchema } from "yup/lib/object";

/**
 * Validates body with the input schema and calls next() if is successful.
 */
const validate = (schema: OptionalObjectSchema<any>) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export default validate;
