import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { foo } from '../../src';

ReactDOM.render(
  <p>
    {foo}
  </p>,
  document.getElementById('app')
);
