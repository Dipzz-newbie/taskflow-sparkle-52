import React, { useEffect, useState } from 'react';

interface RouteProps {
  path: string;
  component: React.ComponentType;
}

export const Route: React.FC<RouteProps> = () => null;

interface RouterProps {
  children: React.ReactNode;
}

export const Router: React.FC<RouterProps> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(
    window.location.hash.slice(1) || '/'
  );

  useEffect(() => {
    const handleHashChange = () =>
      setCurrentPath(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RouteProps>(child)) {
          return child.props.path === currentPath ? (
            <child.props.component />
          ) : null;
        }
        return null;
      })}
    </>
  );
};
