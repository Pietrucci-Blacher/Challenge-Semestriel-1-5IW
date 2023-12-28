import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import Image from 'next/image';
import { useAuthContext } from '@/providers/AuthProvider';

export default function Header() {
    const { user } = useAuthContext();
    return (
        <header className="sticky top-0">
            <Navbar fluid rounded>
                <Navbar.Brand href="/">
                    <Image
                        alt="Flowbite logo"
                        height="32"
                        src="https://flowbite.com/docs/images/logo.svg"
                        width="32"
                    />
                    <span className="self-center whitespace-nowrap pl-3 text-xl font-semibold dark:text-white">
                        Flowbite
                    </span>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <DarkThemeToggle className="mx-4" />
                    {user && (
                        <Dropdown
                            inline
                            label={
                                <Avatar
                                    alt="User settings"
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded
                                />
                            }
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {user.lastname} {user.firstname}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {user.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item>Dashboard</Dropdown.Item>
                            <Dropdown.Item>Settings</Dropdown.Item>
                            <Dropdown.Item>Earnings</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/auth/logout">
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    )}
                    <Navbar.Toggle />
                </div>

                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    <Navbar.Link href="#">About</Navbar.Link>
                    <Navbar.Link href="#">Contact</Navbar.Link>
                    {user && (
                        <Navbar.Link href="/establishment/">
                            Etablissements
                        </Navbar.Link>
                    )}
                    <Navbar.Link href="#">Services</Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
