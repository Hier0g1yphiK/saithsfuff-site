---
inclusion: manual
description: "When triggered, generates comprehensive documentation for the current file: extracts function and class signatures, documents parameters and return types, provides usage examples based on existing code, updates README.md with new exports, and ensures documentation follows project standards."
---

Generate comprehensive documentation for the current active file:
1. Extract all function and class signatures from the file
2. Document all parameters and return types with descriptions
3. Provide usage examples based on how the exports are used in the existing codebase
4. Update README.md with any new exports from this file
5. Ensure all documentation follows the project's conventions and standards defined in .kiro/steering files

Output the documentation as JSDoc comments added directly to the source file, and update README.md if applicable.
