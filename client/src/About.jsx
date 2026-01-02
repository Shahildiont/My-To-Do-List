import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About Our To-Do List Site</h1>
        <p>Stay organized and boost your productivity with our React-powered task manager</p>
      </header>

      <div className="about-content">
        <div className="about-text">
          <h2>Why This Site</h2>
          <p>🌊We believe that staying organized shouldn't be complicated. Our React To-Do List application is designed to help you manage your tasks efficiently with a clean, intuitive interface.</p>
          <p>📝Whether you're organizing daily chores, work projects, or long-term goals, our app makes task management simple and effective.</p>
          <p>✨Built with modern React practices, our application delivers a fast, responsive experience that works seamlessly across all your devices.</p>
          <p>🚀Staying productive is easier when your tools work with you, not against you. With our To-Do List, you can quickly add, edit, and check off tasks without distractions—keeping your focus where it matters most.</p>
        </div>

        <div className="about-features">
          <h2>Key Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-plus-circle"></i>
              </div>
              <h3>Add Tasks</h3>
              <p>Quickly add new tasks with intuitive input system</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <h3>Mark Complete</h3>
              <p>Check off tasks as you complete them</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-trash"></i>
              </div>
              <h3>Delete Tasks</h3>
              <p>Remove tasks you no longer need</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <i className="fa-solid fa-download"></i>
              </div>
              <h3>Download Tasks</h3>
              <p>Save tasks into a fIle with completion status</p>
            </div>
          </div>
        </div>
      </div>

      <div className="tech-stack">
        <h2>Technology Stack</h2>
        <div className="tech-icons">
          <div className="tech-item">
            <i className="fab fa-react tech-icon"></i>
            <p>React</p>
          </div>

          <div className="tech-item">
            <i className="fab fa-js tech-icon"></i>
            <p>JavaScript</p>
          </div>

          <div className="tech-item">
            <i className="fab fa-css3 tech-icon"></i>
            <p>CSS3</p>
          </div>

          <div className="tech-item">
            <i className="fab fa-html5 tech-icon"></i>
            <p>HTML5</p>
          </div>
        </div>
      </div>

      <div className="team-section">
        <h2>Made By</h2>
        <div className="team-grid">
          <div className="team-member">
            <h3>Shahil Ahmad</h3>
            <p>Junior Software Developer</p>
          </div>
        </div>
      </div>

      <div className="about-cta">
        <h2>Ready to Boost Your Productivity?</h2>
        <p>Start using To-Do List Site today and take control of your tasks</p>
        <Link to="/" className="cta-button">Get Started Now</Link>
      </div>

      
    </div>
  );
};

export default About;
