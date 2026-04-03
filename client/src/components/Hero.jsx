import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './Hero.css';

const Hero = () => {
  const [heroData, setHeroData] = useState({
    username: '@sumitramnani',
    name: 'Sumit Ramnani',
    bio: 'A Backend Developer who excels in architecting scalable and robust server-side applications. I possess a strong engineering sensibility, focusing on database performance, API optimization, and secure infrastructure.',
    miniCard: 'Backend Developer With A Passion For Scalable Architecture',
    stat1: '1434 DESIGNED COMPLETED',
    stat2: '17 CLIENTS EVERY MONTH',
    stat3: '2 BILLION LINES OF CODE WRITTEN',
    stat4: '1200+ CLIENTS',
    heroLine1: 'lets think',
    heroLine2: 'creative'
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const docRef = doc(db, 'content', 'hero');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setHeroData(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching hero data from Firestore", error);
      }
    };
    fetchHero();
  }, []);

  return (
    <section className="hero-grid">
      <div className="left-column">
        
        <div className="circular-badge">
          <div className="circle-dot"></div>
          {/* Simple rotating text effect */}
          <div className="circle-text-svg">
            <svg viewBox="0 0 100 100" width="120" height="120">
              <path id="curve" d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" fill="transparent"/>
              <text fontSize="12" letterSpacing="4" fill="var(--text-dark)" style={{textTransform: 'uppercase'}}>
                <textPath href="#curve">Dream Big, Work Hard, Succeed.</textPath>
              </text>
            </svg>
          </div>
        </div>
        
        <div className="hero-text-block">
          <div className="hi-there">
            <strong>HI THERE</strong> <span className="line"></span>
          </div>
          <h1 className="hero-title">
            {heroData.heroLine1}<br />
             <span className="teal-text">{heroData.heroLine2}</span>
          </h1>
        </div>
        
        <div className="stats-chart">
           <div className="stat-bar bar-coral">{heroData.stat1}</div>
           <div className="stat-bar bar-teal">{heroData.stat2}</div>
           <div className="stat-bar bar-yellow">{heroData.stat3}</div>
           <div className="stat-bar bar-maroon">{heroData.stat4}</div>
        </div>
      </div>
      
      <div className="center-column">
        <div className="olive-square"></div>
        <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=500&q=80" alt="Portrait" className="portrait-image grayscale" />
        <div className="username">{heroData.username}</div>
      </div>
      
      <div className="right-column">
         <div className="intro-block">
           <h2 className="intro-name">I'm <u>{heroData.name}</u></h2>
           <p className="intro-bio">
             {heroData.bio}
           </p>
           <a href="#learn" className="learn-more">Learn More &rarr;</a>
         </div>
      </div>
      
      <div className="mini-card">
         <div className="mini-card-img">
           <div className="play-btn">&#9658;</div>
         </div>
         <div className="mini-card-text">
            <strong>{heroData.miniCard}</strong><br/>
            <a href="#learn">Learn More</a>
         </div>
      </div>
    </section>
  );
};

export default Hero;
