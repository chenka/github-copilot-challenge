import { execSync } from "child_process"
import { PrismaClient } from "@prisma/client"
import { main as seedDatabase } from "./seed"

const prisma = new PrismaClient()

const resetDatabase = async () => {
  try {
    console.log("Dropping existing database...")
    execSync('psql -U postgres -c "DROP DATABASE IF EXISTS habit_tracker;"')
    console.log("Database dropped.")

    console.log("Creating new database...")
    execSync('psql -U postgres -c "CREATE DATABASE habit_tracker;"')
    console.log("Database created.")

    console.log("Running migrations...")
    execSync("npx prisma migrate dev --name init")
    console.log("Migrations applied.")

    console.log("Seeding database...")
    await seedDatabase()
    console.log("Database seeded.")
  } catch (error) {
    console.error("Error resetting database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

resetDatabase()
