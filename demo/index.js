import React from "react";
import ReactDOM from "react-dom";

// import styled from "styled-components";

import { DesignerProvider, WidgetItem, DropContainer, DropItem } from "../src";

import widgets from "./widgets";

import "../src/style";

// const Container = styled.div``;

function DropContainerDemo({ pid = null, title, canDrop }) {
    return (
        <DropContainer pid={pid} canDrop={canDrop}>
            {(items, { monitor, canDrop }) => {
                return (
                    <div
                        style={{
                            border: canDrop
                                ? "1px solid green"
                                : "1px solid #ccc",
                            flex: 1
                        }}
                    >
                        <h3>{title}</h3>
                        <hr />
                        {items.map(item => {
                            return (
                                <DropItem key={item.fieldId} item={item}>
                                    {({
                                        isDragging,
                                        isHover,
                                        isOver,
                                        isTmp
                                    }) => {
                                        return (
                                            <div
                                                style={{
                                                    opacity: isDragging
                                                        ? 0.5
                                                        : 1,
                                                    padding: 10,
                                                    margin: 5,
                                                    background: "#f2f2f2",
                                                    border: "1px solid #dadada"
                                                }}
                                            >
                                                {item.title}({item.fieldId})
                                            </div>
                                        );
                                    }}
                                </DropItem>
                            );
                        })}
                    </div>
                );
            }}
        </DropContainer>
    );
}

function App() {
    const [metadata, onMetadataChange] = React.useState({
        items: []
    });

    // console.log("items,", metadata);

    return (
        <DesignerProvider metadata={metadata} onChange={onMetadataChange}>
            <div
                style={{
                    display: "flex",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }}
            >
                <div
                    style={{
                        width: 240,
                        flex: "none"
                    }}
                >
                    {widgets.map(widget => {
                        return (
                            <WidgetItem
                                key={widget.xtype}
                                disabled={widget.xtype === "EX_URL_FIELD"}
                                getInstance={() => ({
                                    ...widget.data()
                                })}
                            >
                                <div
                                    style={{
                                        height: 32,
                                        lineHeight: `32px`,
                                        padding: "0 20px"
                                    }}
                                >
                                    {widget.title}
                                </div>
                            </WidgetItem>
                        );
                    })}
                </div>
                <DropContainerDemo title="A" />
                <DropContainerDemo pid="b" title="B" />
                <DropContainerDemo pid="c" title="C" />
                <DropContainerDemo
                    pid="d"
                    title="D"
                    canDrop={item => {
                        return item.xtype === "EX_TEXTAREA_FIELD";
                    }}
                />
            </div>
        </DesignerProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
