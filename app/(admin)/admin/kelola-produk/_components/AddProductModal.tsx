import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
} from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "@prisma/client";
import { usePostProductMutation } from "@/redux/feature/productsSlice";
import AppInput from "@/components/AppInput";

export default function AddProductModal() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<Product>();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [postProduct] = usePostProductMutation();
  const [file, setFile] = useState<File>();
  const onSubmit: SubmitHandler<Product> = async (data) => {
    setLoading(true);
    const dataa = new FormData();
    dataa.set("file", file!);
    await fetch("/api/upload", {
      method: "POST",
      body: dataa,
    });
    await postProduct({
      ...data,
      authorId: session?.user.id,
      price: Number(data.price),
      image: file?.name,
      stock: Number(data.stock),
      discount: Number(data.discount),
    });
    reset();
    setValue("");
    setLoading(false);
    onClose();
  };
  return (
    <>
      <Button onPress={onOpen} color="primary">
        Tambah Produk
      </Button>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Modal
          backdrop="blur"
          translate="yes"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Tambah Produk
                </ModalHeader>
                <ModalBody>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full space-y-2"
                  >
                    <AppInput
                      isRequired
                      required
                      label="Nama Produk"
                      variant="faded"
                      {...register("title", {
                        onChange(event) {
                          setValue(event.target.value);
                        },
                      })}
                    />
                    <AnimatePresence>
                      {value.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ ease: "backIn", duration: 0.5 }}
                          className="space-y-2"
                        >
                          <Textarea
                            label="Deskripsi"
                            size="sm"
                            isRequired
                            required
                            color="primary"
                            variant="faded"
                            {...register("desc")}
                          />
                          <AppInput
                            isRequired
                            required
                            label="Stok"
                            type="number"
                            variant="faded"
                            {...register("stock")}
                          />
                          <AppInput
                            isRequired
                            required
                            label="Harga"
                            type="number"
                            variant="faded"
                            {...register("price")}
                          />
                          <AppInput
                            isRequired
                            required
                            endContent={<h1>%</h1>}
                            label="Diskon"
                            type="number"
                            variant="faded"
                            {...register("discount")}
                          />
                          <label>
                            Gambar{" "}
                            <input
                              type="file"
                              required
                              onChange={(e) => setFile(e.target.files?.[0])}
                            />
                          </label>
                          <Button
                            type="submit"
                            fullWidth
                            color="primary"
                            isLoading={loading}
                          >
                            Kirim
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>
                </ModalBody>
                <ModalFooter></ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </motion.div>
    </>
  );
}
