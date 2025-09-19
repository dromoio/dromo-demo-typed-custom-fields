/**
 * Dromo Custom Fields System - Public API
 *
 * @packageDocumentation
 */

// Main components
export { DromoImporter } from './components/dromo/DromoImporter';
export { CustomFieldsDialog } from './components/dromo/CustomFieldsDialog';

// Hooks
export { useCustomFields } from './components/dromo/hooks/useCustomFields';
export { useDromoHooks } from './components/dromo/hooks/useDromoHooks';
export { usePromiseDialog } from './hooks/usePromiseDialog';

// Types
export type {
  CustomField,
  CustomFieldWithType,
  FieldType,
  DromoFieldType,
  ImportResult,
  DromoImporterProps,
  CustomFieldsDialogProps,
  UseCustomFieldsReturn,
  FieldTypeMapping,
  FieldTypeOption,
  PredefinedField,
  SampleDataConfig,
} from './lib/dromo/types';

// Constants
export {
  FIELD_TYPES,
  FIELD_TYPE_MAPPING,
  DEFAULT_PREDEFINED_FIELDS,
  DEFAULT_SELECT_OPTIONS,
  SAMPLE_DATA_FIELDS,
  Z_INDEX,
  DEFAULT_USER,
} from './lib/dromo/constants';

// Utilities
export {
  mapToDromoType,
  keyToLabel,
  createTypedKey,
  createDromoField,
  createFieldMapping,
  isValidFieldType,
  getDefaultFieldType,
} from './lib/dromo/field-mappings';

// Configuration
export {
  createDromoSettings,
  SAMPLE_CSV_CONFIG,
} from './lib/dromo/config';

// Theme
export { getDromoStyleOverrides } from './lib/dromo/theme';

// Demo components (optional - for reference implementation)
export { DemoLayout } from './components/demo/DemoLayout';
export { ResultsDisplay } from './components/demo/ResultsDisplay';
export { SampleDataDownloader } from './components/demo/SampleDataDownloader';