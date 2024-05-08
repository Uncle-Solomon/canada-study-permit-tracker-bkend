export const generateSecretKey = (username: string, email: string): string => {
  // Generate a random string of 7 characters
  const characters = `${username}abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789${email}`;
  let secretKey = "";
  for (let i = 0; i < 7; i++) {
    secretKey += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return secretKey;
};
