/**
 * Constants for the Dromo Custom Fields System
 * @module dromo/constants
 */

import type { FieldTypeOption, FieldTypeMapping } from './types';
import type { IDeveloperField } from 'dromo-uploader-react';

/**
 * Available field types with display labels
 */
export const FIELD_TYPES: FieldTypeOption[] = [
  { value: "text", label: "Text", icon: "Type" },
  { value: "number", label: "Number", icon: "Hash" },
  { value: "date", label: "Date", icon: "Calendar" },
  { value: "select", label: "Select (Dropdown)", icon: "ListFilter" },
  { value: "boolean", label: "Yes/No", icon: "ToggleLeft" },
] as const;

/**
 * Mapping of our simple field types to Dromo's expected types
 */
export const FIELD_TYPE_MAPPING: FieldTypeMapping = {
  text: "string",
  boolean: "checkbox",
  number: "number",
  date: "date",
  select: "select",
} as const;

/**
 * Default predefined fields for demo
 */
export const DEFAULT_PREDEFINED_FIELDS: IDeveloperField[] = [
  { label: "Customer Priority", key: "customerPriority" },
  { label: "Internal Notes", key: "internalNotes" },
];

/**
 * Default select options for demo purposes
 */
export const DEFAULT_SELECT_OPTIONS = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

/**
 * Sample data field descriptions
 */
export const SAMPLE_DATA_FIELDS = {
  text: ["Company Name", "Region", "Account Manager"],
  number: ["Revenue", "Satisfaction Score", "Total Orders"],
  date: ["Order Date", "Customer Since", "Last Contact Date"],
  boolean: ["Active Account", "VIP Status"],
  select: ["Product Category"],
};

/**
 * Dialog z-index values to ensure proper stacking
 */
export const Z_INDEX = {
  DIALOG_OVERLAY: 2147483647,
  DIALOG_CONTENT: 2147483647,
  SELECT_CONTENT: 2147483648,
} as const;

/**
 * Default user data for demo
 */
export const DEFAULT_USER = {
  id: "1",
  name: "Demo User",
  email: "demo@example.com",
  companyId: "demo-company",
  companyName: "Demo Company",
};