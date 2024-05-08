import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

export const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const {storeTokenInLS} = useAuth();
  // storeTokenInLS(res_data.token);

  // let handle the input field value
  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

// handle form on submit
const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {

      const response = await fetch("http://localhost:5000/api/auth/login",{

        method:"POST", 
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
    });
        console.log("login form",response);
        

        if(response.ok){
          alert("Login Successful");
          const res_data = await response.json();
          storeTokenInLS(res_data.token);
          // localStorage.setItem("token ",res_data.token)

          navigate("/");
          setUser({email:"", password:""});
        }else{
          alert("Invalid credential");
          console.log("Invalid credential");
        }
      
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image reg-img">
                <img
                  src="/images/register.png"
                  alt="a nurse with a cute look"
                  width="400"
                  height="500"
                />
              </div>
              {/* our main registration code  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">Login form</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="email"
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="password"
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};