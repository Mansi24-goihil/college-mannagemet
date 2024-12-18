require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const PermissionRouter =require('./routes/permission');
const RoleRouter =require('./routes/role');
const UserRoute = require('./routes/user');
const AdminRoute = require('./routes/admin');
const M_PermisisonRoute = require('./routes/m_permission');
const cookieParser = require('cookie-parser');
const { authenticate } = require('./middleware/auth');



// express use to bulit web and mobile application,
// handle Http request , routing ,middleware integration
// Routes (GET,POST,DELETE,PUT)

const app = express();
const PORT =process.env.PORT || 5000;

app.use(cookieParser());

//cors = safely handle cross domain requests.(http://example.com)

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true,
}));//enable cors for all routes

app.use(express.json());//middleware that handle the request,processdata (authentication ,logging)

app.get('/protected-route', authenticate, (req, res) => {
    // This route is protected, only accessible by authenticated users
    res.status(200).json({ message: 'You have access to this protected route!' });
  });
  

mongoose.connect(process.env.MONGODB_URL,{ 
    useNewUrlParser:true,//handle MongoDB connection URl 
    useUnifiedTopology:true//how mongoose connects and mananges MongoDB
})


// mongoose.connect("mongodb+srv://gohilmansi523:123@test-project.bact4.mongodb.net/?retryWrites=true&w=majority&appName=Test-project")
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err));

app.use('/permission',PermissionRouter);
app.use('/role',RoleRouter);
app.use('/user',UserRoute);
app.use('/admin',AdminRoute);
app.use('/m_permission',M_PermisisonRoute);




app.listen(PORT,()=>{
    console.log(`Server running on PORT::${PORT}`);
    
});