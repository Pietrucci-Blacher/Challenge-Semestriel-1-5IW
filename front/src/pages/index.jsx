import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import nextI18NextConfig from '../../next-i18next.config';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { Button, Card, Footer } from 'flowbite-react';
import Image from 'next/image';

export default function Index() {
    const { t, i18n } = useTranslation('common');

    // Using the previously defined fake data arrays for features, courses, and testimonials
    const features = [
        {
            title: 'Expert Instructors',
            description: 'Learn from industry leaders and experts.',
            imgSrc: 'https://via.placeholder.com/150/CDCDCD/808080?text=Expert+Instructors',
        },
        {
            title: 'Flexible Learning',
            description: 'Study at your own pace, anytime, anywhere.',
            imgSrc: 'https://via.placeholder.com/150/CDCDCD/808080?text=Flexible+Learning',
        },
        {
            title: 'Wide Range of Courses',
            description: 'Courses available in various subjects to explore.',
            imgSrc: 'https://via.placeholder.com/150/CDCDCD/808080?text=Wide+Range+of+Courses',
        },
    ];

    const courses = [
        {
            title: 'Introduction to Programming',
            description: 'Start your coding journey with this beginner course.',
            imgSrc: 'https://via.placeholder.com/150/CDCDCD/808080?text=Programming',
        },
        {
            title: 'Digital Marketing Essentials',
            description: 'Learn the fundamentals of digital marketing.',
            imgSrc: 'https://via.placeholder.com/150/CDCDCD/808080?text=Digital+Marketing',
        },
        {
            title: 'Data Analysis with Python',
            description: 'Analyze data effectively using Python.',
            imgSrc: 'https://via.placeholder.com/150/CDCDCD/808080?text=Data+Analysis',
        },
    ];

    const testimonials = [
        {
            name: 'John Doe',
            testimonial:
                'Coursia has transformed my learning journey. Highly recommended!',
            imgSrc: 'https://via.placeholder.com/100/CDCDCD/808080?text=J.D.',
        },
        {
            name: 'Jane Smith',
            testimonial:
                "The flexibility and course quality are unmatched. It's been a great experience.",
            imgSrc: 'https://via.placeholder.com/100/CDCDCD/808080?text=J.S.',
        },
    ];

    return (
        <section className="flex flex-col min-h-screen overflow-hidden">
            <Head>
                <title>Coursia</title>
            </Head>

            <main className="flex-grow">
                <section className="relative bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-20 flex justify-center items-center flex-col">
                    <h1 className="text-5xl font-bold md:text-6xl text-center">
                        Discover New Knowledge
                    </h1>
                    <p className="mt-4 text-lg text-center max-w-md">
                        Book your online courses with ease.
                    </p>
                    <Button color="light" size="lg" className="mt-8">
                        Browse Services
                    </Button>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-12">
                            Why Choose Coursia?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <Card
                                    key={index}
                                    imgAlt={feature.title}
                                    imgSrc={feature.imgSrc}
                                    title={feature.title}
                                    description={feature.description}
                                    className="transform hover:scale-105 transition duration-300"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-100">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-12">
                            Popular Courses
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {courses.map((course, index) => (
                                <Card
                                    key={index}
                                    imgAlt={course.title}
                                    imgSrc={course.imgSrc}
                                    title={course.title}
                                    description={course.description}
                                    className="transform hover:scale-105 transition duration-300"
                                />
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl font-bold text-center mb-12">
                            Student Testimonials
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
                                >
                                    <div className="flex items-center">
                                        <Image
                                            className="w-16 h-16 rounded-full mr-4"
                                            width={100}
                                            height={100}
                                            src={testimonial.imgSrc}
                                            alt={testimonial.name}
                                        />
                                        <div className="text-lg">
                                            <h3 className="font-bold">
                                                {testimonial.name}
                                            </h3>
                                            <p className="text-gray-600">
                                                {testimonial.testimonial}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer container={true} className="bg-gray-50">
                <div className="w-full text-center py-4">
                    <span className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Coursia™. All Rights
                        Reserved.
                    </span>
                </div>
            </Footer>
        </section>
    );
}

export async function getStaticProps(context) {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(
                locale ?? 'fr',
                ['common'],
                nextI18NextConfig,
            )),
        },
    };
}
