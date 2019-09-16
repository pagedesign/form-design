import data from "../common/data";
import PropertyPanel from "./PropertyPanel";
import icon from "./icon.png";

const XType = "EX_URL_FIELD";
const Title = "URL";

export default {
    xtype: "EX_URL_FIELD",
    title: "URL",
    icon: icon,
    WidgetProperty: PropertyPanel,

    data() {
        return {
            ...data(),
            xtype: XType,
            title: Title
        };
    }
};
