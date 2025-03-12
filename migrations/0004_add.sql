-- CreateTable
CREATE TABLE "SavedList" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "listId" TEXT NOT NULL,
    "savedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SavedList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "SavedList_listId_fkey" FOREIGN KEY ("listId") REFERENCES "List" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "SavedList_userId_idx" ON "SavedList"("userId");

-- CreateIndex
CREATE INDEX "SavedList_listId_idx" ON "SavedList"("listId");

-- CreateIndex
CREATE UNIQUE INDEX "SavedList_userId_listId_key" ON "SavedList"("userId", "listId");
