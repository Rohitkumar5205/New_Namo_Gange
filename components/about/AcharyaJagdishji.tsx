import Link from "next/link";
import React from "react";

const AcharyaJagdishji = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat "
        style={{ backgroundImage: "url('/about/aboutus.jpg')" }}
      >
        {/* Overlay */}
        <div className="bg-black/20 w-full h-full md:h-[250px] flex items-center py-10 md:py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-xl md:text-3xl font-semibold text-white">
              Acharya <span className="">Jagdishji Maharaj</span>
            </h2>

            <p className="text-sm md:text-base text-white mt-1">
              <Link
                href="/"
                className="text-[#DF562C] font-medium hover:underline"
              >
                Home
              </Link>{" "}
              - Acharya Jagdishji Maharaj
            </p>
          </div>
        </div>
      </div>

      {/* </div> */}

      {/* ---------- MAIN CONTENT ------------- */}
      <div className="w-full px-2 md:px-6 lg:px-6">
        <div className="w-full mt-4 text-center">
          <h1 className="text-sm md:text-xl font-medium">
            Acharya <span className="text-[#DF562C]">Jagdishji Maharaj</span>
          </h1>

          <p className="italic text-sm md:text-[15px] w-full text-gray-700">
            “A Spiritual Leader, Bhagwat Kathavachak & Devotee of Maa Ganga and
            Lord Krishna.”
          </p>
        </div>
        <div className=" w-full  h-1 mt-3 bg-gradient-to-r from-[#DF562C] via-[#f89a36] to-[#1e7ed3]" />

        {/* ABOUT INTRO */}
        <section>
          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] mt-2">
            Acharya Jagdishji Maharaj is more than just a spiritual mind, who
            has a blessing of
            <strong> Maa Gange and Lord Krishna</strong>. He is known as a Great
            Philosopher, Potent Bhagwat Kathavachak and Practitioner of Yoga &
            Meditation.
          </p>
        </section>

        {/* ---------- SECTION: CHILDHOOD ------------- */}
        <section>
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Childhood
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
            He was born in a middle-class Hindu family at the foothills of the
            Himalayas on the land of spirituality in Uttrakhand on 17th February
            1974 in Patigaon village of Champawat. His parents aptly named him
            Jagdish ‘the Lord of the world’ as they were told by the astrologers
            that this boy would one day shine.
          </p>
          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
            In his early childhood, Acharyaji was closely attached by his mother
            named Bhagirathi. She was well cultured, humble and a spiritual lady
            she used to perform daily ritual like Puja, havan and chanting of
            Sanskrit Mantras. She has given very good account of herself to
            impart the best knowledge and moral values. She was not only a
            mother but also a mentor and a guide of his early childhood. His
            mother Bhagirathi used to tell many stories of old Lord Krishna and
            Maa Ganga. One day his mother told him that they are going for Ganga
            Darshan in Haridwar. The small child was so happy and he was very
            much excited to see Ganga and land of Indian deities..
          </p>

          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
            However, the day has come to see Ganga with naked eyes; it was truly
            an exhilarating experience for a small child. He came very close to
            his mother and cheered loudly “MAA” I have two mothers one is you
            and other is Maa Ganga. Mother was so happy and said yes my son,
            Ganga is mother of all Hindus, I may die but she will remain forever
            with you. The Ganga darshan has left a very deep impact on the heart
            of child.
          </p>

          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
            However, as we know that nothing is permanent in this world except
            the change and unfortunately change has come to say goodbye to his
            mother in the age of 6 years. He felt himself helpless without his
            mother and the only thing remained in his mind was memories of Ganga
            Darshan in Haridwar.
          </p>

          {/* <img
            src="/about/Acharyaji1.jpg"
            className="mt-6 w-full rounded shadow-md h-[200] md:h-[450] lg:h-[450]"
            alt="Childhood"
          /> */}
        </section>

        {/* ---------- SECTION: EDUCATION ------------- */}
        <section>
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Education
          </h2>

          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
            The journey was on track through various stages and circumstances to
            teach the lesion of life. The members of his family noticed that
            young boy's vision itself was different from the others. During this
            period an amazing incident took place which was a turning point in
            his life, very often he began to have spontaneous experiences of Maa
            Ganga and Lord Krishna. These spontaneous experiences enforced him
            to leave the family at the age 11 years.
          </p>

          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
            An 11 years old child was fully determined with the blessing of his
            mother to choose the path of truthfulness, peace and harmony. He
            decided to move to Haridwar to study all the spiritual texts such as
            Sanskrit Language, Bhagavad Gita, Vedas, Puranas, Upnishads. During
            his stay in Haridwar he interacted with great philosophers,
            scholars, sages and participated in various events organized by of
            intellectual societies. Jagdish ji was still in constant search of
            self-realization and continued his search while completing his
            Degree of Acharya.
          </p>

          <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white p-2 my-4 rounded shadow-md">
            {/* IMAGE */}
            <div className="w-full md:w-[40%] flex justify-center">
              <img
                src="/about/Acharyaji1.jpg"
                className="w-full rounded-lg shadow-md h-[100] md:h-[220] object-fit"
                alt="Acharyaji"
              />
            </div>

            {/* TEXT */}
            <div className="w-full md:w-[60%] flex items-center">
              <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
                One day the followers of Shrimad Bhagwat and a group of his
                disciples came to request him to visit Mathura during Srikrishna
                Janmasthami. Acharyaji could not reject the request of his
                disciples and visited Mathura. It was a lifetime experience for
                Acharyaji to know more about Lord Krishna and his teachings. The
                inspirational and influential role of Lord Krishna extended his
                stay in Mathura. The character of Lord Krishna made him an
                enthusiastic seeker to know more about the doctrines of Shrimad
                Bhagwat. He started learning more about the characters of
                Mahabharata and Lord Krishna. He found the role of ‘Ganga Putra’
                Bhishma Pitamah much more inspirable in the Indian dynasties.
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
            The Bhishma promised her mother Ganga not to marry throughout his
            life to protect the Hastinapur the kingdom of Bharat Barsh. During
            his stay in Mathura Acharyaji decided to spread the story of Shrimad
            Bhagwat among the society and turned as a Shrimad Bhagwat Katha
            Vachak.After coming from Mathura, Swami ji decided to have Ganga
            Darsan as this thought was lying in Achryaji’s mind since his
            childhood. However, Acharyaji started his journey with of his
            disciples and reached to the birth place of Ganga at Gangotri. What
            a wonderful seen it was !! He said “Maa” with closed eyes, and felt
            as if his mother Bhagirathi is standing in front of him. He became
            so happy to see Ganga at Gangotri, It was so transparent, pure,
            clean and beautiful. He continued his journey and visited all most
            cities and places where Maa Ganga flows.
          </p>
        </section>

        {/* ---------- SECTION: SPREADING BHAGWAT ------------- */}
        <section>
          <h2 className="text-sm md:text-lg font-medium text-gray-900">
            Spreading the Message of Shrimad Bhagwat
          </h2>

          <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white p-2 my-2 rounded shadow-lg">
            <div className="w-full md:w-[40%] flex justify-center">
              <img
                src="/about/Acharyaji2.jpg"
                className="w-full rounded-lg shadow-md h-[100] md:h-[200] object-fit"
                alt="Acharyaji"
              />
            </div>

            <div className="w-full md:w-[60%] flex items-center">
              <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
                Followers of Shrimad Bhagwat invited him to Mathura during Shri
                Krishna Janmashtami. This visit changed his life. He learned
                deeply about Lord Krishna, Mahabharata and the doctrines of
                Shrimad Bhagwat. Inspired by Krishna’s divine character, he
                decided to spread Shrimad Bhagwat among society and became a
                Shrimad Bhagwat Katha Vachak.
              </p>
            </div>
          </div>

          <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
            He visited Gangotri, the birthplace of Maa Ganga, and felt as if his
            mother Bhagirathi was standing before him. He continued visiting
            different cities where Maa Ganga flows.
          </p>
        </section>

        {/* ---------- SECTION: GANGA POLLUTION ------------- */}
        <section>
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Pollution of Maa Ganga
          </h2>

          <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white p-2 my-4 rounded shadow-md">
            {/* TEXT */}
            <div className="w-full md:w-[60%] flex items-center">
              <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
                The journey ended with pain when he saw people dumping
                <strong>
                  {" "}
                  raw sewage, plastic bags, bottles, industrial effluents, human
                  waste, chemicals from tanneries, discarded idols, cow dung,
                  partially cremated corpses, garlands of flowers, human bodies,
                  animal carcasses, butcher’s offal, chemical dyes and
                  construction waste
                </strong>
                . Acharyaji couldn't sleep after witnessing the condition of Maa
                Ganga and resolved to dedicate his life to cleaning the Holy
                River.
              </p>
            </div>
            {/* IMAGE */}
            <div className="w-full md:w-[40%] flex justify-center">
              <img
                src="/about/Acharyaji3.jpg"
                className="mt-6 w-full rounded shadow-md h-[200] md:h-[250] lg:h-[250]"
                alt="Cleaning Ganga"
              />
            </div>
          </div>
        </section>

        {/* ---------- SECTION: MISSION & VISION ------------- */}
        <section>
          <h2 className="text-base md:text-lg font-semibold text-gray-900">
            Acharyaji’s Mission & Vision
          </h2>

          <div className="w-full flex flex-col md:flex-row items-center gap-6 bg-white p-2 my-2 rounded shadow-lg">
            <div className="w-full md:w-[40%] flex justify-center">
              <img
                src="/about/Acharyaji4.jpg"
                className="w-full rounded-lg shadow-md h-[100] md:h-[200] object-fit"
                alt="Mission and Vision"
              />
            </div>

            <div className="w-full md:w-[60%] flex items-center">
              <p className="text-gray-700 leading-relaxed text-sm md:text-[15px] text-justify">
                Acharyaji is now fully dedicated to Maa Ganga and Shrimad
                Bhagwat. He works for the re-establishment of Maa Ganga in her
                purest form and spreads the holy message of Shrimad Bhagwat. His
                vision includes spiritual, educational, healthcare,
                environmental, social, moral and cultural activities to benefit
                people across the world.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AcharyaJagdishji;
