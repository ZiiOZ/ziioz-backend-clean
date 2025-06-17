// src/pages/TestTabs.tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function TestTabs() {
  return (
    <Tabs defaultValue="account" className="w-[400px] mx-auto mt-10">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings here.</TabsContent>
      <TabsContent value="password">Password change here.</TabsContent>
    </Tabs>
  );
}
