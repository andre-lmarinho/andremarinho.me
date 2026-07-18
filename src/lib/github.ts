const REPO = "andre-lmarinho/andremarinho.me";

export type LatestCommit = { sha: string; url: string } | null;

export async function getLatestCommit(): Promise<LatestCommit> {
  const token = process.env.GITHUB_API_TOKEN;
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/commits?per_page=1`,
      {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      },
    );
    if (!res.ok) return null;
    const [commit] = await res.json();
    return { sha: commit.sha.slice(0, 7), url: commit.html_url };
  } catch {
    return null;
  }
}
