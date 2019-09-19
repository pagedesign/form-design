import React from "react";
import { findDOMNode } from "react-dom";
import { useDrop } from "react-dnd";
import propTypes from "prop-types";
import withHooks from "with-component-hooks";
import { ACTION_ADD, ACTION_SORT } from "../constants";
import DesignerContext from "../DesignerContext";

function _canDrop(pid, item, designer) {
    //子容器拖动过程中不再接受释放处理
    // const pid = props.pid;
    const dragItemFieldId = item.fieldId;
    const targetPids = pid ? designer.getPids(pid) : [];
    pid && targetPids.push(pid);
    //解决父节点拖动到子节点的情况
    return targetPids.indexOf(dragItemFieldId) === -1;
}

class DropContainer extends React.Component {
    static propTypes = {
        pid: propTypes.any,
        disabled: propTypes.bool,
        collect: propTypes.func,
        canDrop: propTypes.func,
        hover: propTypes.func,
        drop: propTypes.func,
        onDrop: propTypes.func
    };

    static defaultProps = {
        pid: null
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
            onDrop,
            collect,
            children
        } = this.props;

        const designer = React.useContext(DesignerContext);
        const DropContainerContext = designer.DropContainerContext;
        const { isRootContainer } = React.useContext(DropContainerContext);

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

                if (!monitor.canDrop()) {
                    //|| !_canDrop(pid, item, designer)
                    return;
                }

                designer.updateItemPid(item, pid);
            },

            drop({ item }, monitor) {
                if (drop) {
                    drop(item, monitor);
                }

                if (onDrop) {
                    //TODO:???
                }

                //根节点统一commit
                if (isRootContainer) {
                    const isTmpItem = designer.isTmpItem(item);
                    console.log("commit");
                    designer.commitItem(item);

                    designer.fireEvent("onDrop", {
                        target: item,
                        action: isTmpItem ? ACTION_ADD : ACTION_SORT
                    });
                }

                // if (!monitor.didDrop()) {
                //     //TODO:
                // }

                //根节点统一commit
                // if (null == pid) {
                //     designer.commitItem(item);
                // }
            },

            collect: monitor => {
                const ext = collect ? collect(monitor) : {};

                return {
                    monitor,
                    canDrop: monitor.canDrop(),
                    isOver: monitor.isOver(),
                    isStrictlyOver: monitor.isOver({ shallow: true }),
                    ...ext
                };
            }
        });

        let items = designer.getItems(pid);
        if (!collectedProps.isOver) {
            items = items.filter(item => !designer.isTmpItem(item));
        }

        this._connectDropTarget = connectDropTarget;

        console.log("DropContainerContext");

        const child =
            typeof children === "function"
                ? children(items, collectedProps)
                : children;

        React.Children.only(child);

        return (
            <DropContainerContext.Provider
                value={{
                    isRootContainer: false,
                    canDrop: canDrop
                }}
            >
                {child}
            </DropContainerContext.Provider>
        );
    }
}

export default withHooks(DropContainer);
