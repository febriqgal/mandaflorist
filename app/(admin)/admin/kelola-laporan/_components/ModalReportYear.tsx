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
import { useState } from "react";

import ReportYear from "./ReportYear";
import { useGetCheckoutByStatusQuery } from "@/redux/feature/checkoutSlice";
import { Checkout } from "@prisma/client";
export default function ModalReportYear() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: dataOrder } = useGetCheckoutByStatusQuery("SUCCESS");
  const [data, setData] = useState<Checkout[]>(dataOrder?.data);
  const [year, setYear] = useState<string>("");
  const filterByName = (event: any) => {
    const value = event.target.value;
    setYear(value);
    const filteredData = dataOrder?.data.filter((item: Checkout) => {
      return new Date(item.createdAt).getFullYear().toString().includes(value);
    });
    setData(filteredData);
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Laporan Tahunan
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Laporan Tahunan
              </ModalHeader>
              <ModalBody>
                <Input
                  onChange={filterByName}
                  type="number"
                  id="year"
                  name="year"
                  min="2024"
                  max="2030"
                  step="1"
                  required
                  color="primary"
                />
              </ModalBody>
              <ModalFooter>
                <PDFDownloadLink
                  document={<ReportYear data={data} month={year} />}
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
