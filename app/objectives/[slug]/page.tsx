import fetchClient from "@/lib/fetchClient";
import ObjectiveSlugClient from "../../../components/objectives/ObjectiveSlugClient";
// import ObjectiveSlugClient from "@/components/objectives/ObjectiveSlugClient";

/* ================= STATIC PARAMS ================= */
export async function generateStaticParams() {
    try {
        const res = await fetchClient.get("/objectives");
        const data = res?.data?.data || [];

        return data.map((objective: any) => ({
            slug: objective.slug,
        }));
    } catch (error) {
        console.warn("[Build] Warning: Could not fetch static params for objectives. Fallback rendering will be used.");
        return [];
    }
}

export default async function InitiativeObjectivePage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <ObjectiveSlugClient slug={slug} />;
}
