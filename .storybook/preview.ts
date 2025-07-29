import { setup, Preview } from "@storybook/vue3-vite";
import { addons } from "storybook/manager-api";
import { provide } from "vue";
import Sute from "../src/index";
import "../src/assets/main.css";
import { briusTheme, etusTheme } from "./themes";

const withTheme = (story: any, context: any) => {
  const theme = context.parameters.theme || context.globals.theme;
  const storyTheme = theme === "etus" ? etusTheme : briusTheme;

  addons.setConfig({
    theme: storyTheme,
  });

  return {
    setup() {
      provide("theme", storyTheme);
      const storyResult = story();
      return { storyResult };
    },
    template: `<div class="${theme}-theme"><story /></div>`,
  };
};

setup((app) => {
  app.use(Sute);
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      sort: 'alpha',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1a1a1a' },
        { name: 'neutral', value: '#f5f5f5' },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: { width: '375px', height: '667px' }
        },
        tablet: {
          name: 'Tablet', 
          styles: { width: '768px', height: '1024px' }
        },
        desktop: {
          name: 'Desktop',
          styles: { width: '1440px', height: '900px' }
        }
      }
    },
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'focus-trap',
            enabled: true,
          },
        ],
      },
    },
    designToken: {
      tabs: [
        'Colors', 'BColors', 'Typography', 'Spacing', 
        'BorderRadius', 'BoxShadow', 'FontFamily', 'FontSize', 'FontWeight', 'LineHeight'
      ]
    },
    options: {
      storySort: {
        order: [
          "Getting Started",
          ["Introduction", "Installation", "Usage", "Migration Guide"],
          "Design Tokens",
          ["Colors", "Typography", "Spacing", "Shadows", "Breakpoints"],
          "Foundation",
          ["BIcon", "BSpinner", "BDivider"],
          "Form Controls",
          ["BInput", "BSelect", "BCheckbox", "BRadio", "BToggle", "BSlider", "BRangeSlider", "BColorPicker", "BDatePicker", "BAutoComplete", "BMultiSelect", "BTagInput", "BTagSelect"],
          "Buttons & Actions", 
          ["BButton", "BRoundButton", "BRadioButton"],
          "Navigation",
          ["BNavbar", "BBreadcrumb", "BMenu", "BSideMenu", "BTab", "BPagination"],
          "Layout & Containers",
          ["BCard", "BCardIcon", "BCollapse", "BDialog", "BDropdown", "BExpandableContainer", "BGroup", "BSidebar", "BContentScreen"],
          "Data Display",
          ["BTable", "BProgressBar", "BAvatar", "BTag", "BMetricCard", "BActionCard", "BProfile", "BHistory"],
          "Feedback & Status",
          ["BAlert", "BToast", "BTooltip", "BConfirm"],
          "Advanced Components",
          ["BCrop", "BDate", "BDateComparator", "BDateComparatorFilter", "BDateFilter", "BFilter", "BStepper", "BStepOption", "BSmartSelect", "BSelectContainer", "BRoundMenu"],
          "*"
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme for components",
      defaultValue: "etus",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "etus", icon: "circle", title: "Etus" },
          { value: "brius", icon: "circle", title: "Brius" },
        ],
        showName: true,
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
};

export default preview;
