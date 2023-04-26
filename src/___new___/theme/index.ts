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

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors,
  styles: {
    global: () => global,
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
  },
  fontSizes: {
    xxs: '0.625rem',
  },
  sizes: {
    100: '25rem',
  },
});

export { theme };
