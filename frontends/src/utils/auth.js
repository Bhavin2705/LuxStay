export const generateToken = (user) => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = btoa(JSON.stringify({ ...user, exp: Date.now() + 86400000 }));
  const signature = btoa(`${header}.${payload}.secret`);
  return `${header}.${payload}.${signature}`;
};
export const verifyToken = (token) => {
  try {
    if (!token) return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
};
export const isAdmin = (user) => user?.role === 'admin';
