import { useEffect, useState } from 'react';
import { layout, prepare } from '@chenglou/pretext';

const statement = 'Good software makes complex systems feel possible.';

export function PretextStatement() {
  const [lineCount, setLineCount] = useState(1);
  useEffect(() => {
    try {
      const prepared = prepare(statement, '600 24px system-ui');
      setLineCount(layout(prepared, 520, 32).lineCount);
    } catch {
      setLineCount(1);
    }
  }, []);
  return <div className="pretext-statement" data-lines={lineCount}><p>{statement}</p></div>;
}
