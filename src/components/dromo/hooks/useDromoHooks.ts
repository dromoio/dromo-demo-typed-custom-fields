/**
 * Dromo hook management utilities
 * @module dromo/hooks/useDromoHooks
 */

import { useRef } from 'react';
import type { IStepHook, IBulkRowHook } from 'dromo-uploader-react';
import type { IReviewStepData } from 'dromo-uploader-js';
import type { CustomField, CustomFieldWithType } from '@/lib/dromo/types';
import {
  createDromoField,
  createFieldMapping,
  createTypedKey
} from '@/lib/dromo/field-mappings';
import { DEFAULT_SELECT_OPTIONS } from '@/lib/dromo/constants';

interface UseDromoHooksProps {
  showCustomFieldsDialog: (fields: CustomField[]) => Promise<CustomFieldWithType[]>;
}

/**
 * Hook for managing Dromo step hooks and bulk row processing
 */
export function useDromoHooks({ showCustomFieldsDialog }: UseDromoHooksProps) {
  const fieldMappingRef = useRef<Record<string, string>>({});

  /**
   * REVIEW_STEP hook - detects custom fields and creates typed versions
   */
  const handleReviewStep: IStepHook['callback'] = async (instance, data) => {
    const reviewData = data as IReviewStepData;
    const customFieldsFound: CustomField[] = [];

    // Find all custom fields in the data
    Object.entries(reviewData.fields).forEach(([key, field]) => {
      if (field.isCustom) {
        customFieldsFound.push({
          key,
          fileHeader: field.fileHeader,
          fileHeaderIndex: field.fileHeaderIndex,
          label: undefined, // Label will be generated from the key
        });
      }
    });

    if (customFieldsFound.length > 0) {
      // Show dialog and wait for user response
      const fieldsWithTypes = await showCustomFieldsDialog(customFieldsFound);

      // Create field mapping and add typed fields
      fieldMappingRef.current = createFieldMapping(fieldsWithTypes);

      fieldsWithTypes.forEach((field) => {
        const dromoField = createDromoField(field, DEFAULT_SELECT_OPTIONS);
        instance.addField(dromoField);
      });
    }
  };

  /**
   * POST_HOOKS step - removes original custom fields after data copying
   */
  const handleReviewStepPostHooks: IStepHook['callback'] = async (instance) => {
    Object.keys(fieldMappingRef.current).forEach((originalFieldKey) => {
      try {
        instance.removeField(originalFieldKey);
      } catch (error) {
        console.warn(`Could not remove field ${originalFieldKey}:`, error);
      }
    });
  };

  /**
   * Bulk row hook - copies data from original to typed fields
   */
  const handleBulkRowHook: IBulkRowHook = (records) => {
    return records.map((record) => {
      const newRecord = {
        row: { ...record.row },
        index: record.index,
      };

      Object.entries(fieldMappingRef.current).forEach(([originalKey, typedKey]) => {
        const originalCell = record.row[originalKey];
        if (originalCell?.value) {
          if (!newRecord.row[typedKey]) {
            newRecord.row[typedKey] = {
              value: "",
              resultValue: null,
            };
          }
          newRecord.row[typedKey].value = originalCell.value;
          if ("resultValue" in originalCell && originalCell.resultValue !== undefined) {
            newRecord.row[typedKey].resultValue = originalCell.resultValue;
          }
        }
      });

      return newRecord;
    });
  };

  /**
   * Returns all hooks needed for Dromo configuration
   */
  const getStepHooks = (): IStepHook[] => [
    { type: "REVIEW_STEP", callback: handleReviewStep },
    { type: "REVIEW_STEP_POST_HOOKS", callback: handleReviewStepPostHooks },
  ];

  const getBulkRowHooks = (): IBulkRowHook[] => [handleBulkRowHook];

  return {
    getStepHooks,
    getBulkRowHooks,
    fieldMapping: fieldMappingRef.current,
  };
}