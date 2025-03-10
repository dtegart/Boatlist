"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { createList } from "./functions";


export function ListForm({ userId }: { userId: string }) {
  const [newList, setNewList] = React.useState('')

  const handleSubmit = async () => {
    await createList(newList, userId)
    setNewList('')
  }
  return (
    <div className="flex w-full  items-center space-x-2">
      <Input
        type='text'
        placeholder='Create a List'
        onChange={(e) => setNewList(e.target.value)}

      />
      <Button onClick={handleSubmit}>Add</Button>
    </div>
  )
}
