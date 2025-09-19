/**
 * Configuration for the Dromo Custom Fields System
 * @module dromo/config
 */

import type { IDeveloperSettings } from 'dromo-uploader-react';
import { getDromoStyleOverrides } from './theme';

/**
 * Creates the base Dromo settings configuration
 */
export function createDromoSettings(
  importIdentifier: string,
  enableCustomFields: boolean = true,
  styleOverrides?: IDeveloperSettings["styleOverrides"]
): IDeveloperSettings {
  return {
    importIdentifier,
    allowCustomFields: enableCustomFields,
    styleOverrides: styleOverrides || getDromoStyleOverrides(),
  };
}

/**
 * Sample CSV configuration
 */
export const SAMPLE_CSV_CONFIG = {
  filename: 'sample-import-data.csv',
  path: '/sample-import-data.csv',
  description: 'Sample CSV with various data types for testing custom fields',
};
