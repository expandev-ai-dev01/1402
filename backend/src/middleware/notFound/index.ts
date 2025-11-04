/**
 * @summary 404 Not Found middleware
 * @module middleware/notFound
 */

import { Request, Response, NextFunction } from 'express';

/**
 * @summary Handles 404 Not Found errors
 * @function notFoundMiddleware
 *
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
export async function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.path} not found`,
      path: req.path,
      method: req.method,
    },
    timestamp: new Date().toISOString(),
  });
}

export default notFoundMiddleware;
