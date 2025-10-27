export default {
  "*.{js,jsx,ts,tsx}": {
    title: "ESLint checking",
    task: (filenames) => `eslint ${filenames.join(" ")}`,
  },
  //ts check
  "*.{ts,tsx}": {
    title: "TypeScript checking",
    task: () => `tsc --noEmit`,
  },
};
