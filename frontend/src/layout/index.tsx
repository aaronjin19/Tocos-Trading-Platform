import { HeaderComponent } from "./Header";

interface LayoutProps {
  children?: React.ReactNode;
}

export const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="w-full h-full">
      <HeaderComponent />
      <aside className="flex h-[calc(100vh-72px)]">
        <section className="w-full h-full bg-black p-5">{children}</section>
      </aside>
    </main>
  );
};

export const WithLayout = (Component: React.FC) => () => {
  return (
    <LayoutComponent>
      <Component />
    </LayoutComponent>
  );
};
