"use client"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
//   ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A simple area chart"



const chartConfig = {
  rating: {
    label: "Rating",
    color: "var(--chart-1)",
  },
}


export function Chart({history}) {
    console.log(history);
    // const chartData = [
    //     { month: "January", desktop: 186 },
    //     { month: "February", desktop: 305 },
    //     { month: "March", desktop: 237 },
    //     { month: "April", desktop: 73 },
    //     { month: "May", desktop: 209 },
    //     { month: "June", desktop: 214 },
    // ]
    const chartData = history.map((c, index)=>({
        name: c.contest.title,
        rating: c.rating
    })).reverse()
    const diff = chartData[chartData.length - 1].rating - chartData[0].rating;
  return (
    <Card>
      {/* <CardHeader>
        <CardTitle>Area Chart</CardTitle>
        <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="rating"
              type="natural"
              fill="var(--color-rating)"
              fillOpacity={0.4}
              stroke="var(--color-rating)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending {diff>0? `up` : `down`} by {Math.abs(diff).toFixed(2)} points in last 10 contests<TrendingUp className="h-4 w-4" />
            </div>
            {/* <div className="text-muted-foreground flex items-center gap-2 leading-none">
              January - June 2024
            </div> */}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
