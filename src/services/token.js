import jwt from 'jsonwebtoken'
import models from '../models'

//* Le doy un token nuevo si ya tuvo un token valido antes
async function checkToken(token){
    let __id = null;
    try{
        const {_id} = await jwt.decode(token);
        __id = _id;
    }catch(e){
        return false
    }
    //* compruebo de que el usuario no este dado de baja en el sistema
    const user = await models.User.findOne({_id:__id,estado:1});
    if(user){
        const token = jwt.sign({_id:__id},'secretkey',{expiresIn:'1d'});
        return {token,rol:user.rol};
    }else{
        return false;
    }
}

//* genero el token
export default {
    encode: async (_id) =>{
        const token = jwt.sign({_id:_id},'secretkey',{expiresIn:'1d'});
        return token;
    },
    decode: async (token) =>{
        try{
            const {_id} = await jwt.verify(token,'secretkey');
            const user = await models.User.findOne({_id,state:1});
            if(user){
                return user;
            }else{
                return false;
            }
        }catch(e){
            const newToken = await checkToken(token);
            return newToken;
        }
    }
}