import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Conversor from "./Conversor";

function App() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [logueado, setLogueado] = useState(false);

  async function ingresar() {
    const peticion = await fetch(
      "http://localhost:3000/login?usuario=" + usuario + "&clave=" + clave,
      { credentials: "include" }
    );
    if (peticion.ok) {
      setLogueado(true);
    } else {
      alert("error de ingreso");
    }
    //if (usuario == "admin" && clave == "1234") {
    // alert("sesion iniciada");
    //  setLogueado(true);
    // } else {
    //  alert("error de ingreso");
    // }
  }

  async function validar(){
    const peticion = await fetch(
      "http://localhost:3000/validar", { credentials: "include" });
    if (peticion.ok) {
      setLogueado(true);
    } else {
      alert("error de ingreso");
    }
  }

  useEffect(() => {
    validar();
  }, []);

  if (logueado) {
    return <Conversor />;
  }
  return (
    <>
      <h1>Inicio de Sesion</h1>
      <input
        type="text"
        name="usuario"
        placeholder="Usuario"
        value={usuario}
        onChange={(cambiarUsuario) => setUsuario(cambiarUsuario.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        name="clave"
        placeholder="Contraseña"
        value={clave}
        onChange={(cambiarClave) => setClave(cambiarClave.target.value)}
      />{" "}
      <br />
      <button onClick={ingresar}> Ingresar </button>
    </>
  );
}

export default App;
