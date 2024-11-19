type type = boolean | number;

type ParsedArgs = { [key: string]: type };

export default class ArgsParser {

    parsedArgs: ParsedArgs
    constructor(public schema: Schema) {
        this.parsedArgs = {}
    }

    parse(argsText: String) {
        const args = argsText.split('-').filter(a => a !== '')
        //  const parsedArgs: ParsedArgs = {};
        if (args.length === 0) throw new Error('Invalid argument')
        for (const arg of args) {
            const a = arg.split(' ')
            const flag = a[0];

            // Verificar si la bandera está definida en el esquema
            if (this.schema[flag] === "boolean") {
                this.parsedArgs[flag] = true;
            } else if (this.schema[flag] === "number") {
                const num = Number.parseInt(a[1])
                this.parsedArgs[flag] = num
            } else {
                throw new Error(`Unknown flag: -${flag}`);
            }


        }

        // Rellenar valores predeterminados para banderas faltantes
        for (const key in this.schema) {
            if (!(key in this.parsedArgs)) {
                if (this.schema[key] === "boolean") this.parsedArgs[key] = false;
                else if (this.schema[key] === "number") this.parsedArgs[key] = 0;

                // Por defecto, las banderas booleanas son false
            }
        }


        //this.parsedArgs = 
        return this.parsedArgs
    }

    getArg(key: string) {
        return this.parsedArgs[key]
    }
}


type SchemaType = "boolean" | "number" | "string" | "string[]" | "number[]";

export interface Schema {
    [flag: string]: SchemaType;
}
/* 
const schema: Schema = {
    l: "boolean",
    p: "boolean"
};
// Ejemplo de uso
const input = ["-l"];
const parser = new ArgsParser(schema)
const output = parser.parse(input);
//console.log(output); // { l: true }
 */