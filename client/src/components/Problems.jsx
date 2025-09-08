"use client"

import { TrendingUp } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

export const description = "A radial chart with text"





export function Problems({solved, total, type}) {
    const chartData = [
        { solved: solved},
    ]
    const chartConfig = {
    solved: {
        label: "Solved",
        color: "hsl(var(--chart-1))"
    },
    // type: {
    //     label: type,
    //     color: "var(--chart-2)",
    // },
    }
  return (
    <Card className="flex flex-col">
      {/* <CardHeader className="items-center pb-0">
        <CardTitle>Radial Chart - Text</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader> */}
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={90}
            endAngle={(solved/total)*360 + 90}
            innerRadius={73}
            outerRadius={140}
            
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 60]}
              
            />
            <RadialBar dataKey="solved" background cornerRadius={10}/>
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {chartData[0].solved.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Solved
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium font-serif text-[1rem]">
          Solved out of {total} {type} problems
        </div>
        
      </CardFooter>
    </Card>
  )
}
