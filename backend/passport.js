//import { Strategy as JwtStrategy } from 'passport-jwt';
//import { ExtractJwt } from 'passport-jwt';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { User } from './Models.js';
import mongoose from 'mongoose';
import { jwt_secret } from './config.js';
import { Console } from 'console';

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret',
  };

passport.use(new JwtStrategy(options, function(jwt_payload, done) {
    User.findOne({_id: jwt_payload.id})
        .then(
            user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }
        )
        .catch(err => console.log(err));
}));

export default passport;