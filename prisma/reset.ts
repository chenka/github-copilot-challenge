import { execSync } from "child_process"
import { PrismaClient } from "@prisma/client"
import { main as seedDatabase } from "./seed"

const prisma = new PrismaClient()

const resetDatabase = async () => {
  try {
    console.log("Resetting database...")

    // Drop all tables
    await prisma.$executeRaw`DROP SCHEMA public CASCADE`
    await prisma.$executeRaw`CREATE SCHEMA public`

    console.log("Database schema reset.")

    console.log("Running migrations...")
    execSync("npx prisma migrate deploy")
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
