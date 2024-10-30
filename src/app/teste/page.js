'use client'

import { Button, Tab, TabPanel, Tabs, TabsBody, TabsHeader } from "@material-tailwind/react";
import { useState } from 'react';

function App() {
  const [activeTab, setActiveTab] = useState(0);

  const goToTab = (index) => {
    setActiveTab(index);
  };

  const tabsData = [
    { label: "Aba 1", component: "Conteúdo da Aba 1" },
    { label: "Aba 2", component: "Conteúdo da Aba 2" },
    { label: "Aba 3", component: "Conteúdo da Aba 3" },
  ];

  return (
    <div className="container mx-auto p-5">

      <Tabs value={activeTab}>
        <TabsHeader className='shadow-md bg-cyan-800'>
          {tabsData.map((tab, index) => (
            <Tab key={index} value={index} onClick={() => setActiveTab(index)}>
              {tab.label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabsData.map((tab, index) => (
            <TabPanel key={index} value={index} active={activeTab === index}>
              {tab.component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>

      <div className="mt-4 flex gap-2">
        <Button onClick={() => goToTab(0)}>Ir para Aba 1</Button>
        <Button onClick={() => goToTab(1)}>Ir para Aba 2</Button>
        <Button onClick={() => goToTab(2)}>Ir para Aba 3</Button>
      </div>
    </div>
  );
}

export default App;