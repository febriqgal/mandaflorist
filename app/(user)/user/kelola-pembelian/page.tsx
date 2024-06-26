"use client";

import { formatRupiah } from "@/constants/app.config";
import {
  useGetCheckoutByUserIdQuery,
  useUpdateCheckoutMutation,
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
} from "@nextui-org/react";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { Eye } from "react-huge-icons/outline";
import BayarAndCancelDropdown from "../_components/BayarAndCancelDropdown";
import ProductsModal from "../_components/ProductsModal";
import BeriUlasanModal from "../_components/BeriUlasanModal";

export default function KelolaCustomerPage() {
  dayjs.locale("id");
  dayjs.extend(relativeTime);
  const [update] = useUpdateCheckoutMutation();
  const { data: session } = useSession();
  const { data: dataCheckout, isLoading } = useGetCheckoutByUserIdQuery(
    session?.user.id
  );

  if (isLoading) {
    return <Spinner className="flex items-center justify-center h-screen" />;
  }

  return (
    <div className="p-4 space-y-4">
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
          <TableColumn>Produk</TableColumn>
          <TableColumn>Alamat</TableColumn>
          <TableColumn>Total</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Tanggal</TableColumn>
          <TableColumn>{""}</TableColumn>
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
                <TableCell>{dayjs(item.createdAt).fromNow()}</TableCell>
                <TableCell>
                  {item.status === "DELIVERY" ? (
                    <Button
                      color="primary"
                      onPress={() => update({ id: item.id, status: "SUCCESS" })}
                    >
                      Barang diterima
                    </Button>
                  ) : item.status === "PENDING" ? (
                    <BayarAndCancelDropdown item={item} />
                  ) : item.status === "CANCEL" ? null : item.status ===
                    "SUCCESS" ? (
                    <BeriUlasanModal data={item} />
                  ) : null}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
