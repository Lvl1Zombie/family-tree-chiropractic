import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { extname, join } from "node:path";

const sourceRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../dist/", import.meta.url);

const deployableExtensions = new Set([
  ".avif",
  ".css",
  ".html",
  ".ico",
  ".jpeg",
  ".jpg",
  ".js",
  ".png",
  ".txt",
  ".webp",
  ".xml",
]);

const deployableExtensionlessFiles = new Set(["_headers", "_redirects"]);

await rm(outputRoot, { recursive: true, force: true });
await mkdir(outputRoot, { recursive: true });

for (const entry of await readdir(sourceRoot, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  if (entry.name.startsWith("_") && !deployableExtensionlessFiles.has(entry.name)) continue;
  if (!deployableExtensions.has(extname(entry.name)) && !deployableExtensionlessFiles.has(entry.name)) continue;

  await cp(new URL(entry.name, sourceRoot), new URL(entry.name, outputRoot));
}

await cp(new URL("blog-images/", sourceRoot), new URL("blog-images/", outputRoot), {
  recursive: true,
});

const outputFiles = await readdir(outputRoot);
console.log(`Prepared ${outputFiles.length} top-level entries in ${join(process.cwd(), "dist")}`);
