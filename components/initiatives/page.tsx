import InitiativeSlugClient from "@/components/initiatives/InitiativeSlugClient";

export default function InitiativeSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  return <InitiativeSlugClient slug={params.slug} />;
}