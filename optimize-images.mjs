import sharp from 'sharp';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import { globby } from 'globby';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function optimizeImages() {
  try {
    console.log(' Optimizing images...\n');

    const imgDir = path.join(__dirname, 'client/public/img');
    const files = await globby(['**/*.{jpg,jpeg,png}'], { cwd: imgDir });

    let totalSaved = 0;

    for (const file of files) {
      const inputPath = path.join(imgDir, file);
      const ext = path.extname(file);
      const name = path.basename(file, ext);
      const dir = path.dirname(path.join(imgDir, file));

      try {
        const input = fs.readFileSync(inputPath);
        const originalSize = input.length;

        if (ext === '.png') {
          // Compress PNG
          const compressed = await sharp(inputPath)
            .png({ quality: 75, effort: 9, progressive: true })
            .toBuffer();

          if (compressed.length < originalSize) {
            fs.writeFileSync(inputPath, compressed);
            const saved = originalSize - compressed.length;
            totalSaved += saved;
            console.log(`✓ ${file}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(compressed.length/1024/1024).toFixed(2)}MB (saved ${(saved/1024/1024).toFixed(2)}MB)`);
          }

          // Create WebP version
          const webpPath = path.join(dir, `${name}.webp`);
          const webp = await sharp(inputPath).webp({ quality: 75 }).toBuffer();
          fs.writeFileSync(webpPath, webp);
        } else {
          // Compress JPG
          const compressed = await sharp(inputPath)
            .jpeg({ quality: 75, progressive: true, mozjpeg: false })
            .toBuffer();

          if (compressed.length < originalSize) {
            fs.writeFileSync(inputPath, compressed);
            const saved = originalSize - compressed.length;
            totalSaved += saved;
            console.log(`✓ ${file}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(compressed.length/1024/1024).toFixed(2)}MB (saved ${(saved/1024/1024).toFixed(2)}MB)`);
          }

          // Create WebP version
          const webpPath = path.join(dir, `${name}.webp`);
          const webp = await sharp(inputPath).webp({ quality: 75 }).toBuffer();
          fs.writeFileSync(webpPath, webp);
        }
      } catch (err) {
        console.warn(`⚠ Skipped ${file}: ${err.message}`);
      }
    }

    console.log(`\n✅ Total space saved: ${(totalSaved/1024/1024).toFixed(2)}MB`);
  } catch (error) {
    console.error('❌ Error optimizing images:', error);
    process.exit(1);
  }
}

optimizeImages();
