import { useEffect, useState } from "react";
import "./App.css";
import Conversor from "./Conversor";
import Usuarios from "./Usuarios";
import Registro from "./Registro";

function App() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [logueado, setLogueado] = useState(false);
  const [recargar, setRecargar] = useState(false);

  function recargarApp() {
    setRecargar(!recargar);
  }

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
  }

  async function validar() {
    const peticion = await fetch("http://localhost:3000/validar", {
      credentials: "include",
    });
    if (peticion.ok) {
      setLogueado(true);
    }
  }

  useEffect(() => {
    validar();
  }, []);

  if (logueado) {
    return (
      <>
        <Registro recargarApp={recargarApp} />
        <Conversor />
        <Usuarios recargar={recargar} />
      </>
    );
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
