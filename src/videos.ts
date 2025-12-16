import pic1 from "./assets/8k_earth_daymap.jpg"
import pic2 from "./assets/8k_stars_milky_way.jpg"
import pic3 from "./assets/planet_angles.png"
import pic4 from "./assets/ball_boucing1.png"
import pic5 from "./assets/ball_bouncing2.png"
import pic6 from "./assets/ball_bouncing3.png"
import pic7 from "./assets/ball_bouncing4.png"
import pic8 from "./assets/storyboard.jpg"
import pic9 from "./assets/Screenshot 2025-11-06 095325.png"
import pic10 from "./assets/Screenshot 2025-11-06 095426.png"
import pic11 from "./assets/Screenshot 2025-11-06 095533.png"
import pic12 from "./assets/Screenshot 2025-11-06 095638.png"
import pic13 from "./assets/Screenshot 2025-11-06 095718.png"
import pic14 from "./assets/Screenshot 2025-11-06 095811.png"
import pic15 from "./assets/IMG_5068.jpg"
import pic16 from "./assets//pic1_p5.png"
import pic17 from "./assets/pic2_p5.png"
import pic18 from "./assets/pic3_p5.png"
import pic19 from "./assets/sr2ee070657ea0a.png"
import pic20 from "./assets/button_scene_1.0001.png"
import pic21 from "./assets/button_scene_1.0347.png"
import pic22 from "./assets/button_scene_1.0834.png"
import pic23 from "./assets/storyboardfinal.jpg"


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
  },
  {
    id: 4,
    title: "P4, Rube Goldberg Machine",
    url: "https://www.youtube.com/embed/2zW8pA_9ICU",
    notes: "This short animation depicts a Rube Goldberg machine designed to turn on a lamp through a fun and seamless chain reaction. The sequence begins with a shiny metal ball resting on a wooden ramp. As the animation starts, the ball rolls down the ramp, gaining momentum until it collides with a long wooden lever positioned nearby. The impact causes one end of the lever to shift right and hit a large domino off its edge, hitting smaller dominos along the way. The last domino tips forward and falls onto a small toy car waiting in front of it, transferring the motion as it lands. The toy car then rolls forward smoothly across the surface until it strikes a switch connected to a lamp. Upon contact, the switch is pressed, and the lamp suddenly glows to life, illuminating the scene with a green light that signals the successful completion of the machine. Each object, the ramp, metal ball, lever, book, car, and lamp, works together to create a continuous flow of motion that combines realistic physics and timing with clean, purposeful animation to bring the story to life.",
    images: [pic9, pic10, pic11, pic12, pic13, pic14, pic15]
  },
  {
    id: 5,
    title: "P5, Domino Reveal Animation",
    url: "https://www.youtube.com/embed/hPrxE_rfwAg",
    notes: "This project uses a Python script in Maya to build and animate a grid of 900 dominoes based on a dice image. The script reads the image, turns each pixel into a colored domino, sets up dynamics, and then nudges a full row so the chain reaction starts. As the dominoes topple, the colored pattern comes into view from the main camera and then settles into a clean final pose. Lighting and camera placement are also created in the script so the whole reveal runs from a single button press.",
    images: [pic16, pic17, pic18, pic19]
  },
  {
  id: 6,
  title: "Final, The Button You Shouldn’t Press",
  url: "https://www.youtube.com/embed/azI_YVaaEV0",
  notes: "For this project, I created a short animated scene centered around a simple but expressive interaction: a human hand confronting a mysterious button. The goal of the animation was to focus on timing, anticipation, and subtle acting rather than complex environments or characters. By limiting the scene to a single setting and prop, I was able to emphasize performance and animation fundamentals.The animation begins with the button alone in a dark room, establishing a sense of tension. A hand slowly enters the frame and hesitates repeatedly before attempting to press the button. The finger recoils, tries again multiple times, and ultimately realizes that nothing happens. The animation ends with the hand giving a thumbs-up, turning the moment into a small, humorous resolution.I focused heavily on the Disney principles of animation, especially anticipation, timing and spacing, exaggeration, and staging. The hesitation before each button press was designed to feel uncomfortable and deliberate, while the recoil and repeated presses were animated more quickly to create contrast and comedic effect. Holding poses and varying timing helped communicate the hand’s “thought process” without the use of facial expressions or dialogue.All models, materials, lighting, and animation were created by me. The scene was lit using Arnold lights to draw attention to the button and hand while keeping the environment simple and unobtrusive. One challenge I encountered was balancing render quality and render time, which I addressed by adjusting sampling settings and rendering as an image sequence before compiling the final video. Overall, this project allowed me to focus on expressive animation and storytelling through motion, while reinforcing the importance of clarity, timing, and intentional design in computer animation.",
  images: [pic20, pic21, pic22, pic23]
}

]
