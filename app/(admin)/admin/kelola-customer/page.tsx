"use client";

import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  CircularProgress,
} from "@nextui-org/react";
import { Search } from "react-huge-icons/outline";
import { User } from "@prisma/client";
import { useGetUsersQuery } from "@/redux/feature/usersSlice";

export default function KelolaCustomerPage() {
  const { data: dataUser, isLoading } = useGetUsersQuery({});
  const [search, setSearch] = useState("");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  const dataFilter = dataUser.data.filter((item: User) => {
    if (search.length >= 3)
      return item.name!.toLowerCase().includes(search.toLowerCase());
    return dataUser;
  });

  return (
    <div className="p-4 space-y-4">
      <Input
        isClearable
        startContent={<Search />}
        onClear={() => setSearch("")}
        placeholder="Cari..."
        className="w-1/3"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        variant="flat"
        color="primary"
      />
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
          <TableColumn>Nama</TableColumn>
          <TableColumn>Email</TableColumn>
          <TableColumn>No. HP</TableColumn>
          <TableColumn>Alamat</TableColumn>
        </TableHeader>
        <TableBody
          isLoading={isLoading}
          loadingContent={<CircularProgress />}
          emptyContent={<p>Data Tidak Ditemukan</p>}
        >
          {dataFilter.map((item: User, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
