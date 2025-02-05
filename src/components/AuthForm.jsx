import { useState } from 'react';
import { KeyRound, Mail, User } from 'lucide-react';

export default function AuthForm({ onSubmit, isLogin = false }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, password, !isLogin ? name : undefined);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md ">
      {!isLogin && (
        <div className="relative">
          <h3>Username</h3>
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="glass-input pl-10"
            required
          />
        </div>
      )}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
        <h3 className='font-semibold'>Email</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="glass-input pl-10"
          required
        />
      </div>
      <div className="relative">
        <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
        <h3 className='font-semibold'>Password</h3>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="glass-input pl-10"
          required
        />
      </div>
      <button type="submit" className="glass-button w-full">
        {isLogin ? 'Login' : 'Sign Up'}
      </button>
    </form>
  );
}