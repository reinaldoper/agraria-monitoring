-- DropForeignKey
ALTER TABLE "Command" DROP CONSTRAINT "Command_deviceId_fkey";

-- DropForeignKey
ALTER TABLE "Parameter" DROP CONSTRAINT "Parameter_commandId_fkey";

-- AddForeignKey
ALTER TABLE "Command" ADD CONSTRAINT "Command_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Parameter" ADD CONSTRAINT "Parameter_commandId_fkey" FOREIGN KEY ("commandId") REFERENCES "Command"("id") ON DELETE CASCADE ON UPDATE CASCADE;
