import AceEditor from "react-ace";
import React from "react";
import "ace-builds/src-noconflict/theme-github";

// As default export a function that takes in props and returns a css styled textarea based on the props
export default props => {
    // Props passed from parent
    // Title - title of the textarea
    // value - text in the textarea
    // readOnly - Boolean if the textarea is read only or not
    // onChange - A function to handle the on change event of the textarea
    const {title, value, readOnly, onChange} = props;
    // Return an Ace editor text field populated with the values from the props
    return <div className={"section"}>
        <div className={"title"}>{title}</div>
        <AceEditor
            className={"textarea"}
            value={value}
            mode="text"
            theme="github"
            name={`${title}-text-area`}
            editorProps={{$blockScrolling: true}}
            width={"auto"}
            readOnly={readOnly}
            onChange={onChange}
        />
    </div>
}

