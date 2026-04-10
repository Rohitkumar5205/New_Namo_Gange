import fetchClient from "@/lib/fetchClient";
import BlogSlugClient from "../../../../components/communication/blog/BlogSlugClient";

export async function generateStaticParams() {
  try {
    const res = await fetchClient.get("/blog");
    const data = res?.data?.data || [];

    return data.map((objective: any) => ({
      slug: objective.slug,
    }));
  } catch (error) {
    console.warn("[Build] Warning: Could not fetch static params for blog updates. Proceeding with dynamic rendering.");
    return [];
  }
}
export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BlogSlugClient slug={slug} />;
}
