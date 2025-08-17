import User from '../models/User.model';

function sanitize(input: string): string {
  // Lowercase, replace non-alphanumeric with underscores, trim repeats
  const base = input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_');
  return base || 'user';
}

export async function generateUniqueUsername(seed: string): Promise<string> {
  const base = sanitize(seed);

  // Try base first
  if (!(await User.exists({ username: base }))) return base;

  // Try base + 4-digit random, a few attempts
  for (let i = 0; i < 5; i++) {
    const candidate = `${base}${Math.floor(1000 + Math.random() * 9000)}`;
    if (!(await User.exists({ username: candidate }))) return candidate;
  }

  // Fallback to incremental suffix
  let counter = 1;
  while (true) {
    const candidate = `${base}${counter}`;
    // eslint-disable-next-line no-await-in-loop
    if (!(await User.exists({ username: candidate }))) return candidate;
    counter++;
  }
}
