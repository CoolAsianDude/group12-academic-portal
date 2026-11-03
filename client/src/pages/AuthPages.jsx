import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';


function Field({ label, required = true, ...props }) {
  return (
    <label className="auth-field-label">
      {label}
      <input {...props} className="auth-field" required={required} />
    </label>
  );
}


export function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const user = await login(form.email, form.password);
      nav(user.role === 'student' ? '/student/dashboard' : '/faculty/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthCard
      eyebrow="Secure access"
      title={
        <>
          Ready to proceed<br />
          <em>further?</em>
        </>
      }
      subtitle="Sign in to continue your portal learning journey."
    >
      <form className="auth-form" onSubmit={handleLogin}>
        <Field
          label="Institutional email"
          type="email"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
        />
        <Field
          label="Password"
          type="password"
          value={form.password}
          onChange={(event) => setForm({ ...form, password: event.target.value })}
        />
        {error && <p className="auth-error">{error}</p>}
        <button className="auth-submit" type="submit">
          Sign in <ArrowRight size={17} />
        </button>
      </form>
      <p className="auth-switch">
        New to the portal? <Link to="/register">Register access</Link>
      </p>
    </AuthCard>
  );
}


export function Register() {
  const nav = useNavigate();
  const [form, setForm] = useState({ role: 'student' });
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const set = (key, value) => setForm({ ...form, [key]: value });

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => body.append(key, value || ''));
      if (image) body.append('profileImage', image);
      
      await api('/auth/register', { method: 'POST', body });
      nav('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthCard
      eyebrow="Account registration"
      title={
        <>
          Begin your<br />
          <em>journey.</em>
        </>
      }
      subtitle="Create your profile to access your designated portal space."
    >
      <form className="auth-form register-form" onSubmit={handleRegister}>
        <div className="auth-role-toggle">
          <button
            type="button"
            className={form.role === 'student' ? 'active' : ''}
            onClick={() => set('role', 'student')}
          >
            Student Portal
          </button>
          <button
            type="button"
            className={form.role === 'faculty' ? 'active' : ''}
            onClick={() => set('role', 'faculty')}
          >
            Faculty Portal
          </button>
        </div>

        <Field
          label="Full name"
          value={form.fullName || ''}
          onChange={(event) => set('fullName', event.target.value)}
        />
        <Field
          label="Institutional email"
          type="email"
          value={form.email || ''}
          onChange={(event) => set('email', event.target.value)}
        />
        <Field
          label="Password"
          type="password"
          value={form.password || ''}
          onChange={(event) => set('password', event.target.value)}
        />

        {form.role === 'student' ? (
          <div className="auth-two-fields">
            <Field
              label="Year level"
              value={form.yearLevel || ''}
              onChange={(event) => set('yearLevel', event.target.value)}
            />
            <Field
              label="Section"
              value={form.section || ''}
              onChange={(event) => set('section', event.target.value)}
            />
          </div>
        ) : (
          <Field
            label="Department"
            value={form.department || ''}
            onChange={(event) => set('department', event.target.value)}
          />
        )}

        <Field
          label="Profile image (optional)"
          type="file"
          accept="image/*"
          required={false}
          onChange={(event) => setImage(event.target.files?.[0] || null)}
        />

        {error && <p className="auth-error">{error}</p>}
        
        <button className="auth-submit" type="submit">
          Register access <ArrowRight size={17} />
        </button>
      </form>
      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthCard>
  );
}

function AuthCard({ eyebrow, title, subtitle, children }) {
  return (
    <main className="auth-page">
      <section className="auth-shell">
        <div className="auth-visual">
          <div className="auth-visual-top">
            <span className="auth-logo">
              <GraduationCap size={19} />
            </span>
            <b>ACADEMIA PORTAL</b>
          </div>
          <div className="auth-visual-copy">
            <span className="auth-overline">
              <Sparkles size={13} /> Secure Authentication
            </span>
            <h2>
              Advance goals.<br />
              <em>Build mastery.</em>
            </h2>
            <p>
              A unified academic environment empowering students and faculty through structured course evaluation.
            </p>
          </div>
          
          {/* Replaced illustration with a sleek luxury badge card */}
          <div className="auth-visual-art">
            <div className="my-6 rounded-none border border-[#333] bg-[#0d0d0d] p-8 text-center shadow-2xl">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-[#c5a059] bg-black text-[#c5a059]">
                <ShieldCheck size={32} />
              </div>
              <h4 className="mt-4 font-serif text-sm font-normal uppercase tracking-widest text-white">
                ENCRYPTED PORTAL ACCESS
              </h4>
              <p className="mt-2 text-[11px] font-light uppercase tracking-wider text-white/40">
                VERIFIED CREDENTIAL PROTOCOL
              </p>
            </div>
            <span className="auth-float-card">
              <ShieldCheck size={16} /> Progress verified
            </span>
          </div>

          <div className="auth-visual-footer">
            <span>01</span>
            <i />
            <span>6 core modules · unified ecosystem</span>
          </div>
        </div>
        
        <div className="auth-form-panel">
          <div className="auth-form-heading">
            <span className="auth-overline dark">{eyebrow}</span>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {children}
        </div>
      </section>
    </main>
  );
}