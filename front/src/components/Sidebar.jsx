import {useState} from "react";
import {HiChartPie, HiViewBoards} from "react-icons/hi";
import {Sidebar as FlowbiteSidebar} from "flowbite-react";
import {BiBuoy} from "react-icons/bi";

const Sidebar = function ({content = []}) {
    const [isOpen, setOpen] = useState(false);

    return (
        <FlowbiteSidebar>
            <FlowbiteSidebar.Items className="flex flex-col h-full justify-between">
                <FlowbiteSidebar.ItemGroup>
                    {content.map((element, index)=>(
                        <FlowbiteSidebar.Item key={index} {...element}>
                            {element.text}
                        </FlowbiteSidebar.Item>
                    ))}
                </FlowbiteSidebar.ItemGroup>
                <FlowbiteSidebar.ItemGroup className="py-4">
                    <FlowbiteSidebar.Item href="#" icon={HiChartPie}>
                        Upgrade to Pro
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item href="#" icon={HiViewBoards}>
                        Documentation
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item href="#" icon={BiBuoy}>
                        Help
                    </FlowbiteSidebar.Item>
                </FlowbiteSidebar.ItemGroup>
            </FlowbiteSidebar.Items>
        </FlowbiteSidebar>
    );
};

export default Sidebar;
