import { BrowserRouter } from "react-router-dom"
import AppRouter from "./components/AppRouter"
import Navbar from "./components/Navbar"
import UserStore from "./store/UserStore";
import { useEffect, useState } from "react";
export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    UserStore.check()
    .finally(() => {
      setLoading(false);
    })
  }, [])
  return (

    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  )
}