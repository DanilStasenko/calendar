/*
  Warnings:

  - Added the required column `canceled` to the `Lesson` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student` to the `Lesson` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lesson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "paid" BOOLEAN NOT NULL,
    "student" TEXT NOT NULL,
    "canceled" BOOLEAN NOT NULL,
    "userId" TEXT,
    CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Lesson" ("date", "id", "name", "paid", "userId") SELECT "date", "id", "name", "paid", "userId" FROM "Lesson";
DROP TABLE "Lesson";
ALTER TABLE "new_Lesson" RENAME TO "Lesson";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
