import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import JuiceDisplay from "@/components/juice-display"

export default function Dashboard() {
  const juices = [
    {
      id: 1,
      name: "Orange Sunrise",
      description:
        "Our signature orange juice is freshly squeezed every morning from premium oranges. Packed with vitamin C and natural antioxidants, this refreshing juice gives you the perfect morning boost to start your day. No added sugar, preservatives, or artificial flavors - just pure orange goodness in every sip.",
      price: 50,
      image: "/orangeJuice.png?height=800&width=800",
      color: "bg-orange-100",
      textColor: "text-orange-800",
      buttonColor: "bg-orange-500 hover:bg-orange-600",
    },
    {
      id: 2,
      name: "Green Detox",
      description:
        "A nutrient-rich blend of spinach, kale, cucumber, celery, and green apple. This revitalizing juice is designed to cleanse your system while providing essential vitamins and minerals. The perfect balance of earthy and sweet flavors makes this green juice enjoyable even for first-time green juice drinkers.",
      price: 60,
      image: "/greenJuice.png?height=800&width=900",
      color: "bg-green-100",
      textColor: "text-green-800",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      id: 3,
      name: "Berry Bliss",
      description:
        "A delicious mix of strawberries, blueberries, raspberries, and blackberries creates this antioxidant powerhouse. Sweet, tart, and incredibly refreshing, our Berry Bliss juice is as nutritious as it is delicious. Enjoy the taste of summer berries any time of year with this vibrant purple juice.",
      price: 80,
      image: "/berryJuice.png?height=800&width=800",
      color: "bg-purple-100",
      textColor: "text-purple-800",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col mr-2 ml-2">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-green-600 text-white py-16 mt-2">
          <div className="container mx-auto flex flex-col items-center justify-center text-center"> 
            <h1 className="text-4xl font-bold mb-4">Welcome to JuiceVend</h1>
            <p className="max-w-2xl mx-auto text-lg">
              Discover our selection of three signature juices made from the finest ingredients. Order now and quench
              your thirst with nature's goodness!
            </p>
          </div>
        </section>

        <div className="py-12">
          {juices.map((juice, index) => (
            <JuiceDisplay key={juice.id} juice={juice} reverse={index % 2 !== 0} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
