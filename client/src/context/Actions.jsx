export const LoginStart=(usercredentials)=>({
    type:"LOGIN_START"
});

export const LoginSuccess=(user)=>({
    type:"LOGIN_SUCCESS",
    payload:user
});

export const LoginFailure=()=>({
    type:"LOGIN_FAILURE"
});

export const logout=()=>({
    type:"LOGOUT"
});

export const PostSuccess=(post)=>({
    type:"POST_SUCCESS",
    payload:post
});

export const UpdateStart=(usercredentials)=>({
    type:"UPDATE_START"
});

export const UpdateSuccess=(user)=>({
    type:"UPDATE_SUCCESS",
    payload:user
});

export const UpdateFailure=()=>({
    type:"UPDATE_FAILURE"
});

