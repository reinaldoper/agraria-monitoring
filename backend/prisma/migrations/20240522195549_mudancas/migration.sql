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
    "command" TEXT NOT NULL,

    CONSTRAINT "Command_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommandDescription" (
    "id" SERIAL NOT NULL,
    "operation" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "deviceId" INTEGER,
    "commandId" INTEGER NOT NULL,

    CONSTRAINT "CommandDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommandToParameter" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Device_identifier_key" ON "Device"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "CommandDescription_commandId_key" ON "CommandDescription"("commandId");

-- CreateIndex
CREATE UNIQUE INDEX "_CommandToParameter_AB_unique" ON "_CommandToParameter"("A", "B");

-- CreateIndex
CREATE INDEX "_CommandToParameter_B_index" ON "_CommandToParameter"("B");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandDescription" ADD CONSTRAINT "CommandDescription_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommandDescription" ADD CONSTRAINT "CommandDescription_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommandToParameter" ADD CONSTRAINT "_CommandToParameter_A_fkey" FOREIGN KEY ("A") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommandToParameter" ADD CONSTRAINT "_CommandToParameter_B_fkey" FOREIGN KEY ("B") REFERENCES "Parameter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
