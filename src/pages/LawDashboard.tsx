import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabaseClient";

export default function LawDashboard() {
  const [reports, setReports] = useState<any[]>([]);
  const [flagged, setFlagged] = useState<any[]>([]);
  const [agencies, setAgencies] = useState<any[]>([]);

  useEffect(() => {
    fetchReports();
    fetchFlagged();
    fetchAgencies();
  }, []);

  const fetchReports = async () => {
    const { data } = await supabase.from("content_reports").select("*");
    setReports(data || []);
  };

  const fetchFlagged = async () => {
    const { data } = await supabase.from("flagged_cases").select("*");
    setFlagged(data || []);
  };

  const fetchAgencies = async () => {
    const { data } = await supabase.from("law_enforcement_agencies").select("*");
    setAgencies(data || []);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Law Enforcement Dashboard</h1>
      <Tabs defaultValue="reports" className="w-full">
        <TabsList>
          <TabsTrigger value="reports">Content Reports</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Cases</TabsTrigger>
          <TabsTrigger value="agencies">Agencies</TabsTrigger>
        </TabsList>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reports.map((report) => (
              <Card key={report.id}>
                <CardContent className="p-4">
                  <p><strong>ID:</strong> {report.id}</p>
                  <p><strong>Created:</strong> {new Date(report.created_at).toLocaleString()}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="flagged">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flagged.map((caseItem) => (
              <Card key={caseItem.id}>
                <CardContent className="p-4">
                  <p><strong>Case:</strong> {caseItem.title || caseItem.id}</p>
                  <p><strong>Status:</strong> <Badge>{caseItem.status || "Pending"}</Badge></p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agencies">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agencies.map((agency) => (
              <Card key={agency.id}>
                <CardContent className="p-4">
                  <p><strong>Name:</strong> {agency.name}</p>
                  <p><strong>Region:</strong> {agency.region}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
