import React from "react";
import ReactDOM from "react-dom";

// import styled from "styled-components";

import { DesignerProvider, WidgetItem, DropContainer, DropItem } from "../src";

import widgets from "./widgets";

import "../src/style";

// const Container = styled.div``;

function App() {
    const [metadata, onMetadataChange] = React.useState({
        items: []
    });

    console.log("items,", metadata);

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
                <DropContainer>
                    {(connect, { monitor, canDrop, items }) => {
                        return (
                            <div
                                ref={connect}
                                style={{
                                    border: canDrop
                                        ? "1px solid red"
                                        : "1px solid #ccc",
                                    flex: 1
                                }}
                            >
                                {items.map(item => {
                                    return (
                                        <DropItem>
                                            {connect => {
                                                return (
                                                    <div ref={connect}>
                                                        {item.title}(
                                                        {item.fieldId})
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
            </div>
        </DesignerProvider>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));
