// Import components into App
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      {/* Navigation component, we will build this later, then paste it here =) */}
      <Outlet />
    </>
  );
}

function AuthLayout(){
  return <Outlet/>
}

function App() {
  return (
    <BrowserRouter>
      <h1>Hello from App.jsx</h1>
      <Routes>
        <Route element = {<AuthLayout/>}>
          {/* Routes for auth feature, include login, register, etc... */}
        </Route>

        <Route element = {<MainLayout/>}>
          {/* Routes for main features of project =D */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
