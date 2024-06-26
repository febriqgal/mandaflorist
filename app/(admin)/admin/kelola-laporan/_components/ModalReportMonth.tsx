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

import ReportMonth from "./ReportMonth";
import { useGetCheckoutByStatusQuery } from "@/redux/feature/checkoutSlice";
import { Checkout } from "@prisma/client";

export default function ModalReportMonth() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: dataOrder } = useGetCheckoutByStatusQuery("SUCCESS");
  const [data, setData] = useState<Checkout[]>(dataOrder?.data);
  const [month, setMonth] = useState<string>("");
  const filterByName = (event: any) => {
    const value = event.target.value;
    if (value) {
      const [year, month] = value.split("-");
      const monthNumber = parseInt(month, 10);
      const monthName = new Date(year, monthNumber - 1).toLocaleString(
        "id-ID",
        { month: "long" }
      );
      return setMonth(`${monthName}/${year}`);
    }

    const filteredData = dataOrder?.data.filter((item: Checkout) => {
      return dayjs(item.createdAt).format("YYYY-MM").includes(value);
    });
    setData(filteredData);
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Laporan Bulanan
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Laporan Bulanan
              </ModalHeader>
              <ModalBody>
                <Input
                  isClearable
                  onChange={filterByName}
                  type="month"
                  min="2020"
                  max="2100"
                  minLength={4}
                  maxLength={4}
                  color="primary"
                />
              </ModalBody>
              <ModalFooter>
                <PDFDownloadLink
                  document={<ReportMonth data={data} month={month} />}
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
