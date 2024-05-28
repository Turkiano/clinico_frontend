import React from "react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { CardTitle } from "@/components/ui/card"
import api from "@/api"
import { useQuery } from "@tanstack/react-query"
import { User } from "@/types"

export default function UsersDashboard() {
  const getUsers = async () => {
    //this is how to get the Users from the database
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return res.data
    } catch (error) {
      console.error(error)
      return Promise.reject(new Error("Something went wrong"))
    }
  }

  const { data: users, error } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers
  })

  // console.log("users ", users)
  return (
    <div>
      <CardTitle>User list</CardTitle>

      <Table>
        <TableCaption>A list of your recent Products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full text-center">Id</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Category Id</TableHead>
            <TableHead className="text-left">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user) => (
            <TableRow key={user.id} className="w-[100px]">
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell className="text-center">{user.firstName}</TableCell>
              <TableCell className="text-center">{user.role}</TableCell>
              <TableCell className="text-left">{user.email}</TableCell>
              <TableCell>
                {/* <Button onClick={() => deleteProduct(product.id)}>Delete</Button> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
