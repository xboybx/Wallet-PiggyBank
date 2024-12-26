export const validateDateTime = (date, time) => {
  const selectedDateTime = new Date(`${date}T${time}`);
  return selectedDateTime > new Date();
};

export const isDateLocked = (date) => {
  return new Date() < new Date(date);
};

export const formatTimeLeft = (lockUntil) => {
  const now = new Date();
  const diff = new Date(lockUntil).getTime() - now.getTime();
  if (diff <= 0) return 'Unlocked';

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);
  
  return parts.length > 0 ? `${parts.join(' ')} remaining` : 'Unlocked';
};