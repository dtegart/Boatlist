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

export async function saveList(id: string, userId: string) {
  // Check if the user has already saved the list
  const savedList = await db.savedList.findFirst({
    where: {
      listId: id,
      userId,
    },
  });
  //if the user has already saved the list, remove it from the saved list
  if (savedList) {
    await db.savedList.delete({
      where: {
        id: savedList.id,
      },
    });
  } else {
    // Otherwise, save the list
    await db.savedList.create({
      data: {
        listId: id,
        userId,
      },
    });
  }
}
