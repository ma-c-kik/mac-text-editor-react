# text-editor-react

A text editor for react with parser to save content to database and render using provided function. The package provides options for bold, italics, underline, add link, justify content, undo, redo and 6 headings. 

All the buttons and textfield are fully customizable with minimal styles preapplied to get you started.

The buttons can be removed as per user needs.

## Installation and Setup

* Install text-editor-react
```bash
npm install text-editor-react
```

* Include fontawesome cdn in your html for icons to work
[https://fontawesome.com/](https://fontawesome.com/)

## Usage

### Simple Example
```jsx
import React from "react";
import { TextEditor } from "text-editor-react";

function MyComponent() {
    const id = "my-unique-id";

    return (
        <TextEditor
        id={id}        //  required
        />
    );
}
```

### How to save content?

```jsx
import React from "react";
import { TextEditor, getInnerHtml } from "text-editor-react";

function MyComponent() {
    const id = "my-unique-id";

    const saveContent = () => {
        const content = getInnerHtml(id);
        // This is the part where you save the content
        // to the database
    };

    return (
        <div>
            <TextEditor
            id={id}
            />
            <button onClick={saveContent}>Save</button>
        </div>
    );
}
```

### How to render content saved in database?

```jsx
import React, { useEffect } from "react";
import { addContentTo } from "text-editor-react";

function MyComponent() {
    const targetDiv = "target-div";

    const content = `<p>Hello World!</p>`;

    useEffect(() => {
        addContentTo(content, targetDiv);
        //  Provide content and id of the div you want to
        //  add the content to
    }, []);

    return (
        <React.Fragment>
            <div id={targetDiv}></div>
            <button onClick={addContent}>Add Content</button>
        </React.Fragment>
    );
}
```
