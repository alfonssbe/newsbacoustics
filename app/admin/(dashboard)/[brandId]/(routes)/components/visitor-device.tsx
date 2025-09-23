"use client"

import { CardContent, CardHeader, CardTitle } from "@/app/admin/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type Props = {
  LiveVisitor: { device: string, users: number }[],
  loading: boolean
};

export function VisitorDevice(props: Props) {
  return (
        <div className="shadow-lg py-2 rounded-lg border bg-white">
        <CardHeader className="px-4 py-2">
            <div className="flex items-center">
            <CardTitle className="text-base font-bold">Most Device Used by Visitors (30 Days)</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="px-4 pb-4 h-[300px] overflow-auto">
          {props.loading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Skeleton className="w-full h-full rounded-md" />
          </div>
        ) : (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={props.LiveVisitor}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="device" />
            <YAxis dataKey="users"/>
            <Tooltip />
            <Bar dataKey="users" fill="#ed3339" />
            </BarChart>
        </ResponsiveContainer>
        )}
         </CardContent>
         </div>
  )
}
