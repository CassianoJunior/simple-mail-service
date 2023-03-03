-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_message_participants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "messageId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "message_participants_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "messages" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "message_participants_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "message_participants_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_message_participants" ("createdAt", "id", "isDeleted", "isRead", "messageId", "recipientId", "senderId", "updatedAt") SELECT "createdAt", "id", "isDeleted", "isRead", "messageId", "recipientId", "senderId", "updatedAt" FROM "message_participants";
DROP TABLE "message_participants";
ALTER TABLE "new_message_participants" RENAME TO "message_participants";
CREATE UNIQUE INDEX "message_participants_messageId_senderId_recipientId_key" ON "message_participants"("messageId", "senderId", "recipientId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
