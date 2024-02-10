import { HiArrowLeft, HiViewBoards, HiUser } from 'react-icons/hi';
import { Sidebar as FlowbiteSidebar } from 'flowbite-react';

const Sidebar = function ({ content = [] }) {
    return (
        <FlowbiteSidebar>
            <FlowbiteSidebar.Items className="flex flex-col h-full justify-between">
                <FlowbiteSidebar.ItemGroup>
                    {content.map((element, index) => (
                        <FlowbiteSidebar.Item key={index} {...element}>
                            {element.text}
                        </FlowbiteSidebar.Item>
                    ))}
                </FlowbiteSidebar.ItemGroup>
                <FlowbiteSidebar.ItemGroup className="py-4">
                    <FlowbiteSidebar.Item href="/profile" icon={HiUser}>
                        Profil
                    </FlowbiteSidebar.Item>
                    <FlowbiteSidebar.Item
                        href="/auth/logout"
                        icon={HiArrowLeft}
                    >
                        Déconnexion
                    </FlowbiteSidebar.Item>
                </FlowbiteSidebar.ItemGroup>
            </FlowbiteSidebar.Items>
        </FlowbiteSidebar>
    );
};

export default Sidebar;
