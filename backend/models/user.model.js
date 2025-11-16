import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,   
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    repositories:[
        {
        default:[],
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Repository'
        }],
    followedUsers:[
        {
            default:[],
            type: mongoose.Schema.Types.ObjectId,
             ref: 'User'
            }],
    starRepos:[{
        default:[],
        type: mongoose.Schema.Types.ObjectId,
         ref: 'Repository'
        }],
    
},
{timestamps: true}
);

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt= await bcrypt.genSalt(10);
        this.password= await bcrypt.hash(this.password, salt);
        next();
    }catch(err){
        return next(err);
    }
})

UserSchema.methods.comparePassword= async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};


const User = mongoose.model('User', UserSchema);





export default User;