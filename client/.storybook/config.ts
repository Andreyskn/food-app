import { configure } from '@storybook/react';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import './utils/styles.scss';
import '../src/styles/index.scss';

addDecorator(withKnobs);

const req = require.context('./stories', true, /\.stories\.tsx$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);