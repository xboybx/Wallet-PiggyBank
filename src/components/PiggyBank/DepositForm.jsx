import { useState } from 'react';
import { Calendar, Clock, DollarSign } from 'lucide-react';
import { validateDateTime } from '../../utils/dateUtils';

export default function DepositForm({ onDeposit }) {
  const [amount, setAmount] = useState('');
  const [lockDate, setLockDate] = useState('');
  const [lockTime, setLockTime] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [selectedLocks, setSelectedLocks] = useState([]);
  const [error, setError] = useState('');

  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || selectedLocks.length === 0) return;

    let lockUntil = new Date();
    setError('');

    if (selectedLocks.includes('date')) {
      if (!lockDate || !lockTime) {
        setError('Please select both date and time');
        return;
      }

      const selectedDateTime = new Date(`${lockDate}T${lockTime}`);
      if (selectedDateTime <= now) {
        setError('Please select a future date and time');
        return;
      }
      lockUntil = selectedDateTime;
    }

    if (selectedLocks.includes('timer')) {
      const hrs = Number(hours) || 0;
      const mins = Number(minutes) || 0;
      const secs = Number(seconds) || 0;
      const timerMs = (hrs * 60 * 60 * 1000) + (mins * 60 * 1000) + (secs * 1000);
      
      if (timerMs === 0) {
        setError('Timer duration must be greater than 0');
        return;
      }

      const timerDate = new Date(now.getTime() + timerMs);
      
      if (selectedLocks.includes('date')) {
        lockUntil = lockUntil > timerDate ? lockUntil : timerDate;
      } else {
        lockUntil = timerDate;
      }
    }

    onDeposit(
      Number(amount),
      lockUntil,
      selectedLocks.length === 2 ? 'timer' : selectedLocks[0],
      selectedLocks.includes('timer') ? {
        hours: Number(hours) || 0,
        minutes: Number(minutes) || 0,
        seconds: Number(seconds) || 0
      } : undefined
    );

    // Reset form
    setAmount('');
    setLockDate('');
    setLockTime('');
    setHours('');
    setMinutes('');
    setSeconds('');
    setSelectedLocks([]);
    setError('');
  };

  const toggleLockType = (type) => {
    setSelectedLocks(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setError('');
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setLockDate(newDate);
    
    if (lockTime && newDate) {
      if (!validateDateTime(newDate, lockTime)) {
        setError('Please select a future date and time');
      } else {
        setError('');
      }
    }
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    setLockTime(newTime);
    
    if (lockDate && newTime) {
      if (!validateDateTime(lockDate, newTime)) {
        setError('Please select a future date and time');
      } else {
        setError('');
      }
    }
  };

  const isTimerValid = selectedLocks.includes('timer') && 
    ((Number(hours) || 0) + (Number(minutes) || 0) + (Number(seconds) || 0)) > 0;
  const isDateValid = selectedLocks.includes('date') && 
    lockDate && lockTime && validateDateTime(lockDate, lockTime);
  const isFormValid = Number(amount) > 0 && (isTimerValid || isDateValid) && !error;

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
      <h3 className="text-2xl font-semibold mb-6 text-white">Make a New Deposit</h3>
      
      <div className="flex gap-4 mb-6">
        <button
          type="button"
          onClick={() => toggleLockType('date')}
          className={`glass-tab flex items-center gap-2 ${selectedLocks.includes('date') ? 'active' : ''}`}
        >
          <Calendar size={20} />
          Date & Time
        </button>
        <button
          type="button"
          onClick={() => toggleLockType('timer')}
          className={`glass-tab flex items-center gap-2 ${selectedLocks.includes('timer') ? 'active' : ''}`}
        >
          <Clock size={20} />
          Timer
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-200">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            className="glass-input pl-10"
            required
          />
        </div>

        {selectedLocks.includes('date') && (
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
              <input
                type="date"
                value={lockDate}
                onChange={handleDateChange}
                min={currentDate}
                className="glass-input pl-10"
                required
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" size={20} />
              <input
                type="time"
                value={lockTime}
                onChange={handleTimeChange}
                className="glass-input pl-10"
                required
              />
            </div>
          </div>
        )}

        {selectedLocks.includes('timer') && (
          <div className="grid grid-cols-3 gap-4">
            <div>
              <input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Hours"
                className="glass-input"
              />
              <span className="text-white/70 text-sm mt-1 block">Hours</span>
            </div>
            <div>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="Minutes"
                className="glass-input"
              />
              <span className="text-white/70 text-sm mt-1 block">Minutes</span>
            </div>
            <div>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                placeholder="Seconds"
                className="glass-input"
              />
              <span className="text-white/70 text-sm mt-1 block">Seconds</span>
            </div>
          </div>
        )}
      </div>

      <button 
        type="submit" 
        className={`glass-button w-full ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isFormValid}
      >
        Deposit
      </button>
    </form>
  );
}