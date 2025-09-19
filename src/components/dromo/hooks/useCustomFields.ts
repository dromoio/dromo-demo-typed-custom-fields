/**
 * Hook for managing custom fields detection and configuration
 * @module dromo/hooks/useCustomFields
 */

import { useState, useRef } from 'react';
import type { CustomField, CustomFieldWithType, UseCustomFieldsReturn } from '@/lib/dromo/types';

/**
 * Hook for managing custom fields dialog and state
 */
export function useCustomFields(): UseCustomFieldsReturn {
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dialogResolveRef = useRef<((fieldsWithTypes: CustomFieldWithType[]) => void) | null>(null);

  /**
   * Shows the custom fields dialog and returns a promise
   * that resolves when the user continues
   */
  const showDialog = (fields: CustomField[]): Promise<CustomFieldWithType[]> => {
    return new Promise((resolve) => {
      setCustomFields(fields);
      setDialogOpen(true);
      dialogResolveRef.current = resolve;
    });
  };

  /**
   * Handles when user continues with selected field types
   */
  const handleDialogContinue = (fieldsWithTypes: CustomFieldWithType[]) => {
    if (dialogResolveRef.current) {
      dialogResolveRef.current(fieldsWithTypes);
      dialogResolveRef.current = null;
    }
    setDialogOpen(false);
  };

  return {
    customFields,
    dialogOpen,
    showDialog,
    handleDialogContinue,
  };
}