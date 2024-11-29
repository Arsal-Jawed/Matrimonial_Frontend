import { Routes, Route } from "react-router-dom";
import {Home,Signup,MakeProfile,Main,ChatPage,City,Location,Forget,History,Image,UpdateProfile,LoveGuru} from './Pages';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="makeprofile" element={<MakeProfile/>}/>
        <Route path="main" element={<Main/>}/>
        <Route path="chat" element={<ChatPage/>}/>
        <Route path="city" element={<City/>}/>
        <Route path="location" element={<Location/>}/>
        <Route path="/forget" element={<Forget/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="images" element={<Image/>}/>
        <Route path="updateProfile" element={<UpdateProfile/>}/>
        <Route path="loveGuru" element={<LoveGuru/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
