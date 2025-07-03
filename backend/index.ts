import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoutes from './authenticate/auth';
import cookieParser from 'cookie-parser';
import moodRoutes from './apis/mood';

const app = express();

app.use(cors({
  origin: 'https://ominous-goggles-g5wrvrxwxx63vxgr-5173.app.github.dev',  // your frontend origin
  credentials: true
}));

app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/mood', moodRoutes);

app.get('/', (req, res) => {
  res.send('Server is running. Go to /auth/google to login.');
});

app.listen(3000, () => console.log('Server started on port 3000'));
