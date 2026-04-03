import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="main-container">
        <Hero />
        <Projects />
      </main>
      <Contact />
    </>
  );
};

export default Home;
