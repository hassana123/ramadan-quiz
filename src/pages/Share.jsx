import React from "react";
import {
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  XIcon,
  WhatsappIcon,
  InstapaperIcon,
} from "react-share";

const Share = () => {
  const url = "https://hallaly.vercel.app/leaderboard";
  const quizScore = localStorage.getItem("score");

  return (
    <div className="flex justify-center space-x-4 mb-10">
      {/* Twitter Share Button */}
      <TwitterShareButton
        url={url}
        title={`🌙 Just aced the Ramadan Quiz on Hallaly with a score of ${quizScore}! 🌟 Join the fun and test your knowledge! #RamadanQuiz \n`}
        hashtags={["\n", "Hallaly", " RamadanQuiz", "HallalyQuiz"]}
      >
        <XIcon className="rounded-lg" size={38} />
      </TwitterShareButton>

      {/* Whatsapp Share Button */}
      <WhatsappShareButton
        url={url}
        title={`/\n 🌙 I just scored ${quizScore} in today's Ramadan quiz on Hallaly! 🌟 Join me in the challenge and let's see who knows more about Ramadan! 🤓 #RamadanQuiz \n \n `}
      >
        <WhatsappIcon className="rounded-lg" size={38} />
      </WhatsappShareButton>

      {/* Instapaper Share Button */}
      <InstapaperShareButton
        url={url}
        title={`\n🌙 Just aced the Ramadan Quiz on Hallaly with a score of ${quizScore}! 🌟 Join the fun and test your knowledge! \n `}
        description={`\n 🌙 Just aced the Ramadan Quiz on Hallaly with a score of ${quizScore}! 🌟 Join the fun and test your knowledge! #RamadanQuiz #HallalyQuiz \n `}
      >
        <InstapaperIcon className="rounded-lg" size={38} />
      </InstapaperShareButton>
    </div>
  );
};

export default Share;
