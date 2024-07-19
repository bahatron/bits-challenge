import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

export const JsonSchemaValidator = new Ajv({ allErrors: true });

addFormats(JsonSchemaValidator);
addErrors(JsonSchemaValidator);
