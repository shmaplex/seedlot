import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function DashboardPage() {
  const t = await getTranslations("dashboard");

  return (
    <div className="space-y-6 py-8 px-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title={t("stats.totalLots")}
          value="128"
          description={t("stats.totalLotsDesc")}
        />
        <StatCard
          title={t("stats.imported")}
          value="24"
          description={t("stats.importedDesc")}
        />
        <StatCard
          title={t("stats.issues")}
          value="3"
          description={t("stats.issuesDesc")}
        />
        <StatCard
          title={t("stats.lastImport")}
          value="2025-01-15"
          description={t("stats.lastImportDesc")}
        />
      </div>

      {/* Main content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>{t("activity.title")}</CardTitle>
            <CardDescription>{t("activity.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>{t("activity.items.import")}</li>
              <li>{t("activity.items.validation")}</li>
              <li>{t("activity.items.export")}</li>
            </ul>
          </CardContent>
        </Card>

        {/* Quick actions */}
        <Card>
          <CardHeader>
            <CardTitle>{t("actions.title")}</CardTitle>
            <CardDescription>{t("actions.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Button>{t("actions.import")}</Button>
            <Button variant="secondary">{t("actions.viewLots")}</Button>
            <Button variant="outline">{t("actions.export")}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
