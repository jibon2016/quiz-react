import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm (){

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState("");

  const [error, setError] = useState();
  const [loading, setLoding] = useState();

  const {signup} = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();
    
    //Validation
    if (password !== confirmPassword) {
      return setError("Passwords don't match");
    }

    try {
      setError("");
      setLoding(true);
      await signup(email, password, userName);
      navigate('/');
    } catch (error) {
      console.log(error);
      setLoding(false);
      setError("Faild to Create an account!");
    }
  }

  return (
    <Form style={{height: "500px"}} onSubmit={handleSubmit}>
      <TextInput type="text" placeholder="Enter Name" icon="person" required value={userName} onChange={(e) => setUserName(e.target.value)} />

      <TextInput type="text" placeholder="Enter Email" icon="alternate_email" required value={email} onChange={(e) => setEmail(e.target.value)} />

      <TextInput type="password" placeholder="Enter Password" icon="lock" required value={password} onChange={(e) => setPassword(e.target.value)} />

      <TextInput type="password" placeholder="Confirm Password" icon="lock_clock" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

      <Checkbox text="I agree to the Terms & Conditions" required value={agree} onChange={(e) => setAgree(e.target.value)} />

      <Button type="submit" disabled={loading} ><span>Submit Now</span></Button>

      {error && <p className="error">{error}</p>}
      
      <div className="info">
          Already have an account? <Link to="/login">Login</Link> instead.
        </div>
    </Form>
  );
}