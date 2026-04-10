import fetchClient from "@/lib/fetchClient";
import PhotoSlugClient from "../../../../components/gallery/photos/PhotoSlugClient";
// import PhotoSlugClient from "@/components/gallery/PhotoSlugClient";

export async function generateStaticParams() {
  try {
    // Assuming '/gallery' endpoint returns all photo items
    const res = await fetchClient.get("/category-image");
    const data = res?.data?.data || [];

    return data
      .filter((photo: any) => photo?.slug)
      .map((photo: any) => ({
        slug: photo.slug,
      }));
  } catch (error) {
    console.warn("[Build] Warning: Could not fetch static params for gallery photos. Proceeding with dynamic rendering.");
    return [];
  }
}

export default async function PhotoSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PhotoSlugClient slug={slug} />;
}