import fs from 'fs/promises';
import { join, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../img');
const outputDir = join(__dirname, '../img-webp');

await fs.mkdir(outputDir, { recursive: true });

const supportedExtensions = ['.png', '.jpg', '.jpeg'];
const files = await fs.readdir(inputDir);

for (const file of files) {
    const ext = extname(file).toLowerCase();
    if (!supportedExtensions.includes(ext)) continue;

    const inputPath = join(inputDir, file);
    const outputPath = join(outputDir, `${basename(file, ext)}.webp`);

    try {
        await sharp(inputPath)
            .webp({ quality: 90 })
            .toFile(outputPath);
        console.log(`✅ Converted: ${file}`);
    } catch (err) {
        console.error(`❌ Failed to convert ${file}:`, err.message);
    }
}
