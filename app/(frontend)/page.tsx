import { getHome, getPosts } from "@/lib/payload";
import HomePageClient from "./page.client";

export default async function Home() {
  const home = await getHome();
  const allPosts = await getPosts();

  return <HomePageClient initialHome={home} initialAllPosts={allPosts.slice(0, 6)} />;
}
