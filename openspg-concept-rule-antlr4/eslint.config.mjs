import tsParser from "@typescript-eslint/parser";

const ignores = ["dist/", "gen/", "node_modules/", "src/antlr4/"];

export default [
    { ignores },
    {
        files: ["**/*.{js,cjs,mjs,ts,tsx}"],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module"
        },
        rules: {
            // Keep formatting rules aligned with Prettier settings.
            indent: ["error", 4, { SwitchCase: 1 }],
            quotes: ["error", "double", { avoidEscape: true }],
            "quote-props": ["error", "as-needed"],
            semi: ["error", "always"],
            "comma-dangle": ["error", "never"],
            "object-curly-spacing": ["error", "always"],
            "arrow-parens": ["error", "always"],
            "jsx-quotes": ["error", "prefer-double"],
            "linebreak-style": ["error", "unix"],
            "max-len": [
                "error",
                {
                    code: 160,
                    ignoreStrings: true,
                    ignoreTemplateLiterals: true,
                    ignoreRegExpLiterals: true,
                    ignoreComments: true
                }
            ]
        }
    }
];
