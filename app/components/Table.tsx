/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Search } from "lucide-react"

const users = [
  {
    name: "Leanne Graham",
    username: "@bret",
    email: "sincere@april.biz",
    phone: "1-770-736-8031 x56442",
    website: "hildegard.org",
    company: "Romaguera-Crona"
  },
  {
    name: "Ervin Howell",
    username: "@antonette",
    email: "shanna@melissa.tv",
    phone: "010-692-6593 x09125",
    website: "anastasia.net",
    company: "Deckow-Crist"
  },
  {
    name: "Clementine Bauch",
    username: "@samantha",
    email: "nathan@yesenia.net",
    phone: "1-463-123-4447",
    website: "ramiro.info",
    company: "Romaguera-Jacobson"
  },
  {
    name: "Patricia Lebsack",
    username: "@karianne",
    email: "julianne.oconner@kory.org",
    phone: "493-170-9623 x156",
    website: "kale.biz",
    company: "Robel-Corkery"
  },
  {
    name: "Chelsey Dietrich",
    username: "@kamren",
    email: "lucio_hettinger@annie.ca",
    phone: "(254)954-1289",
    website: "demarco.info",
    company: "Keebler LLC"
  },
  {
    name: "Mrs. Dennis Schulist",
    username: "@leopoldo_corkery",
    email: "karley_dach@jasper.info",
    phone: "1-477-935-8478 x6430",
    website: "ola.org",
    company: "Considine-Lockman"
  },
  {
    name: "Kurtis Weissnat",
    username: "@elwyn.skiles",
    email: "telly.hoeger@billy.biz",
    phone: "210.067.6132",
    website: "elvis.io",
    company: "Johns Group"
  },
  {
    name: "Nicholas Runolfsdottir V",
    username: "@maxime_nienow",
    email: "sherwood@rosamond.me",
    phone: "586.493.6943 x140",
    website: "jacynthe.com",
    company: "Abernathy Group"
  },
  {
    name: "Glenna Reichert",
    username: "@delphine",
    email: "chaim_mcdermott@dana.io",
    phone: "(775)976-6794 x41206",
    website: "conrad.com",
    company: "Yost and Sons"
  },
  {
    name: "Clementina DuBuque",
    username: "@moriah.stanton",
    email: "rey.padberg@karina.biz",
    phone: "024-648-3804",
    website: "ambrose.net",
    company: "Hoeger LLC"
  },
]

export default function Tables() {
  const [searchQuery, setSearchQuery] = React.useState("")
  
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-4">
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Company</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.website}</TableCell>
                <TableCell>{user.company}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="py-4 px-4 border-t">
          <p className="text-sm w-full flex justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="font-semibold pr-24">{filteredUsers.length} Users</span>
          </p>
        </div>
      </div>
    </div>
  )
}