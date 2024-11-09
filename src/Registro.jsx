import { useEffect, useState } from "react";
import "./App.css";

function Registro({recargarApp}) {
  const [usuarioRegistro, setUsuarioRegistro] = useState("");
  const [claveRegistro, setClaveRegistro] = useState("");

  async function registrar() {
    const peticion = await fetch(
      "http://localhost:3000/registro?usuario=" +
        usuarioRegistro +
        "&clave=" +
        claveRegistro,
      { credentials: "include" }
    );
    if (peticion.ok) {
      alert("Usuario registrado");
      recargarApp();
    } else {
      alert("error de Registro");
    }
  }

  useEffect(() => {}, []);

  return (
    <>
      <h1>Registro</h1>
      <input
        type="text"
        name="usuario"
        placeholder="Usuario"
        value={usuarioRegistro}
        onChange={(cambiarUsuarioRegistro) =>
          setUsuarioRegistro(cambiarUsuarioRegistro.target.value)
        }
      />{" "}
      <br />
      <input
        type="password"
        name="clave"
        placeholder="Contraseña"
        value={claveRegistro}
        onChange={(cambiarClaveRegistro) =>
          setClaveRegistro(cambiarClaveRegistro.target.value)
        }
      />
      <button onClick={registrar}> Registro </button>
    </>
  );
}

export default Registro;
