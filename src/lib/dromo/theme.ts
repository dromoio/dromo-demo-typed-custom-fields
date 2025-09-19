// Dromo style overrides to match app theme
// Always uses light theme colors for Dromo

export const getDromoStyleOverrides = () => {
  // Always return light theme colors for Dromo
  return {
    global: {
      primaryTextColor: "#09090b",        // Darker black for better readability
      secondaryTextColor: "#52525b",      // Darker gray for better contrast
      backgroundColor: "#ffffff",          // --background: oklch(1 0 0)
      borderRadius: "10px",                // --radius: 0.625rem
      borderStyle: "solid",
      borderWidth: "1px",
      borderColor: "#e4e4e7"              // --border: oklch(0.922 0 0)
    },
    primaryButton: {
      backgroundColor: "#171717",          // --primary: oklch(0.205 0 0)
      textColor: "#fafafa",                // --primary-foreground: oklch(0.985 0 0)
      borderRadius: "8px",
      border: "none",
      hoverBackgroundColor: "#262626",
      hoverTextColor: "#fafafa",
      hoverBorder: "none"
    },
    secondaryButton: {
      backgroundColor: "#f4f4f5",          // --secondary: oklch(0.97 0 0)
      textColor: "#171717",                // --secondary-foreground: oklch(0.205 0 0)
      borderRadius: "8px",
      border: "1px solid #e4e4e7",
      hoverBackgroundColor: "#e4e4e7",
      hoverTextColor: "#171717",
      hoverBorder: "1px solid #d4d4d8"
    },
    dropzone: {
      borderWidth: 2,
      borderRadius: 10,
      borderColor: "#e4e4e7",
      borderStyle: "dashed",
      backgroundColor: "#fafafa",
      outline: "none"
    },
    helpText: {
      textColor: "#3f3f46",              // Darker gray for help text
      backgroundColor: "#f4f4f5"
    },
    stepperBar: {
      currentColor: "#171717"              // Keep only the black color
    }
  };
};