const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const userMethods = require('../methods/user')
const cellMethods = require('../methods/cell')
const peopleMethods = require('../methods/people')
const bcrypt = require('bcrypt')

passport.use('user_local',new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
    },
    (username,password,cb) => {
        return userMethods.findUserByUsername({'username':username})
            .then((user) => {
                if(!user){
                    return cb(null, false, {
                        message: 'no such username'
                    })
                }
                else{
                    console.log(password);
                    console.log(user.password);
                    
                    bcrypt.compare(password, user.password)
                    .then((res) => {
                        if(!res){
                            return cb(null, false, {
                                message: 'incorrect password'
                            })
                        }
                        else{
                            return cb(null, user, {message: 'Logged In Successfully'});
                        }
                    })
                    .catch((err) => {
                        console.log("Inside passport local strategy\nError caught in bcrypt \n"+err.stack);
                        
                    })
                }
            })
            .catch((err) => {
                console.log("Inside passport local strategy\nError caught  in get user \n"+err);
                
            })
    }
))

passport.use('cell_login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    (username,password,cb) => {
        return cellMethods.getUserByUsername({'username': username})
            .then((cell) => {
                if(!cell){
                    return cb(null, false, {
                        message: 'no such username'
                    })
                }
                else{
                    console.log(password)
                    console.log(cell.password)

                    bcrypt.compare(password, cell.password)
                    .then((res) => {
                        if(!res){
                            return cb(null, false, {
                                message: 'incorrect password'
                            })
                        }
                        else{
                            return cb(null, cell, {message: 'Logged In Successfully'});
                        }
                    })
                    .catch((err) => {
                        console.log("Inside passport local strategy\nError caught in bcrypt \n"+err.stack);
                    })
                    
                    
                }
            })
            .catch((err) => {
                console.log("Inside passport local strategy\nError caught  in get user \n"+err);  
            })
    }
))

passport.use('user_auth',new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'poda_albine_and_akhile_and_bilale'
    },
    function(jwtPayload, cb){
        console.log(jwtPayload);


        return userMethods.findUserByUsername({username: jwtPayload.user_name})
            .then((user) => {
                return cb(null, user)
            })
            .catch((err) => {
                return cb(err)
            })           
        
    }
))

passport.use('cell_auth',new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'poda_albine_and_akhile_and_bilale'
    },
    function(jwtPayload, cb){
        console.log(jwtPayload);
        return cellMethods.getUserByUsername({username: jwtPayload.user_name})
                .then((user) => {
                    return cb(null, user)
                })
                .catch((err) => {
                    return cb(err)
                })
       
        
    }
))

passport.use('admin_auth',new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'poda_albine_and_akhile_and_bilale'
    },
    function(jwtPayload, cb){
        console.log(jwtPayload);
        return cellMethods.getUserByUsername({username: jwtPayload.user_name})
                .then((user) => {
                    peopleMethods.getPeopleByID({
                        people_id: user.people_id
                    })
                    .then((ppl) => {
                        if(ppl.role == "admin")
                            return cb(null, user)
                        else
                            return cb(new Error("Not an admin"))
                    })
                    .catch((err) => {
                        return cb(err)
                    })
                })
                .catch((err) => {
                    return cb(err)
                })
       
        
    }
))

