import { Suspense } from "react";
import ConfiguratorRoot from "../components/configurator/ConfiguratorRoot";

export const metadata = {
  title: "Design Your Hoodie | HoodiesHome",
};

export default function CustomizePage() {
  return (
    <Suspense fallback={null}>
      <ConfiguratorRoot />
    </Suspense>
  );
}
