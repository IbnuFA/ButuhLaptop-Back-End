import argon2 from 'argon2';

(async () => {
  const hash = await argon2.hash("123");
  return hash;
})().then(console.log);