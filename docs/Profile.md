# Name: Profile
## Component Overview

**Purpose**: A user profile dropdown component with account switching capabilities, profile management actions, and customizable content areas for user authentication workflows.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [selectedAccount, setSelectedAccount] = useState(...)
const currentUser = { name: "John Doe", picture: "/avatar.jpg" }
const userAccounts = [...]

const handleLogout = () => {}
const editProfile = () => {}
const editAccount = () => {}
const openPrivacyPolicy = () => {}
const openTermsOfUse = () => {}

<Profile
    value={selectedAccount}
    onChange={setSelectedAccount}
    name={currentUser.name}
    picture={currentUser.picture}
    options={userAccounts}
    onLogout={handleLogout}
    onEdit={editProfile}
    onEditOption={editAccount}
    onPrivacyPolicyFunction={openPrivacyPolicy}
    onTermsOfUseFucntion={openTermsOfUse}
    editSlot="Edit profile"
    editOption="Edit account"
    logoutSlot="Logout"
    privacyPolicy="Privacy Policy"
    termsOfUse="Terms Of Use"
/>
```

---

### Props API

#### value
The currently selected account/profile option. Type: `any` (default: `undefined`)

#### onChange
Callback fired when an account is selected. Type: `(value: any) => void`

#### name
The main user name displayed in the profile. Type: `string` (required)

#### picture
URL of the user's profile picture image. Type: `string` (default: `""`)

#### options
Array of account options for multi-account selection. Type: `any[]` (default: `[]`)

#### labelKey
Property name for option labels in the options array. Type: `string` (default: `"label"`)

#### valueKey
Property name for option values in the options array. Type: `string` (default: `"value"`)

#### absolute
Controls absolute positioning of the dropdown. Type: `boolean` (default: `false`)

#### disabled
Disables the profile interaction. Type: `boolean` (default: `false`)

#### getObject
Returns complete objects instead of just values when enabled. Type: `boolean` (default: `false`)

---

### Events API

#### onChange
Triggered when an account is selected. Receives the selected value or object.

#### onLogout
Triggered when the logout action is clicked.

#### onEdit
Triggered when the edit profile action is clicked.

#### onEditOption
Triggered when the edit account action is clicked.

#### onPrivacyPolicyFunction
Triggered when the privacy policy link is clicked.

#### onTermsOfUseFucntion
Triggered when the terms of use link is clicked.

### Children API

#### editSlot
Custom content for the edit profile button. Pass via `editSlot` prop.

#### editOption
Custom content for the edit account button. Pass via `editOption` prop.

#### logoutSlot
Custom content for the logout button. Pass via `logoutSlot` prop.

#### option (render prop)
Custom rendering for account selection options.

```tsx
<Profile
    value={selectedAccount}
    onChange={setSelectedAccount}
    name={userName}
    options={accounts}
    option={({ option, index, active }) => (
        <div className="flex items-center gap-xs">
            <Icon name="account_circle" />
            <span className={active ? 'underline' : ''}>{option.label}</span>
        </div>
    )}
/>
```

#### privacyPolicy
Custom content for the privacy policy link. Pass via `privacyPolicy` prop.

#### termsOfUse
Custom content for the terms of use link. Pass via `termsOfUse` prop.

**Important Notes:**
- Built on top of SelectContainer for consistent dropdown behavior and styling
- Integrated search functionality for filtering through multiple accounts when available
- Profile picture support with fallback to default icon when no image is provided
- Flexible account/profile switching with support for both simple values and complex objects
- Customizable action buttons for profile management, account editing, and logout functionality
- Built-in privacy policy and terms of use links with customizable content and actions
- Prop-based architecture allows complete customization of account list options and action buttons
- Responsive dropdown positioning prevents viewport overflow issues
- Keyboard navigation support for accessibility compliance
- Event-driven architecture enables integration with authentication and user management systems
- Support for disabled state to prevent interaction during loading or unauthorized access
- Absolute positioning option for complex layout scenarios
- Search functionality helps users quickly find specific accounts in long lists
- Professional styling suitable for both consumer and enterprise applications