/*
  Warnings:

  - Added the required column `description` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `format` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operation` to the `Command` table without a default value. This is not possible if the table is not empty.
  - Added the required column `result` to the `Command` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Command" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "operation" TEXT NOT NULL,
ADD COLUMN     "result" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Parameter" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "commandId" INTEGER NOT NULL,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
