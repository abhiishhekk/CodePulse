import React from 'react'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


function ContestHistory({history}) {
    // const [contestHistory, setContestHistory] = useState(null);

  return (
    <Table className={`bg-[#fafafc]`}>
    <TableCaption>A list of your recent contests.</TableCaption>
    <TableHeader>
        <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Problems Solved</TableHead>
            <TableHead>Rank Direction</TableHead>
            <TableHead>Global Rank</TableHead>
            <TableHead className="text-right">New Rating</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {
            history.map((contest, index)=>(
                <TableRow key={index}>
                    <TableCell className="font-medium">{contest.contest.title}</TableCell>
                    <TableCell>{contest.problemsSolved}</TableCell>
                    <TableCell>{contest.trendDirection}</TableCell>
                    <TableCell>{contest.ranking}</TableCell>
                    <TableCell className="text-right">{contest.rating}</TableCell>
                </TableRow>
            ))
        }
  </TableBody>
</Table>
  )
}

export default ContestHistory
