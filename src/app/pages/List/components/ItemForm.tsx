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
    if (!newItem.trim()) return
    await createItem(listId, newItem)
    setNewItem('')
  }

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleSubmit()
    }} className="flex w-full items-center space-x-2">
      <Input
        type='text'
        placeholder='Add an item'
        onChange={(e) => setNewItem(e.target.value)}
        value={newItem}
      />
      <Button type="submit" variant='default'>Add</Button>
    </form>
  )
}
