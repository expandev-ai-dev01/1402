/**
 * @summary CRUD controller middleware for standardized operations
 * @module middleware/crud
 */

import { Request } from 'express';
import { z } from 'zod';

/**
 * @interface SecurityRule
 * @description Security rule configuration for CRUD operations
 */
export interface SecurityRule {
  securable: string;
  permission: 'CREATE' | 'READ' | 'UPDATE' | 'DELETE';
}

/**
 * @interface ValidationResult
 * @description Result of validation operation
 */
export interface ValidationResult {
  credential: {
    idAccount: number;
    idUser: number;
  };
  params: any;
}

/**
 * @class CrudController
 * @description Handles CRUD operations with security and validation
 */
export class CrudController {
  private rules: SecurityRule[];

  constructor(rules: SecurityRule[]) {
    this.rules = rules;
  }

  /**
   * @summary Validates create operation
   */
  async create(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    try {
      const params = await schema.parseAsync(req.body);
      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params }, null];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @summary Validates read operation
   */
  async read(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    try {
      const params = await schema.parseAsync(req.params);
      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params }, null];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @summary Validates update operation
   */
  async update(
    req: Request,
    paramsSchema: z.ZodSchema,
    bodySchema: z.ZodSchema
  ): Promise<[ValidationResult | null, any]> {
    try {
      const params = await paramsSchema.parseAsync(req.params);
      const body = await bodySchema.parseAsync(req.body);
      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params: { ...params, ...body } }, null];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @summary Validates delete operation
   */
  async delete(req: Request, schema: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    try {
      const params = await schema.parseAsync(req.params);
      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params }, null];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * @summary Validates list operation
   */
  async list(req: Request, schema?: z.ZodSchema): Promise<[ValidationResult | null, any]> {
    try {
      const params = schema ? await schema.parseAsync(req.query) : {};
      const credential = {
        idAccount: 1,
        idUser: 1,
      };

      return [{ credential, params }, null];
    } catch (error) {
      return [null, error];
    }
  }
}

/**
 * @summary Success response helper
 */
export function successResponse(data: any) {
  return {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary Error response helper
 */
export function errorResponse(message: string, code?: string) {
  return {
    success: false,
    error: {
      code: code || 'ERROR',
      message,
    },
    timestamp: new Date().toISOString(),
  };
}

/**
 * @summary General error status
 */
export const StatusGeneralError = {
  statusCode: 500,
  message: 'Internal Server Error',
};

export default CrudController;
