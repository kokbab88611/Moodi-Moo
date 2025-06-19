import express from 'express';

import passport from 'passport';
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);

app.listen(3000, () => console.log('Server started on port 3000'));
