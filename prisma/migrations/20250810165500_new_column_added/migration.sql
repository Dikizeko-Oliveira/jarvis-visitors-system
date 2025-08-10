-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_visitors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT,
    "birthdate" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "room_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "visitors_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_visitors" ("birthdate", "cpf", "created_at", "email", "id", "name", "room_id") SELECT "birthdate", "cpf", "created_at", "email", "id", "name", "room_id" FROM "visitors";
DROP TABLE "visitors";
ALTER TABLE "new_visitors" RENAME TO "visitors";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
