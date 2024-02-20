import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import arrow from "../assets/backarrow.png";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import SplashScreen from "../components/SplashScreen";

const LeaderBoard = () => {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        // Reference to the leaderboard collection
        const leaderboardCollectionRef = collection(firestore, "LeaderBoard");

        // Query to get the leaderboard data, ordered by score in descending order
        const leaderboardQuery = query(
          leaderboardCollectionRef,
          orderBy("score", "desc"),
          orderBy("timestamp", "desc")
        );

        // Execute the query and get the snapshot
        const leaderboardSnapshot = await getDocs(leaderboardQuery);

        // Extract the data from the snapshot
        const data = leaderboardSnapshot.docs.map((doc) => doc.data());

        // Update the state with the fetched data
        setLeaderboardData(data);
        //console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    // Call the function to fetch leaderboard data
    fetchLeaderboardData();
  }, []);

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <section className="bg-opaquebg   text-whiteish">
          <div className="bg-mainbg py-5 px-5">
            <img
              onClick={() => navigate("/quiz-complete")}
              className="cursor-pointer"
              src={arrow}
              alt="back"
            />
            <h1 className="text-center font-bold my-5 mb-20 text-[24px]">
              Leader Board
            </h1>
          </div>

          <div className=" w-[95%] mb-5 mt-[-50px] bg-whiteish text-black mx-auto py-10 px-5 shadow-lg rounded-lg">
            <h1 className="text-[20px] font-bold mb-5 text-center">
              Today's all-time high score
            </h1>
            {/* Display leaderboard data */}
            {leaderboardData.map((entry, index) => (
              <div className="flex capitalize font-bold my-3 rounded-[8px] border py-3 px-5 justify-between">
                <div className="flex gap-4">
                  <h1>{index + 1}</h1>
                  <h1> {entry.name}</h1>
                </div>
                <h1>{entry.score}</h1>
              </div>
            ))}
          </div>

          <div className="py-5">
            <NavLink
              to="/"
              className="bg-mainbg flex rounded-lg  w-[70%] text-[20px] hover:bg-secondary py-5 justify-center mx-auto shadow-lg"
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
