import React from "react";
import { motion } from "framer-motion";

function PartyListsResults() {
  // بيانات وهمية - استبدلها بالبيانات الفعلية
  const partyLists = [
    {
      id: 1,
      name: "حزب التقدم",
      seatsWon: 5,
      winners: [
        { name: "سمير حسن", category: "مسلم" },
        { name: "ليلى عمر", category: "امرأة" },
        { name: "جورج خوري", category: "مسيحي" },
        { name: "فاطمة علي", category: "مسلم" },
        { name: "محمود الأحمد", category: "مسلم" },
      ],
    },
    // أضف المزيد من القوائم الحزبية...
  ];

  return (
    <section className="mt-8">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6 text-red-800"
      >
        نتائج القوائم الحزبية
      </motion.h2>
      {partyLists.map((list, index) => (
        <motion.div
          key={list.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white shadow-lg rounded-lg overflow-hidden mb-6 hover:shadow-xl transition-shadow duration-300 border-2 border-green-700"
        >
          <div className="px-6 py-4 bg-gradient-to-r from-green-700 to-black">
            <h3 className="text-2xl font-bold text-white">{list.name}</h3>
            <p className="text-white mt-1 text-lg">
              عدد المقاعد: {list.seatsWon}
            </p>
          </div>
          <div className="px-6 py-4">
            <h4 className="text-xl font-bold text-green-700 mb-3">الفائزون:</h4>
            {list.winners.map((winner, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2 border-b border-green-100 last:border-b-0"
              >
                <span className="text-lg text-green-800">{winner.name}</span>
                <span className="text-sm text-white bg-red-700 px-3 py-1 rounded-full font-semibold">
                  {winner.category}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

export default PartyListsResults;
