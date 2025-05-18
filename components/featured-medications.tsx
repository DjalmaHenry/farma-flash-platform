"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const medications = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 25.9,
    discountPrice: 18.9,
    expiryDate: "2025-08-15",
    distance: 1.2,
    pharmacy: "Farmácia Saúde",
  },
  {
    id: 2,
    name: "Dipirona 1g",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 18.5,
    discountPrice: 12.9,
    expiryDate: "2025-07-20",
    distance: 0.8,
    pharmacy: "Drogaria Bem Estar",
  },
  {
    id: 3,
    name: "Omeprazol 20mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 32.9,
    discountPrice: 24.5,
    expiryDate: "2025-09-10",
    distance: 2.5,
    pharmacy: "Farmácia Popular",
  },
  {
    id: 4,
    name: "Loratadina 10mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 22.9,
    discountPrice: 15.9,
    expiryDate: "2025-08-05",
    distance: 1.5,
    pharmacy: "Drogaria Vida",
  },
  {
    id: 5,
    name: "Ibuprofeno 600mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 28.5,
    discountPrice: 19.9,
    expiryDate: "2025-07-25",
    distance: 3.0,
    pharmacy: "Farmácia Central",
  },
  {
    id: 6,
    name: "Amoxicilina 500mg",
    image: "/placeholder.svg?height=200&width=200",
    originalPrice: 45.9,
    discountPrice: 32.9,
    expiryDate: "2025-08-30",
    distance: 1.8,
    pharmacy: "Drogaria Saúde Total",
  },
]

export function FeaturedMedications() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const itemsPerPage = isMobile ? 1 : 3
  const totalPages = Math.ceil(medications.length / itemsPerPage)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const visibleMedications = medications.slice(currentIndex * itemsPerPage, currentIndex * itemsPerPage + itemsPerPage)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR")
  }

  return (
    <div className="relative">
      <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10">
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md" onClick={handlePrev}>
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Anterior</span>
        </Button>
      </div>
      <div ref={carouselRef} className="overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(0%)` }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {visibleMedications.map((medication) => (
              <Card key={medication.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-48 bg-gray-100">
                    <Image
                      src={medication.image || "/placeholder.svg"}
                      alt={medication.name}
                      fill
                      className="object-contain p-4"
                    />
                    <Badge className="absolute top-2 right-2 bg-lime-500">
                      {Math.round((1 - medication.discountPrice / medication.originalPrice) * 100)}% OFF
                    </Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{medication.name}</h3>
                    <div className="flex items-center gap-2 text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">Válido até {formatDate(medication.expiryDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500 mb-4">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {medication.distance} km - {medication.pharmacy}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-gray-500 line-through">R$ {medication.originalPrice.toFixed(2)}</span>
                      <span className="text-blue-800 font-bold text-xl">R$ {medication.discountPrice.toFixed(2)}</span>
                    </div>
                    <Link href={`/medicamento/${medication.id}`}>
                      <Button className="w-full bg-blue-800 hover:bg-blue-900">Ver detalhes</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
        <Button variant="outline" size="icon" className="rounded-full bg-white shadow-md" onClick={handleNext}>
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Próximo</span>
        </Button>
      </div>
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-blue-800" : "bg-gray-300"}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  )
}
