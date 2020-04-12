import tokenService from '../services/token';

//* se otorga acceso dependiente de su rol
export default {
    verifyUser: async (req,res,next)=>{
        if(!req.headers.token){
            return res.status(404).send({message:'No token found'});
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 1 || response.rol == 2 || response.rol == 3){
            next();
        }else{
            return res.status(403).send({message:'Not authorized'});
        }
    },
    verifyAdmin: async (req,res,next)=>{
        if(!req.headers.token){
            return res.status(404).send({message:'No token found'})
        }
        const response = await tokenService.decode(req.headers.token)
        if(response.rol == 1){
            next();
        }else{
            return res.status(403).send({message:'Not athorized'});
        }
    },
    verifyEncargado: async (req,res,next)=>{
        if(!req.headers.token){
            return res.status(404).send({message:'No token found'});
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 1 || response.rol == 2){
            next();
        }else{
            return res.status(403).send({message:'Not authorized'});
        }
    },
    verifyVendedor: async (req,res,next)=>{
        if(!req.headers.token){
            return res.status(404).send({message:'No token found'});
        }
        const response = await tokenService.decode(req.headers.token);
        if(response.rol == 1 || response.rol == 3){
            next();
        }else{
            return res.status(403).send({message:'Not authorized'});
        }
    },
}
// roles por numero
//! ADMIN: 1, ENCARGADO: 2, VENDEDOR: 3, USUARIO: 4