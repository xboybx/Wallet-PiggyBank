import { useState } from 'react';
import { PiggyBank as PiggyBankIcon } from 'lucide-react';
import AuthForm from './components/AuthForm';
import PiggyBank from './components/PiggyBank';

function App() {
  const [user, setUser] = useState(null);
  const [wallet, setWallet] = useState({ balance: 0, deposits: [] });
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = (email, password, name) => {
    setUser({
      id: Math.random().toString(),
      email,
      name: name || email.split('@')[0],
    });
  };

  const handleDeposit = (amount, lockUntil, lockType, duration) => {
    const newDeposit = {
      id: Math.random().toString(),
      amount,
      lockUntil,
      createdAt: new Date(),
      lockType,
      duration,
    };

    setWallet(prev => ({
      balance: prev.balance + amount,
      deposits: [...prev.deposits, newDeposit],
    }));
  };

  const handleWithdraw = (depositId) => {
    setWallet(prev => {
      const deposit = prev.deposits.find(d => d.id === depositId);
      if (!deposit || new Date() < deposit.lockUntil) return prev;

      return {
        balance: prev.balance - deposit.amount,
        deposits: prev.deposits.filter(d => d.id !== depositId),
      };
    });
  };

  return (
    <div className="min-h-screen relative ">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="twinkle" />
      ))}

      <nav className="glass border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PiggyBankIcon className="text-white" size={36} />
              <span className="text-3xl font-bold text-white">E-Piggy Bank</span>
            </div>
            {user && (
              <div className="flex items-center space-x-6">
                <span className="text-white/90">Welcome, {user.name}!</span>
                <button
                  onClick={() => setUser(null)}
                  className="glass-button-alt"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        {!user ? (
          <div className="max-w-md mx-auto glass-card p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-white">
              {isLogin ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <AuthForm onSubmit={handleAuth} isLogin={isLogin} />
            <p className="text-center mt-6 text-white/90">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-white hover:text-white/80 font-medium"
              >
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>
        ) : (
          <PiggyBank
            balance={wallet.balance}
            deposits={wallet.deposits}
            onDeposit={handleDeposit}
            onWithdraw={handleWithdraw}
          />
        )}
      </main>
    </div>
  );
}

export default App;