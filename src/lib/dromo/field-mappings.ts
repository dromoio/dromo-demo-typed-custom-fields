/**
 * Field mapping utilities for Dromo Custom Fields
 * @module dromo/field-mappings
 */

import type { FieldType, DromoFieldType, CustomFieldWithType } from './types';
import { FIELD_TYPE_MAPPING } from './constants';
import type { IDeveloperField } from 'dromo-uploader-react';

/**
 * Maps our simple field type to Dromo's expected field type
 */
export function mapToDromoType(fieldType: FieldType): DromoFieldType {
  return FIELD_TYPE_MAPPING[fieldType] || "string";
}

/**
 * Converts a field key to a human-readable label
 * @example "customerName" -> "Customer Name"
 */
export function keyToLabel(key: string): string {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

/**
 * Creates a typed field key from the original key
 */
export function createTypedKey(originalKey: string): string {
  return `${originalKey}_typed`;
}

/**
 * Creates a Dromo field configuration from a custom field
 */
export function createDromoField(
  field: CustomFieldWithType,
  selectOptions?: Array<{ value: string; label: string }>
): IDeveloperField {
  const typedKey = createTypedKey(field.key);
  const dromoType = mapToDromoType(field.selectedType);
  const label = field.label || keyToLabel(field.key);

  // Handle select fields separately with proper typing
  if (field.selectedType === "select" && selectOptions) {
    return {
      label,
      key: typedKey,
      type: "select",
      selectOptions,
    } as IDeveloperField;
  }

  // For other field types
  return {
    label,
    key: typedKey,
    type: dromoType,
  } as IDeveloperField;
}

/**
 * Creates a mapping of original field keys to typed field keys
 */
export function createFieldMapping(fields: CustomFieldWithType[]): Record<string, string> {
  const mapping: Record<string, string> = {};

  fields.forEach((field) => {
    mapping[field.key] = createTypedKey(field.key);
  });

  return mapping;
}

/**
 * Validates if a field type is valid
 */
export function isValidFieldType(type: string): type is FieldType {
  const validTypes: FieldType[] = ["text", "number", "date", "select", "boolean"];
  return validTypes.includes(type as FieldType);
}

/**
 * Gets the default field type
 */
export function getDefaultFieldType(): FieldType {
  return "text";
}