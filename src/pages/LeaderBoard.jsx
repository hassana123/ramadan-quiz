// import React, { useEffect, useState } from "react";
// import { firestore } from "../../firebase";
// import { collection, query, orderBy, getDocs } from "firebase/firestore";
// import arrow from "../assets/backarrow.png";
// import { useNavigate } from "react-router-dom";
// import { isToday, fromUnixTime } from "date-fns";
// import { NavLink } from "react-router-dom";
// import SplashScreen from "../components/SplashScreen";

// const LeaderBoard = () => {
//   const navigate = useNavigate();
//   const [leaderboardData, setLeaderboardData] = useState([]);
//   const [dayboardData, setDayboardData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const fetchLeaderboardData = async () => {
//       try {
//         const leaderboardCollectionRef = collection(firestore, "LeaderBoard");

//         // Query to get the leaderboard data, ordered by score in descending order
//         const leaderboardQuery = query(
//           leaderboardCollectionRef,
//           orderBy("score", "desc"),
//           orderBy("timestamp", "desc")
//         );

//         // Execute the query and get the snapshot
//         const leaderboardSnapshot = await getDocs(leaderboardQuery);

//         // Extract the data from the snapshot
//         const data = leaderboardSnapshot.docs.map((doc) => doc.data());

//         setLeaderboardData(data);

//         const todayScores = data.filter((entry) => {
//           let entryDate;

//           if (entry.timestamp && entry.timestamp.seconds) {
//             entryDate = fromUnixTime(entry.timestamp.seconds);
//           } else if (entry.timestamp instanceof Date) {
//             entryDate = entry.timestamp;
//           } else {
//             console.error("Unsupported timestamp format:", entry.timestamp);
//             return false;
//           }

//           return isToday(entryDate);
//         });

//         setDayboardData(todayScores);

//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching leaderboard data:", error);
//       }
//     };

//     // Call the function to fetch leaderboard data
//     fetchLeaderboardData();
//   }, []);
//   console.log(leaderboardData);

//   // useEffect(() => {
//   //   const fetchLeaderboardData = async () => {
//   //     try {
//   //       // Reference to the leaderboard collection
//   //       const leaderboardCollectionRef = collection(firestore, "LeaderBoard");

//   //       // Query to get the leaderboard data, ordered by score in descending order
//   //       const leaderboardQuery = query(
//   //         leaderboardCollectionRef,
//   //         orderBy("score", "desc"),
//   //         orderBy("timestamp", "desc")
//   //       );

//   //       // Execute the query and get the snapshot
//   //       const leaderboardSnapshot = await getDocs(leaderboardQuery);

//   //       // Extract the data from the snapshot
//   //       const data = leaderboardSnapshot.docs.map((doc) => doc.data());

//   //       // Update the state with the fetched data
//   //       setLeaderboardData(data);
//   //       //console.log(data);
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching leaderboard data:", error);
//   //     }
//   //   };

//   //   // Call the function to fetch leaderboard data
//   //   fetchLeaderboardData();
//   // }, []);

//   return (
//     <>
//       {loading ? (
//         <SplashScreen />
//       ) : (
//         <section className="bg-opaquebg   text-whiteish">
//           <div className="bg-mainbg py-5 px-5">
//             <img
//               onClick={() => navigate("/")}
//               className="cursor-pointer"
//               src={arrow}
//               alt="back"
//             />
//             <h1 className="text-center font-bold my-5 mb-20 text-[24px]">
//               Leader Board
//             </h1>
//           </div>

//           <div className=" w-[95%] mb-5 mt-[-50px] bg-whiteish text-black mx-auto py-10 px-5 shadow-lg rounded-lg">
//             <h1 className="text-[20px] font-bold mb-5 text-center">
//               Today's all-time high score
//             </h1>
//             {/* Display leaderboard data */}
//             {dayboardData.map((entry, index) => (
//               <div
//                 key={index}
//                 className="flex capitalize font-bold my-3 rounded-[8px] border py-3 px-5 justify-between"
//               >
//                 <div className="flex gap-4">
//                   <h1>{index + 1}</h1>
//                   <h1> {entry.name}</h1>
//                 </div>
//                 <h1>{entry.score}</h1>
//               </div>
//             ))}
//           </div>

//           <div className="py-5">
//             <NavLink
//               to="/"
//               className="bg-mainbg flex rounded-lg  w-[70%] text-[20px] hover:bg-secondary py-5 justify-center mx-auto shadow-lg"
//             >
//               Exit
//             </NavLink>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

// export default LeaderBoard;

import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import arrow from "../assets/backarrow.png";
import { useNavigate } from "react-router-dom";
import { isToday, fromUnixTime } from "date-fns";
import { NavLink } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";
import ReactConfetti from "react-confetti";
const LeaderBoard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [dayboardData, setDayboardData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const leaderboardCollectionRef = collection(firestore, "LeaderBoard");

        const leaderboardQuery = query(
          leaderboardCollectionRef,
          orderBy("score", "desc"),
          orderBy("timestamp", "desc")
        );

        const leaderboardSnapshot = await getDocs(leaderboardQuery);

        const data = leaderboardSnapshot.docs.map((doc) => doc.data());

        setLeaderboardData(data);

        const todayScores = data.filter((entry) => {
          let entryDate;

          if (entry.timestamp && entry.timestamp.seconds) {
            entryDate = fromUnixTime(entry.timestamp.seconds);
          } else if (entry.timestamp instanceof Date) {
            entryDate = entry.timestamp;
          } else {
            console.error("Unsupported timestamp format:", entry.timestamp);
            return false;
          }

          return isToday(entryDate);
        });

        setDayboardData(todayScores);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboardData();
  }, []);

  const decorateEntry = () => "👑"; // Always return the crown emoji
  const [dimension, setDimension] = useState({
    width: window.innerWidth,
  });
  const showAnimation = () => {
    setDimension({
      width: window.innerWidth,
    });
  };
  useEffect(() => {
    // Hide the Eid animation after 5 seconds
    window.addEventListener("resize", showAnimation());

    return () => {
      window.removeEventListener("resize", showAnimation);
    };
  }, [dimension]);
  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <section className="bg-opaquebg text-whiteish">
          <div className="bg-mainbg py-5 px-2">
            <img
              onClick={() => navigate("/")}
              className="cursor-pointer"
              src={arrow}
              alt="back"
            />
            <h1 className="text-center font-custom text-secondary font-bold my-5 mb-10 md:text-[35px] text-[24px]">
              HALL OF FAME
            </h1>
            <ReactConfetti width={dimension.width} height={170}></ReactConfetti>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-[95%] mx-auto">
            {leaderboardData.map((entry, index) => (
              <div
                key={index}
                className="bg-whiteish text-black py-5 px-5 rounded-lg shadow-lg relative"
              >
                <span className=" m-3 text-xl">{decorateEntry()}</span>
                <h2 className="text-3xl font-bold mb-3">{entry.name}</h2>
                <p className="text-lg font-semibold mb-3">
                  Score: {entry.score}
                </p>
                <p className="text-base font-medium">
                  Date:{" "}
                  {entry.timestamp &&
                    fromUnixTime(entry.timestamp.seconds).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>

          <div className="py-5">
            <NavLink
              to="/"
              className="bg-mainbg flex rounded-lg w-[70%] text-[20px] hover:bg-secondary py-5 justify-center mx-auto shadow-lg"
            >
              Exit
            </NavLink>
          </div>
        </section>
      )}
    </>
  );
};

export default LeaderBoard;
