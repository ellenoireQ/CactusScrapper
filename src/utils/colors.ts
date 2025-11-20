export const colorScheme = {
  surface: {
    lowest: "var(--color-surfaceContainerLowest)",
    container: "var(--color-surfaceContainer)",
    low: "var(--color-surfaceContainerLow)",
    base: "var(--color-surface)",
    dim: "var(--color-surfaceDim)",
  },

  primary: {
    base: "var(--color-primary)",
    on: "var(--color-onPrimary)",
    container: "var(--color-primaryContainer)",
    onContainer: "var(--color-onPrimaryContainer)",
  },

  secondary: {
    container: "var(--color-secondaryContainer)",
    onContainer: "var(--color-onSecondaryContainer)",
  },

  surfaceText: {
    onSurface: "var(--color-onSurface)",
  },

  button: {
    buttonCheck: {
      bgColor: "var(--color-secondaryContainer)",
      color: "var(--color-onSecondaryContainer)"
    },
    buttonUncheck: {
      bgColor: "var(--color-onSurface)",
      color: "var(--color-secondaryContainer)"
    }
  }
};

