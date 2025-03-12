"use client";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";
import { deleteItem } from "../functions";

interface ItemProps {
  id: string
  description: string
}



export function Item(props: ItemProps) {
  const [completed, setCompleted] = React.useState(false)
  const { id, description } = props

  const handleDelete = () => {
    deleteItem(id);
  };

  return (
    <li
      key={id}
      className='flex items-center justify-between p-2 hover:bg-muted rounded-md cursor-pointer'
      onClick={() => setCompleted(!completed)}
    >
      <span className={completed ? 'line-through' : ''}>
        {description}
      </span>
      <Button
        onClick={handleDelete}
        variant={'ghost'}
        size={'icon'}
        className="text-compass focus:outline-none ml-2"
        aria-label="Delete item"
      >
        <Trash2 />
      </Button>
    </li>
  )
}

