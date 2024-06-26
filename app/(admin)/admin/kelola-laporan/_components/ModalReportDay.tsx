"use client";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs";
import { useState } from "react";

import ReportDay from "./ReportDay";
import { useGetCheckoutByStatusQuery } from "@/redux/feature/checkoutSlice";
import { Checkout } from "@prisma/client";
export default function ModalReportDay() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: dataOrder } = useGetCheckoutByStatusQuery("SUCCESS");
  const [data, setData] = useState<Checkout[]>(dataOrder?.data);
  const [day, setDay] = useState<string>("");
  console.log(day);

  const filterByName = (event: any) => {
    const value = event.target.value;
    if (value) {
      const tanggalArray = value.split("-"); // Pisahkan tanggal berdasarkan tanda '-'
      const tanggalBaru = `${tanggalArray[2]}/${tanggalArray[1]}/${tanggalArray[0]}`; // Ubah urutan menjadi dd-mm-yyyy
      return setDay(tanggalBaru);
    }

    const filteredData = dataOrder?.data.filter((item: Checkout) => {
      return dayjs(item.createdAt).format("YYYY-MM-DD").includes(value);
    });
    setData(filteredData);
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Laporan Harian
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Laporan Harian
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  onChange={filterByName}
                  type="date"
                  placeholder="Masukkan Tahun"
                  color="primary"
                  required
                />
              </ModalBody>
              <ModalFooter>
                <PDFDownloadLink
                  document={<ReportDay data={data} month={day} />}
                  fileName={`${Date.now()}.pdf`}
                >
                  {({ blob, url, loading, error }) => (
                    <Button
                      size="sm"
                      disabled={loading}
                      color="primary"
                    >{`Cetak`}</Button>
                  )}
                </PDFDownloadLink>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
