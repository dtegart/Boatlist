"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { createItem } from "../functions";

interface ItemFormProps {
  listId: string
}

export function ItemForm(props: ItemFormProps) {
  const [newItem, setNewItem] = React.useState('')
  const { listId } = props
  const handleSubmit = async () => {
    await createItem(listId, newItem)
    setNewItem('')
  }
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input
        type='text'
        placeholder='Add an item'
        onChange={(e) => setNewItem(e.target.value)}

      />
      <Button variant='default' onClick={handleSubmit}>Add</Button>
    </div>
  )
}
