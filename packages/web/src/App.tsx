import "./App.css";
import MainRoute from "./navigation/MainRoute";
import useCurrentUser from "./hooks/useCurrentUser";
import AuthRoute from "./navigation/AuthRoute";

function App() {
  const { user } = useCurrentUser();

  return (
    <>
      {user ? (
        <>
          <MainRoute />
        </>
      ) : (
        <>
          <AuthRoute />
        </>
      )}
    </>
  );
}
export default App;
