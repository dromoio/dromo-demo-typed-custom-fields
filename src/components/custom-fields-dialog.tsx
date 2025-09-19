"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Type, Hash, Calendar, ListFilter, ToggleLeft, Sparkles } from "lucide-react";

interface CustomField {
  key: string;
  label?: string;
  fileHeader: string | null;
  fileHeaderIndex: number | null;
}

interface CustomFieldWithType extends CustomField {
  selectedType: "select" | "text" | "number" | "date" | "boolean";
}

interface CustomFieldsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customFields: CustomField[];
  onContinue: (fieldsWithTypes: CustomFieldWithType[]) => void;
}

const FIELD_TYPES = [
  { value: "text", label: "Text" },
  { value: "number", label: "Number" },
  { value: "date", label: "Date" },
  { value: "select", label: "Select (Dropdown)" },
  { value: "boolean", label: "Yes/No" },
] as const;

export const CustomFieldsDialog = ({
  open,
  onOpenChange,
  customFields,
  onContinue,
}: CustomFieldsDialogProps) => {
  const [fieldTypes, setFieldTypes] = useState<Record<string, string>>(() => {
    const initialTypes: Record<string, string> = {};
    customFields.forEach((field) => {
      initialTypes[field.key] = "text"; // default to text
    });
    return initialTypes;
  });

  const handleFieldTypeChange = (fieldKey: string, type: string) => {
    setFieldTypes((prev) => ({
      ...prev,
      [fieldKey]: type,
    }));
  };

  const handleContinue = () => {
    const fieldsWithTypes: CustomFieldWithType[] = customFields.map((field) => ({
      ...field,
      selectedType: (fieldTypes[field.key] as CustomFieldWithType["selectedType"]) || "text",
    }));
    onOpenChange(false);
    onContinue(fieldsWithTypes);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Custom Fields Detected</DialogTitle>
              <DialogDescription>
                We found {customFields.length} unmapped {customFields.length === 1 ? 'column' : 'columns'} in your CSV
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-3 space-y-4">
          {customFields.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No custom fields were added.
            </p>
          ) : (
            <>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Please select the appropriate data type for each field. This helps ensure your data is properly formatted and validated.
                </p>
              </div>

              {customFields.map((field) => (
                <div key={field.key} className="p-4 border rounded-lg space-y-3 hover:bg-muted/10 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{field.key}</p>
                        <Badge variant="outline" className="text-xs">
                          Custom Field
                        </Badge>
                      </div>
                      {field.fileHeader && field.fileHeader !== field.key && (
                        <p className="text-sm text-muted-foreground">
                          Original header: &quot;{field.fileHeader}&quot;
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`type-${field.key}`} className="text-sm font-medium">
                      Select Field Type
                    </Label>
                    <Select
                      value={fieldTypes[field.key] || "text"}
                      onValueChange={(value) => handleFieldTypeChange(field.key, value)}
                    >
                      <SelectTrigger id={`type-${field.key}`} className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {FIELD_TYPES.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            <div className="flex items-center gap-2">
                              {type.value === "text" && <Type className="w-4 h-4" />}
                              {type.value === "number" && <Hash className="w-4 h-4" />}
                              {type.value === "date" && <Calendar className="w-4 h-4" />}
                              {type.value === "select" && <ListFilter className="w-4 h-4" />}
                              {type.value === "boolean" && <ToggleLeft className="w-4 h-4" />}
                              <span>{type.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <p className="text-sm text-muted-foreground">
            {customFields.length} {customFields.length === 1 ? 'field' : 'fields'} will be added
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleContinue}>
              Continue Import
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
