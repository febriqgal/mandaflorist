import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { formatRupiah } from "@/constants/app.config";
import Link from "next/link";
import { Checkout } from "@prisma/client";

export default function BayarModal({ data }: { data: Checkout }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen}>Bayar</div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Pembayaran
              </ModalHeader>
              <ModalBody>
                Silahkan lakukan pembayaran sebesar :{" "}
                <span className="font-bold">{formatRupiah(data.total)}</span>
                <h1>Ke Rekening a.n. Manda Florist :</h1>
                <h1>BCA 1234567890</h1>
                <h1>BRI 1234567890</h1>
                <h1 className="text-center ">
                  Sudah transfer? silahkan konfirmasi ke{" "}
                  <Button
                    className="mt-2"
                    startContent={<>💬</>}
                    size="sm"
                    as={Link}
                    target="_blank"
                    href={`https://web.whatsapp.com/send?phone=+6282285451333&text=%20#${data.id},%20Halo%20Saya%20Sudah%20Transfer%20Rp%20${data.total}&app_absent=0`}
                    fullWidth
                    color="primary"
                  >
                    WhatsApp
                  </Button>
                </h1>
                <p className="text-red-500">
                  *Pembayaran akan diproses 1x24 jam
                </p>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
