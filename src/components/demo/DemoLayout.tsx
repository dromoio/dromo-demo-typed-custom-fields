/**
 * Demo layout component
 * @module demo/DemoLayout
 */

"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileSpreadsheet, CheckCircle2, FileUp } from "lucide-react";
import { DromoImporter } from "@/components/dromo/DromoImporter";
import { ResultsDisplay } from "./ResultsDisplay";
import { SampleDataDownloader } from "./SampleDataDownloader";
import { DEFAULT_PREDEFINED_FIELDS } from "@/lib/dromo/constants";
import type { ImportResult } from "@/lib/dromo/types";

interface DemoLayoutProps {
  licenseKey: string;
}

/**
 * Complete demo layout showcasing the Dromo importer
 */
export function DemoLayout({ licenseKey }: DemoLayoutProps) {
  const [results, setResults] = useState<ImportResult>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileSpreadsheet className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent mb-3">
              Smart CSV Import with Custom Fields
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Automatically detect and configure custom fields during import. Select the appropriate field types for unmapped columns.
            </p>
          </div>

          {/* Main Content */}
          <div className="space-y-6 max-w-3xl mx-auto">
            {/* How it Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
                <CardDescription>
                  Three simple steps to import your data with custom fields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Upload Your CSV</p>
                      <p className="text-sm text-muted-foreground">
                        Click the button below and select your CSV file
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Configure Custom Fields</p>
                      <p className="text-sm text-muted-foreground">
                        Unmapped columns will be detected and you can select their field types
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Review & Import</p>
                      <p className="text-sm text-muted-foreground">
                        Review your data and complete the import process
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Import Section */}
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
                  <DromoImporter
                    licenseKey={licenseKey}
                    onImportComplete={setResults}
                    predefinedFields={DEFAULT_PREDEFINED_FIELDS}
                    enableCustomFields={true}
                  />
                  <SampleDataDownloader />
                </div>

                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Predefined fields:</span>{" "}
                    {DEFAULT_PREDEFINED_FIELDS.map(f => f.label).join(", ")}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Any additional columns in your CSV will be detected as custom fields
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <ResultsDisplay data={results} />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <Card className="border-muted">
              <CardHeader className="pb-3">
                <Upload className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Smart Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Automatically identifies unmapped columns in your CSV file
                </p>
              </CardContent>
            </Card>
            <Card className="border-muted">
              <CardHeader className="pb-3">
                <FileSpreadsheet className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Field Types</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Choose from Text, Number, Date, Select, or Boolean types
                </p>
              </CardContent>
            </Card>
            <Card className="border-muted">
              <CardHeader className="pb-3">
                <CheckCircle2 className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-base">Data Integrity</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  All data is preserved and properly typed for your application
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
