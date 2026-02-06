import * as prettier from "prettier/standalone";
import * as syntax from "openspg-concept-rule-antlr4";

export const format = async (
    source: string,
    options: {
        tabSize: number;
        bracketSpacing: boolean;
    }
) => {
    const prettierOptions = {
        parser: "openspg-concept-rule-prettier-parser",
        plugins: [
            {
                languages: syntax.languages,
                parsers: syntax.parsers,
                printers: syntax.printers
            }
        ],
        tabWidth: options.tabSize,
        bracketSpacing: options.bracketSpacing
    };

    return await prettier.format(source, prettierOptions);
};
