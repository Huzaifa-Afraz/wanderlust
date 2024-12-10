// import React, { useState } from "react";
// import axios from "axios";
// import Flash from '../Flash'
// import { useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [message, Setmessage] = useState("");

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent form from submitting the traditional way

//     const userCredentials = {
//     //   username: username,
//     //   password: password,
//       username: username,
//       password: password,
//     };

//     try {
//       const response = await axios.post("http://localhost:8080/login", userCredentials, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
      
//       // Handle successful login
//       Setmessage(response.data.message)
//       console.log(response.data);  // Handle response, e.g., redirect or save token
//       localStorage.setItem("user", response.data.user.username)
//       localStorage.setItem("userid", response.data.user._id)
// navigate('/listings')
      

//     } catch (error) {
//       // Handle error
//       console.error("Login failed:", error);
//       setErrorMessage("Invalid username or password.");
//     }
//   };

//   return (
//     <div className="row mt-3">
//       <Flash success={message && message}/>
//       <Flash error={ errorMessage && errorMessage}/>
//       <h1 className="col-6 offset-3">Login</h1>
//       <div className="col-6 offset-3">
//         <form onSubmit={handleSubmit} className="needs-validation" noValidate>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">Username</label>
//             <input
//               id="username"
//               name="username"
//               type="text"
//               className="form-control"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">Password</label>
//             <input
//               id="password"
//               name="password"
//               type="password"
//               className="form-control"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           {errorMessage && <div className="text-danger">{errorMessage}</div>}
//           {message && <div className="text-success">{message}</div>}
//           <button type="submit" className="btn btn-success">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



import React, { useState } from "react";
import axios from "axios";
import Flash from '../Flash';
import { useNavigate } from "react-router-dom";
import Toast from "../Toast";
const LoginForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, Setmessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const userCredentials = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post("http://localhost:8080/api/users/login", userCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Handle successful login
      // Setmessage(response.data.message);
      // console.log(response.data);  // Handle response, e.g., redirect or save token

      // Save the user data and token in localStorage
      localStorage.setItem("user", response.data.user.email);
      localStorage.setItem("userid", response.data.user.id);
      localStorage.setItem("token", response.data.token); // Save the token for later use

      // Redirect to listings page
      navigate('/listings');
      // Toast(response.data.message, 'success', '/login')
    } catch (error) {
      // Handle error
      console.error("Login failed:", error);
      setErrorMessage(error.response?.data?.message || "Invalid username or password.");
    }
  };

  return (
    <div className="row mt-3">
      <Flash success={message && message} />
      <Flash error={errorMessage && errorMessage} />
      <h1 className="col-6 offset-3">Login</h1>
      <div className="col-6 offset-3">
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <div className="text-danger">{errorMessage}</div>}
          {message && <div className="text-success">{message}</div>}
          <button type="submit" className="btn btn-success">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

