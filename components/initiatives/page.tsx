import InitiativeSlugClient from "@/components/initiatives/InitiativeSlugClient";
import fetchClient from "@/lib/fetchClient";

export async function generateStaticParams() {
  try {
    const res = await fetchClient.get("/initiatives");
    const data = res?.data?.data || [];

    return data.map((objective: any) => ({
      slug: objective.slug,
    }));
  } catch (error) {
    console.warn("[Build] Warning: Could not fetch static params for initiatives updates. Proceeding with dynamic rendering.");
    return [];
  }
}

export default async function InitiativeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <InitiativeSlugClient slug={slug} />;
}