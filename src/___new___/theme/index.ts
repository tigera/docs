import { extendTheme, ThemeConfig } from '@chakra-ui/react';
import colors from './colors';
import global from './global';

import Table from './components/Table';
import Input from './components/Input';
import Textarea from './components/Textarea';
import Heading from './components/Heading';
import NumberInput from './components/NumberInput';
import Select from './components/Select';
import FormLabel from './components/FormLabel';
import Form from './components/Form';
import Progress from './components/Progress';
import Menu from './components/Menu';
import Modal from './components/Modal';
import Checkbox from './components/Checkbox';
import Radio from './components/Checkbox';
import Tabs from './components/Tabs';
import Button from './components/Button';

const config: ThemeConfig = {
  initialColorMode: 'system',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  styles: {
    global: () => global,
  },
  layerStyles: {
    docsGradientBlueGreen: {
      backgroundImage: 'linear-gradient(to right bottom, #7e70ff, #b366ed, #d75fd8, #ef5bc1, #ff5eab)',
    },
  },
  components: {
    Tabs,
    Table,
    Heading,
    Select,
    Input,
    NumberInput,
    Checkbox,
    Radio,
    FormLabel,
    Form,
    Menu,
    Modal,
    Progress,
    Textarea,
    Button,
  },
  fontSizes: {
    xxs: '0.625rem',
  },
  sizes: {
    100: '25rem',
  },
});

export { theme };
