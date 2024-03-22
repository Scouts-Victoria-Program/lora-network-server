-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "blob" JSONB NOT NULL,
    "topic" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookCall" (
    "id" SERIAL NOT NULL,
    "datetime" TIMESTAMP(3) NOT NULL,
    "request" JSONB NOT NULL,
    "response" JSONB NOT NULL,
    "statusCode" INTEGER NOT NULL,

    CONSTRAINT "WebhookCall_pkey" PRIMARY KEY ("id")
);
