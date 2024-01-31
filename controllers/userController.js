const asyncHandler = require("express-async-handler");
const brcypt =require("bcrypt");
const UserMogose = require("../model/userModel");
const jwt = require("jsonwebtoken");

const resigterUser = asyncHandler(async(req,res)=>{
    const {username ,email , password} = req.body;
    if(!username || !email || !password){
        res.status(404);
        throw new Error("không được để trống dữ liệu")
    }
    const userAvailable = await UserMogose.findOne({email});
    if(userAvailable){
        res.status(404);
        throw new Error("Email đã tồn tại");
    }
    const hashedPassword = await brcypt.hash(password,10);
    console.log(`Hashed password`,hashedPassword);
    const user = await UserMogose.create({
        username,
        email,
        password: hashedPassword
    });
    if(user){
        res.status(200).json({username:user.id , email: user.email});
    }else{
        res.status(404)
        throw new Error("dữ liệu người dùng không hợp lệ");
    }
    res.json({message: "đăng ký người dùng thành công"});
    
    
    res.status(200).json(createUser);
});
const loginUser = asyncHandler(async(req,res)=>{
    const {email ,password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Không được để trống dữu liệu");
    }
    const user = await UserMogose.findOne({email});
    if(user && (await brcypt.compare(password , user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"2m"}
        );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("email hoặc password không hợp lệ")
    }

});
const currentUser = asyncHandler(async(req,res)=>{
    res.json(req.body);
});
module.exports = {resigterUser,loginUser,currentUser}; 