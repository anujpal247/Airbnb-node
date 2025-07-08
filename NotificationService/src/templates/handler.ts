import path from "path";
import fs from "fs/promises";
import { InternalServerError } from "../utils/errors/app.error";
import Handlebars from "handlebars";

export async function renderMailTemplate(
  templateId: string,
  params: Record<string, any>
) {
  const templatePath = path.join(__dirname, "mailer", `${templateId}.hbs`);
  console.log(templatePath);
  try {
    const content = await fs.readFile(templatePath, "utf-8");
    const finalTemplate = Handlebars.compile(content);
    return finalTemplate(params);
  } catch (error) {
    throw new InternalServerError(`Template not found ${templateId}`);
  }
}
