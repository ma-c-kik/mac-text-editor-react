import React from "react";
import PropTypes from "prop-types";

import "./TextEditor.css";

function TextEditor(props) {
    const id = props.id;
    const toolbarStyle = props.toolbarStyle;
    const toolItemStyle = props.toolItemStyle;
    const showHeadings = props.showHeadings;
    const showJustify = props.showJustify;
    const showUndoRedo = props.showUndoRedo;
    const editorStyle = props.editorStyle;

    const addLink = () => {
        const url = prompt("Add link:");
        document.execCommand("createLink", false, url);
    };

    function insertHeading(html) {
        var selection, range;
        if (window.getSelection) {
            selection = window.getSelection();
            if (selection.getRangeAt && selection.rangeCount) {
                range = selection.getRangeAt(0);
                range.deleteContents();
                var element = document.createElement("div");
                element.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = element.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    selection.removeAllRanges();
                    selection.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type !== "Control") {
            document.selection.createRange().pasteHTML(html);
        }
    }

    const handleClick = (value) => {
        document.execCommand([value], false, '');
    };

    const getHeadingButtons = () => {
        return [1, 2, 3, 4, 5, 6].map(number => <button
            key={number}
            className="tool-item heading-btn"
            style={toolItemStyle}
            onClick={() => insertHeading(`<h${number}>Heading ${number}</h${number}>`)}
        >
            H{number}
        </button>);
    };

    return (
        <React.Fragment>
            <div className="toolbar" style={toolbarStyle}>
                <div style={{ display: showHeadings ? "" : "none" }}>
                    {getHeadingButtons()}
                </div>
                <button
                    className="tool-item fa fa-bold"
                    style={toolItemStyle}
                    onClick={() => handleClick("bold")}
                />
                <button
                    className="tool-item fa fa-italic"
                    style={toolItemStyle}
                    onClick={() => handleClick("italic")}
                />
                <button
                    className="tool-item fa fa-underline"
                    style={toolItemStyle}
                    onClick={() => handleClick("underline")}

                />
                <button
                    className="tool-item fa fa-link"
                    style={toolItemStyle}
                    onClick={() => addLink()}
                />
                <div style={{ display: showJustify ? "" : "none" }}>
                    <button
                        className="tool-item fa fa-align-center"
                        style={toolItemStyle}
                        onClick={() => handleClick("justifyCenter")}
                    />
                    <button
                        className="tool-item fa fa-align-left"
                        style={toolItemStyle}
                        onClick={() => handleClick("justifyLeft")}
                    />
                    <button
                        className="tool-item fa fa-align-right"
                        style={toolItemStyle}
                        onClick={() => handleClick("justifyRight")}
                    />
                </div>
                <div style={{ display: showUndoRedo ? "" : "none" }}>
                    <button
                        className="tool-item fa fa-undo"
                        style={toolItemStyle}
                        onClick={() => handleClick("undo")}
                    />
                    <button
                        className="tool-item fa fa-repeat"
                        style={toolItemStyle}
                        onClick={() => handleClick("redo")}
                    />
                </div>
            </div>
            <div
                className="react-text-editor"
                id={id}
                contentEditable={true}
                suppressContentEditableWarning={true}
                style={editorStyle}
            >
                <p>Content</p>
            </div>
        </React.Fragment>
    );
}

const propTypes = {
    id: PropTypes.string.isRequired,
    showHeadings: PropTypes.bool,
    showUndoRedo: PropTypes.bool,
    showJustify: PropTypes.bool,
    toolbarStyle: PropTypes.object,
    toolItemStyle: PropTypes.object,
    editorStyle: PropTypes.object
};

const defaultProps = {
    id: "react-text-editor",
    showHeadings: true,
    showUndoRedo: true,
    showJustify: true,
    toolbarStyle: {},
    toolItemStyle: {},
    editorStyle: {}
};

TextEditor.propTypes = propTypes;
TextEditor.defaultProps = defaultProps;

const getTextContent = (id) => {
    const editorContent = document.querySelector(`#${id}`);
    return editorContent.textContent;
};

const getInnerHtml = (id) => {
    const editorContent = document.querySelector(`#${id}`);
    return editorContent.innerHTML;
};

const addContentTo = (content, id) => {
    const targetDiv = document.querySelector(`#${id}`);
    targetDiv.innerHTML = "";
    targetDiv.innerHTML += content;
};

const stringToHtml = (originalStr) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(originalStr, 'text/html');
    return doc.body.innerHTML;
};

export {
    TextEditor,
    getTextContent,
    getInnerHtml,
    addContentTo,
    stringToHtml
};
