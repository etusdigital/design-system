# Design System

Vue 3 Design System Components with Tailwind CSS

## 📦 Installation

```bash
npm install @etus/design-system
# or
pnpm install @etus/design-system
# or
yarn add @etus/design-system
```

## 🚀 Quick Start

### Global Registration (Recommended)

```js
import { createApp } from "vue";
import App from "./App.vue";
import DesignSystem from "design-system";
import "design-system/styles.css";

const app = createApp(App);
app.use(DesignSystem);
app.mount("#app");
```

### Individual Component Import

```js
import { Button, Alert, Card } from "design-system";

export default {
  components: {
    Button,
    Alert,
    Card,
  },
};
```

## 📖 Documentation

Visit our [Storybook documentation](https://etusdigital.github.io/design-system/) to see all available components and their usage examples.

## 🎨 Available Components

- **Layout**: Card, Container, Sidebar, Navbar
- **Forms**: Button, Input, Select, Checkbox, Radio, Switch
- **Data Display**: Table, Badge, Avatar, Progress Bar
- **Feedback**: Alert, Toast, Dialog, Spinner
- **Navigation**: Breadcrumb, Pagination, Tab, Stepper
- **And many more...**

## 🛠️ Development

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Run Storybook
yarn storybook

# Build library
yarn build

# Build Storybook
yarn build-storybook
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.
