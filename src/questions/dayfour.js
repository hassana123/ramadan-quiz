// const dayFourQuestions = [
//   {
//     question:
//       "How many Aayaats (verses) of the Holy Quran deal with hard core science?",
//     options: [
//       "More than 100 Aayaats (verses)",
//       "More than 500 Aayaats (verses)",
//       "More than 1,000 Aayaats (verses)",
//       "There are no Aayaats (verses) in the Quran which deal with science",
//     ],
//     correctOption: 3,
//   },
//   {
//     question: "What does the Quran state about the motion of the sun?",
//     options: [
//       "The Quran says the sun is stationary",
//       "The Quran says only the moon rotates in its own axis and not the sun",
//       "The Quran says that the sun, moon and all celestial bodies rotate in their own axis",
//       "There are no verses in the Quran talking about the sun",
//     ],
//     correctOption: 2,
//   },
//   {
//     question: "Does the Quran talk about the Water Cycle?",
//     options: [
//       "Yes, the Quran explains in detail about the complete Water Cycle",
//       "The Quran talks only about rainfall",
//       "The Quran talks about the evaporation process alone",
//       "Quran does not talk about the Water Cycle",
//     ],
//     correctOption: 0,
//   },
//   {
//     question:
//       "Does the Quran mention anything about the creation of the universe?",
//     options: [
//       "Yes, the Quran talks about the creation of the universe, which in science is termed as the Big Bang Theory",
//       "Yes, the Quran says the Universe was created as an accident",
//       "The Quran mentions that the universe has been existing from time unknown",
//       "No, there are no mentions in the Quran about the creation of the universe",
//     ],
//     correctOption: 0,
//   },
//   {
//     question:
//       "What does the Quran specify about the barriers in water where freshwater and saltwater meet?",
//     options: [
//       "Quran says seawater and freshwater mix and form a new homogenised water body",
//       "Quran does not talk about the barriers between water bodies",
//       "Quran says there are no water bodies",
//       "Quran speaks about the divider between fresh and saltwater, it mentions the existence of “a forbidding partition” with the barrier",
//     ],
//     correctOption: 3,
//   },
//   {
//     question:
//       "What does the Quran state about the mountains and their reason for existence?",
//     options: [
//       "Mountains do not exist according to the Quran",
//       "The Quran states that mountains are just high rises",
//       "The Quran states that mountains have been created for beautification alone",
//       "The Quran states that mountains act like stakes or tent pegs that hold the earth’s crust and give it stability",
//     ],
//     correctOption: 3,
//   },
//   {
//     question:
//       "Does the Quran mention the stages of embryonic development of a foetus?",
//     options: [
//       "Quran just talks about the early stages",
//       "Quran just mentions about the birth of children and not about the embryonic development",
//       "Quran does not talk about the foetus",
//       "Yes, Quran precisely describes the different stages of the embryonic development of the foetus",
//     ],
//     correctOption: 3,
//   },
//   {
//     question: "What does the Quran say about the shape of the Earth?",
//     options: [
//       "The Quran says the Earth is flat",
//       "The Quran says that the Earth is not exactly round like a ball, but geo-spherical",
//       "The Quran says the Earth is round like a ball",
//       "There are no verses in the Quran which talk about the shape of the Earth",
//     ],
//     correctOption: 2,
//   },
//   {
//     question:
//       "What does the Quran say about the protection of a foetus in the mother’s womb?",
//     options: [
//       "Foetus is protected by itself",
//       "Foetus is not protected by anything",
//       "Quran says that the foetus is protected by three veils / layers",
//       "There are no verses talking about the protection of a foetus",
//     ],
//     correctOption: 2,
//   },
//   {
//     question: "What determines the sex of the foetus, according to the Quran?",
//     options: [
//       "Quran says it is the cells of the mother which determine the sex of the foetus",
//       "Quran says that the sex of the foetus is determined by the sperm",
//       "There is no differentiation of the sexes according to the Quran",
//       "Quran does not talk about the determination of sex of the foetus",
//     ],
//     correctOption: 1,
//   },
// ];

const dayFourQuestions = [
  {
    question: "When Ramadan comes, which of the gates are opened?",
    options: ["Gates of Jannah", "Gates of Mercy", "Gates of Makkah", "Gates of Hell"],
    correctOption: 0,
    justification: "When the month of Ramadan starts, the gates of Heaven are opened and the gates of Hell are closed. (Bukhari 1899)"
  },
  {
    question: "What is Az-Zaqqum?",
    options: ["Food for the people of Hellfire", "Drink for the people of Hellfire", "Home for the people of Hellfire", "Clothes for the people of Hellfire"],
    correctOption: 0,
    justification: "Then indeed you, O those astray, will be eating from trees of zaqqum. (Quran 56:51-52)"
  },
  {
    question: "What is Sidrat al-Muntaha?",
    options: ["Food for the people of Jannah", "An olive tree of the farthest boundary", "A lote tree of the farthest boundary", "A drink for the people of Jannah"],
    correctOption: 2,
    justification: "Near Sidrat al-Muntaha (the lote tree of the utmost boundary, beyond which none can pass). (Quran 53:13-16)"
  },
  {
    question: "Which is NOT one of the rights of a Muslim upon another Muslim?",
    options: ["If one invites, you accept it", "If one dies, you attend the funeral", "If one asks for advice, you give sincerely", "If one asks for money, you give"],
    correctOption: 3,
    justification: "The five rights are returning salaam, visiting the sick, attending funerals, accepting invitations, and saying 'yarhamuk Allah' when one sneezes. (Bukhari 1240, Muslim 2162)"
  },
  {
    question: "Which uncle of Prophet Muhammad (SAW) didn’t accept Islam?",
    options: ["Abdul Muttalib", "Hamza", "Abu Lahab", "Al-Abbas"],
    correctOption: 2,
    justification: "'Perished be the hands of Abu Lahab and ruined he be.' (Quran 111:1-5)"
  },
  {
    question: "What are you NOT allowed to do in Sujood?",
    options: ["Make dua in Arabic", "Recite Qur’an", "Recite adhkar"],
    correctOption: 1,
    justification: "The Prophet ﷺ said: 'I have been forbidden to recite the Quran in the state of bowing and prostration.' (Muslim)"
  },
  {
    question: "Reciting Surah Fatiha in each rakat of the Salah is…?",
    options: ["Optional", "Encouraged", "Not necessary", "Mandatory"],
    correctOption: 3,
    justification: "The Prophet ﷺ said: 'There is no prayer for the one who does not recite al-Fatiha.' (Bukhari 714)"
  },
  {
    question: "In Sujood, which body part should NOT be touching the ground?",
    options: ["Forearms", "Nose", "Feet", "Hands"],
    correctOption: 0,
    justification: "The Prophet ﷺ said: 'Be straight in prostration and let none of you put his forearms on the ground like a dog.' (Bukhari 788, Muslim 493)"
  },
  {
    question: "Allah says, with His knowledge, He is closer to us than our…?",
    options: ["Thoughts", "Heart", "Jugular Vein", "Blood"],
    correctOption: 2,
    justification: "'We are closer to him than his jugular vein.' (Quran 50:16)"
  },
  {
    question: "Eating Suhoor (Predawn meal) is…?",
    options: ["Sunnah", "Waajib", "Permissible", "Makrooh"],
    correctOption: 0,
    justification: "Take a meal a little before dawn, for there is a blessing in taking a meal at that time. (Muslim 1095)"
  }
];
export default dayFourQuestions;
