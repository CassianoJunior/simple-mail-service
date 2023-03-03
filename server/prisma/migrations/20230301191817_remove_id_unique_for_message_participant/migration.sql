/*
  Warnings:

  - A unique constraint covering the columns `[messageId,senderId,recipientId]` on the table `message_participants` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "message_participants_messageId_senderId_recipientId_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "message_participants_messageId_senderId_recipientId_key" ON "message_participants"("messageId", "senderId", "recipientId");
