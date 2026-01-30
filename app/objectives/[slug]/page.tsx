

"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import axiosClient from "@/lib/axiosClient";

/* ================= TYPES ================= */
interface Initiative {
    title: string;
    image: string;
    description: string;
    link: string;
}

interface Objective {
    title: string;
    slug: string;
    image: string;
    desc: string;
    meta_desc: string;
    status: string;
}

/* ================= LOADING ================= */
const LoadingSpinner = () => (
    <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#DF562C]"></div>
    </div>
);

/* ================= SLUG HELPER ================= */
const toSlug = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/&/g, "-")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export default function InitiativeObjectivePage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

    const [initiatives, setInitiatives] = useState<Initiative[]>([]);
    const [objective, setObjective] = useState<Objective | null>(null);
    const [loading, setLoading] = useState(true);

    /* ================= FETCH INITIATIVES ================= */
    useEffect(() => {
        if (!slug) return;

        const fetchData = async () => {
            try {
                /* ===== API 1: INITIATIVES ===== */
                const res1 = await axiosClient.get("/initiatives");
                const data1 = res1?.data?.data || [];

                const parser = new DOMParser();

                const filteredInitiatives = data1
                    .filter(
                        (item: any) =>
                            item.status === "Active" &&
                            item.objective_catagory &&
                            toSlug(item.objective_catagory) === slug
                    )
                    .map((item: any) => {
                        const decoded = parser.parseFromString(
                            item.desc || "",
                            "text/html"
                        );

                        return {
                            title: item.title,
                            image: item.image,
                            description: decoded.body.textContent?.trim() || "",
                            link: item.slug ? `/initiatives/${item.slug}` : "#",
                        };
                    });

                setInitiatives(filteredInitiatives);

                /* ===== API 2: OBJECTIVES ===== */
                const res2 = await axiosClient.get("/objectives");
                const data2 = res2?.data?.data || [];

                const matchedObjective = data2.find(
                    (item: any) =>
                        item.status === "Active" && item.slug === slug
                );

                setObjective(matchedObjective || null);
            } catch (error) {
                console.error("❌ Error fetching objective page data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [slug]);

    /* ================= LOADING STATE ================= */
    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <section className="bg-gray-50">
            {/* ================= BANNER ================= */}
            <div
                className="w-full bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: objective?.image
                        ? `url(${objective.image})`
                        : "url('/objectives/moksha1.jpg')",
                }}
            >
                <div className="bg-black/20 w-full h-full md:h-[250px] py-10 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center text-white">
                        <h2 className="text-xl md:text-2xl font-medium uppercase">
                            {slug?.replace(/-/g, " ")}
                        </h2>
                        <p className="text-sm md:text-base mt-1">
                            <Link
                                href="/"
                                className="text-[#DF562C] font-medium hover:underline"
                            >
                                Home
                            </Link>{" "}
                            - {slug?.replace(/-/g, " ")}
                        </p>
                    </div>
                </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div className="w-full px-2 md:px-12 lg:px-12 text-center">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mt-4 capitalize">
                    {slug?.replace(/-/g, " ")}
                </h2>

                <p className="text-gray-600 text-sm md:text-[15px] italic leading-relaxed">
                    “Moksha Sewa embodies the spirit of selfless service, guiding
                    individuals toward inner peace, spiritual growth, and compassionate
                    living.”
                </p>

                <div className="w-full h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

                {/* ===== META DESC FROM OBJECTIVES API ===== */}
                <p className="w-full pb-6 text-sm text-justify md:text-[15px] text-center text-gray-800 leading-relaxed mt-3">
                    {objective?.desc.replace(/<[^>]+>/g, "")}
                </p>

                {/* ================= GRID ================= */}
                {initiatives.length === 0 ? (
                    <p className="text-gray-600 mt-10">
                        No initiatives available for this category.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 my-6">
                        {initiatives.map((item, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-xl shadow-sm border border-gray-200
                hover:shadow-lg hover:border-blue-500/40 transition-all duration-300
                p-5 flex flex-col items-center text-center"
                            >
                                <div className="w-full h-28 mb-4 flex items-center justify-center bg-gray-50 rounded-md overflow-hidden">
                                    <Image
                                        src={item.image}
                                        width={100}
                                        height={100}
                                        alt={item.title}
                                        className="object-contain max-h-24 transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>

                                <h3 className="text-gray-800 font-semibold text-sm mb-2 line-clamp-2">
                                    {item.title}
                                </h3>

                                <p className="text-gray-600 text-xs leading-relaxed mb-4 line-clamp-4">
                                    {item.description}
                                </p>

                                <Link href={item.link} className="w-full mt-auto">
                                    <button
                                        className="w-full px-3 py-1.5 text-sm font-medium rounded
                    bg-[#0C55A0] text-white hover:bg-[#0a4786] transition-all"
                                    >
                                        Read More
                                    </button>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
