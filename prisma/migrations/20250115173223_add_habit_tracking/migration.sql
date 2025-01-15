-- CreateTable
CREATE TABLE "HabitTracking" (
    "id" SERIAL NOT NULL,
    "habitId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "completed" BOOLEAN NOT NULL,

    CONSTRAINT "HabitTracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "HabitTracking" ADD CONSTRAINT "HabitTracking_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
