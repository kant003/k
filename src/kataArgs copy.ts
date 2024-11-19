type SchemaType = "boolean" | "number" | "string" | "string[]" | "number[]";

interface Schema {
  [flag: string]: SchemaType;
}

interface ParsedArgs {
  [flag: string]: any;
}

class ArgsParser {
  private parsedArgs: ParsedArgs;

  constructor(public schema: Schema) {
    this.parsedArgs = {};
  }

  parse(args: string[]): ParsedArgs {
    this.parsedArgs = {};

    const schemaKeys = Object.keys(this.schema);

    let i = 0;
    while (i < args.length) {
      const arg = args[i];

      if (arg.startsWith("-") && arg.length === 2) {
        const flag = arg[1];

        if (!schemaKeys.includes(flag)) {
          throw new Error(`Unknown flag: -${flag}`);
        }

        const type = this.schema[flag];

        if (type === "boolean") {
          this.parsedArgs[flag] = true;
        } else {
          if (i + 1 >= args.length || args[i + 1].startsWith("-")) {
            throw new Error(`Flag -${flag} expects a value`);
          }

          const value = args[++i];

          this.parsedArgs[flag] = this.castValue(value, type);
        }
      } else {
        throw new Error(`Invalid argument: ${arg}`);
      }

      i++;
    }

    this.applyDefaults();
    return this.parsedArgs;
  }

  private castValue(value: string, type: SchemaType): any {
    switch (type) {
      case "number":
        if (isNaN(Number(value))) {
          throw new Error(`Expected a number, but got: ${value}`);
        }
        return Number(value);
      case "string":
        return value;
      case "string[]":
        return value.split(",");
      case "number[]":
        const numbers = value.split(",").map((v) => {
          if (isNaN(Number(v))) {
            throw new Error(`Expected a list of numbers, but got: ${value}`);
          }
          return Number(v);
        });
        return numbers;
      default:
        throw new Error(`Unsupported type: ${type}`);
    }
  }

  private applyDefaults(): void {
    for (const [flag, type] of Object.entries(this.schema)) {
      if (!(flag in this.parsedArgs)) {
        switch (type) {
          case "boolean":
            this.parsedArgs[flag] = false;
            break;
          case "number":
            this.parsedArgs[flag] = 0;
            break;
          case "string":
            this.parsedArgs[flag] = "";
            break;
          case "string[]":
          case "number[]":
            this.parsedArgs[flag] = [];
            break;
          default:
            throw new Error(`Unsupported type: ${type}`);
        }
      }
    }
  }
}

// Ejemplo de uso
const schema: Schema = {
  l: "boolean",
  p: "number",
  d: "string",
  g: "string[]",
  n: "number[]",
};

const argsParser = new ArgsParser(schema);

const args = ["-l", "-p", "8080", "-d", "/usr/logs", "-g", "this,is,a,list", "-n", "1,2,-3,5"];
try {
  const parsedArgs = argsParser.parse(args);
  console.log(parsedArgs);
  // Salida esperada:
  // { l: true, p: 8080, d: '/usr/logs', g: [ 'this', 'is', 'a', 'list' ], n: [ 1, 2, -3, 5 ] }
} catch (error) {
  console.error(error);
}
