import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function getText(filePath) {
    const resPath = path.join(__dirname, filePath);
    return fs.readFileSync(resPath, "utf-8");
}
