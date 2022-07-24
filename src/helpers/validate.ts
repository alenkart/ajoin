import { z } from "zod";

function validate<T extends Record<string, z.Schema>>(
  schema: T,
  values: Record<keyof T, any>
) {
  try {
    return z.object(schema).parse(values);
  } catch (error) {
    const message = !(error instanceof z.ZodError)
      ? error.message
      : error.issues
          .map((issue) => `\`${issue.path}\`: ${issue.message}`)
          .join(", ");

    throw new Error(message);
  }
}

export default validate;
