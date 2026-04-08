import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const buildVersion =
  process.env.NEXT_PUBLIC_BUILD_VERSION ||
  process.env.GITHUB_SHA ||
  new Date().toISOString().replace(/[-:.TZ]/g, "");

const publicDir = resolve(process.cwd(), "public");
const targetPath = resolve(publicDir, "version.json");

mkdirSync(publicDir, { recursive: true });
writeFileSync(
  targetPath,
  JSON.stringify(
    {
      version: buildVersion
    },
    null,
    2
  )
);

process.stdout.write(`Wrote build metadata to ${targetPath}\n`);
