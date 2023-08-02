import { ChangeEvent, useState } from "react";
import Button from "../../components/button/Button";
import TextInput from "../../components/inputs/TextInput";
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

  return (
    <div className="h-[100vh] flex items-center justify-center bg-[url('https://img.freepik.com/free-vector/blue-curve-background_53876-113112.jpg')] bg-no-repeat bg-cover">
      <div className="w-[340px]    px-6 py-16 flex flex-col gap-4 rounded-md  shadow-xl bg-slate-50 text-black">
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
