import express from 'express';

import passport from 'passport';
import authRoutes from './authenticate/auth';

const app = express();

app.use(express.json());
app.use(passport.initialize());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server is running. Go to /auth/google to login.');
});

app.listen(3000, () => console.log('Server started on port 3000'));
