import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { Trash } from "react-huge-icons/outline";
import { useDeleteProductMutation } from "@/redux/feature/productsSlice";

export default function DeleteProductModal({
  id,
  title,
}: {
  id: string;
  title: string;
}): React.JSX.Element {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [deleteProduct] = useDeleteProductMutation();
  return (
    <>
      <div onClick={onOpen}>
        <Tooltip content="Hapus" color="danger">
          <div className="text-lg cursor-pointer">
            <Trash />
          </div>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Konfirmasi
              </ModalHeader>
              <ModalBody>
                <p>
                  Yakin menghapus <span className="font-bold">{title}?</span>
                </p>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="primary"
                  onPress={() => {
                    deleteProduct(id);
                    onClose();
                  }}
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
