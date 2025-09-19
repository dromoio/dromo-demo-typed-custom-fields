/**
 * Basic Dromo Import Example
 *
 * This example shows the simplest way to implement the Dromo importer
 * with custom fields support.
 */

import { DromoImporter } from '@/components/dromo/DromoImporter';
import type { ImportResult } from '@/lib/dromo/types';

export function BasicImportExample() {
  const handleImportComplete = (data: ImportResult) => {
    console.log('Import completed with', data.length, 'records');
    console.log('Sample data:', data[0]);

    // Process your imported data here
    // e.g., send to API, update state, etc.
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Basic Import Example</h2>

      <DromoImporter
        licenseKey={process.env.NEXT_PUBLIC_DROMO_LICENSE_KEY!}
        onImportComplete={handleImportComplete}
        enableCustomFields={true}
        predefinedFields={[
          { label: "First Name", key: "firstName" },
          { label: "Last Name", key: "lastName" },
          { label: "Email", key: "email", type: "email" },
        ]}
      />

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-sm text-gray-600">
          This example uses the default configuration. Any columns in your CSV
          that don't match "First Name", "Last Name", or "Email" will be
          detected as custom fields.
        </p>
      </div>
    </div>
  );
}