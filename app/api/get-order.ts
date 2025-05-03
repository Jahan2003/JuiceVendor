import fs from "fs"
import path from "path"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { orderId } = req.query

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const filePath = path.join(process.cwd(), "orders.json")

  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: "Orders file not found" })
    }

    const fileData = fs.readFileSync(filePath, "utf8")
    const orders = JSON.parse(fileData)

    // Find the order with the matching orderId
    const order = orders.find((order: { id: string }) => order.id === orderId)

    if (!order) {
      return res.status(404).json({ error: "Order not found" })
    }

    return res.status(200).json(order)
  } catch (error) {
    console.error("Error retrieving order:", error)
    return res.status(500).json({ error: "Failed to retrieve order" })
  }
}
