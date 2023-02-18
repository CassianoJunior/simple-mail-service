import { Sidebar } from './components/Sidebar';

const App = () => {
  return (
    <div className="grid grid-cols-[1fr_2fr_5fr]">
      <Sidebar />
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </div>
  );
};

export { App };
