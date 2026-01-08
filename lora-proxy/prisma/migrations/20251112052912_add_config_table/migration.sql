-- AlterTable
ALTER TABLE "WebhookCall" ALTER COLUMN "statusText" DROP DEFAULT;

-- CreateTable
CREATE TABLE "Config" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Config_key_key" UNIQUE ("key")
);
