// Importation de mongoose
import mongoose from 'mongoose'
// Importation de bcrypt qui sert a crypter le mot de passe
import bcrypt from 'bcrypt'

// contruction d'un schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }

})


// Pre Hook - Avant d'enregistrer dans Mongo

UserSchema.pre('save', async function (next) {
    //renomme le this en user
    const user = this

    //generation du mot de passe pour le hashage
    const hash = await bcrypt.hash(user.password, 10)

    // Utilise le password en hash
    user.password = hash

    // suivant
    next()
})

// Ajouter une méthode pour verifier le password

// on verifie si mot de passe valide
    UserSchema.methods.isValisPassword = async function (password) {
    //this en user
    const user = this

    //compare le mot de pass avec l'utilisateur
    const isSame = await bcrypt.compare(password, user.password)

    // retourne vrai ou faut pour le mot de pass
    return isSame
}

// fin


//creation du modele pour la base de donnee
const UserModel = mongoose.model('User', UserSchema)

export default UserModel