# Name: FileUpload
## Component Overview

**Purpose**: A dedicated file upload component with drag-and-drop support, file type restrictions, multiple file selection, and visual feedback for file upload operations.

**Import**: Automatic - no need to import any DS components

### Basic Usage

```tsx

const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined)

<FileUpload
    value={uploadedFile}
    onChange={setUploadedFile}
    labelValue="Upload Document"
    placeholder="Select a file or drag it here"
/>
```

---

### Props API

#### value
Controls the uploaded file(s). Type: `File | File[] | undefined` (default: `undefined`)

#### onChange
Callback fired when files are selected or uploaded. Type: `(file: File | File[] | undefined) => void`

#### labelValue
The label displayed above the file upload area. Type: `string` (default: `""`)

#### accept
Specifies the types of files that can be uploaded. Type: `string` (default: `undefined`)

```tsx

const [image, setImage] = useState<File | undefined>(undefined)

<FileUpload
    value={image}
    onChange={setImage}
    labelValue="Upload Image"
    accept=".jpg,.jpeg,.png,.gif"
    infoMessage="Only image files allowed"
/>
```

#### multiple
Allows multiple file selection. Type: `boolean` (default: `false`)

#### isError
Activates error styling mode. Type: `boolean` (default: `false`)

#### errorMessage
Error message to display when in error state. Type: `string` (default: `""`)

#### infoMessage
Informational message displayed with tooltip. Type: `string` (default: `""`)

#### size
File upload component size. Type: `'small' | 'medium' | 'large'` (default: `"medium"`)

#### disabled
Disables file upload interaction. Type: `boolean` (default: `false`)

#### placeholder
Placeholder text for the file upload area. Type: `string` (default: `"or drag and drop it here"`)

---

### Events API

#### onChange
Triggered when files are selected or uploaded. Receives the File object(s) or undefined when files are removed.

---

### Children API

#### uploadedFile slot
Custom content for displaying uploaded file information. This children prop is shown when files are successfully uploaded and allows complete customization of the file display.

**Important Notes:**
- Full drag-and-drop support for intuitive file selection
- File type restrictions using the `accept` attribute (MIME types or file extensions)
- Support for single or multiple file uploads
- Visual feedback during drag operations with blur effect
- Customizable file display through the `uploadedFile` children prop
- Responsive sizing options from extra small to full width
- Built-in accessibility features and keyboard navigation
- Error handling and visual feedback for upload failures
- Disabled state support to prevent uploads when needed
- Clean, modern UI with consistent design system integration