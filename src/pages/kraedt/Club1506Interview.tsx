import { Link } from 'react-router-dom';
import styles from './Club1506Interview.module.scss';

export const Club1506Interview = () => {
  return (
    <div className={styles.interviewContainer}>
      <h2>Club1506.com Interview with Kraedt:</h2>
      <p>
        Kraedt [pronounced crate] hails from Wisconsin in the United States, and has been surrounded by music her entire life. She played trumpet for her school’s band and later on learned how to play the guitar. Around the age of 16 she started getting into music production. In 2010 she played around with electronic music production, but got serious with it late 2011 early 2012. She is a talented producer who created many upbeat and energetic songs like Zero Gravity and Levitate. Club1506.com featured some of her work on our showcase; however we are not the only ones to notice her talents. A game called Disco Dodgeball, developed by Erik Asmussen and published by 82 Apps, features three of Kraedt’s songs.  Kraedt is certainly on her way to the top. She took some time to do an interview with us and we invite to read further, so you can know the story behind the music featured on this website.
      </p>
      <h3>
        Thank you, Kraedt, for taking the time to do an interview us. What inspired you to start creating music?
      </h3>
      <p>
        My main inspiration, in the form of an artist I enjoyed the most when I began producing, was Pendulum. I was inspired by their music and decided to cover a couple of their songs. I enjoyed making those covers, and proceeded making music and started producing my own original Drum n’ Bass. Later on, I discovered different genres of electronic music (Progressive and Electro House are still my favorites), and I began producing what’s known today as ‘EDM’.
      </p>
      <h3>
        What are some of things that set your music apart from the rest?
      </h3>
      <p>
        I feel as if my music has a different energy than a lot of other EDM that’s out there. Seeing as I’ve stemmed from Drum n’ Bass, I’ve always had a strong focus on energy as the main mood of the music I produce. If a track I’m working on doesn’t have a certain level of energy, it’s not good in my mind and I’m forced to either change/improve it or scrap it.
      </p>
      <h3>
        What are some the things that you would like to accomplish with your music?
      </h3>
      <p>
        As much as I enjoy releasing my music for free and watching people delve into it and enjoy it, I would really like to get to a point where I can comfortably produce music on a daily basis (in short, quitting my day job). I feel that might be quite a long time from now, but in the meantime I’ll be working hard at getting there.
      </p>
      <h3>
        Has the path you chosen, as a recording artist, taught you any lessons that you would like to share with fans or fellow artist?
      </h3>
      <p>
        One thing I noticed when I was quickly growing as a producer is that I started to lose focus on what’s important in music: the actual music. As I was learning the technical side of music production (mixing, mastering, stereo imaging, etc.), I became a bit lazy with the composition of my songs and they became rather dull and boring. I would end up not finishing the tracks, because they were very unfinished and I would get stuck. My tip for any newer producers out there is to keep your focus on the music; Don’t let getting a cleaner, louder mix get in the way of the creative process that’s important for making good music.
      </p>
      <h3>
        Fun Question: If you could go anywhere in the world to do a show, where would you go?
      </h3>
      <p>
        Honestly, I have no idea. From what I’ve seen and where I’ve been so far, there are so many amazing places to play at, there would be too many for me to choose from. For sure it would be some place in America though, because we all know American’s love to party!
      </p>
      <h3>
        Once again thank you for taking the time to answer all of these questions, Kraedt.
      </h3>
      <h3>
        Thank you for visiting Kraedt's website! Please feel free to explore her <Link to='/music'>latest works of digital art</Link>.
      </h3>
    </div>
  )
}