import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

export default function ProductsModal({ data }: { data: any }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(data);

  return (
    <>
      <Button onPress={onOpen}>Lihat</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Produk yang dibeli
              </ModalHeader>
              <ModalBody>
                {data.map((item: any) => {
                  return (
                    <div key={item.id}>
                      <Image
                        src={`http://localhost:3000/product/${item.products.image}`}
                        alt=""
                        width={100}
                        height={100}
                      />
                      <p>{item.products.title}</p>
                    </div>
                  );
                })}
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
