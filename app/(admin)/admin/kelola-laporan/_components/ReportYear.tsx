"use client";
import { AppConfig, formatRupiah } from "@/constants/app.config";
import { Table, TD, TH, TR } from "@ag-media/react-pdf-table";
import { Document, Page, Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";
import "dayjs/locale/id";
export default function ReportDay({
  data,
  month,
}: {
  data: any[];
  month: string;
}) {
  return (
    <Document>
      <Page
        orientation="portrait"
        size="A4"
        style={{ marginVertical: 32, marginLeft: 32, paddingRight: 64 }}
      >
        <View style={{ display: "flex", flexDirection: "column" }}>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            {AppConfig.title}
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              marginBottom: 10,
              fontWeight: "bold",
            }}
          >
            Laporan Penjualan Tahunan pada {month}
          </Text>
        </View>
        <Table>
          <TH>
            <TD weighting={0.03} style={{ fontSize: 10, padding: 4 }}>
              No.
            </TD>
            <TD style={{ fontSize: 10, padding: 4 }}>Nama</TD>
            <TD style={{ fontSize: 10, padding: 4 }}>Produk</TD>
            <TD style={{ fontSize: 10, padding: 4 }}>Alamat</TD>
            <TD style={{ fontSize: 10, padding: 4 }}>Tanggal</TD>
            <TD style={{ fontSize: 10, padding: 4 }}>Total</TD>
          </TH>
          {data.map((item, index) => (
            <TR key={item.id}>
              <TD
                weighting={0.03}
                style={{ fontSize: 10, padding: 4, width: 20 }}
              >
                {index + 1}.
              </TD>
              <TD style={{ fontSize: 10, padding: 4 }}>{item.user.name}</TD>
              <TD style={{ fontSize: 10, padding: 4 }}>
                {item.cart.map((item: any) => item.products.title).join(", ")}
              </TD>
              <TD style={{ fontSize: 10, padding: 4 }}>{item.address}</TD>
              <TD style={{ fontSize: 10, padding: 4 }}>
                {dayjs(item.createdAt).format("dddd, DD-MM-YYYY")}
              </TD>
              <TD style={{ fontSize: 10, padding: 4 }}>
                {formatRupiah(item.total)}
              </TD>
            </TR>
          ))}
        </Table>
        <View style={{ marginTop: 10, fontSize: 10 }}>
          <View>
            <Text
              style={{ textAlign: "right" }}
            >{`Total Penjualan :  ${formatRupiah(
              data?.reduce((a: any, b: any) => a + b.total, 0)
            )}`}</Text>
          </View>
        </View>
        <View style={{ marginTop: 60, fontSize: 10 }}>
          <View>
            <Text style={{ textAlign: "right" }}>{`Kota Solok, ${dayjs(
              Date.now()
            ).format("DD MMM YYYY")}`}</Text>
            <Text style={{ textAlign: "right", marginTop: 10 }}>Admin</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
