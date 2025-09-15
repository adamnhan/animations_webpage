
export interface Video {
  id: number;
  title: string;
  url: string;   // YouTube embed url
  notes: string;
}


export const videos: Video[] = [
  {
    id: 1,
    title: "Solar System Animation",
    url: "https://www.youtube.com/embed/hjEWQDmEKO4", // replace with your link
    notes: "Initial solar system animation by following the tutorial instructions."
  },
  {
    id: 2,
    title: "Solar System Animation v2",
    url: "https://www.youtube.com/embed/_S9Nqtask8k", // replace with your link
    notes: "Changed the orbits of the planets to be realistic, added in a milky way/stars background, and did a close up of the Earth with a more realistic shader."
  }
]
