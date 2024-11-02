import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", 
      globals: {
        ...globals.node, 
        require: "readonly", 
        module: "readonly",
      },
    },
    ...pluginJs.configs.recommended,
  },
];
