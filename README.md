# Dromo Custom Fields System

A sophisticated React implementation for CSV imports with automatic custom field detection and configuration using [Dromo Uploader](https://dromo.io).

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)
![React](https://img.shields.io/badge/React-19.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15.0-black.svg)

## 🎥 Demo

Watch a quick demo of the custom fields system in action:

[![Dromo Custom Fields Demo](https://cdn.loom.com/sessions/thumbnails/a876b940a2534e83b968763e6d4b0dce-with-play.gif)](https://www.loom.com/share/a876b940a2534e83b968763e6d4b0dce?sid=75338191-897d-4e07-b7cf-b339863a676d)

## ✨ Features

- 🎯 **Automatic Custom Field Detection** - Identifies unmapped columns in CSV files
- 🔧 **Interactive Field Type Configuration** - User-friendly dialog for selecting data types
- 📊 **Multiple Field Types** - Support for text, number, date, boolean, and select fields
- 🎨 **Customizable Theming** - Full style customization to match your brand
- 📦 **Type-Safe** - Complete TypeScript support with comprehensive type definitions
- 🚀 **Production Ready** - Clean architecture with separation of concerns
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- npm or yarn
- Dromo license key (get one at [dromo.io](https://dashboard.dromo.io))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dromo-custom-fields
cd dromo-custom-fields

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Dromo license key to .env.local

# Run development server
npm run dev
```

### Basic Usage

```tsx
import { DromoImporter } from '@/components/dromo/DromoImporter';

function App() {
  const handleImportComplete = (data) => {
    console.log('Imported data:', data);
  };

  return (
    <DromoImporter
      licenseKey="your-dromo-license-key"
      onImportComplete={handleImportComplete}
      enableCustomFields={true}
      predefinedFields={[
        { label: "Customer Name", key: "customerName" },
        { label: "Email", key: "email" }
      ]}
    />
  );
}
```

## 🏗️ Architecture

The system is built with a modular, maintainable architecture:

```
src/
├── components/
│   └── dromo/
│       ├── DromoImporter.tsx      # Main component
│       ├── CustomFieldsDialog.tsx  # Field configuration UI
│       └── hooks/
│           ├── useCustomFields.ts  # Custom fields management
│           └── useDromoHooks.ts    # Dromo integration hooks
├── lib/
│   └── dromo/
│       ├── types.ts               # TypeScript definitions
│       ├── constants.ts           # Configuration constants
│       ├── field-mappings.ts      # Field type utilities
│       └── theme.ts              # Style customization
└── hooks/
    └── usePromiseDialog.ts        # Promise-based dialog pattern
```

## 📋 How It Works

### 1. Upload CSV File

Users upload their CSV file through the Dromo interface.

### 2. Automatic Detection

The system automatically detects columns that don't match your predefined schema.

### 3. Field Configuration

A dialog appears allowing users to select the appropriate data type for each custom field:

- **Text** - For string data
- **Number** - For numeric values
- **Date** - For date/time data
- **Boolean** - For yes/no values
- **Select** - For dropdown options

### 4. Data Import

The system creates properly typed fields and imports the data seamlessly.

## 🎨 Customization

### Theming

Customize the appearance to match your brand:

```tsx
import { getDromoStyleOverrides } from '@/lib/dromo/theme';

const customTheme = {
  global: {
    primaryTextColor: "#09090b",
    backgroundColor: "#ffffff",
    borderRadius: "10px"
  },
  primaryButton: {
    backgroundColor: "#171717",
    textColor: "#fafafa"
  }
  // ... more customization
};

<DromoImporter
  licenseKey={licenseKey}
  styleOverrides={customTheme}
/>
```

### Custom Field Types

Define your own field mappings:

```tsx
const customFields = [
  { label: "Priority", key: "priority", type: "select" },
  { label: "Due Date", key: "dueDate", type: "date" }
];

<DromoImporter
  predefinedFields={customFields}
  enableCustomFields={true}
/>
```

## 📦 Component API

### DromoImporter Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `licenseKey` | `string` | - | Your Dromo license key |
| `onImportComplete` | `(data: ImportResult) => void` | - | Callback when import completes |
| `predefinedFields` | `IDeveloperField[]` | `[]` | Schema fields |
| `enableCustomFields` | `boolean` | `true` | Enable custom field detection |
| `styleOverrides` | `object` | - | Custom styling |
| `user` | `Partial<IUser>` | - | User information |
| `importId` | `string` | - | Import identifier |

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Dromo](https://dromo.io) for powerful CSV importing
- UI components from [Radix UI](https://radix-ui.com)
- Icons from [Lucide React](https://lucide.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)
