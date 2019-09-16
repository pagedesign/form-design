import React from "react";
import { findDOMNode } from "react-dom";
import { useDrag } from "react-dnd";
import invariant from "invariant";
import withHooks from "with-component-hooks";
import DesignerContext from "../DesignerContext";

class WidgetItem extends React.Component {
    _connectDragSource = null;

    connectDrag() {
        const { disabled } = this.props;

        const dom = findDOMNode(this);
        if (this._connectDragSource) {
            this._connectDragSource(disabled ? null : dom);
        }
    }

    componentDidMount() {
        this.connectDrag();
    }

    componentDidUpdate() {
        this.connectDrag();
    }

    render() {
        const {
            children,
            getInstance,
            component: Component = "div",
            ...props
        } = this.props;

        const designer = React.useContext(DesignerContext);

        const [collectProps, connectDragSource] = useDrag({
            item: {
                type: designer.getScope()
            },

            begin(monitor) {
                const item = getInstance();

                designer.addTmpItem(item);

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

        this._connectDragSource = connectDragSource;

        return typeof children === "function"
            ? children(collectProps)
            : children;
    }
}

export default withHooks(WidgetItem);

// export default function WidgetItem({
//     children,
//     getInstance,
//     component: Component = "div",
//     ...props
// }) {
//     const designer = React.useContext(DesignerContext);

//     const [collectProps, connectDragSource] = useDrag({
//         item: {
//             type: designer.getScope()
//         },

//         begin(monitor) {
//             const item = getInstance();

//             designer.addTmpItem(item);

//             return {
//                 type: designer.getScope(),
//                 item: item
//             };
//         },
//         end(item, monitor) {
//             designer.clearTmpItems();
//         },
//         collect(monitor) {
//             return {
//                 isDragging: monitor.isDragging()
//             };
//         }
//     });

//     invariant(
//         typeof getInstance === "function",
//         "WidgetItem getInstance must be function!"
//     );

//     // invariant(
//     //     typeof children === "function",
//     //     "WidgetItem children must be function!"
//     // );

//     return (
//         <Component {...props} ref={connectDragSource}>
//             {children}
//         </Component>
//     );

//     // return children(connectDragSource, collectProps);
// }
