import AppInput from "@/components/AppInput";
import { useUpdateProductMutation } from "@/redux/feature/productsSlice";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { Product } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Edit } from "react-huge-icons/outline";

export default function EditProductModal({ data }: { data: Product }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { register, handleSubmit, reset } = useForm<Product>({
    defaultValues: data,
  });
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [updateProduct] = useUpdateProductMutation();

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setLoading(true);
    await updateProduct({
      ...data,
      authorId: session?.user.id,
      price: Number(data.price),
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
      <div onClick={onOpen}>
        <Tooltip content="Edit">
          <div className="text-lg cursor-pointer">
            <Edit />
          </div>
        </Tooltip>
      </div>
      <Modal
        scrollBehavior="inside"
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
                Edit Produk
              </ModalHeader>
              <ModalBody>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="w-full space-y-2"
                >
                  <AppInput
                    label="Nama Produk"
                    variant="faded"
                    defaultValue="asddassdadas"
                    {...register("title", {
                      onChange(event) {
                        setValue(event.target.value);
                      },
                    })}
                  />

                  <Textarea
                    label="Deskripsi"
                    size="sm"
                    color="primary"
                    variant="faded"
                    {...register("desc")}
                  />
                  <AppInput
                    label="Stok"
                    type="number"
                    variant="faded"
                    {...register("stock")}
                  />
                  <AppInput
                    label="Harga"
                    type="number"
                    variant="faded"
                    {...register("price")}
                  />
                  <AppInput
                    endContent={<h1>%</h1>}
                    label="Diskon"
                    type="number"
                    variant="faded"
                    {...register("discount")}
                  />
                  <AppInput
                    label="Image"
                    variant="faded"
                    {...register("image")}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    color="primary"
                    isLoading={loading}
                  >
                    Kirim
                  </Button>
                </form>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
