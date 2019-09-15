import React from "react";
import { useDrag } from "react-dnd";
import invariant from "invariant";
import DesignerContext from "../DesignerContext";

export default function WidgetItem({ children, getInstance, ...props }) {
    const designer = React.useContext(DesignerContext);

    const [collectProps, connectDragSource] = useDrag({
        item: {
            type: designer.getScope()
        },

        begin(monitor) {
            const item = getInstance();

            designer.addItem(item);

            console.log(item, designer.getScope(), "new instance");

            return {
                type: designer.getScope(),
                item: item
            };
        },
        end(item, monitor) {
            designer.clearTmpItems();
        },
        collect(monitor) {
            return {
                isDragging: monitor.isDragging()
            };
        }
    });

    invariant(
        typeof getInstance === "function",
        "WidgetItem getInstance must be function!"
    );

    invariant(
        typeof children === "function",
        "WidgetItem children must be function!"
    );

    return children(connectDragSource, collectProps);
}
