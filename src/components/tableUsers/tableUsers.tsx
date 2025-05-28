import { useState } from "react";
import type { User } from "../../models/User";
import { MdDelete } from "react-icons/md";

interface Props {
  users: User[];
  onDeleteFn: (id: number) => void;
}

export default function TableUsers({ users, onDeleteFn }: Props) {
  
  // variables necesarias para realizar la paginacion 

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const totalPages = Math.ceil(users.length / rowsPerPage);

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = users.slice(startIndex, startIndex + rowsPerPage);

  return (
    <div>
      <table className="table-auto border border-gray-400 mt-5">
        <thead>
          <tr>
            <th className="border border-black-300 py-2 px-8">ID</th>
            <th className="border border-black-300 py-2 px-8">Nombre</th>
            <th className="border border-black-300 px-8">Apellido</th>
            <th className="border border-black-300 px-8">Email</th>
            <th className="border border-black-300 px-8">Opciones</th>
          </tr>
        </thead>
      <tbody>
        {paginatedUsers.map((user) => {
            return (
              <tr className="border border-gray-300 border-b-gray-300 hover:bg-gray-200" key={user.id}>
                <td>{user.id}</td>
                <td className="p-5">{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button className="buttonCancel" onClick={() => onDeleteFn(user.id)}>
                    <MdDelete color="red" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ marginTop: '16px' }}>
        <button onClick={handlePrev} disabled={currentPage === 1} className="disabled:opacity-50 buttonCancel">
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages} className="disabled:opacity-50 buttonCancel">
          Siguiente
        </button>
      </div>
    </div>
  );
}
