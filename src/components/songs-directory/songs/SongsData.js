import wasteland from "./images/wasteland.jpg";
import unVeranoSinTi from "./images/Un-Verano-Sin-Ti.jpg";
import redMoonInVenus from "./images/red-moon-in-venus-album-cover.jpg";
import bewitched from "./images/bewitched.jpg";
import everythingIKnowAboutLove from "./images/everything-i-know-about-love.png";

const SongsData = [
  {
    id: 1,
    albumCover: wasteland,
    title: "ROLE MODEL",
    album: "WASTELAND",
    dateAdded: "Jul 2, 2023",
    duration: 194,
    artist: "Brent Faiyez",
    filePath: require("./audios/brent-faiyez-role-model.mp3"),
    explicit: true,
    hexColor: "444444",
  },

  {
    id: 2,
    albumCover: wasteland,
    title: "ROLLING STONE",
    album: "WASTELAND",
    dateAdded: "Jul 12, 2023",
    duration: 162,
    artist: "Brent Faiyez",
    filePath: require("./audios/brent-faiyez-rolling-stone.mp3"),
    explicit: true,
    hexColor: "444444",
  },

  {
    id: 3,
    albumCover: unVeranoSinTi,
    title: "Andrea",
    album: "Un Verano Sin Ti",
    dateAdded: "Sep 22, 2023",
    duration: 340,
    artist: "Bad Bunny",
    filePath: require("./audios/bad-bunny-andrea.mp3"),
    explicit: true,
    hexColor: "7C4823",
  },

  {
    id: 4,
    albumCover: redMoonInVenus,
    title: "Fantasy (feat.Don Toliver)",
    album: "Red Moon In Venus",
    dateAdded: "Sep 24, 2023",
    duration: 178,
    artist: "Kali Uchis, Don Toliver",
    filePath: require("./audios/kali-uchis-don-toliver-fantasy.mp3"),
    explicit: false,
    hexColor: "571807",
  },

  {
    id: 5,
    albumCover: bewitched,
    title: "From The Start",
    album: "Bewitched",
    dateAdded: "Sep 24, 2023",
    duration: 170,
    artist: "Laufey",
    filePath: require("./audios/laufey-from-the-start.mp3"),
    explicit: false,
    hexColor: "240700",
  },

  {
    id: 6,
    albumCover: everythingIKnowAboutLove,
    title: "Valentine",
    album: "Everything I Know About Love",
    dateAdded: "Sep 24, 2023",
    duration: 169,
    artist: "Laufey",
    filePath: require("./audios/laufey-valentine.mp3"),
    explicit: false,
    hexColor: "60686B",
  },
];

export default SongsData;
