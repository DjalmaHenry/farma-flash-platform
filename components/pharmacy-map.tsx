"use client"

import { useState } from "react"
import Image from "next/image"
import { MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const pharmacies = [
  {
    id: 1,
    name: "Farmácia Saúde",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    distance: 1.2,
    lat: -23.5629,
    lng: -46.6544,
  },
  {
    id: 2,
    name: "Drogaria Bem Estar",
    address: "Rua Augusta, 500 - São Paulo, SP",
    distance: 0.8,
    lat: -23.5529,
    lng: -46.658,
  },
  {
    id: 3,
    name: "Farmácia Popular",
    address: "Av. Rebouças, 1200 - São Paulo, SP",
    distance: 2.5,
    lat: -23.5729,
    lng: -46.67,
  },
  {
    id: 4,
    name: "Drogaria Vida",
    address: "Rua Oscar Freire, 300 - São Paulo, SP",
    distance: 1.5,
    lat: -23.56,
    lng: -46.67,
  },
]

export function PharmacyMap() {
  const [selectedPharmacy, setSelectedPharmacy] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-gray-100 rounded-xl overflow-hidden h-[400px] relative">
        <Image src="/placeholder.svg?height=400&width=800" alt="Mapa de farmácias" fill className="object-cover" />
        {pharmacies.map((pharmacy) => (
          <button
            key={pharmacy.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 ${
              selectedPharmacy === pharmacy.id ? "text-lime-500" : "text-blue-800"
            }`}
            style={{
              top: `${50 + (pharmacy.lat + 23.57) * 100}%`,
              left: `${50 + (pharmacy.lng + 46.67) * 100}%`,
            }}
            onClick={() => setSelectedPharmacy(pharmacy.id)}
          >
            <MapPin className="h-8 w-8" fill={selectedPharmacy === pharmacy.id ? "#84cc16" : "#1e40af"} />
          </button>
        ))}
      </div>
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-blue-800">Farmácias Parceiras</h3>
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
          {pharmacies.map((pharmacy) => (
            <Card
              key={pharmacy.id}
              className={`cursor-pointer transition-all ${
                selectedPharmacy === pharmacy.id ? "border-lime-500 shadow-md" : ""
              }`}
              onClick={() => setSelectedPharmacy(pharmacy.id)}
            >
              <CardContent className="p-4">
                <h4 className="font-semibold">{pharmacy.name}</h4>
                <p className="text-gray-600 text-sm">{pharmacy.address}</p>
                <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{pharmacy.distance} km de distância</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
