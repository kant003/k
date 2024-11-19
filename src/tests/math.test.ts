import { describe, it, expect } from 'vitest';
import ArgsParser, { Schema } from '../kataArgs';

describe('math utils', () => {

  it('debería devolver { l: true } para la entrada -l', () => {
    const schema: Schema = {
        l: "boolean",
      };

    
    const input = "-l";
    const parser = new ArgsParser(schema)
    const output = parser.parse(input);
    expect(output).toEqual({ l: true });
    expect(parser.getArg('l')).toEqual(true);

  });


  it('debería devolver { l: true } para la entrada -l -p', () => {
    const schema: Schema = {
        l: "boolean",
        p: "boolean",
      };

    const input = "-l";
    const parser = new ArgsParser(schema)
    const output = parser.parse(input);
    expect(output).toEqual({ l: true, p:false });
    expect(parser.getArg('l')).toEqual(true);
    expect(parser.getArg('p')).toEqual(false);

  });

  it('debería devolver { l: true } para la entrada -l -p', () => {
    const schema: Schema = {
        l: "boolean",
        p: "boolean",
      };

    const input = "-l -p";
    const parser = new ArgsParser(schema)
    const output = parser.parse(input);
    expect(output).toEqual({ l: true, p:true });
    expect(parser.getArg('l')).toEqual(true);
    expect(parser.getArg('p')).toEqual(true);

  });

  it('debería devolver { l: true } para la entrada -l -p', () => {
    const schema: Schema = {
        l: "boolean",
        p: "boolean",
      };

    const input = "-p -l";
    const parser = new ArgsParser(schema)
    const output = parser.parse(input);
    expect(output).toEqual({ l: true, p:true });
    expect(parser.getArg('l')).toEqual(true);
    expect(parser.getArg('p')).toEqual(true);

  });

  /*it('debería devolver { l: true } para la entrada -l -p', () => {
    const schema: Schema = {
        l: "boolean",
        p: "boolean",
      };

    const input = "l";
    const parser = new ArgsParser(schema)
    expect(() => parser.parse(input)).toThrowError("Invalid argument");
  });
  */

  it('debería devolver { l: true } para la entrada -l -p', () => {
    const schema: Schema = {
        l: "boolean",
        p: "number",
      };

      const input = "-p 8080 -l";
      const parser = new ArgsParser(schema)
      const output = parser.parse(input);
      expect(output).toEqual({ l: true, p:8080 });
      expect(parser.getArg('l')).toEqual(true);
      expect(parser.getArg('p')).toEqual(8080);
  });

  it('debería devolver { l: true } para la entrada -l -p', () => {
    const schema: Schema = {
        l: "boolean",
        p: "number",
      };

      const input = "-l";
      const parser = new ArgsParser(schema)
      const output = parser.parse(input);
      expect(output).toEqual({ l: true, p:0 });
      expect(parser.getArg('l')).toEqual(true);
      expect(parser.getArg('p')).toEqual(0);
  });
 

});