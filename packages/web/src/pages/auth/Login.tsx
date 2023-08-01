import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import TextInput from "../../components/inputs/TextInput";
import { login } from "../../services/apiServices/authService";
import { LoginCred, useAppDispatch } from "../../types/User";
import loginAsync from "../../store/auth/methods/login";

const Login = () => {
  const dispatch = useAppDispatch();
  const [loginCredentials, setLoginCredentials] = useState<LoginCred>({
    email: "",
    password: "",
  });

  console.log(loginCredentials);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmithandler = async () => {
    const response = await dispatch(loginAsync(loginCredentials));

    console.log(response, "Nepal");
    //     if(response.success){
    // // useAppDispatch()
    //     }
  };

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await fetch("http://localhost:3000/api/message/23223");
    //     if (!response) {
    //       throw new Error("Network response was not ok");
    //     }
    //     const jsonData = await response;
    //     setData(jsonData);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center">
      <div className="w-sm  px-6 py-4 flex flex-col gap-4 rounded-md border border-1 border-gray-500 shadow-md text-black">
        <div className="text-2xl  font-bold">Login</div>
        <TextInput
          placeholder="Enter your Email"
          name="email"
          onChange={handleChange}
        />
        <TextInput
          placeholder="Enter Password"
          name="password"
          // type="password"
          onChange={handleChange}
        />
        <Button title="Login" onClick={onSubmithandler} />
      </div>
    </div>
  );
};

export default Login;
