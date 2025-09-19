/**
 * Main Dromo Importer Component
 * @module dromo/DromoImporter
 */

"use client";

import DromoUploader, { type IDeveloperField, type IUser } from "dromo-uploader-react";
import { FileUp } from "lucide-react";
import { CustomFieldsDialog } from "./CustomFieldsDialog";
import { useCustomFields } from "./hooks/useCustomFields";
import { useDromoHooks } from "./hooks/useDromoHooks";
import { getButtonClasses } from "@/components/ui/button";
import { createDromoSettings } from "@/lib/dromo/config";
import { DEFAULT_USER } from "@/lib/dromo/constants";
import type { DromoImporterProps, ImportResult } from "@/lib/dromo/types";

/**
 * A clean, reusable Dromo importer component with custom fields support
 *
 * @example
 * ```tsx
 * <DromoImporter
 *   licenseKey={process.env.NEXT_PUBLIC_DROMO_LICENSE_KEY}
 *   onImportComplete={(data) => console.log('Imported:', data)}
 *   enableCustomFields={true}
 * />
 * ```
 */
export function DromoImporter({
  licenseKey,
  onImportComplete,
  predefinedFields = [],
  enableCustomFields = true,
  styleOverrides,
  user: userProp,
  importId,
  children,
}: DromoImporterProps & { children?: React.ReactNode }) {
  const { customFields, dialogOpen, showDialog, handleDialogContinue } = useCustomFields();
  const { getStepHooks, getBulkRowHooks } = useDromoHooks({ showCustomFieldsDialog: showDialog });

  // Handle import results
  const handleResults = (response: ImportResult) => {
    if (onImportComplete) {
      onImportComplete(response);
    }
  };

  // Merge user data with defaults
  const user: IUser = {
    ...DEFAULT_USER,
    ...userProp,
  } as IUser;

  // Generate import ID if not provided
  const importIdentifier = importId || `import-${Date.now()}`;

  // Create settings
  const settings = createDromoSettings(importIdentifier, enableCustomFields, styleOverrides);

  return (
    <>
      <DromoUploader
        licenseKey={licenseKey}
        fields={predefinedFields}
        user={user}
        settings={settings}
        onResults={handleResults}
        className={getButtonClasses({ size: "lg" })}
        stepHooks={enableCustomFields ? getStepHooks() : undefined}
        bulkRowHooks={enableCustomFields ? getBulkRowHooks() : undefined}
      >
        {children || (
          <>
            <FileUp className="mr-2 h-4 w-4" />
            Launch Import Wizard
          </>
        )}
      </DromoUploader>

      {enableCustomFields && (
        <CustomFieldsDialog
          open={dialogOpen}
          onOpenChange={() => {}} // Dialog is controlled by the hook
          customFields={customFields}
          onContinue={handleDialogContinue}
        />
      )}
    </>
  );
}