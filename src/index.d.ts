import * as React from "react";

declare namespace FormDesignCore {
    interface Item {
        $pid: any;
        fieldId: any;
        [propName: string]: any;
    }

    interface DesignerProps {
        metadata: { items: Item[] };
        widgets: Item[];
        onChange: (metadata: { items: Item[] }) => void;
        renderWidgetList: (
            widgets: Array<{ props: { item: Item } }>
        ) => JSX.Element;
    }

    export class Designer extends React.Component<DesignerProps, {}> {
        render(): JSX.Element;
    }
}

declare const Designer = FormDesignCore.Designer;

export default Designer;
