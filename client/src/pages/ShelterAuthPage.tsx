import React from 'react';

type AuthType = 'signup' | 'login';

export function ShelterAuthPage({ mode }: { mode: AuthType }): JSX.Element {
  return (
    <div className="">
      <h1 className="text-blue-500">Hello World</h1>
    </div>
  );
}
