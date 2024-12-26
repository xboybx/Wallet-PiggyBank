import DepositForm from './DepositForm';
import DepositList from './DepositList';

export default function PiggyBank({ balance, deposits, onDeposit, onWithdraw }) {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      <div className="glass-card p-8">
        <h2 className="text-4xl font-bold mb-4 text-white">Your Digital Piggy Bank</h2>
        <div className="text-3xl text-white/90">
          Total Balance: ${balance.toFixed(2)}
        </div>
      </div>

      <DepositForm onDeposit={onDeposit} />
      <DepositList deposits={deposits} onWithdraw={onWithdraw} />
    </div>
  );
}