type ParsedArgs = { [key: string]: boolean };

export default class ArgsParser {
    parsedArgs: ParsedArgs
    constructor(public schema: Schema) {
        this.parsedArgs = {}
    }
    parse(args: String[]) {
        //  const parsedArgs: ParsedArgs = {};

        for (let i = 0; i < args.length; i++) {
            const arg = args[i];
        
            if (arg.startsWith("-") && arg.length === 2) {
              const flag = arg[1];
        
              // Verificar si la bandera está definida en el esquema
              if (schema[flag] === "boolean") {
                this.parsedArgs[flag] = true;
              } else {
                throw new Error(`Unknown flag: -${flag}`);
              }
            } else {
              throw new Error(`Invalid argument: ${arg}`);
            }
          }
        
          // Rellenar valores predeterminados para banderas faltantes
           for (const key in this.schema) {
            if (!(key in this.parsedArgs)) {
                console.log('no esta',key)
              this.parsedArgs[key] = false; // Por defecto, las banderas booleanas son false
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

const schema: Schema = {
    l: "boolean",
    p: "boolean"
};
// Ejemplo de uso
const input = ["-l"];
const parser = new ArgsParser(schema)
const output = parser.parse(input);
//console.log(output); // { l: true }
