const login_post = (req, res)=>{
    res.send('new login');
};
const signup_post = (req, res)=>{
    res.send('new signup');
};

module.exports=({
    login_post,
    signup_post
});