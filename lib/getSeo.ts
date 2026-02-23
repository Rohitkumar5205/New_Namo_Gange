export async function getSeo(path: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/seo/page/${encodeURIComponent(path)}`,
      { cache: "no-store" },
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch (error) {
    return null;
  }
}
