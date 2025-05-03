// pages/api/save-order.ts

import fs from "fs"
import path from "path"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const order = req.body
  const filePath = path.join(process.cwd(), "orders.json")

  try {
    let existingData = []

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf8")
      existingData = JSON.parse(fileData)
    }

    existingData.push(order)

    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2))

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Error saving order:", error)
    return res.status(500).json({ error: "Failed to save order" })
  }
}
