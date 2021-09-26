import LocalStrategy from "passport-local"
import bcrypt from "bcrypt"

const localStrategy = LocalStrategy.Strategy

function initialize(passport:any, getUserByEmail:any, getUserById:any) {
    const authenticateUser = async (email:any, password:any, done:any) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'Por favor, reveja os campos. Email não encontrado.' })
        }

        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Senha incorreta.' })
            }
        } catch (e) {
            return done(e)
        }
    }

    passport.use(new localStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user:any, done:any) => done(null, user.id))
    passport.deserializeUser((id:any, done:any) => {
        return done(null, getUserById(id))
    })
}

export = initialize