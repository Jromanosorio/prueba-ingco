import { useEffect, useState } from "react";
import "./App.css";
import { getUsers } from "./services/userService";
import type { User } from "./models/User";
import UserTable from "./components/tableUsers/tableUsers";
import { UserForm } from "./components/form/userForm";
import CustomModal from "./components/modal/modal";
import { MdAdd } from "react-icons/md";
import { MoonLoader } from "react-spinners";

function App() {
  const [selectedUser, setSelectedUser] = useState<User>()
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserID, setSelectedUserID] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Funcion para llamar al servicio que hace el API CALL para cargar los usuarios
  const loadUsers = async () => {
    try {
      
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const data = await getUsers();
      setUsers(data.filter((user) => user.status));
    } catch (err) {
      setError("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const saveNewUser = (user: any) => {

    // Si se esta editando el usuario se reemplaza en el arreglo
    if(user.id !== 0) {
      setUsers(prevUsuarios => prevUsuarios.map(prevUser =>
        prevUser.id === user.id ? user : prevUser)
      );

    } else {
    // Crear id automanticamente para el nuevo usuario
      const id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1

      setUsers([...users, {...user, id}])
    }

      setSelectedUser(undefined)
      setAddUser(false)
  }

  // mostrar el formulario de nuevo usuario, cargando los datos del usuario a editar
  const editUser = (user: User) => {
    handleNewUser()
    setSelectedUser(user)
  }

  // funcion para eliminar un usuario
  const removeUser = (id: number) => {
    handleModal()
    setSelectedUserID(id)
  };

  // funcion para confirmar la elimiancion
  const confirmDelete = () => {
    if (selectedUserID !== null) {
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== selectedUserID));
      setSelectedUserID(null)
      setShowModal(false)
    }
  }

  // Funciones para mostrar y ocultar el formulario 
  const handleNewUser = () => {
    setAddUser(true)
  }

  const handleCancel = () => {
    setAddUser(false)
    setSelectedUser(undefined)
  }

  // Funcion para mostrar modal de confirmacion
  const handleModal = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <main className={showModal ? 'filter' : ''}>
      <h1>Lista de Usuarios</h1>
      <p className="flex mt-5">
        Numero de usuarios activos: <b className="mx-2">{users.length}</b>
      </p>
      <button className="flex gap-2 buttonConfirm text-white my-5" onClick={handleNewUser}>
        <MdAdd/> Agregar nuevo usuario
      </button>
      {
        error && <span>Ha ocurrido un error cargando los usuarios</span>
      }
      <div className="flex">
        {loading ? (
          <div className="flex justify-center m-auto mt-10">
            <MoonLoader color="#0577b3" />
          </div>
        ) : (
          <UserTable users={users} onDeleteFn={removeUser} onEditFn={editUser}/>
        )}
        {addUser && <UserForm onSubmitFn={saveNewUser} onCancelFn={handleCancel} userData={selectedUser} />}
      <CustomModal isOpen={showModal} handleModalFn={handleModal}>
        <h2 className="font-semibold">Estas seguro que desea eliminar al usuario con ID: {selectedUserID}?</h2>
        <div className="flex gap-5 mt-5 justify-center">
          <button className="buttonCancel" onClick={handleModal}>Cancelar</button>
          <button className="buttonConfirm text-white" onClick={confirmDelete}>Confirmar</button>
        </div>
      </CustomModal>
      </div>
    </main>
  );
}

export default App;
