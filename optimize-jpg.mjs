import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function optimizeJPGs() {
  try {
    console.log('🖼️  Optimizing JPGs...\n');

    const imgDir = path.join(__dirname, 'client/public/img');
    const files = await globby(['**/*.jpg', '**/*.jpeg'], { cwd: imgDir });

    let totalSaved = 0;

    for (const file of files) {
      const inputPath = path.join(imgDir, file);
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const dir = path.dirname(path.join(imgDir, file));

      try {
        const stats = fs.statSync(inputPath);
        const originalSize = stats.size;

        // Compress JPG
        const compressed = await sharp(inputPath, { failOn: 'none' })
          .jpeg({ quality: 72, progressive: true })
          .toFile(inputPath + '.tmp');

        if (compressed.size < originalSize) {
          fs.moveSync(inputPath + '.tmp', inputPath, { overwrite: true });
          const saved = originalSize - compressed.size;
          totalSaved += saved;
          console.log(`✓ ${file}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(compressed.size/1024/1024).toFixed(2)}MB (saved ${(saved/1024).toFixed(0)}KB)`);
        } else {
          fs.removeSync(inputPath + '.tmp');
        }

        // Create WebP version
        const webpPath = path.join(dir, `${name}.webp`);
        await sharp(inputPath, { failOn: 'none' })
          .webp({ quality: 72 })
          .toFile(webpPath);

      } catch (err) {
        console.warn(`⚠ Error processing ${file}: ${err.message}`);
      }
    }

    console.log(`\n✅ Total space saved: ${(totalSaved/1024/1024).toFixed(2)}MB`);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

optimizeJPGs();