import { useState } from "react";

interface formProps {
    onSubmitFn: any;
    onCancelFn: any;
}

export const UserForm = ({onSubmitFn, onCancelFn}: formProps) => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!firstName || !lastName || !email) {
            alert("Todos los campos son obligatorios.");
            return;
        }

        setFirstName("");
        setLastName("");
        setEmail("");

        onSubmitFn({firstName, lastName, email})
    };
    
    return (
        <>
            <form className="w-80 mx-20" onSubmit={handleSubmit}>
                <div className="mb-5">
                    <label htmlFor="firstName" className="flex mb-2">Nombre</label>
                    <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" id="firstName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full p-2.5" autoComplete="off" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="lastName" className="flex mb-2">Apellido</label>
                    <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" id="lastName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full p-2.5" autoComplete="off" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="email" className="flex mb-2">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm w-full p-2.5" autoComplete="off" required />
                </div>
                <div className="flex gap-2">                
                   <button type="button" className="w-80 text-black buttonCancel" onClick={onCancelFn}>Cancelar</button>
                   <button type="submit" className="w-80 text-black buttonConfirm text-white">Guardar</button>
                </div>
            </form>
        </>
    )
}