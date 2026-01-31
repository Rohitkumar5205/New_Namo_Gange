"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import axiosClient from "@/lib/axiosClient";
import Link from "next/link";
const news = [
  {
    id: 1,
    title: "CM visit to hospital managed & run by Krishnayan",
    date: "9 June 2023",
    publisher: "Dainik Bhaskar",
    img: "/newsUpdate/news2.jpg",
    logo: "/logo.png",
    desc: `The Chief Minister’s visit to the Krishnayan-managed hospital marked a significant acknowledgment of 
      the organization’s dedication to providing accessible and compassionate healthcare. During the visit, 
      the CM appreciated the hospital’s advanced facilities, well-trained medical staff, and strong focus on 
      patient welfare. The initiative emphasizes affordable treatment, preventive health awareness, and rural 
      outreach programs that benefit thousands of families. This recognition also highlights Krishnayan’s 
      contribution to creating a healthy and empowered society through consistent efforts in medical care, 
      emergency services, and community health programs. The visit reinforced confidence in the institution's 
      mission to expand its services and continue delivering quality healthcare to all sections of society.`,
  },

  {
    id: 2,
    title: "Kailash Kher visit to Krishnayan",
    date: "25 May 2023",
    publisher: "Dainik Bhaskar",
    img: "/newsUpdate/news3.jpg",
    logo: "/logo.png",
    desc: `Renowned singer Kailash Kher visited Krishnayan and expressed heartfelt appreciation for the 
      organization’s selfless service and cultural dedication. During his visit, he interacted with volunteers, 
      explored the various welfare initiatives, and praised the efforts aimed at uplifting communities through 
      spiritual, social, and health-based activities. He highlighted how Krishnayan’s values align with his own 
      belief in compassion, service, and the preservation of Indian traditions. The artist also encouraged 
      continued support for the organization’s mission to bring meaningful change in society. His visit brought 
      renewed motivation and served as a reminder of the powerful role that culture and community service play 
      in shaping a better world.`,
  },

  {
    id: 3,
    title: "JEEV SEWA MAHA SEWA – Shree Krishnayan Desi Gauraksha",
    date: "20 March 2023",
    publisher: "Kailasa Entertainment",
    img: "/newsUpdate/news2.jpg",
    logo: "/logo.png",
    desc: `The JEEV SEWA MAHA SEWA event celebrating Shree Krishnayan Desi Gauraksha brought together devotees, 
      cow protectors, and cultural enthusiasts in an inspiring gathering dedicated to Gaumata. Organized in 
      collaboration with Kailasa Entertainment, the event highlighted the importance of Indian values, 
      compassion towards animals, and the spiritual significance of cow service. Visitors experienced devotional 
      music, cultural programs, and guided tours showcasing traditional cow care practices. Through awareness 
      drives and community interaction, the event reinforced the deep bond between humans, nature, and sacred 
      heritage. It stood as a reminder of Krishnayan’s continuous efforts to preserve tradition and promote 
      holistic sustainability.`,
  },

  {
    id: 4,
    title: "Krishnayan bio CNG plant Haridwar",
    date: "21 March 2023",
    publisher: "DD India",
    img: "/newsUpdate/news2.jpg",
    logo: "/logo.png",
    desc: `DD India provided exclusive coverage of the Krishnayan bio CNG plant in Haridwar, showcasing a major 
      step toward sustainable energy and environmental conservation. The plant converts organic waste into clean 
      biofuel, reducing pollution and promoting renewable energy. This initiative supports rural employment, 
      reduces dependency on traditional fuel sources, and encourages eco-friendly practices among local 
      communities. The coverage highlighted the innovation behind the project, its positive environmental impact, 
      and Krishnayan’s leadership in promoting green technology. The plant stands as a model for future 
      sustainability initiatives, emphasizing the organization’s commitment to environmental protection and 
      responsible resource management.`,
  },

  {
    id: 5,
    title: "Krishnayan Goshala, where 2200 cows are served",
    date: "18 Oct 2019",
    publisher: "Jagran",
    img: "/newsUpdate/news2.jpg",
    logo: "/logo.png",
    desc: `Jagran featured Krishnayan Goshala for its remarkable service and dedication toward the welfare of over 
      2200 cows. The Goshala provides shelter, nutritious food, specialized medical care, and lifelong protection 
      for abandoned, injured, and elderly cows. The dedicated team ensures round-the-clock service rooted in 
      compassion and tradition. Beyond care, the Goshala promotes organic farming, environmental sustainability, 
      and awareness about the importance of cow protection in Indian culture. The coverage highlighted the 
      institution’s tireless efforts and the love that keeps the Goshala thriving. Krishnayan’s model inspires 
      communities to uphold values of kindness, preservation, and responsible stewardship.`,
  },

  {
    id: 6,
    title: "Inauguration of Shri Krishnayan police post for cow protection",
    date: "27 Dec 2019",
    publisher: "Jagran",
    img: "/newsUpdate/news2.jpg",
    logo: "/logo.png",
    desc: `A new milestone was achieved with the inauguration of the Shri Krishnayan police post dedicated to 
      supporting cow protection efforts. The collaboration between law enforcement and Krishnayan reflects a 
      strong commitment to safeguarding Gaumata from illegal activities, trafficking, and neglect. The police 
      post will coordinate rescue operations, ensure proper medical care for distressed cows, and strengthen 
      surveillance in vulnerable regions. This initiative not only enhances community safety but also promotes 
      awareness about animal rights and cultural respect. The coverage by Jagran emphasized the significance of 
      this step in strengthening ethical values, legal protection, and humane treatment of animals.`,
  },
];

