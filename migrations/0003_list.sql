-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_List" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME,
    "ownerId" TEXT NOT NULL,
    CONSTRAINT "List_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_List" ("createdAt", "id", "name", "updatedAt") SELECT "createdAt", "id", "name", "updatedAt" FROM "List";
DROP TABLE "List";
ALTER TABLE "new_List" RENAME TO "List";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
