/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

/*
 * NOTICE: Do not edit this file manually.
 * This file is automatically generated by the OpenAPI Generator, @kbn/openapi-generator.
 *
 * info:
 *   title: Alerts migration cleanup API endpoint
 *   version: 2023-10-31
 */

import { z } from '@kbn/zod';

export type MigrationCleanupResult = z.infer<typeof MigrationCleanupResult>;
export const MigrationCleanupResult = z.object({
  id: z.string(),
  destinationIndex: z.string(),
  status: z.enum(['success', 'failure', 'pending']),
  sourceIndex: z.string(),
  version: z.string(),
  updated: z.string().datetime(),
  error: z
    .object({
      message: z.string(),
      status_code: z.number().int(),
    })
    .optional(),
});

export type AlertsMigrationCleanupRequestBody = z.infer<typeof AlertsMigrationCleanupRequestBody>;
export const AlertsMigrationCleanupRequestBody = z.object({
  migration_ids: z.array(z.string()).min(1),
});
export type AlertsMigrationCleanupRequestBodyInput = z.input<
  typeof AlertsMigrationCleanupRequestBody
>;

export type AlertsMigrationCleanupResponse = z.infer<typeof AlertsMigrationCleanupResponse>;
export const AlertsMigrationCleanupResponse = z.array(MigrationCleanupResult);
