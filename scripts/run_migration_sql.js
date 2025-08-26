const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

function parseEnvFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const obj = {};
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx);
    let val = trimmed.slice(idx + 1);
    // remove surrounding quotes
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    obj[key] = val;
  }
  return obj;
}

(async () => {
  try {
    const repoRoot = path.resolve(__dirname, '..');
    const envPath = path.join(repoRoot, '.env.development');
    const env = parseEnvFile(envPath);
    const sqlPath = path.join(
      repoRoot,
      'migrations',
      '1650000000000-CreateTrainingAccessTable.sql',
    );
    const sql = fs.readFileSync(sqlPath, 'utf8');

    const client = new Client({
      host: env.POSTGRES_HOST || 'localhost',
      port: parseInt(env.POSTGRES_PORT || '5432', 10),
      user: env.POSTGRES_USER || 'postgres',
      password: env.POSTGRES_PASSWORD || undefined,
      database: env.POSTGRES_DB || 'postgres',
    });

    await client.connect();
    console.log('Connected to DB, running migration SQL...');
    await client.query(sql);
    console.log('Migration executed successfully.');
    await client.end();
  } catch (err) {
    console.error('Migration failed:', err);
    process.exit(1);
  }
})();
