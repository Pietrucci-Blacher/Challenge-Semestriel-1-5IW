import {Avatar, DarkThemeToggle, Dropdown, Navbar} from 'flowbite-react';
import Image from 'next/image';
import {useAuthContext} from '@/providers/AuthProvider';

export default function Header() {
    const {user} = useAuthContext();

    return (
        <header className="sticky top-0 z-50">
            <Navbar fluid rounded>
                <Navbar.Brand href="/">
                    <Image
                        alt="Flowbite logo"
                        height="32"
                        src="/favicons/icon.svg"
                        width="32"
                    />
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <DarkThemeToggle className="mx-4"/>
                    {user && (
                        <Dropdown
                            inline
                            className="z-50"
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
                            <Dropdown.Item href="/profile">
                                Profil
                            </Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item href="/auth/logout">
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                    )}
                    <Navbar.Toggle/>
                </div>

                <Navbar.Collapse>
                    <Navbar.Link href="#" active>
                        Home
                    </Navbar.Link>
                    {user && (
                        <>
                            <Navbar.Link href="/services">Services</Navbar.Link>
                            <Navbar.Link href="/establishment/">
                                Etablissements
                            </Navbar.Link>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
