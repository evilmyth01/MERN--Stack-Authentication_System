import {asyncHandler} from '../utils/asyncHandler.js';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';

const registerUser = asyncHandler( async(req,res)=>{
    // extract info
    // check if username or password is empty
    // check if username already exists
    // create user
    // send response
    console.log(req.body)
    const {userName, password} = req.body;

    if(!userName){
        throw new ApiError(400, "username or password cannot be empty")
    }
    if(!password){
        throw new ApiError(400, "username or password cannot be empty")
    }

    const existedUser = await User.findOne({userName})
    if(existedUser){
        throw new ApiError(400, "username already exists")
    }

    const user = await User.create({userName, password})

    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser){
        throw new ApiError(500, "something went wrong")
    }

    res.status(201).json(new ApiResponse(201,createdUser, "user created successfully"))
    
})

const loginUser = asyncHandler(async (req,res)=>{
    //extract info
    // check if username or password is empty
    // check if username exists
    // check if password is correct
    // send response

    const {userName, password} = req.body;
    if(!userName){
        throw new ApiError(400, "username or password cannot be empty")
    }
    if(!password){
        throw new ApiError(400, "username or password cannot be empty")
    }

    const user = await User.findOne({userName})
    if(!user){
        throw new ApiError(400, "username or password is incorrect")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(400, "password is incorrect")
    }

    const accessToken= await user.generateAccessToken()

    user.accessToken = accessToken
    await user.save({validateBeforeSave:false});

    const createdUser = await User.findById(user._id).select("-password")
    if(!createdUser){
        throw new ApiError(500, "something went wrong")
    }

    const options={
        httpOnly:true,
        secure:true,
    }

    console.log("access token in login",accessToken)

    res.status(200)
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200,{user:createdUser,accessToken}, "user logged in successfully"))

})

const logoutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                accessToken:1,
            }
        },
        {
            new:true,
        }
    )
    const options={
        httpOnly:true,
        secure:true,
    }

    res.status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200,{}, "user logged out successfully"))
})

export {
    registerUser,
    loginUser,
    logoutUser,
}