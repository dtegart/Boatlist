"use server";

import { db } from "@/db";

export async function createItem(listId: string, description: string) {
  return await db.item.create({
    data: {
      description,
      listId,
    },
  });
}

export async function deleteItem(id: string) {
  const deletedItem = await db.item.delete({
    where: {
      id,
    },
  });

  return deletedItem;
}

export async function createList(name: string, owner: string) {
  return await db.list.create({
    data: {
      name,
      ownerId: owner,
    },
  });
}

export async function deleteList(id: string) {
  // Delete all related items first
  await db.item.deleteMany({
    where: {
      listId: id,
    },
  });

  // Then delete the list itself
  const deletedList = await db.list.delete({
    where: {
      id,
    },
  });

  return deletedList;
}
