// next.config's experimental.viewTransition swaps React for the experimental
// build, which exports <ViewTransition>. @types/react still tracks the stable
// build, so the component has to be declared here.
import "react";

declare module "react" {
  interface ViewTransitionProps {
    children?: ReactNode;
    name?: string;
    default?: string;
    enter?: string;
    exit?: string;
    update?: string;
    share?: string;
  }

  const ViewTransition: React.FC<ViewTransitionProps>;
}
