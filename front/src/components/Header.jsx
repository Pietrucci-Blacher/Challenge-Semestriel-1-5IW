import { Avatar, DarkThemeToggle, Dropdown, Navbar } from 'flowbite-react';
import Image from 'next/image';
import { useAuthContext } from '@/providers/AuthProvider';
import Link from 'next/link';
import { useTranslationContext } from '@/providers/TranslationProvider';

export default function Header() {
    const { user } = useAuthContext();
    const { changeLanguage, language, t } = useTranslationContext();

    const changeTo = language === 'en' ? 'fr' : 'en';

    const handleLanguageChange = () => {
        changeLanguage(changeTo);
    };

    const flag = changeTo !== 'fr' ? '🇬🇧' : '🇫🇷';
    const languageLabel = changeTo !== 'fr' ? 'English' : 'Français';

    return (
        <header className="sticky top-0 z-50 bg-white shadow-lg">
            <Navbar fluid={true} rounded={true}>
                <Navbar.Brand href="/">
                    <Image
                        alt={t('logoAlt')}
                        height="32"
                        src="/favicons/icon.svg"
                        width="32"
                        className="mr-3 h-8"
                    />
                    <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                        Coursia
                    </span>
                </Navbar.Brand>

                <div className="flex md:order-2 items-center gap-x-4">
                    <button
                        onClick={handleLanguageChange}
                        className="px-4 py-2 text-sm font-medium flex items-center gap-x-2 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300"
                        title="Change Language"
                    >
                        {flag} {languageLabel}
                    </button>

                    {user ? (
                        <Dropdown
                            inline
                            className="z-50"
                            label={
                                <Avatar
                                    alt={t('userSettings')}
                                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    rounded={true}
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
                                {t('profile')}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item href="/auth/logout">
                                {t('signOut')}
                            </Dropdown.Item>
                        </Dropdown>
                    ) : (
                        <div className="flex gap-x-2">
                            <Link
                                href="/auth/login"
                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                {t('login')}
                            </Link>
                            <Link
                                href="/auth/register"
                                className="px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded hover:bg-blue-50 focus:outline-none focus:ring focus:ring-blue-300"
                            >
                                {t('register')}
                            </Link>
                        </div>
                    )}

                    <Navbar.Toggle />
                </div>

                <Navbar.Collapse
                    className="navbar-collapse"
                    style={{ listStyleType: 'none', paddingLeft: 0 }}
                >
                    <Navbar.Link
                        href="/"
                        active
                        className="list-none px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                    >
                        {t('home')}
                    </Navbar.Link>
                    <Navbar.Link
                        href="/about"
                        className="list-none px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                    >
                        {t('about')}
                    </Navbar.Link>
                    {user && (
                        <>
                            <Navbar.Link
                                href="/services"
                                className="list-none px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                            >
                                {t('services')}
                            </Navbar.Link>
                            <Navbar.Link
                                href="/establishment"
                                className="list-none px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                            >
                                {t('establishments')}
                            </Navbar.Link>
                        </>
                    )}
                    <Navbar.Link
                        href="/contact"
                        className="list-none px-2 py-1 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                    >
                        {t('contact')}
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}
