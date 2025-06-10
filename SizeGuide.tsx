"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Ruler, User } from "lucide-react"

const sizeCharts = {
  tops: {
    headers: ["Size", "Bust", "Waist", "Length"],
    rows: [
      ["XS", '32-34"', '24-26"', '24"'],
      ["S", '34-36"', '26-28"', '25"'],
      ["M", '36-38"', '28-30"', '26"'],
      ["L", '38-40"', '30-32"', '27"'],
      ["XL", '40-42"', '32-34"', '28"'],
    ],
  },
  bottoms: {
    headers: ["Size", "Waist", "Hips", "Inseam"],
    rows: [
      ["XS", '24-26"', '34-36"', '30"'],
      ["S", '26-28"', '36-38"', '30"'],
      ["M", '28-30"', '38-40"', '30"'],
      ["L", '30-32"', '40-42"', '30"'],
      ["XL", '32-34"', '42-44"', '30"'],
    ],
  },
  dresses: {
    headers: ["Size", "Bust", "Waist", "Hips", "Length"],
    rows: [
      ["XS", '32-34"', '24-26"', '34-36"', '35"'],
      ["S", '34-36"', '26-28"', '36-38"', '36"'],
      ["M", '36-38"', '28-30"', '38-40"', '37"'],
      ["L", '38-40"', '30-32"', '40-42"', '38"'],
      ["XL", '40-42"', '32-34"', '42-44"', '39"'],
    ],
  },
}

interface SizeGuideProps {
  category: string
}

export function SizeGuide({ category }: SizeGuideProps) {
  const [selectedTab, setSelectedTab] = useState("chart")

  const getSizeChart = () => {
    if (category === "tops" || category === "outerwear") return sizeCharts.tops
    if (category === "bottoms") return sizeCharts.bottoms
    if (category === "dresses") return sizeCharts.dresses
    return sizeCharts.tops // default
  }

  const sizeChart = getSizeChart()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Ruler className="w-3 h-3 mr-1" />
          Size Guide
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Size Guide</DialogTitle>
        </DialogHeader>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chart">Size Chart</TabsTrigger>
            <TabsTrigger value="measure">How to Measure</TabsTrigger>
            <TabsTrigger value="fit">Fit Guide</TabsTrigger>
          </TabsList>

          <TabsContent value="chart">
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{category} Size Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        {sizeChart.headers.map((header) => (
                          <th key={header} className="text-left p-3 font-medium">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {sizeChart.rows.map((row, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="p-3">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  All measurements are in inches. For the best fit, measure yourself and compare to our size chart.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="measure">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  How to Measure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Bust/Chest</h4>
                    <p className="text-sm text-gray-600">
                      Measure around the fullest part of your bust/chest, keeping the tape parallel to the floor.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Waist</h4>
                    <p className="text-sm text-gray-600">
                      Measure around your natural waistline, which is the narrowest part of your torso.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Hips</h4>
                    <p className="text-sm text-gray-600">
                      Measure around the fullest part of your hips, about 8 inches below your waist.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Length</h4>
                    <p className="text-sm text-gray-600">
                      For tops: measure from the highest point of your shoulder to your desired length.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Pro Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use a soft measuring tape for accurate measurements</li>
                    <li>• Measure over your undergarments, not over clothing</li>
                    <li>• Keep the tape snug but not tight</li>
                    <li>• Have someone help you measure for best results</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fit">
            <Card>
              <CardHeader>
                <CardTitle>Fit Guide</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Relaxed Fit</h4>
                    <p className="text-sm text-gray-600">
                      Loose and comfortable with extra room for movement. Perfect for casual wear.
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Regular Fit</h4>
                    <p className="text-sm text-gray-600">
                      Classic fit that's not too tight or too loose. Our most popular fit.
                    </p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Slim Fit</h4>
                    <p className="text-sm text-gray-600">
                      Tailored closer to the body for a modern, streamlined silhouette.
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">Between Sizes?</h4>
                  <p className="text-sm text-yellow-800">
                    If you're between sizes, we recommend sizing up for a more comfortable fit, or sizing down for a
                    more fitted look. Check the product description for specific fit notes.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
