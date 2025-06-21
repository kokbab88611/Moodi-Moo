import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import dotenv from 'dotenv';
import {findUserByID} from '../../database/db';

dotenv.config();

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret',
    // issuer: 'accounts.examplesoft.com',
    // audience: 'yoursite.net'
};

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try{
        const user = await findUserByID(jwt_payload.sub)
        if(user){
            return(done(null, user));
        } else {
            return done(null, false);
        }
    } catch(err) {
        return done(err, false);
    }
}));

