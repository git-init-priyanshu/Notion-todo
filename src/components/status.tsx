import * as React from 'react';

type StatusPropType = {
  status: string;
}
export default function Status({ status }: StatusPropType) {
  return (
    <div>
      {status}
    </div>
  )
}
