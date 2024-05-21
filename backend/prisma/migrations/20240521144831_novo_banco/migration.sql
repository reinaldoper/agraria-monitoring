-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" SERIAL NOT NULL,
    "identifier" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "manufacturer" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Command" (
    "id" SERIAL NOT NULL,
    "operation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "command" TEXT NOT NULL,
    "deviceId" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "format" TEXT NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "commandId" INTEGER NOT NULL,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Device_identifier_key" ON "Device"("identifier");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;
