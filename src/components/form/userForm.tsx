import { useState } from "react";
import type { User } from "../../models/User";

interface formProps {
    userData?: User;
    onSubmitFn: any;
    onCancelFn: any;
}

export const UserForm = ({userData = {id: 0, firstName: "", lastName: "", email: "", status: true}, onSubmitFn, onCancelFn}: formProps) => {

    const [firstName, setFirstName] = useState(userData.firstName);
    const [lastName, setLastName] = useState(userData.lastName);
    const [email, setEmail] = useState(userData.email);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        onSubmitFn({...userData, firstName, lastName, email, id: userData.id == 0 ? 0 : userData.id})
        
        setFirstName("");
        setLastName("");
        setEmail("");
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