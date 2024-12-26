import { Lock, Unlock } from 'lucide-react';
import { formatTimeLeft, isDateLocked } from '../../utils/dateUtils';

export default function DepositList({ deposits, onWithdraw }) {
  return (
    <div className="glass-card p-8">
      <h3 className="text-2xl font-semibold mb-6 text-white">Your Deposits</h3>
      <div className="space-y-4">
        {deposits.map((deposit) => (
          <div
            key={deposit.id}
            className="glass p-6 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              {isDateLocked(deposit.lockUntil) ? (
                <Lock className="text-white/90" size={24} />
              ) : (
                <Unlock className="text-white/90" size={24} />
              )}
              <div>
                <p className="text-lg font-medium text-white">${deposit.amount.toFixed(2)}</p>
                <p className="text-sm text-white/70">
                  {deposit.lockType === 'timer' ? (
                    formatTimeLeft(deposit.lockUntil)
                  ) : (
                    `Locked until: ${new Date(deposit.lockUntil).toLocaleString()}`
                  )}
                </p>
              </div>
            </div>
            <button
              onClick={() => onWithdraw(deposit.id)}
              disabled={isDateLocked(deposit.lockUntil)}
              className={`glass-button ${
                isDateLocked(deposit.lockUntil)
                  ? 'opacity-50 cursor-not-allowed'
                  : ''
              }`}
            >
              Withdraw
            </button>
          </div>
        ))}
        {deposits.length === 0 && (
          <p className="text-center text-white/70 py-6">No deposits yet. Start saving!</p>
        )}
      </div>
    </div>
  );
}