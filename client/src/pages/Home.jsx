import { Link } from 'react-router-dom';
import { ArrowRight, Award, BarChart3, BookOpen, Clock, GraduationCap, Shield, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();

  const features = [
    ['Guided Module Sequence', 'Structured course units unlocked sequentially upon meeting performance standards.', BookOpen],
    ['Timed Assessment Module', 'Dynamic evaluation sessions featuring automated 10-minute timers.', Clock],
    ['Analytics & Document Export', 'Comprehensive grade ledgers with instant export to PDF, Excel, and official print formats.', BarChart3],
    ['Unified Dual Portals', 'Tailored environments optimized separately for student workflow and faculty administration.', Shield],
    ['Performance-Gated Advancement', 'Achieve a minimum 75% score benchmark to validate competency and unlock subsequent topics.', Award],
    ['Institutional Integration', 'Custom-built to align directly with university curriculum requirements and academic standards.', GraduationCap]
  ];

  const dashboard = user ? (user.role === 'student' ? '/student/dashboard' : '/faculty/dashboard') : '/login';

  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero-orbit orbit-one" />
        <div className="home-hero-orbit orbit-two" />
        <div className="home-hero-content">
          <span className="home-kicker">
            <Sparkles size={14} /> ACADEMIC PORTAL · DESIGNED FOR EXCELLENCE
          </span>
          <div className="home-mark">
            <GraduationCap size={34} />
          </div>
          <p className="home-index">01 / 06 · ACADEMIC CURRICULUM</p>
          <h1>
            Master every<br />
            <em>module.</em>
          </h1>
          <p className="home-lede">
            A unified academic environment empowering students and faculty through structured course evaluation.
          </p>
          <div className="home-actions">
            <Link className="btn-gold" to={dashboard}>
              {user ? 'ENTER PORTAL' : 'ACCESS PORTAL'} <ArrowRight size={18} />
            </Link>
            {!user && (
              <Link className="home-outline-button" to="/register">
                REGISTER ACCESS
              </Link>
            )}
          </div>
          <div className="home-proof">
            <span><strong>6</strong> CORE MODULES</span>
            <span><strong>75%</strong> MASTERY BENCHMARK</span>
            <span><strong>10-MIN</strong> EVALUATIONS</span>
          </div>
        </div>
        
        <div className="home-hero-panel">
          <div className="home-panel-top">
            <span>PORTAL / SYSTEM</span>
            <span className="home-live-dot">OPERATIONAL</span>
          </div>
          <div className="home-progress-card">
            <div className="home-progress-ring">
              <span>01</span>
            </div>
            <div>
              <small>CURRICULUM FLOW</small>
              <strong>Master coursework<br />sequentially.</strong>
            </div>
          </div>
          <div className="home-mini-roadmap">
            {[1, 2, 3, 4, 5, 6].map((number, index) => (
              <span className={index === 0 ? 'active' : ''} key={number}>
                {number}
              </span>
            ))}
          </div>
          <p className="home-panel-note">
            Guided learning modules, targeted assessments, verified achievement.
          </p>
        </div>
      </section>

      <section className="home-features">
        <div className="home-section-intro">
          <span className="home-kicker dark">Integrated Environment</span>
          <h2>
            A seamless approach to<br />
            <em>academic mastery.</em>
          </h2>
          <p>
            Engineered around key learning milestones: review core content, complete evaluations, verify results, and advance.
          </p>
        </div>
        <div className="home-feature-grid">
          {features.map(([title, desc, Icon], index) => (
            <article className="home-feature-card" key={title}>
              <span className="home-feature-number">0{index + 1}</span>
              <div className="home-feature-icon">
                <Icon size={20} />
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}