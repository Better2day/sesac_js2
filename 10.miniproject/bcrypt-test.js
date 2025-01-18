import path from 'path';
import express from 'express';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

const app = express();

/* 
try {
  const hash = await bcrypt.hash(toString('abc'), SALT_ROUNDS);
  console.log('hash:', hash);
} catch (error) {
  console.log(error);
};
 */
/* 
let cnt = 0;
const interval = setInterval(() => {
  cnt++;
  console.log('cnt:', cnt);
  if (cnt > 10) {
    clearInterval(interval);
    }
    }, 1000);
    */
const hash = await bcrypt.hash('testtest', 17);
console.log('hash:', hash);

console.log('28번째 줄. routing 직전');

app.get('/', (req, res) => {
  res.send('/');
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000`);
});

console.log('38번째 줄. listen 직후, bcrypt.hashSync 직전');

