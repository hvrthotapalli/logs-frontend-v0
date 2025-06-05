import {
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconFile,
} from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({
  totalSuccess,
  totalFailed,
  partialSuccess,
  overallFiles,
}: {
  totalSuccess: number;
  totalFailed: number;
  partialSuccess: number;
  overallFiles: number;
}) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Success</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalSuccess.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge className="bg-green-500 text-white" variant="default">
              <IconCheck />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Completed runs</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Failures</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalFailed.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge className="bg-red-500 text-white" variant="default">
              <IconX />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Runs with failures</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Partial Success</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {partialSuccess.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge className="bg-amber-500 text-white" variant="default">
              <IconAlertTriangle />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Runs partially successful</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Overall Files</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {overallFiles.toLocaleString()}
          </CardTitle>
          <CardAction>
            <Badge className="bg-gray-200 text-black" variant="default">
              <IconFile />
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Files processed overall</div>
        </CardFooter>
      </Card>
    </div>
  );
}
