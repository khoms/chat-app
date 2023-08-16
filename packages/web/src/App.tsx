import "./App.css";
import MainRoute from "./navigation/MainRoute";
import useCurrentUser from "./hooks/useCurrentUser";
import AuthRoute from "./navigation/AuthRoute";


const Main = () => {
  const { user, userId, loading } = useCurrentUser();

  console.log(loading);
  if (loading) {
    return <div className="flex justify-center items-center">Loading....</div>;
  }
  // const user = undefined;

  if (user) {
    return <MainRoute />;
  }

  return <AuthRoute />;
};

function App() {
  return <Main />;
}
export default App;
