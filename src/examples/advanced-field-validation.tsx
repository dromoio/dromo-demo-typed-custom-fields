/**
 * Advanced Field Validation Example
 *
 * This example demonstrates how to implement custom field validation
 * and data processing with the Dromo importer.
 */

import { useState } from 'react';
import { DromoImporter } from '@/components/dromo/DromoImporter';
import { ResultsDisplay } from '@/components/demo/ResultsDisplay';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { ImportResult } from '@/lib/dromo/types';

export function AdvancedFieldValidationExample() {
  const [results, setResults] = useState<ImportResult>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateAndProcessData = (data: ImportResult) => {
    const errors: string[] = [];
    const processedData: ImportResult = [];

    data.forEach((row, index) => {
      // Custom validation logic
      let isValid = true;

      // Example: Validate email format for custom fields
      Object.entries(row).forEach(([key, value]) => {
        if (key.includes('email') && typeof value === 'string') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            errors.push(`Row ${index + 1}: Invalid email format in ${key}`);
            isValid = false;
          }
        }

        // Example: Validate number ranges
        if (key.includes('age') && typeof value === 'number') {
          if (value < 0 || value > 150) {
            errors.push(`Row ${index + 1}: Age must be between 0 and 150`);
            isValid = false;
          }
        }

        // Example: Validate date ranges
        if (key.includes('date') && typeof value === 'string') {
          const date = new Date(value);
          const today = new Date();
          if (date > today) {
            errors.push(`Row ${index + 1}: Date cannot be in the future`);
            isValid = false;
          }
        }
      });

      // Only add valid rows to processed data
      if (isValid) {
        processedData.push(row);
      }
    });

    setValidationErrors(errors);
    setResults(processedData);

    // Log validation results
    console.log('Validation complete:', {
      totalRows: data.length,
      validRows: processedData.length,
      errors: errors.length
    });
  };

  const handleImportComplete = (data: ImportResult) => {
    console.log('Raw import data:', data);
    validateAndProcessData(data);
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Advanced Field Validation</h2>
        <p className="text-gray-600">
          This example shows how to validate imported data and handle errors.
        </p>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-semibold mb-2">Validation Rules:</h3>
        <ul className="text-sm space-y-1">
          <li>• Email fields must have valid email format</li>
          <li>• Age fields must be between 0 and 150</li>
          <li>• Date fields cannot be in the future</li>
        </ul>
      </div>

      <DromoImporter
        licenseKey={process.env.NEXT_PUBLIC_DROMO_LICENSE_KEY!}
        onImportComplete={handleImportComplete}
        enableCustomFields={true}
        predefinedFields={[
          { label: "Name", key: "name" },
          { label: "Email", key: "email", type: "email" },
          { label: "Age", key: "age", type: "number" },
          { label: "Join Date", key: "joinDate", type: "date" },
        ]}
        user={{
          id: "validator",
          name: "Data Validator",
          email: "validator@example.com"
        }}
      />

      {validationErrors.length > 0 && (
        <Alert variant="destructive">
          <AlertDescription>
            <strong>Validation Errors:</strong>
            <ul className="mt-2 text-sm">
              {validationErrors.slice(0, 5).map((error, i) => (
                <li key={i}>• {error}</li>
              ))}
              {validationErrors.length > 5 && (
                <li>• ... and {validationErrors.length - 5} more errors</li>
              )}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {results.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">
            Valid Records ({results.length})
          </h3>
          <ResultsDisplay data={results} />
        </div>
      )}
    </div>
  );
}