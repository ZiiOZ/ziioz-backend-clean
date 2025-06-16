import { ReactNode, useState } from "react";

export function Tabs({ children, defaultValue, className }: any) {
  const [active, setActive] = useState(defaultValue);
  const tabs = React.Children.toArray(children);

  return (
    <div className={className}>
      {tabs.map((tab: any) =>
        tab.type.displayName === "TabsList"
          ? React.cloneElement(tab, { active, setActive })
          : null
      )}
      {tabs.map((tab: any) =>
        tab.type.displayName === "TabsContent" && tab.props.value === active
          ? tab
          : null
      )}
    </div>
  );
}

export function TabsList({ children, active, setActive }: any) {
  return (
    <div className="flex gap-2 mb-4 border-b border-gray-300">
      {React.Children.map(children, (child: any) =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

export function TabsTrigger({ value, children, active, setActive }: any) {
  const isActive = active === value;
  return (
    <button
      className={`px-4 py-2 font-medium border-b-2 ${
        isActive ? "border-blue-600 text-blue-600" : "border-transparent"
      }`}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

Tabs.displayName = "Tabs";
TabsList.displayName = "TabsList";
TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";
