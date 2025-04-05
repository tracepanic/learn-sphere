-- CreateEnum
CREATE TYPE "SocialMedia" AS ENUM ('FACEBOOK', 'INSTAGRAM', 'TWITTER', 'LINKEDIN');

-- AlterTable
ALTER TABLE "schools" ADD COLUMN     "address" TEXT,
ADD COLUMN     "contactEmail" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "supportEmail" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "socials" (
    "id" TEXT NOT NULL,
    "type" "SocialMedia" NOT NULL,
    "link" TEXT NOT NULL,
    "userId" TEXT,
    "schoolId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "socials_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "socials_userId_type_key" ON "socials"("userId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "socials_schoolId_type_key" ON "socials"("schoolId", "type");

-- AddForeignKey
ALTER TABLE "socials" ADD CONSTRAINT "socials_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "socials" ADD CONSTRAINT "socials_schoolId_fkey" FOREIGN KEY ("schoolId") REFERENCES "schools"("id") ON DELETE SET NULL ON UPDATE CASCADE;
