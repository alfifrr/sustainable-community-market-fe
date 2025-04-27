export const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expTime;
  } catch (error) {
    return true;
  }
};

export const getTokenExpirationTime = (token: string): number => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000; // Convert to milliseconds
  } catch (error) {
    return 0;
  }
};
