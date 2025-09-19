/**
 * Component for downloading sample CSV data
 * @module demo/SampleDataDownloader
 */

"use client";

import { Download } from "lucide-react";
import { getButtonClasses } from "@/components/ui/button";
import { SAMPLE_DATA_FIELDS } from "@/lib/dromo/constants";
import { SAMPLE_CSV_CONFIG } from "@/lib/dromo/config";

interface SampleDataDownloaderProps {
  /** Custom URL for the sample data */
  url?: string;
  /** Custom filename for download */
  filename?: string;
  /** Show field descriptions */
  showDescription?: boolean;
}

/**
 * Provides a button to download sample CSV data for testing
 */
export function SampleDataDownloader({
  url = SAMPLE_CSV_CONFIG.path,
  filename = SAMPLE_CSV_CONFIG.filename,
  showDescription = true,
}: SampleDataDownloaderProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={handleDownload}
        className={getButtonClasses({ size: "lg", variant: "outline" })}
      >
        <Download className="mr-2 h-4 w-4" />
        Download Sample CSV
      </button>

      {showDescription && (
        <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
            Sample CSV includes various data types:
          </p>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• <span className="font-medium">Text fields:</span> {SAMPLE_DATA_FIELDS.text.join(", ")}</li>
            <li>• <span className="font-medium">Number fields:</span> {SAMPLE_DATA_FIELDS.number.join(", ")}</li>
            <li>• <span className="font-medium">Date fields:</span> {SAMPLE_DATA_FIELDS.date.join(", ")}</li>
            <li>• <span className="font-medium">Boolean fields:</span> {SAMPLE_DATA_FIELDS.boolean.join(", ")}</li>
            <li>• <span className="font-medium">Select fields:</span> {SAMPLE_DATA_FIELDS.select.join(", ")}</li>
          </ul>
        </div>
      )}
    </div>
  );
}