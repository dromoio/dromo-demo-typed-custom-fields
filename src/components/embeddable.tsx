"use client";

import { FileUp, Download } from "lucide-react";
import DromoUploader, {
  IBulkRowHook,
  IDeveloperField,
  IUser,
  IDeveloperSettings,
  IStepHook,
} from "dromo-uploader-react";
import { ResultsArea } from "@/components/results-area";
import { UserFormData } from "./user-form";
import { getButtonClasses } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useRef } from "react";
import { CustomFieldsDialog } from "@/components/custom-fields-dialog";
import { IReviewStepData } from "dromo-uploader-js";
import { getDromoStyleOverrides } from "@/lib/dromo/theme";

interface EmbeddableProps {
  userData: UserFormData;
  schemaId: string;
}

interface CustomField {
  key: string;
  label?: string;
  fileHeader: string | null;
  fileHeaderIndex: number | null;
}

interface CustomFieldWithType extends CustomField {
  selectedType: "select" | "text" | "number" | "date" | "boolean";
}

export const Embeddable = ({ userData, schemaId }: EmbeddableProps) => {
  const [results, setResults] = useState<Record<string, string | number | boolean>[]>([]);
  const [customFieldsDialogOpen, setCustomFieldsDialogOpen] = useState(false);
  const [customFields, setCustomFields] = useState<CustomField[]>([]);

  // Refs for managing state across hook calls
  const dialogResolveRef = useRef<((fieldsWithTypes: CustomFieldWithType[]) => void) | null>(null);
  const fieldMappingRef = useRef<Record<string, string>>({});

  const handleResults = (response: Record<string, string | number | boolean>[]) => {
    setResults(response);
  };

  // Promise-based dialog management
  const showCustomFieldsDialog = (fields: CustomField[]): Promise<CustomFieldWithType[]> => {
    return new Promise((resolve) => {
      setCustomFields(fields);
      setCustomFieldsDialogOpen(true);
      dialogResolveRef.current = resolve;
    });
  };

  const handleDialogContinue = (fieldsWithTypes: CustomFieldWithType[]) => {
    if (dialogResolveRef.current) {
      dialogResolveRef.current(fieldsWithTypes);
      dialogResolveRef.current = null;
    }
  };

  // REVIEW_STEP hook - detects custom fields and creates typed versions
  const handleReviewStep: IStepHook["callback"] = async (instance, data) => {
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

      // Create properly typed fields and store mapping
      fieldMappingRef.current = {};
      fieldsWithTypes.forEach((fieldWithType) => {
        const typedKey = `${fieldWithType.key}_typed`;
        fieldMappingRef.current[fieldWithType.key] = typedKey;

        // Map our simple types to Dromo's expected types
        let dromoType: string = fieldWithType.selectedType;
        if (fieldWithType.selectedType === "text") {
          dromoType = "string";
        } else if (fieldWithType.selectedType === "boolean") {
          dromoType = "checkbox";
        }

        // Create field configuration with proper typing
        if (fieldWithType.selectedType === "select") {
          const selectField: IDeveloperField = {
            label: fieldWithType.key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            key: typedKey,
            type: "select",
            selectOptions: [
              { value: "option1", label: "Option 1" },
              { value: "option2", label: "Option 2" },
              { value: "option3", label: "Option 3" },
            ],
          } as IDeveloperField;
          instance.addField(selectField);
        } else {
          const fieldConfig: IDeveloperField = {
            label: fieldWithType.key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase()),
            key: typedKey,
            type: dromoType,
          } as IDeveloperField;
          instance.addField(fieldConfig);
        }
      });
    }
  };

  // POST_HOOKS step - removes original custom fields after data copying
  const handleReviewStepPostHooks: IStepHook["callback"] = async (instance) => {
    Object.keys(fieldMappingRef.current).forEach((originalFieldKey) => {
      try {
        instance.removeField(originalFieldKey);
      } catch (error) {
        console.warn(`Could not remove field ${originalFieldKey}:`, error);
      }
    });
  };

  // Bulk row hook - copies data from original to typed fields
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

  // Component configuration
  const fields: IDeveloperField[] = [
    { label: "Customer Priority", key: "customerPriority" },
    { label: "Internal Notes", key: "internalNotes" },
  ];

  const user: IUser = {
    id: "1",
    name: userData.name || "Anonymous",
    email: userData.email || "anonymous@example.com",
    companyId: userData.company || "Unknown",
    companyName: userData.company || "Unknown",
  };

  const settings: IDeveloperSettings = {
    importIdentifier: schemaId,
    allowCustomFields: true,
    styleOverrides: getDromoStyleOverrides(),
  };

  const handleDownloadSample = () => {
    const link = document.createElement('a');
    link.href = '/sample-import-data.csv';
    link.download = 'sample-import-data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileUp className="w-5 h-5" />
            Import Your Data
          </CardTitle>
          <CardDescription>
            Click the button below to launch the import wizard or download a sample file
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <DromoUploader
              licenseKey={process.env.NEXT_PUBLIC_DROMO_LICENSE_KEY!}
              fields={fields}
              user={user}
              settings={settings}
              onResults={handleResults}
              className={getButtonClasses({ size: "lg" })}
              stepHooks={[
                { type: "REVIEW_STEP", callback: handleReviewStep },
                { type: "REVIEW_STEP_POST_HOOKS", callback: handleReviewStepPostHooks },
              ]}
              bulkRowHooks={[handleBulkRowHook]}
            >
              <FileUp className="mr-2 h-4 w-4" />
              Launch Import Wizard
            </DromoUploader>

            <button
              onClick={handleDownloadSample}
              className={getButtonClasses({ size: "lg", variant: "outline" })}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Sample CSV
            </button>
          </div>

          <div className="mt-4 space-y-3">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Predefined fields:</span> Customer Priority, Internal Notes
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Any additional columns in your CSV will be detected as custom fields
              </p>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                Sample CSV includes various data types:
              </p>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• <span className="font-medium">Text fields:</span> Company Name, Region, Account Manager</li>
                <li>• <span className="font-medium">Number fields:</span> Revenue, Satisfaction Score, Total Orders</li>
                <li>• <span className="font-medium">Date fields:</span> Order Date, Customer Since, Last Contact Date</li>
                <li>• <span className="font-medium">Boolean fields:</span> Active Account, VIP Status</li>
                <li>• <span className="font-medium">Select fields:</span> Product Category</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <CustomFieldsDialog
        open={customFieldsDialogOpen}
        onOpenChange={setCustomFieldsDialogOpen}
        customFields={customFields}
        onContinue={handleDialogContinue}
      />

      <ResultsArea data={results} />
    </div>
  );
};