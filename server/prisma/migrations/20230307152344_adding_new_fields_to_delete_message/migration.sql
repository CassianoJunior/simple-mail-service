/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `participants_on_messages` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_participants_on_messages" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "messageId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "replayId" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "senderDeleted" BOOLEAN NOT NULL DEFAULT false,
    "recipientDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "participants_on_messages_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "participants_on_messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "participants_on_messages_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_participants_on_messages" ("createdAt", "id", "isRead", "messageId", "recipientId", "senderId", "updatedAt") SELECT "createdAt", "id", "isRead", "messageId", "recipientId", "senderId", "updatedAt" FROM "participants_on_messages";
DROP TABLE "participants_on_messages";
ALTER TABLE "new_participants_on_messages" RENAME TO "participants_on_messages";
CREATE UNIQUE INDEX "participants_on_messages_messageId_senderId_recipientId_key" ON "participants_on_messages"("messageId", "senderId", "recipientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
