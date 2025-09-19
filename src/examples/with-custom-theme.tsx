/**
 * Custom Themed Dromo Import Example
 *
 * This example shows how to customize the appearance of the Dromo importer
 * to match your brand's design system.
 */

import { DromoImporter } from '@/components/dromo/DromoImporter';
import type { ImportResult } from '@/lib/dromo/types';

// Custom theme configuration
const customTheme = {
  global: {
    primaryTextColor: "#1a1a1a",
    secondaryTextColor: "#666666",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "#e0e0e0"
  },
  primaryButton: {
    backgroundColor: "#007bff",
    textColor: "#ffffff",
    borderRadius: "8px",
    border: "none",
    hoverBackgroundColor: "#0056b3",
    hoverTextColor: "#ffffff",
    hoverBorder: "none"
  },
  secondaryButton: {
    backgroundColor: "#ffffff",
    textColor: "#007bff",
    borderRadius: "8px",
    border: "2px solid #007bff",
    hoverBackgroundColor: "#f0f8ff",
    hoverTextColor: "#0056b3",
    hoverBorder: "2px solid #0056b3"
  },
  dropzone: {
    borderWidth: 3,
    borderRadius: 12,
    borderColor: "#007bff",
    borderStyle: "dashed",
    backgroundColor: "#f0f8ff",
    outline: "none"
  },
  helpText: {
    textColor: "#666666",
    backgroundColor: "#f8f9fa"
  },
  stepperBar: {
    currentColor: "#007bff"
  }
};

export function CustomThemeExample() {
  const handleImportComplete = (data: ImportResult) => {
    console.log('Import completed:', data);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Custom Themed Import</h2>

      <DromoImporter
        licenseKey={process.env.NEXT_PUBLIC_DROMO_LICENSE_KEY!}
        onImportComplete={handleImportComplete}
        enableCustomFields={true}
        styleOverrides={customTheme}
        predefinedFields={[
          { label: "Product Name", key: "productName" },
          { label: "SKU", key: "sku" },
          { label: "Price", key: "price", type: "number" },
          { label: "In Stock", key: "inStock", type: "checkbox" },
        ]}
      />

      <div className="mt-4 p-4 bg-blue-50 rounded">
        <p className="text-sm text-blue-700">
          This example uses a custom blue theme. The Dromo interface will match
          your brand colors and styling preferences.
        </p>
      </div>
    </div>
  );
}