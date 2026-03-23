# Name: Navbar
## Component Overview

**Purpose**: A comprehensive navigation bar component with logo area, dropdown menu navigation, notifications system, and user profile integration for application headers.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [selectedOption, setSelectedOption] = useState("dashboard")

const userProfile = {
    name: "John Doe",
    src: "/avatar.jpg"
}

const navigationOptions = [
    {
        label: "Dashboard",
        value: "dashboard",
        icon: "dashboard"
    },
    {
        label: "Analytics",
        value: "analytics",
        icon: "analytics",
        options: [
            { label: "Reports", value: "reports", icon: "assessment" },
            { label: "Metrics", value: "metrics", icon: "bar_chart" }
        ]
    },
    {
        label: "Settings",
        value: "settings",
        icon: "settings",
        bottom: true
    }
]

<Navbar
    value={selectedOption}
    onChange={setSelectedOption}
    title="My Application"
    options={navigationOptions}
    profile={userProfile}
    notifications={
        <div className="p-base max-w-sm">
            <h4 className="font-semibold msm">Recent Activity</h4>
            <div className="space-y-xs">
                <div className="text-sm">New user registered</div>
                <div className="text-sm">System backup completed</div>
                <div className="text-sm">5 new messages</div>
            </div>
        </div>
    }
/>
```

---

### Props API

#### value
The currently selected navigation option. Type: `Option` (default: `undefined`)

```typescript
type Option = {
  label: string;        // Display text for the option
  value: string;        // Unique identifier
  icon?: string;        // Optional icon name
  disabled?: boolean;   // Whether the option is disabled
  bottom?: boolean;     // Whether to display at bottom of menu
  options?: Option[];       // Nested suboptions
}
```

#### onChange
Callback fired when a navigation option is selected. Type: `(option: Option) => void`

#### title
Title text displayed in the navbar brand area. Type: `string` (default: `""`)

#### options
Array of navigation menu options with nested support. Type: `Option[]` (default: `undefined`)

#### profile
User profile information for avatar display. Type: `Profile` (default: `undefined`)

```typescript
type Profile = {
  name: string;    // User's display name
  src?: string;    // Optional avatar image URL
}
```

#### labelKey
Property name used for displaying option labels when using object arrays. Type: `string` (default: `"label"`)

#### valueKey
Property name used for option values when using object arrays. Type: `string` (default: `"value"`)

#### getObject
Returns complete objects instead of just values when enabled. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when a navigation option is selected. Receives the selected option object.

### Children API

#### children
Custom navigation content in the center area.

#### logo
Complete replacement for the logo and title area. Pass via `logo` prop.

#### title (prop)
Custom content for the title area (when using default logo).

#### actions
Custom content for the right side actions area. Pass via `actions` prop.

#### notifications
Content displayed in the notifications dropdown panel. Pass via `notifications` prop.

**Important Notes:**
- Built-in notification system with customizable dropdown content and positioning
- Dropdown menu integration with Dropdown component for navigation hierarchy
- User profile avatar display with Avatar component integration
- Flexible prop system allows complete customization of logo, navigation, and actions
- Responsive design adapts to different screen sizes and layouts
- Dynamic positioning system for notifications dropdown prevents viewport overflow
- Smooth transitions and animations for enhanced user experience
- Keyboard navigation support for accessibility compliance
- Z-index management ensures proper layering over page content
- Support for nested navigation options with unlimited depth
- Bottom-aligned menu options for logout/settings functionality