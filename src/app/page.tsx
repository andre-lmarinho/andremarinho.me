import HomePage from "@/components/HomePage";
import { getLatestCommit } from "@/lib/github";

export default async function Page() {
  const commit = await getLatestCommit();
  return <HomePage lang="en" commit={commit} />;
}
