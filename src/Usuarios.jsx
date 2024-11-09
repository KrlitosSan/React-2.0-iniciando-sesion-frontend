import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function Usuarios({ recargar }) {
  const [usuarios, setUsuarios] = useState([]);

  async function obtenerUsuarios() {
    const peticion = await fetch("http://localhost:3000/usuarios", {
      credentials: "include",
    });
    if (peticion.ok) {
      const respuesta = await peticion.json();
      setUsuarios(respuesta);
    }
  }

  async function eliminarUsuario(id) {
    const peticion = await fetch("http://localhost:3000/usuarios?id=" + id, {
      credentials: "include",
      method: "DELETE",
    });
    if (peticion.ok) {
      obtenerUsuarios();
    }
  }

  useEffect(() => {
    obtenerUsuarios();
  }, [recargar]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Usuario</th>
            <th>clave</th>
            <th>acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.usuario}</td>
              <td>{usuario.clave}</td>
              <td>
                <button
                  onClick={() => {
                    eliminarUsuario(usuario.id);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Usuarios;
