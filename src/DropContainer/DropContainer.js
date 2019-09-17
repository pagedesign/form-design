import React from "react";
import { findDOMNode } from "react-dom";
import { useDrop } from "react-dnd";
import propTypes from "prop-types";
import withHooks from "with-component-hooks";

// import DropItem from "./DropItem";

import DesignerContext from "../DesignerContext";

function canDrop(pid, item, designer) {
    //子容器拖动过程中不再接受释放处理
    // const pid = props.pid;
    const dragItemFieldId = item.fieldId;
    const targetPids = pid ? designer.getPids(pid) : [];
    pid && targetPids.push(pid);
    //解决父节点拖动到子节点的情况
    return targetPids.indexOf(dragItemFieldId) === -1;
}

class DropContainer extends React.Component {
    static defaultProps = {
        collect: propTypes.func,
        canDrop: propTypes.func,
        hover: propTypes.func,
        drop: propTypes.func
    };

    _connectDropTarget = null;

    connectDrop() {
        const { disabled } = this.props;

        const dom = findDOMNode(this);
        if (this._connectDropTarget) {
            this._connectDropTarget(disabled ? null : dom);
        }
    }

    componentDidMount() {
        this.connectDrop();
    }

    componentDidUpdate() {
        this.connectDrop();
    }

    render() {
        const {
            pid = null,
            canDrop,
            hover,
            drop,
            collect,
            children
        } = this.props;
        const designer = React.useContext(DesignerContext);

        const [collectedProps, connectDropTarget] = useDrop({
            accept: designer.getScope(),

            canDrop({ item }, monitor) {
                if (canDrop) {
                    return canDrop(item, monitor);
                }

                return true;
            },

            hover({ item }, monitor) {
                if (hover) {
                    hover(item, monitor);
                }

                const isOver = monitor.isOver({ shallow: true });
                if (!isOver) return;

                if (!monitor.canDrop() || !canDrop(pid, item, designer)) return;

                designer.updateItemPid(item, pid);
            },

            drop({ item }, monitor) {
                if (drop) {
                    drop(item, monitor);
                }

                //根节点统一commit
                if (null == pid) {
                    designer.commitItem(item);
                }
            },

            collect: monitor => {
                return {
                    monitor,
                    canDrop: monitor.canDrop(),
                    isOver: monitor.isOver(),
                    isHover: monitor.isOver({ shallow: true }),
                    ...(collect ? collect(monitor) : {})
                };
            }
        });

        this._connectDropTarget = connectDropTarget;

        return typeof children === "function"
            ? children(collectedProps)
            : children;
    }
}

// function DropContainer({
//     pid = null,
//     children,
//     component: Component = "div",
//     // renderItem = () =>
//     ...props
// }) {
//     const designer = React.useContext(DesignerContext);

//     const [collectedProps, connectDropTarget] = useDrop({
//         accept: designer.getScope(),
//         canDrop({ item }, monitor) {
//             return true;
//         },

//         hover({ item }, monitor) {
//             const isOver = monitor.isOver({ shallow: true });
//             if (!isOver) return;

//             if (!monitor.canDrop() || !canDrop(pid, item, designer)) return;

//             // const pid = props.pid;
//             // const dragItem = monitor.getItem();
//             // const item = dragItem.item;

//             designer.updateItemPid(item, pid);
//         },

//         drop({ item }, monitor) {
//             // const dragItem = monitor.getItem();

//             //根节点统一commit
//             if (null == pid) {
//                 designer.commitItem(item);
//             }
//         },

//         collect: monitor => {
//             return {
//                 monitor,
//                 canDrop: monitor.canDrop(),
//                 isOver: monitor.isOver(),
//                 isHover: monitor.isOver({ shallow: true })
//             };
//         }
//     });

//     // const childs = typeof children === "function" ? children(items) : childs;

//     let items = designer.getItems(pid);
//     if (!collectedProps.isOver) {
//         items = items.filter(item => !designer.isTmpItem(item));
//     }

//     invariant(
//         typeof children === "function",
//         "DropContainer children must be function!"
//     );

//     // return (
//     //     <Component {...props} ref={connectDropTarget}>
//     //         {children(items)}
//     //     </Component>
//     // );

//     return children(connectDropTarget, {
//         items,
//         ...collectedProps
//     });
// }

export default withHooks(DropContainer);
