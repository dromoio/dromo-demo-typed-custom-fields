/**
 * Type definitions for the Dromo Custom Fields System
 * @module dromo/types
 */

import type {
  IDeveloperField,
  IUser,
  IDeveloperSettings,
} from 'dromo-uploader-react';

/**
 * Represents a custom field detected in the imported data
 */
export interface CustomField {
  /** The field's key identifier */
  key: string;
  /** Optional display label */
  label?: string;
  /** The original column header from the file */
  fileHeader: string | null;
  /** The column index in the file */
  fileHeaderIndex: number | null;
}

/**
 * Custom field with an assigned data type
 */
export interface CustomFieldWithType extends CustomField {
  /** The selected data type for this field */
  selectedType: FieldType;
}

/**
 * Available field types for custom fields
 */
export type FieldType = "select" | "text" | "number" | "date" | "boolean";

/**
 * Dromo's internal field type values
 */
export type DromoFieldType =
  | "string"
  | "checkbox"
  | "email"
  | "select"
  | "number"
  | "date"
  | "domain"
  | "datetime"
  | "phone-number"
  | "url"
  | "ssn"
  | "uuid"
  | "time"
  | "us-zip-code"
  | "us-state-territory"
  | "country";

/**
 * Result of an import operation
 */
export type ImportResult = Record<string, string | number | boolean>[];

/**
 * Props for the main DromoImporter component
 */
export interface DromoImporterProps {
  /** Dromo license key */
  licenseKey: string;
  /** Callback when import is complete */
  onImportComplete?: (data: ImportResult) => void;
  /** Predefined fields for the schema */
  predefinedFields?: IDeveloperField[];
  /** Enable custom field detection and configuration */
  enableCustomFields?: boolean;
  /** Custom style overrides */
  styleOverrides?: IDeveloperSettings["styleOverrides"];
  /** User information for the session */
  user?: Partial<IUser>;
  /** Import identifier */
  importId?: string;
  /** Show sample data download button */
  showSampleDownload?: boolean;
  /** Custom sample data URL */
  sampleDataUrl?: string;
}

/**
 * Configuration for the custom fields dialog
 */
export interface CustomFieldsDialogProps {
  /** Whether the dialog is open */
  open: boolean;
  /** Callback to change open state */
  onOpenChange: (open: boolean) => void;
  /** List of detected custom fields */
  customFields: CustomField[];
  /** Callback when user continues with selected types */
  onContinue: (fieldsWithTypes: CustomFieldWithType[]) => void;
}

/**
 * Hook return type for custom fields management
 */
export interface UseCustomFieldsReturn {
  /** Current custom fields */
  customFields: CustomField[];
  /** Whether the dialog is open */
  dialogOpen: boolean;
  /** Show the custom fields dialog */
  showDialog: (fields: CustomField[]) => Promise<CustomFieldWithType[]>;
  /** Handle dialog continue */
  handleDialogContinue: (fields: CustomFieldWithType[]) => void;
}

/**
 * Mapping between simple types and Dromo types
 */
export interface FieldTypeMapping {
  [key: string]: DromoFieldType;
}

/**
 * Field type option for display in UI
 */
export interface FieldTypeOption {
  /** The value to store */
  value: FieldType;
  /** Display label */
  label: string;
  /** Icon component or name */
  icon?: string;
}

/**
 * Configuration for predefined fields
 */
export interface PredefinedField {
  /** Display label */
  label: string;
  /** Field key */
  key: string;
  /** Field type */
  type?: DromoFieldType;
  /** Whether field is required */
  required?: boolean;
}

/**
 * Sample data configuration
 */
export interface SampleDataConfig {
  /** URL to the sample CSV file */
  url: string;
  /** Description of the sample data */
  description?: string;
  /** Field types included */
  fieldTypes?: {
    text?: string[];
    number?: string[];
    date?: string[];
    boolean?: string[];
    select?: string[];
  };
}
