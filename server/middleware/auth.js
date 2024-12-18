const jwt = require('jsonwebtoken');

const verifyToken =(req,res,next)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    
    if(!token){
        return res.status(401).json({message:'No token provided'});
    }
    jwt.verify(token,'my_token',(err,decode)=>{
        if(err){

            if(err.name === 'TokenExpiredError'){
                return res.status(401).json({message:'Token expired,please log in again'});
            }
            console.log('Token verification error',err);
            return res.status(401).json({message:'Unauthorized'});
            
        }
        console.log("Decode Token:",decode);
        
        req.user={
            id:decode.id,
            role:decode.role,
            permissions:decode.permissions || [],
        
        };
        next();
    });
};



const checkPermission = (requiredPermission)=>{
    return(req,res,next)=>{
        const userPermissions = req.user.permissions || [];
    
       //check if the user has the required permissions
       console.log(req.user); 

       const hasPermission = userPermissions.some(menu => {
        // Check if the menu is active
        if (menu.status) {
            return menu.pages.some(page => 
                page.permissions.includes(requiredPermission) || 
                page.submenus.some(submenu => submenu.permissions.includes(requiredPermission))
            );
        }
        return false;
    });

       if(!hasPermission){
        return res.status(403).json({message :'you do not have permission'});
       }

       next();
    }
};

const authenticate = (req,res,next)=>{
    const token =req.cookies.token;
    const menutoken =req.cookies.token;

    console.log("cookietoken",token);
    console.log("cookietoken",menutoken);

    if(!token){
        return res.status(401).json({message:"token is not provied."})
    }
    
    if(!menutoken){
        return res.status(401).json({message:"Menutoken is not provied."})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        console.log("User decode",decoded)

        const menudecoded=jwt.verify(menutoken,process.env.JWT_SECRET);
        req.menus=menudecoded.menus;
        console.log("Menu Decoded",menudecoded);
        
        next();
    }catch(error){
        return res.status(401).json({message:"Invalid token."});
    }

}
module.exports={verifyToken,checkPermission,authenticate};