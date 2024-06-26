"use client";

import ProductsModal from "@/app/(user)/user/_components/ProductsModal";
import { formatRupiah } from "@/constants/app.config";
import {
  useGetCheckoutByStatusQuery,
  useGetCheckoutsQuery,
} from "@/redux/feature/checkoutSlice";
import {
  Button,
  CircularProgress,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";

import ModalReportDay from "./_components/ModalReportDay";
import { PDFViewer } from "@react-pdf/renderer";
import ReportDay from "./_components/ReportDay";
import ModalReportMonth from "./_components/ModalReportMonth";
import ModalReportYear from "./_components/ModalReportYear";

export default function KelolaCustomerPage() {
  dayjs.locale("id");
  dayjs.extend(relativeTime);

  const { data: dataCheckout, isLoading } =
    useGetCheckoutByStatusQuery("SUCCESS");

  if (isLoading) {
    return <Spinner className="flex items-center justify-center h-screen" />;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-2">
        <ModalReportDay />
        <ModalReportMonth />
        <ModalReportYear />
      </div>
      <Table
        isStriped={true}
        aria-label="Example static collection table"
        shadow="lg"
        color="primary"
        layout="auto"
        fullWidth
      >
        <TableHeader>
          <TableColumn>No.</TableColumn>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nama</TableColumn>
          <TableColumn>Produk</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Tanggal</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<CircularProgress />}
          emptyContent={<p>Data Tidak Ditemukan</p>}
        >
          {dataCheckout.data.map((item: any, index: number) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{index + 1}.</TableCell>
                <TableCell>
                  {
                    <Tooltip content={item.id}>
                      <h1>...{item.id.slice(-5)}</h1>
                    </Tooltip>
                  }
                </TableCell>
                <TableCell>{item.user.name}</TableCell>
                <TableCell>
                  <ProductsModal data={item.cart} />
                </TableCell>
                <TableCell>
                  <h1>{item.address}</h1>
                </TableCell>
                <TableCell>{formatRupiah(item.total)}</TableCell>
                <TableCell>
                  {item.status === "PENDING"
                    ? "Belum Bayar"
                    : item.status === "DELIVERY"
                    ? "Dikirim"
                    : item.status === "SUCCESS"
                    ? "Selesai"
                    : "Dibatalkan"}
                </TableCell>
                <TableCell>
                  <Tooltip content={dayjs(item.createdAt).format("DD/MM/YYYY")}>
                    {dayjs(item.createdAt).fromNow()}
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