export default function LatestNewsPage() {
  const [search, setSearch] = useState("");
  const [publisherFilter, setPublisherFilter] = useState("");
  const [newsList, setNewsList] = useState<any[]>([]);
  const [publishers, setPublishers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, pubRes] = await Promise.all([
          axiosClient.get("/recent-updates"),
          axiosClient.get("/published"),
        ]);

        if (newsRes.data && Array.isArray(newsRes.data.data)) {
          const parser = new DOMParser();
          const mappedNews = newsRes.data.data
            .filter((item: any) => item.status === "Active")
            .map((item: any) => {
              let description = item.description || "";
              const decoded = parser.parseFromString(description, "text/html");
              description = decoded.body.textContent || "";
              return {
                id: item._id,
                title: item.title,
                date: new Date(item.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
                publisher: item.published_by || "Namo Gange",
                img: item.image,
                logo: "/logo.png",
                desc: description.replace(/<[^>]+>/g, ""),
              };
            });
          setNewsList(mappedNews);
        }

        if (pubRes.data && Array.isArray(pubRes.data.data)) {
          setPublishers(pubRes.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNews = newsList.filter((item) => {
    const s = search.toLowerCase();
    const matchSearch =
      item.title.toLowerCase().includes(s) ||
      item.desc.toLowerCase().includes(s);
    const matchPublisher = publisherFilter
      ? item.publisher === publisherFilter
      : true;
    return matchSearch && matchPublisher;
  });

  return (
    <div >
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/home/Newsletter.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/30 w-full h-full md:h-[250px] py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-medium text-white uppercase">
              Latest News
            </h2>
            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Latest News
            </p>
          </div>
        </div>
      </div>

<div className="w-full bg-gray-50 px-8">
      {/* ---------- HEADING ---------- */}
      <h2 className="text-lg md:text-xl font-semibold  text-center rounded text-gray-900 pt-2">
        Latest News and <span className="text-[#7a0d0d]">Updates</span>
      </h2>
      <p className="text-gray-600 text-sm text-center md:text-[15px] italic leading-relaxed">
        Stay connected with our latest activities, inspiring stories, and
        important updates that reflect our ongoing mission toward social
        upliftment and community well-being.
      </p>

      <div className=" w-full  h-1 mt-2 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />
      <div>
           <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] mt-2">
             Acharya Jagdishji Maharaj is a revered spiritual guide whose life
             and teachings continue to inspire countless individuals on the path
             of inner awakening and self-realization. Blessed by the divine grace
             of
             <strong> Maa Gange and Lord Krishna</strong>, he embodies a rare
             harmony of spiritual wisdom, compassion, and disciplined living.
             Renowned as a profound philosopher and an eloquent Bhagwat
             Kathavachak, Acharya Ji has dedicated his life to spreading the
             timeless values of Sanatan Dharma through wisdom-filled discourses
             and soulful storytelling.
           </p>
         </div>

      {/* ---------- FILTERS ---------- */}
      <div className="w-full flex flex-col md:flex-row justify-between gap-4 mt-2">
        <select
          className="border px-2 py-1.5 rounded bg-white w-48 shadow"
          value={publisherFilter}
          onChange={(e) => setPublisherFilter(e.target.value)}
        >
          <option value="">Publisher Wise</option>
          {publishers.map((pub: any) => (
            <option key={pub._id} value={pub.name}>
              {pub.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1.5 rounded px-5 w-full md:w-80 shadow"
        />
      </div>

      {/* ---------- NEWS LIST ---------- */}
      <div className="w-full space-y-6 py-2">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4 md:p-6 flex flex-col md:flex-row gap-6 border"
          >
            {/* LEFT IMAGE */}
            <div className="md:w-1/3 w-full h-56 relative rounded-md overflow-hidden">
              <Image
                src={
                  item.img?.startsWith("http")
                    ? item.img
                    : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${item.img}`
                }
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* RIGHT CONTENT */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>

                <div className="w-24 h-10 relative">
                  <Image
                    src={item.logo}
                    alt={item.publisher}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                📅 {item.date} &nbsp; | &nbsp; 📰 {item.publisher}
              </p>

              <p className="text-gray-700 text-justify mt-3 line-clamp-4">
                {item.desc}
              </p>

              {/* <button
                className=" px-3 md:px-6 lg:px-6 py-1 md:py-1.5 lg:py-1.5 mt-3 text-sm font-medium rounded
                     bg-[#0C55A0] text-white shadow-sm 
                     hover:bg-[#0a4786] active:scale-95 transition-all"
              >
                Read More
              </button> */}
            </div>
          </div>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <p className="text-center text-gray-600 mt-10">No results found...</p>
      )}
      </div>
    </div>
  );
}
