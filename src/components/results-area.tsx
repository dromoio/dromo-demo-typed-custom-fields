"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, CheckCircle, Table2 } from "lucide-react";

interface ResultsAreaProps {
  data: Record<string, string | number | boolean>[];
}

export const ResultsArea = ({ data }: ResultsAreaProps) => {
  if (data.length === 0) {
    return (
      <Card className="border-dashed">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-muted-foreground" />
            <CardTitle className="text-lg">Import Results</CardTitle>
          </div>
          <CardDescription>
            Your imported data will appear here
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-3">
              <Table2 className="w-6 h-6 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              No data imported yet
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Click &quot;Launch Import Wizard&quot; above to get started
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <CardTitle className="text-lg">Import Complete</CardTitle>
          </div>
          <Badge variant="secondary" className="font-mono">
            {data.length} records
          </Badge>
        </div>
        <CardDescription>
          Successfully imported your data with custom fields
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 font-medium text-sm border-b">
                    #
                  </th>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} className="text-left px-4 py-3 font-medium text-sm border-b">
                      <div className="flex items-center gap-2">
                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        {key.includes('_typed') && (
                          <Badge variant="outline" className="text-xs">
                            Custom
                          </Badge>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 10).map((row, idx) => (
                  <tr key={idx} className="hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-muted-foreground border-b">
                      {idx + 1}
                    </td>
                    {Object.entries(row).map(([key, value]) => (
                      <td key={key} className="px-4 py-3 text-sm border-b">
                        {typeof value === "boolean" ? (
                          <Badge variant={value ? "default" : "secondary"}>
                            {value ? "Yes" : "No"}
                          </Badge>
                        ) : (
                          <span className="text-foreground">
                            {String(value) || <span className="text-muted-foreground">-</span>}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {data.length > 10 && (
          <div className="mt-4 p-3 bg-muted/30 rounded-lg flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing first 10 of {data.length} records
            </p>
            <Badge variant="outline">
              {data.length - 10} more records
            </Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
