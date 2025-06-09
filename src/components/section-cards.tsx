import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-2 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-6 @5xl/main:grid-cols-6">
      <Card className="@container/card bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 hover:dark:bg-gray-800 border-b-gray-500 border-b-4">
        <CardHeader>
          <CardDescription>Total Emails</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
            43
          </CardTitle>
          <CardAction>
            <Badge className="bg-gray-500 text-white" variant="default">
              <IconTrendingUp />
              12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Total emails Processed</div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-red-100 dark:bg-red-900 hover:bg-red-200 hover:dark:bg-red-800 border-b-red-500 border-b-4">
        <CardHeader>
          <CardDescription>Total Failures</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
            50
          </CardTitle>
          <CardAction>
            <Badge className="bg-red-500 text-white" variant="default">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Completely Failed Invoices
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-amber-100 dark:bg-amber-900 hover:bg-amber-200 hover:dark:bg-amber-800 border-b-amber-500 border-b-4">
        <CardHeader>
          <CardDescription>Partial Success</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
            5
          </CardTitle>
          <CardAction>
            <Badge className="bg-amber-500 text-white" variant="default">
              <IconTrendingUp />
              02.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            Partially Successful Invoices
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 hover:dark:bg-blue-800 border-b-blue-500 border-b-4">
        <CardHeader>
          <CardDescription>Overall Files</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
            110
          </CardTitle>
          <CardAction>
            <Badge className="bg-blue-200 text-black" variant="default">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">All Invoices Processed</div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-green-100 dark:bg-green-900 hover:bg-green-200 hover:dark:bg-green-800 border-b-green-500 border-b-4">
        <CardHeader>
          <CardDescription>Total Success</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
            50
          </CardTitle>
          <CardAction>
            <Badge className="bg-green-500 text-white" variant="default">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            End to End Successful Invoices
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card bg-violet-100 dark:bg-violet-900 hover:bg-violet-200 hover:dark:bg-violet-800 border-b-violet-500 border-b-4">
        <CardHeader>
          <CardDescription>Missing Info</CardDescription>
          <CardTitle className="text-3xl font-bold tabular-nums @[250px]/card:text-3xl">
            5
          </CardTitle>
          <CardAction>
            <Badge className="bg-violet-500 text-white" variant="default">
              <IconTrendingDown />
              -20%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-md">
          <div className="text-muted-foreground">Missing Information</div>
        </CardFooter>
      </Card>
    </div>
  );
}
