/*
  Warnings:

  - Added the required column `statusText` to the `WebhookCall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WebhookCall" ADD COLUMN     "statusText" TEXT NOT NULL DEFAULT '';
