import "./modal.css";
import { MdClose } from "react-icons/md";

interface ModalProps {
  isOpen: boolean;
  handleModalFn: any;
  children: any;
}

const CustomModal = ({ isOpen, handleModalFn, children }: ModalProps) => {
  return (
    <div className={`modal ${isOpen ? 'isOpen' : 'isClosed'}`}>
      <div className="close">
        <MdClose onClick={handleModalFn} size={25} />
      </div>
      {children}
    </div>
  );
};

export default CustomModal;