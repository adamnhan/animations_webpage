import pic1 from "./assets/8k_earth_daymap.jpg"
import pic2 from "./assets/8k_stars_milky_way.jpg"
import pic3 from "./assets/planet_angles.png"
import pic4 from "./assets/ball_boucing1.png"
import pic5 from "./assets/ball_bouncing2.png"
import pic6 from "./assets/ball_bouncing3.png"
import pic7 from "./assets/ball_bouncing4.png"
import pic8 from "./assets/storyboard.jpg"


export interface Video {
  id: number;
  title: string;
  url: string;   // YouTube embed url
  notes: string;
  images?: string[];
}


export const videos: Video[] = [
  {
    id: 1,
    title: "Solar System Animation",
    url: "https://www.youtube.com/embed/hjEWQDmEKO4", 
    notes: "Initial solar system animation by following the tutorial instructions."
  },
  {
    id: 2,
    title: "Solar System Animation v2",
    url: "https://www.youtube.com/embed/_S9Nqtask8k", 
    notes: "Changed the orbits of the planets to be realistic, added in a milky way/stars background, and did a close up of the Earth with a more realistic shader.",
    images: [pic1, pic2, pic3]
  },
  {
    id: 3,
    title: "The Climb – Bouncing Ball",
    url: "https://www.youtube.com/embed/__Q0fF2ifOQ",
    notes: "This animation, titled 'The Climb', tells a short story of perseverance as a small ball repeatedly tries to bounce up a staircase. At first, it falls short and tumbles down, but after a little creative thinking, it finally reaches the top and succeeds. The animation applies the Disney principles of Squash and Stretch, Anticipation, Arcs, and Timing & Spacing. Squash and Stretch are shown in images 3 and 4, highlighting the ball’s compression upon landing and its elongation during jumps. Anticipation is demonstrated in image 2, where the ball pauses and squashes slightly before leaping upward. Arcs are visible in image 1, showing the natural curved motion of the ball’s trajectory as it bounces up the stairs. The final image displays my storyboard, outlining the narrative progression from struggle to success. All images are clickable for a closer look, allowing detailed viewing of the animation’s key principles and stages.",
    images: [pic4, pic5, pic6, pic7, pic8]
  }
]
